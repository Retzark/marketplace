import { useEffect, useState } from "react";
import useAppStore from "@/store/useAppStore";
import sidechainApi from "@/api/sidechainApi";
import userStore from "@/store/userStore";

const useFetchCollectionData = () => {
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
        const username = userStore.getState().user?.username;
        const query = {
          $or: [{ account: username }],
        };

        const limit = 1000;
        const offset = 0;
        const endpoint = "contracts";
        const request = {
          method: "find",
          params: {
            contract: "nft",
            table: `${settings.nft_symbol}instances`,
            query,
            offset,
            limit,
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

export default useFetchCollectionData;
