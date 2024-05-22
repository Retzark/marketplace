import create from "zustand";
import useAppStore from "@/store/useAppStore";
import sidechainApi from "@/api/sidechainApi";

interface CardStoreState {
  getPackManagerTypes: (
    query?: Record<string, any>,
    offset?: number,
    limit?: number,
  ) => Promise<any>;
}

const useCardStore = create<CardStoreState>((set, get) => ({
  getPackManagerTypes: async (
    query: Record<string, any> = {},
    offset = 0,
    limit = 1000,
  ) => {
    console.log(useAppStore.getState().settings);
    const { nft_symbol } = useAppStore.getState().settings;
    query.nft = query.nft || nft_symbol;

    const request = {
      method: "find",
      params: {
        contract: "packmanager",
        table: "types",
        query,
        offset,
        limit,
      },
    };

    // Assuming there's a function in useAppStore to handle contract requests
    return await sidechainApi.call("contracts", request);
  },
}));

export default useCardStore;
