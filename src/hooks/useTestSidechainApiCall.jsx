import { useEffect, useState } from "react";
import sidechainApi from "../api/sidechainApi";
import useAppStore from "../store/useAppStore"; // Adjust import path as needed

const useTestSidechainApiCall = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get settings directly from the store
  const settings = useAppStore((state) => state.settings);

  const { settingsReady } = useAppStore((state) => ({
    settingsReady: state.settingsReady,
  }));

  useEffect(() => {
    if (settingsReady) {
      const fetchData = async () => {
        if (!settings.sidechain_rpc) {
          setError(new Error("sidechain_rpc is not set in settings."));
          setIsLoading(false);
          return;
        }

        setIsLoading(true);
        try {
          // Adjust 'endpoint' and 'request' as needed for your sidechain
          const endpoint = "contracts"; // Example endpoint
          const request = {
            method: "find",
            params: {
              contract: "nftmarket",
              table: `${settings.nft_symbol}openInterest`,
              query: { priceSymbol: "SWAP.HIVE" },
            },
          };
          const result = await sidechainApi.call(endpoint, request);

          console.log(result);
          setData(result);
        } catch (e) {
          setError(e);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
      // Now safe to make the call
    }
  }, [settingsReady]);

  return { data, isLoading, error };
};

export default useTestSidechainApiCall;
