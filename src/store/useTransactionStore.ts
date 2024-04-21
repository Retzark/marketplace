import create from "zustand";
import sidechainApi from "@/api/sidechainApi";

// Helper function to safely parse JSON
const parseJSON = (json) => {
  let result = {};
  try {
    result = JSON.parse(json);
  } catch (error) {
    console.error("Failed to parse JSON:", error);
  }
  return result;
};

// Function to simulate sleep in async functions
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const useTransactionStore = create((set, get) => ({
  validateTransaction: async (trxId) => {
    let error = false;
    let trx = null;
    let count = 0;

    console.log({ trxId });
    do {
      await sleep(3000);
      try {
        const endpoint = "blockchain";
        const request = {
          method: "getTransactionInfo",
          params: {
            txid: trxId,
          },
        };
        console.log(request);
        // Simulate fetching a transaction
        trx = await sidechainApi.call(endpoint, request);
        // trx = await fetchTransaction(trxId);
      } catch (e) {
        console.log(e);
        // console.error(e.message);
      }
      count += 1;
    } while (!trx && count < 10);

    if (trx) {
      const logs = parseJSON(trx.logs);
      if (logs.errors) {
        error = true;
      } else if (trx.contract === "packmanager" && trx.action === "open") {
        const cards = logs.events.filter((e) => e.event === "issue");
        set({ cards }); // Update the state with the new cards
      }
    }

    set({
      transactionValidated: {
        trxId,
        contract: !trx ? null : trx.contract,
        action: !trx ? null : trx.action,
        payload: !trx ? null : parseJSON(trx.payload),
        error,
      },
    });
  },
}));

export default useTransactionStore;
