import { useCallback, useState, useEffect } from "react";
import sidechainApi from "@/api/sidechainApi";
import useAppStore from "@/store/useAppStore";
import useUserStore from "@/store/userStore";
import OpenPack from "@/components/modals/OpenPack";

const Open = () => {
  const user = useUserStore((state) => state.user);
  const { settings, settingsReady } = useAppStore((state) => ({
    settings: state.settings,
    settingsReady: state.settingsReady,
  }));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    // usePacksStore.requestOpenPacks();
    setIsModalOpen(false);
  };

  const fetchData = useCallback(async () => {
    if (!settingsReady || !settings || !settings.sidechain_rpc) {
      return;
    }

    try {
      const endpoint = "contracts";
      const symbols = settings.packs.map((p) => p.symbol);
      const query = {
        account: user?.username,
        symbol: { $in: symbols },
      };
      let method = "findOne";

      if (Array.isArray(symbols)) {
        method = "find";
        query.symbol = { $in: symbols };
      } else {
        query.symbol = symbols;
      }
      console.log(method);

      const request = {
        method,
        params: {
          contract: "tokens",
          table: "balances",
          query,
        },
      };

      const response = await sidechainApi.call(endpoint, request);
      console.log("API Response:", response);
    } catch (e) {
      console.error("Failed to fetch or process data:", e);
    }
  }, [settings, settingsReady, user]);

  useEffect(() => {
    if (settingsReady) {
      fetchData();
    }
  }, [fetchData, settingsReady]);

  const handleOpenPackClick = () => {
    // Optionally fetch data here or just open the modal
    setIsModalOpen(true);
  };

  return (
    <div>
      <button
        onClick={handleOpenPackClick}
        className="px-3 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary-dark"
      >
        OPEN PACK
      </button>

      <OpenPack isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-lg">Open Card Details</h2>
        <p>Card details or actions can be placed here.</p>
      </OpenPack>
    </div>
  );
};

export default Open;
