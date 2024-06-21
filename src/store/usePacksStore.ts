import { create } from "zustand";
import useStore from "@/store/index";
import userStore from "@/store/userStore";
import useAppStore from "@/store/useAppStore";
import apiService from "@/api/apiService";

const usePacksStore = create((set, get) => ({
  purchaseData: null,
  requestOpenPacks: async ({ packSymbol, packs = 1 }) => {
    const { sidechain_id, nft_symbol } = useAppStore.getState().settings;
    const user = userStore.getState().user.username;

    const operations = [
      [
        "custom_json",
        {
          required_auths: [user],
          required_posting_auths: [],
          id: sidechain_id,
          json: JSON.stringify({
            contractName: "packmanager",
            contractAction: "open",
            contractPayload: {
              nftSymbol: nft_symbol,
              packSymbol,
              packs,
            },
          }),
        },
      ],
    ];

    try {
      const broadcastOps = useStore.getState().requestBroadcastOps;
      const txid = await broadcastOps(user, operations, "Active");
      return txid; // Return the transaction ID
    } catch (error) {
      console.error("Failed to open packs:", error);
      throw error;
    }
  },
  startPurchase: async ({
    paymentMethod,
    currency = "USD",
    items,
    quantity,
  }) => {
    try {
      const username = userStore.getState().user?.username;

      const payload = {
        username: username,
        items: items.map((item) => ({
          ...item,
          quantity,
        })),
        payment_method: paymentMethod,
        currency,
      };

      const response = await axios.post(
        `https://market.retzark.com/api/purchases/start`,
        payload,
      );
      let operations = [];

      const paymentInfo = response.data;
      const { sidechain_id } = useAppStore.getState().settings;
      const amount = parseFloat(paymentInfo.payment_info.amount).toFixed(3);

      if (paymentInfo.payment_info.type === "hive") {
        operations = [
          [
            "transfer",
            {
              from: username,
              to: paymentInfo.payment_info.address,
              amount: `${amount} ${paymentInfo.payment_info.currency}`,
              memo: paymentInfo.payment_info.memo,
            },
          ],
        ];
      } else {
        operations = [
          [
            "custom_json",
            {
              required_auths: [username],
              required_posting_auths: [],
              id: sidechain_id,
              json: JSON.stringify({
                contractName: "tokens",
                contractAction: "transfer",
                contractPayload: {
                  symbol: paymentInfo.payment_info.currency,
                  quantity: amount,
                  to: paymentInfo.payment_info.address,
                  memo: paymentInfo.payment_info.memo,
                },
              }),
            },
          ],
        ];
      }

      const broadcastOps = useStore.getState().requestBroadcastOps;
      await broadcastOps(username, operations, "Active");
    } catch (error) {
      console.error("Failed to start purchase:", error);
    }
  },
  requestTransferPack: async ({ recipient, quantity }) => {
    try {
      await apiService.startTransfer(recipient, quantity);
    } catch (error) {
      console.error("Failed to transfer pack:", error);
    }
  },
}));

export default usePacksStore;
