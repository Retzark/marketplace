// src/store/useBalanceStore.ts
import create from "zustand";
import { useCallback } from "react";
import sidechainApi from "@/api/sidechainApi";
import useAppStore from "@/store/useAppStore";
import useUserStore from "@/store/userStore";

interface BalanceState {
  balance: number;
  isFetchingBalance: boolean;
  setFetchingBalance: (value: boolean) => void;
  fetchBalance: () => void;
}

const useBalanceStore = create<BalanceState>((set) => ({
  balance: 0,
  isFetchingBalance: false,
  setFetchingBalance: (value: boolean) => {
    set(() => ({ isFetchingBalance: value }));
  },
  fetchBalance: async () => {
    set(() => ({ isFetchingBalance: true }));
    const { settings, settingsReady } = useAppStore.getState();
    const user = useUserStore.getState().user;

    if (!settingsReady || !settings || !settings.sidechain_rpc) {
      return;
    }

    try {
      const endpoint = "contracts";
      const symbols = settings.packs.map((p) => p.symbol);
      const query = {
        account: user?.username,
        symbol: { $in: symbols },
      };
      let method = "findOne";

      if (Array.isArray(symbols)) {
        method = "find";
        query.symbol = { $in: symbols };
      } else {
        query.symbol = symbols;
      }

      const request = {
        method,
        params: {
          contract: "tokens",
          table: "balances",
          query,
        },
      };

      const response = await sidechainApi.call(endpoint, request);
      set({ balance: Math.floor(response[0].balance) });
      console.log("API Response:", response);
    } catch (e) {
      console.error("Failed to fetch or process data:", e);
    } finally {
      set(() => ({ isFetchingBalance: false }));
    }
  },
}));

export default useBalanceStore;
