import create from "zustand";
import sidechainApi from "@/api/sidechainApi";
import useAppStore from "@/store/useAppStore";
import userStore from "@/store/userStore";
import useCardStore from "@/store/useCardStore";
import useStore from "@/store/index";
import { arrayChunk } from "@/utils/arrayChunk";

type JsonOperation = {
  required_auths: string[];
  required_posting_auths: [];
  id: string;
  json: string;
};

const createJsonOperation = (
  json: object,
  username: string,
  sidechainId: string,
): [string, JsonOperation] => [
  "custom_json",
  {
    required_auths: [username],
    required_posting_auths: [],
    id: sidechainId,
    json: JSON.stringify(json),
  },
];

interface MarketStore {
  purchaseData: any;
  requestSell: (params: {
    nfts: string[];
    price: number;
    priceSymbol: string;
  }) => Promise<void>;
  requestBuy: (params: { nfts: string[] }) => Promise<void>;
  requestCancel: (params: { nfts: string[] }) => Promise<void>;
  getNFTSellBook: (
    query: Record<string, any>,
    offset?: number,
    limit?: number,
  ) => Promise<any>;
  fetchSellBook: (query?: Record<string, any>) => Promise<any[]>;
  fetchSellBookByIds: (ids: number[]) => Promise<any[]>;
}

const useMarketStore = create<MarketStore>((set, get) => {
  const requestBroadcastOps = async (json: object, contractAction: string) => {
    const username = userStore.getState().user?.username;
    const { sidechain_id } = useAppStore.getState().settings;

    if (!username) {
      throw new Error("User not authenticated");
    }

    const operations = [createJsonOperation(json, username, sidechain_id)];

    const broadcastOps = useStore.getState().requestBroadcastOps;
    await broadcastOps(username, operations, "Active");
  };

  const fetchSellBook = async (
    query: Record<string, any> = {},
  ): Promise<any[]> => {
    const limit = 1000;
    let results: any[] = [];
    let newData = 0;
    let offset = 0;

    // Fetch the types data using useCardStore
    const { getPackManagerTypes } = useCardStore.getState();
    const typesData = await getPackManagerTypes();

    // Create a mapping from type ID to type data
    const typesMap = new Map(typesData.map((type: any) => [type.typeId, type]));

    try {
      do {
        const data = await get().getNFTSellBook(query, offset, limit);
        newData = data.length;

        if (data.length > 0) {
          results.push(...data);

          if (data.length < limit) {
            newData = 0;
          }
        }

        offset += 1000;
      } while (newData > 0);

      results = results.map((c) => {
        const { price, priceSymbol, fee, grouping } = c;
        let { edition, foil, type } = grouping;

        edition = Number(edition);
        foil = Number(foil);
        type = Number(type);

        const typeData = typesMap.get(type);
        const { name, team, category, rarity } = typeData || {};

        return {
          nft_id: Number(c.nftId),
          account: c.account,
          name,
          team,
          category,
          edition,
          foil,
          type,
          rarity,
          price: Number(price),
          priceSymbol,
          fee: Number(fee),
          for_sale: true,
        };
      });
    } catch (e) {
      console.log(e);
    }

    return results;
  };

  const fetchSellBookByIds = async (ids: number[]): Promise<any[]> => {
    try {
      const chunkedIds = arrayChunk({ array: ids, size: 1000 });

      const requests = chunkedIds.map((chunk) =>
        get().getNFTSellBook({
          nftId: { $in: chunk.map((i) => i.toString()) },
        }),
      );

      const sellBook = await Promise.all(requests);
      return sellBook.flat(Infinity);
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  return {
    purchaseData: null,
    requestSell: async ({ nfts, price, priceSymbol }) => {
      try {
        const { nft_symbol, market_fee } = useAppStore.getState().settings;

        const json = {
          contractName: "nftmarket",
          contractAction: "sell",
          contractPayload: {
            symbol: nft_symbol,
            nfts,
            price: price.toString(),
            priceSymbol,
            fee: market_fee,
          },
        };

        return await requestBroadcastOps(json, "sell");
      } catch (error) {
        console.error(error);
      }
    },
    requestBuy: async ({ nfts }) => {
      try {
        const { account } = useAppStore.getState().settings;

        const json = {
          contractName: "nftmarket",
          contractAction: "buy",
          contractPayload: {
            symbol: "ZARK",
            nfts,
            marketAccount: account,
          },
        };

        await requestBroadcastOps(json, "buy");
      } catch (error) {
        console.error(error);
      }
    },
    requestCancel: async ({ nfts }) => {
      try {
        const { nft_symbol } = useAppStore.getState().settings;

        const json = {
          contractName: "nftmarket",
          contractAction: "cancel",
          contractPayload: {
            symbol: nft_symbol,
            nfts,
          },
        };

        await requestBroadcastOps(json, "cancel");
      } catch (error) {
        console.error(error);
      }
    },
    getNFTSellBook: async (
      query: Record<string, any>,
      offset = 0,
      limit = 1000,
    ) => {
      const { nft_symbol } = useAppStore.getState().settings;
      const symbol = query.symbol || nft_symbol;

      delete query.symbol;

      const request = {
        method: "find",
        params: {
          contract: "nftmarket",
          table: `${symbol}sellBook`,
          query,
          offset,
          limit,
        },
      };

      return await sidechainApi.call("contracts", request);
    },
    fetchSellBook,
    fetchSellBookByIds,
  };
});

export default useMarketStore;
