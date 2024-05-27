import { useEffect, useState } from "react";
import useAppStore from "@/store/useAppStore";

const useInitializeSettings = () => {
  const fetchSettings = useAppStore((state) => state.fetchSettings);
  const settingsReady = useAppStore((state) => state.settingsReady);
  const [isReady, setIsReady] = useState(settingsReady);

  useEffect(() => {
    const initialize = async () => {
      await fetchSettings();
      setIsReady(true);
    };

    initialize();
  }, [fetchSettings]);

  return isReady;
};

export default useInitializeSettings;
