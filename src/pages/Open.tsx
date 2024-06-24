import { useState, useEffect } from "react";
import { Box, Button, Flex, Image } from "@chakra-ui/react";
import useAppStore from "@/store/useAppStore";
import useTransactionStore from "@/store/useTransactionStore";
import OpenPack from "@/components/modals/OpenPack";
import ViewCards from "@/components/modals/ViewCards";
import TransferPack from "@/components/modals/TransferPack";
import useBalanceStore from "@/store/useBalanceStore";
import { CardFlipContainer } from "@/components";

const Open = () => {
  const { settingsReady } = useAppStore((state) => ({
    settings: state.settings,
    settingsReady: state.settingsReady,
  }));
  const [isOpenPackModalOpen, setIsOpenPackModalOpen] = useState(false);
  const [isTransferPackModalOpen, setIsTransferPackModalOpen] = useState(false);
  const [showViewCardsModal, setShowViewCardsModal] = useState(false);

  const { balance, fetchBalance } = useBalanceStore();

  const { cards, setCards, removeCardByIndex } = useTransactionStore(
    (state) => ({
      cards: state.cards,
      setCards: state.setCards,
      removeCardByIndex: state.removeCardByIndex,
    })
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
    console.log(newCards);
    setShowViewCardsModal(true);
  };

  const handleViewCardsModalClose = () => {
    setShowViewCardsModal(false);
    setIsOpenPackModalOpen(false);
    fetchBalance();
  };

  return (
    <Flex direction="column" minH="70vh">
      <Box flexGrow={1}>
        <Flex
          justifyContent="center"
          alignItems="center"
          bgImage="url('/images/open-pack-image.webp')"
          bgSize="cover"
          bgPosition="center"
          height="70vh"
        >
          <Image src="/images/card_open.webp" alt="Alpha Pack" />
        </Flex>

        <Flex justifyContent="center" alignItems="center" mt={5} gap="2">
          <Button
            bg="#15C1A2"
            color="white"
            _hover={{ bg: "#15C1A2d6" }}
            size="lg"
            shadow="md"
            borderBottom="4px solid"
            borderColor="#1C465B"
            borderRadius="md"
            fontFamily="Poppins"
            onClick={handleOpenPackClick}
          >
            OPEN PACK (x{balance})
          </Button>
          <Button
            bg="#15C1A2"
            color="white"
            _hover={{ bg: "#15C1A2d6" }}
            size="lg"
            shadow="md"
            borderBottom="4px solid"
            borderColor="#1C465B"
            borderRadius="md"
            fontFamily="Poppins"
            onClick={handleTransferPackClick}
          >
            TRANSFER PACK
          </Button>
        </Flex>
      </Box>

      <OpenPack
        isOpen={isOpenPackModalOpen}
        onClose={handleCloseModal}
        onCardsOpened={handleCardsOpened}
      />
      {/* <ViewCards
        show={showViewCardsModal}
        handleClose={handleViewCardsModalClose}
        cards={cards}
        removeCardByIndex={removeCardByIndex}
      /> */}
      <CardFlipContainer
        show={showViewCardsModal}
        handleClose={handleViewCardsModalClose}
        cards={cards}
        removeCardByIndex={removeCardByIndex}
      />
      <TransferPack
        isOpen={isTransferPackModalOpen}
        onClose={handleCloseModal}
      />
    </Flex>
  );
};

export default Open;
