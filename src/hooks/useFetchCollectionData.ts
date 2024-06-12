import { useCallback, useEffect, useState } from "react";
import useAppStore from "@/store/useAppStore";
import sidechainApi from "@/api/sidechainApi";
import userStore from "@/store/userStore";
import useMarketStore from "@/store/useMarketStore";
import useCardStore from "@/store/useCardStore";

const useFetchCollectionData = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { settings, settingsReady } = useAppStore((state) => ({
    settings: state.settings,
    settingsReady: state.settingsReady,
  }));

  const { fetchSellBookByIds } = useMarketStore((state) => ({
    fetchSellBookByIds: state.fetchSellBookByIds,
  }));

  const fetchCollection = useCallback(async () => {
    if (!settingsReady || !settings || !settings.sidechain_rpc) {
      setError(new Error("Configuration for sidechain RPC is not complete."));
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

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
        const forSaleInstances = await fetchSellBookByIds(forSaleIds);
        console.log(forSaleInstances);
        sellBook = forSaleInstances.reduce((acc: any, cur: any) => {
          acc[Number(cur.nftId)] = {
            price: Number(cur.price),
            priceSymbol: cur.priceSymbol,
            fee: cur.fee,
          };
          return acc;
        }, {});
      }

      // Fetch the types data using useCardStore
      const { getPackManagerTypes } = useCardStore.getState();
      const typesData = await getPackManagerTypes();

      // Create a mapping from type ID to type data
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

      setData(results);
    } catch (e) {
      console.error(e);
      setError(e as Error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchSellBookByIds, settings, settingsReady]);

  useEffect(() => {
    if (settingsReady) {
      fetchCollection();
    }
  }, [settingsReady, fetchCollection]);

  return { data, isLoading, error };
};

export default useFetchCollectionData;
