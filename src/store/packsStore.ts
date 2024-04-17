// packsStore.js
import create from "zustand";
import { persist } from "zustand/middleware";

const usePacksStore = create(
  persist(
    (set, get) => ({
      purchase_data: null,

      setPurchaseData: (data) => set({ purchase_data: data }),

      requestCryptoPayment: async () => {
        const { payment_info: paymentInfo } = get().purchase_data;
        let operations = [];
        if (paymentInfo.type === "hive") {
          operations = [
            [
              "transfer",
              {
                from: "currentUsername",
                to: paymentInfo.address,
                amount: `${paymentInfo.amount} ${paymentInfo.currency}`,
                memo: paymentInfo.memo,
              },
            ],
          ];
        } else {
          operations = [
            [
              "custom_json",
              {
                required_auths: ["currentUsername"],
                required_posting_auths: [],
                id: "sidechainId",
                json: JSON.stringify({
                  contractName: "tokens",
                  contractAction: "transfer",
                  contractPayload: {
                    symbol: paymentInfo.currency,
                    quantity: paymentInfo.amount.toString(),
                    to: paymentInfo.address,
                    memo: paymentInfo.memo,
                  },
                }),
              },
            ],
          ];
        }
        // Dispatch these operations accordingly
      },

      requestOpenPacks: async ({ packSymbol, packs = 1 }) => {
        const operations = [
          [
            "custom_json",
            {
              required_auths: ["currentUsername"],
              required_posting_auths: [],
              id: "sidechainId",
              json: JSON.stringify({
                contractName: "packmanager",
                contractAction: "open",
                contractPayload: {
                  nftSymbol: "NFTSYMBOL", // Your actual NFT symbol
                  packSymbol,
                  packs,
                },
              }),
            },
          ],
        ];

        // Simulate dispatching operations
        console.log("Dispatching operations:", operations);
      },

      requestTransferPacks: async ({ symbol, recipient, quantity }) => {
        const operations = [
          [
            "custom_json",
            {
              required_auths: ["currentUsername"],
              required_posting_auths: [],
              id: "sidechainId",
              json: JSON.stringify({
                contractName: "tokens",
                contractAction: "transfer",
                contractPayload: {
                  symbol,
                  to: recipient,
                  quantity: quantity.toString(),
                },
              }),
            },
          ],
        ];

        // Simulate dispatching operations
        console.log("Dispatching transfer operations:", operations);
      },
    }),
    {
      name: "packs-store", // unique name for persisting session storage
    },
  ),
);

export default usePacksStore;
