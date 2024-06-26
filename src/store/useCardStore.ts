import create from "zustand";
import useAppStore from "@/store/useAppStore";
import sidechainApi from "@/api/sidechainApi";
import { fetchCardsData } from "@/utils/fetchCardData";
import { Card, SellBookEntry } from "@/types";

interface CardStoreState {
  getPackManagerTypes: (
    query?: Record<string, any>,
    offset?: number,
    limit?: number,
  ) => Promise<any>;
  fetchCardDetails: (
    id: string,
    card: Card | null,
  ) => Promise<{
    card: Card | null;
    sellBookEntries: SellBookEntry[];
  }>;
  fetchSellBook: (query: Record<string, any>) => Promise<SellBookEntry[]>;
}

const useCardStore = create<CardStoreState>((set, get) => ({
  getPackManagerTypes: async (
    query: Record<string, any> = {},
    offset = 0,
    limit = 1000,
  ) => {
    const { settings } = useAppStore.getState();

    if (!settings) {
      throw new Error("Settings not initialized");
    }

    const { nft_symbol } = settings;
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

    return await sidechainApi.call("contracts", request);
  },

  fetchCardDetails: async (id: string, card: Card | null) => {
    try {
      const data = await fetchCardsData();
      const cardFromJson = data.find((c) => c.ID === parseInt(id));
      let fetchedCard: Card | null = null;

      if (cardFromJson) {
        fetchedCard = {
          _id: cardFromJson.ID.toString(),
          name: cardFromJson.NAME,
          type: "Type",
          description: "Description",
          count: 1,
          hp: cardFromJson.HP,
          atk: cardFromJson.ATK,
          spd: cardFromJson.SPD,
          egy: cardFromJson.EGY,
          rarity: cardFromJson.RARITY,
          grouping: {
            type: card?.grouping.type,
            foil: card?.grouping.foil,
            edition: card?.grouping.edition,
          },
        } as Card;
      }

      const query = {
        "grouping.type": card?.grouping.type || fetchedCard?.grouping.type,
        "grouping.foil": card?.grouping.foil || fetchedCard?.grouping.foil,
        "grouping.edition":
          card?.grouping.edition || fetchedCard?.grouping.edition,
      };

      const fetchedSellBookEntries = await get().fetchSellBook(query);

      return { card: fetchedCard, sellBookEntries: fetchedSellBookEntries };
    } catch (error) {
      console.error("Failed to fetch card details:", error);
      throw error;
    }
  },

  fetchSellBook: async (query: Record<string, any>) => {
    const request = {
      method: "find",
      params: {
        contract: "market",
        table: "sellBook",
        query,
        limit: 1000,
      },
    };

    return await sidechainApi.call("contracts", request);
  },
}));

export default useCardStore;
