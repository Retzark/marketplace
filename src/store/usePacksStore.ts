import { create } from "zustand";
import useStore from "@/store/index";

const usePacksStore = create((set, get) => ({
  requestOpenPacks: async ({ packSymbol, packs = 1 }) => {
    const sidechainId = "ssc-mainnet-hive"; // Replace with your actual sidechain ID

    const operations = [
      [
        "custom_json",
        {
          required_auths: ["gacbaluyot"],
          required_posting_auths: [],
          id: sidechainId,
          json: JSON.stringify({
            contractName: "packmanager",
            contractAction: "open",
            contractPayload: {
              nftSymbol: "DATA",
              packSymbol,
              packs,
            },
          }),
        },
      ],
    ];

    try {
      // Use the other store's function
      const broadcastOps = useStore.getState().requestBroadcastOps;
      await broadcastOps("gacbaluyot", operations, "Active"); // console.log("Packs opened successfully:", result.data);
      // Optionally manage state or trigger UI updates here
    } catch (error) {
      console.error("Failed to open packs:", error);
    }
  },
}));

export default usePacksStore;
