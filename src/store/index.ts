import create from "zustand";
import useTransactionStore from "@/store/useTransactionStore";

type KeychainResponse = {
  success: boolean;
  msg: string;
  cancel?: boolean;
  result?: any;
  error?: string;
  message?: string;
};

const requestKeychain = (
  fn: string,
  ...args: any[]
): Promise<KeychainResponse> => {
  return new Promise((resolve) => {
    (window as any).hive_keychain[fn](...args, (response: any) => {
      if (response.error === "user_cancel") {
        resolve({
          success: false,
          msg: response.error,
          cancel: true,
          ...response,
        });
      } else if (response.success) {
        resolve({ success: true, msg: response.result, ...response });
      } else {
        resolve({ success: false, msg: response.message, ...response });
      }
    });
  });
};

interface StoreState {
  requestBroadcastOps: (
    username: string,
    operations: any[],
    keyType: string,
  ) => Promise<void>;
}

const useStore = create<StoreState>((set, get) => ({
  requestBroadcastOps: async (username, operations, keyType) => {
    try {
      const keychainResponse = await requestKeychain(
        "requestBroadcast",
        username,
        operations,
        keyType,
      );
      await useTransactionStore
        .getState()
        .validateTransaction(keychainResponse.result.id);
    } catch (error) {
      console.error("API request failed:", error);
    }
  },
}));

export default useStore;
