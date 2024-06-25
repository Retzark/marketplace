import { useState, useEffect } from "react";
import { Box, Button, Flex, Icon, Image } from "@chakra-ui/react";
import useAppStore from "@/store/useAppStore";
import useTransactionStore from "@/store/useTransactionStore";
import OpenPack from "@/components/modals/OpenPack";
import ViewCards from "@/components/modals/ViewCards";
import TransferPack from "@/components/modals/TransferPack";
import useBalanceStore from "@/store/useBalanceStore";
import { CardFlipContainer } from "@/components";
import { BiTransferAlt } from "react-icons/bi";

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
      <Flex
        justifyContent="center"
        alignItems="center"
        bgImage="url('/images/open-pack-image.webp')"
        bgSize="cover"
        bgPosition="center"
        height="93vh"
      >
        {!showViewCardsModal && (
          <Flex flexDirection="column">
            <Image src="/images/card_open.webp" alt="Alpha Pack" />

            <Flex justifyContent="center" alignItems="center" mt="6" gap="2">
              <Button
                bg="#15C1A2"
                color="white"
                _hover={{ bg: "#15C1A2d6" }}
                borderRadius="md"
                fontFamily="CCElephantmenTall Regular"
                fontWeight="400"
                fontSize="25px"
                px="8"
                py="6"
                onClick={handleOpenPackClick}
              >
                <Image
                  src="/images/open-packs-icon.png"
                  objectFit="contain"
                  alt="HP ICON"
                  width="25px"
                  height="25px"
                />
                &nbsp;OPEN PACK (x{balance})
              </Button>
              <Button
                bg="#15C1A2"
                color="white"
                _hover={{ bg: "#15C1A2d6" }}
                borderRadius="md"
                fontFamily="CCElephantmenTall Regular"
                fontWeight="400"
                fontSize="25px"
                px="8"
                py="6"
                onClick={handleTransferPackClick}
              >
                <Icon as={BiTransferAlt} />
                &nbsp;TRANSFER PACK
              </Button>
            </Flex>
          </Flex>
        )}

        {showViewCardsModal && (
          <CardFlipContainer
            show={showViewCardsModal}
            handleClose={handleViewCardsModalClose}
            cards={cards}
            removeCardByIndex={removeCardByIndex}
          />
        )}
      </Flex>
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
      <TransferPack
        isOpen={isTransferPackModalOpen}
        onClose={handleCloseModal}
      />
    </Flex>
  );
};

export default Open;
