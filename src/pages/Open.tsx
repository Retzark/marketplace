import { useState, useEffect } from "react";
import useAppStore from "@/store/useAppStore";
import useUserStore from "@/store/userStore";
import useTransactionStore from "@/store/useTransactionStore";
import OpenPack from "@/components/modals/OpenPack";
import ViewCards from "@/components/modals/ViewCards";
import LazyLoad from "react-lazyload";
import TransferPack from "@/components/modals/TransferPack";
import useBalanceStore from "@/store/useBalanceStore";

const Open = () => {
  const user = useUserStore((state) => state.user);
  const { settings, settingsReady } = useAppStore((state) => ({
    settings: state.settings,
    settingsReady: state.settingsReady,
  }));
  const [isOpenPackModalOpen, setIsOpenPackModalOpen] = useState(false);
  const [isTransferPackModalOpen, setIsTransferPackModalOpen] = useState(false);
  const [showViewCardsModal, setShowViewCardsModal] = useState(false); // State to control ViewCards modal visibility

  const { balance, fetchBalance } = useBalanceStore();

  const { cards, setCards, removeCardByIndex } = useTransactionStore(
    (state) => ({
      cards: state.cards,
      setCards: state.setCards,
      removeCardByIndex: state.removeCardByIndex,
    }),
  );

  const handleCloseModal = () => {
    fetchBalance();
    setIsOpenPackModalOpen(false);
    setIsTransferPackModalOpen(false);
  };

  useEffect(() => {
    if (settingsReady) {
      fetchBalance();
    }
  }, [fetchBalance, settingsReady]);

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

      <TransferPack
        isOpen={isTransferPackModalOpen}
        onClose={handleCloseModal}
      />

      <footer className="w-full bg-yellow-500 h-1 mt-auto"></footer>

      <style>{`
        .parallax {
          background-attachment: fixed;
        }
        .flip-card {
          perspective: 1000px;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        .flip-card.flipped .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default Open;
