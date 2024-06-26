import { useEffect, useState } from "react";
import useAppStore from "@/store/useAppStore";
import sidechainApi from "@/api/sidechainApi";

const useFetchNFTMarketData = () => {
  const [data, setData] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { settings, settingsReady } = useAppStore((state) => ({
    settings: state.settings,
    settingsReady: state.settingsReady,
  }));

  useEffect(() => {
    const fetchData = async () => {
      if (!settingsReady || !settings || !settings.sidechain_rpc) {
        setError(new Error("Configuration for sidechain RPC is not complete."));
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const endpoint = "contracts";
        const request = {
          method: "find",
          params: {
            contract: "nftmarket",
            table: `${settings.nft_symbol}openInterest`,
            query: { priceSymbol: "ZARK" },
          },
        };

        const result = await sidechainApi.call(endpoint, request);
        setData(result);
      } catch (e) {
        setError(e as Error);
      } finally {
        setIsLoading(false);
      }
    };

    if (settingsReady) {
      fetchData();
    }
  }, [settings, settingsReady]);

  return { data, isLoading, error };
};

export default useFetchNFTMarketData;
