// src/store/useStore.js
import create from "zustand";
import useTransactionStore from "@/store/useTransactionStore";

const requestKeychain = (fn, ...args) => {
  return new Promise((resolve) => {
    window.hive_keychain[fn](...args, (response) => {
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

const useStore = create((set, get) => ({
  requestBroadcastOps: async (username, operations, keyType = "Active") => {
    try {
      const keychainResponse = await requestKeychain(
        "requestBroadcast",
        username,
        operations,
        keyType,
      );
      await useTransactionStore
        .getState()
        .validateTransaction(keychainResponse.result.tx_id);
    } catch (error) {
      console.error("API request failed:", error);
    }
  },
}));

export default useStore;
