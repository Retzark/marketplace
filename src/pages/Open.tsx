import { useState, useCallback, useEffect } from "react";
import sidechainApi from "@/api/sidechainApi";
import useAppStore from "@/store/useAppStore";
import useUserStore from "@/store/userStore";
import useTransactionStore from "@/store/useTransactionStore";
import OpenPack from "@/components/modals/OpenPack";
import ViewCards from "@/components/modals/ViewCards";
import LazyLoad from "react-lazyload";
import TransferPack from "@/components/modals/TransferPack";

const Open = () => {
  const user = useUserStore((state) => state.user);
  const { settings, settingsReady } = useAppStore((state) => ({
    settings: state.settings,
    settingsReady: state.settingsReady,
  }));
  const [isOpenPackModalOpen, setIsOpenPackModalOpen] = useState(false);
  const [isTransferPackModalOpen, setIsTransferPackModalOpen] = useState(false);
  const [showViewCardsModal, setShowViewCardsModal] = useState(false); // State to control ViewCards modal visibility
  const [balance, setBalance] = useState(0);

  const { cards, setCards, removeCardByIndex } = useTransactionStore(
    (state) => ({
      cards: state.cards,
      setCards: state.setCards,
      removeCardByIndex: state.removeCardByIndex,
    }),
  );

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
      setBalance(Math.floor(response[0].balance));
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

  const handleCardsOpened = (newCards) => {
    setCards(newCards);
    setShowViewCardsModal(true);
  };

  const handleViewCardsModalClose = () => {
    setShowViewCardsModal(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="grid grid-cols-1 flex-grow">
        <LazyLoad height="70vh" once>
          <div
            className="relative text-white text-center bg-no-repeat bg-cover bg-center flex justify-center items-center"
            style={{
              backgroundImage: `url('/images/open-pack-image.webp')`,
              height: "70vh",
            }}
          >
            <img
              src="/images/card_open.webp"
              alt="Alpha Pack"
              className="max-w-full h-auto"
            />
          </div>
        </LazyLoad>
      </div>

      <div className="flex justify-center items-center my-4">
        <button
          onClick={handleOpenPackClick}
          className="px-3 py-2 mr-3 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary-dark"
        >
          OPEN PACK (x{balance})
        </button>
        <button
          onClick={handleTransferPackClick}
          className="px-3 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary-dark"
        >
          TRANSFER PACK
        </button>
      </div>

      <OpenPack
        isOpen={isOpenPackModalOpen}
        onClose={handleCloseModal}
        onCardsOpened={handleCardsOpened}
      />
      <ViewCards
        show={showViewCardsModal}
        handleClose={handleViewCardsModalClose}
        cards={cards}
        removeCardByIndex={removeCardByIndex}
      />

      <TransferPack isOpen={isTransferPackModalOpen}></TransferPack>

      <footer className="w-full bg-yellow-500 h-1 mt-auto"></footer>

      <style>{`
        .parallax {
          background-attachment: fixed;
        }
      `}</style>
    </div>
  );
};

export default Open;
