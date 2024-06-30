import { useState, useEffect } from "react";
import { Box, Button, Flex, Icon, Image, Spinner } from "@chakra-ui/react";
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

  const { balance, isFetchingBalance, fetchBalance } = useBalanceStore();

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
        alignItems="start"
        bgImage="url('/images/open-pack-image.webp')"
        bgSize="cover"
        bgPosition="center"
        height="93vh"
      >
        {!showViewCardsModal && (
          <Box display="flex" flexDirection="column">
            <Image src="/images/card_open.webp" alt="Alpha Pack" />

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt="6"
              gap="2"
              flexDirection="column"
              p="4"
            >
              <Button
                width={{
                  base: "100%",
                  sm: "100%",
                  md: "50%",
                  lg: "50%",
                  xl: "40%",
                  "2xl": "40%",
                }}
                bg="#15C1A2"
                color="white"
                _hover={{ bg: "#15C1A2d6" }}
                borderRadius="md"
                fontFamily="CCElephantmenTall Regular"
                fontWeight="400"
                fontSize={{
                  base: "14px",
                  sm: "14px",
                  md: "18px",
                  lg: "20px",
                  xl: "20px",
                  "2xl": "20px",
                }}
                px="8"
                py="6"
                onClick={handleOpenPackClick}
                isDisabled={isFetchingBalance}
              >
                <Image
                  src="/images/open-packs-icon.png"
                  objectFit="contain"
                  alt="HP ICON"
                  width={{
                    base: "12px",
                    sm: "14px",
                    md: "18px",
                    lg: "18px",
                    xl: "18px",
                    "2xl": "18px",
                  }}
                />
                &nbsp;OPEN PACK&nbsp;
                {isFetchingBalance ? <Spinner /> : <>(x{balance})</>}
              </Button>
              <Button
                width={{
                  base: "100%",
                  sm: "100%",
                  md: "50%",
                  lg: "50%",
                  xl: "40%",
                  "2xl": "40%",
                }}
                bg="#15C1A2"
                color="white"
                _hover={{ bg: "#15C1A2d6" }}
                borderRadius="md"
                fontFamily="CCElephantmenTall Regular"
                fontWeight="400"
                fontSize={{
                  base: "14px",
                  sm: "14px",
                  md: "18px",
                  lg: "20px",
                  xl: "20px",
                  "2xl": "20px",
                }}
                px="8"
                py="6"
                onClick={handleTransferPackClick}
                isDisabled={isFetchingBalance}
              >
                <Icon as={BiTransferAlt} />
                &nbsp;TRANSFER PACK
              </Button>
            </Box>
          </Box>
        )}
      </Flex>
      {showViewCardsModal && (
        <CardFlipContainer
          show={showViewCardsModal}
          handleClose={handleViewCardsModalClose}
          cards={cards}
          removeCardByIndex={removeCardByIndex}
        />
      )}
      <OpenPack
        isOpen={isOpenPackModalOpen}
        onClose={handleCloseModal}
        onCardsOpened={handleCardsOpened}
        setIsOpenPackModalOpen={setIsOpenPackModalOpen}
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
