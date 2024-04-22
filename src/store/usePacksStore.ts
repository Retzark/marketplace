import { create } from "zustand";
import useStore from "@/store/index";
import userStore from "@/store/userStore";
import useAppStore from "@/store/useAppStore";
import apiService from "@/api/apiService";

const usePacksStore = create((set, get) => ({
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
    //
    try {
      // Use the other store's function
      const broadcastOps = useStore.getState().requestBroadcastOps;
      await broadcastOps(user, operations, "Active"); // console.log("Packs opened successfully:", result.data);
    } catch (error) {
      console.error("Failed to open packs:", error);
    }
  },
  purchaseData: null,
  startPurchase: async ({ paymentMethod, currency = "USD", items }) => {
    try {
      await apiService.startPurchase();
      // set({ purchaseData: response.data });
    } catch (error) {
      console.error("Failed to start purchase:", error);
    }
  },
}));

export default usePacksStore;
