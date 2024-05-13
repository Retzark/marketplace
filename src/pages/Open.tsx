import { useCallback, useState, useEffect } from "react";
import sidechainApi from "@/api/sidechainApi";
import useAppStore from "@/store/useAppStore";
import useUserStore from "@/store/userStore";
import OpenPack from "@/components/modals/OpenPack";
import TransferPack from "@/components/modals/TransferPack";
import LazyLoad from "react-lazyload";

const Open = () => {
  const user = useUserStore((state) => state.user);
  const { settings, settingsReady } = useAppStore((state) => ({
    settings: state.settings,
    settingsReady: state.settingsReady,
  }));
  const [isOpenPackModalOpen, setIsOpenPackModalOpen] = useState(false);
  const [isTransferPackModalOpen, setIsTransferPackModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpenPackModalOpen(false);
    setIsTransferPackModalOpen(false);
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
    setIsOpenPackModalOpen(true);
  };

  const handleTransferPackClick = () => {
    setIsTransferPackModalOpen(true);
  };

  return (
    <div>
      <div className="row">
        <LazyLoad height="70vh" once>
          <div
            className="relative text-white text-center bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: `url('/images/open-pack-image.webp')`,
              height: "70vh",
            }}
          ></div>
        </LazyLoad>
      </div>

      <div className="flex justify-center items-center mt-20">
        <button
          onClick={handleOpenPackClick}
          className="px-3 py-2 mr-3 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary-dark"
        >
          OPEN PACK
        </button>
        <button
          onClick={handleTransferPackClick}
          className="px-3 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary-dark"
        >
          Transfer PACK
        </button>
      </div>

      <OpenPack isOpen={isOpenPackModalOpen} onClose={handleCloseModal}>
        <h2 className="text-lg">Open Card Details</h2>
        <p>Card details or actions can be placed here.</p>
      </OpenPack>

      <TransferPack isOpen={isTransferPackModalOpen} onClose={handleCloseModal}>
        <h2 className="text-lg">Transfer Card Details</h2>
        <p>Card details or actions can be placed here for transferring.</p>
      </TransferPack>
    </div>
  );
};

export default Open;
