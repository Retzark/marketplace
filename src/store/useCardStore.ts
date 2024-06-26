import create from "zustand";
import useAppStore from "@/store/useAppStore";
import sidechainApi from "@/api/sidechainApi";
import { fetchCardsData } from "@/utils/fetchCardData";
import { Card, SellBookEntry } from "@/types";
import userStore from "@/store/userStore";

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
  fetchCollection: () => Promise<void>;
  data: any[];
  isLoading: boolean;
  error: Error | null;
}

const useCardStore = create<CardStoreState>((set, get) => ({
  data: [],
  isLoading: true,
  error: null,

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
            type: card?.grouping?.type ?? card?.type,
            foil: card?.grouping?.foil ?? card?.foil,
            edition: card?.grouping?.edition ?? card?.edition,
          },
          edition: card?.grouping?.edition ?? card?.edition,
        } as Card;
      }

      const query = {
        "grouping.type": card?.grouping?.type || fetchedCard?.grouping.type,
        "grouping.foil": card?.grouping?.foil || fetchedCard?.grouping.foil,
        "grouping.edition":
          card?.grouping?.edition || fetchedCard?.grouping.edition,
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

  fetchCollection: async () => {
    const { settings, settingsReady } = useAppStore.getState();

    if (!settingsReady || !settings || !settings.sidechain_rpc) {
      set({
        error: new Error("Configuration for sidechain RPC is not complete."),
        isLoading: false,
      });
      return;
    }

    set({ isLoading: true });

    try {
      const username = userStore.getState().user?.username;
      const query = {
        $or: [{ account: username }],
      };

      const limit = 1000;
      let results: Array<string> = [];
      let offset = 0;
      let newData: Array<string> = [];

      do {
        newData = await sidechainApi.call("contracts", {
          method: "find",
          params: {
            contract: "nft",
            table: `${settings.nft_symbol}instances`,
            query,
            offset,
            limit,
          },
        });
        if (newData.length > 0) {
          results = [...results, ...newData];
        }

        offset += limit;
      } while (newData.length === limit);

      let sellBook: {
        [key: number]: { price: number; priceSymbol: string; fee: number };
      } = {};
      const forSaleIds = results
        .filter((r) => r.account === "nftmarket")
        .map((r) => r._id);

      if (forSaleIds.length > 0) {
        const forSaleInstances = await get().fetchSellBookByIds(forSaleIds);
        sellBook = forSaleInstances.reduce((acc: any, cur: any) => {
          acc[Number(cur.nftId)] = {
            price: Number(cur.price),
            priceSymbol: cur.priceSymbol,
            fee: cur.fee,
          };
          return acc;
        }, {});
      }

      const typesData = await get().getPackManagerTypes();
      const typesMap = new Map(
        typesData.map((type: any) => [type.typeId, type]),
      );

      results = results.map((c) => {
        const { edition, foil, type } = c.properties;
        const { price, priceSymbol, fee } = sellBook[c._id] || {
          price: null,
          priceSymbol: null,
          fee: null,
        };

        const typeData = typesMap.get(Number(type));
        const { name, team, category, rarity } = typeData || {};

        return {
          nft_id: Number(c._id),
          account: c.account === "nftmarket" ? c.previousAccount : c.account,
          name,
          team,
          category,
          edition: Number(edition),
          foil: Number(foil),
          type: Number(type),
          rarity,
          price,
          priceSymbol,
          fee,
          for_sale: c.account === "nftmarket",
        };
      });

      console.log("Results fetched:", results);
      set((state) => ({ ...state, data: results, isLoading: false }));
    } catch (e) {
      console.error(e);
      set({ error: e as Error, isLoading: false });
    }
  },
}));

export default useCardStore;
