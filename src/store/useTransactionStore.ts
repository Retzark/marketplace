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
  cards: [],
  rareTypes: new Set(), // Initialize as empty set if not already done
  epicTypes: new Set(), // Initialize as empty set if not already done

  // Method to set cards directly
  setCards: (newCards) => set({ cards: newCards }),

  // Method to remove a card by index
  removeCardByIndex: (index) =>
    set((state) => ({
      cards: state.cards.filter((_, cardIndex) => cardIndex !== index),
    })),

  validateTransaction: async (trxId) => {
    const error = false;
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
      if (
        !logs.errors &&
        trx.contract === "packmanager" &&
        trx.action === "open"
      ) {
        const cards = logs.events
          .filter((e) => e.event === "issue")
          .map((event) => {
            const { edition, foil, type } = event.data.properties;
            return {
              edition,
              foil,
              type,
              image: `https://cdn.tribaldex.com/packmanager/${event.data.symbol}/${edition}_${type}_${foil}.png`,
            };
          });

        set({ cards });
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
