import create from "zustand";
import sidechainApi from "@/api/sidechainApi";

// Helper function to safely parse JSON
const parseJSON = (json: string): Record<string, any> => {
  let result: Record<string, any> = {};
  try {
    result = JSON.parse(json);
  } catch (error) {
    console.error("Failed to parse JSON:", error);
  }
  return result;
};

// Function to simulate sleep in async functions
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface Card {
  edition: string;
  foil: string;
  type: string;
  image: string;
}

interface TransactionValidated {
  trxId: string;
  contract: string | null;
  action: string | null;
  payload: Record<string, any> | null;
  error: boolean;
}

interface TransactionStoreState {
  cards: Card[];
  rareTypes: Set<string>;
  epicTypes: Set<string>;
  loading: boolean;
  setCards: (newCards: Card[]) => void;
  removeCardByIndex: (index: number) => void;
  validateTransaction: (trxId: string) => Promise<void>;
  transactionValidated?: TransactionValidated;
}

const useTransactionStore = create<TransactionStoreState>((set, get) => ({
  cards: [],
  rareTypes: new Set<string>(), // Initialize as empty set if not already done
  epicTypes: new Set<string>(), // Initialize as empty set if not already done
  loading: false, // Initialize loading state

  // Method to set cards directly
  setCards: (newCards) => set({ cards: newCards }),

  // Method to remove a card by index
  removeCardByIndex: (index) =>
    set((state) => ({
      cards: state.cards.filter((_, cardIndex) => cardIndex !== index),
    })),

  validateTransaction: async (trxId) => {
    set({ loading: true }); // Set loading to true
    let trx: any = null;
    let count = 0;
    let error = false;

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
        // Simulate fetching a transaction
        console.log(request);
        trx = await sidechainApi.call(endpoint, request);
        console.log(trx);
      } catch (e) {
        console.error(e);
        error = true;
      }
      count += 1;
    } while (!trx && count < 100);

    if (trx) {
      const logs = parseJSON(trx.logs);
      if (
        !logs.errors &&
        trx.contract === "packmanager" &&
        trx.action === "open"
      ) {
        const cards = logs.events
          .filter((e: any) => e.event === "issue")
          .map((event: any) => {
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
        contract: trx ? trx.contract : null,
        action: trx ? trx.action : null,
        payload: trx ? parseJSON(trx.payload) : null,
        error,
      },
      loading: false, // Set loading to false
    });
  },
}));

export default useTransactionStore;
