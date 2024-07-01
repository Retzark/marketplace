import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import useAppStore from "@/store/useAppStore";
import useTransactionStore from "@/store/useTransactionStore";
import OpenPack from "@/components/modals/OpenPack";
import TransferPack from "@/components/modals/TransferPack";
import useBalanceStore from "@/store/useBalanceStore";
import { CardFlipContainer } from "@/components";
import { BiTransferAlt } from "react-icons/bi";

const ONE = 1;
const SIX = 6;
const TWELVE = 12;

const Open = () => {
  const { settingsReady } = useAppStore((state) => ({
    settings: state.settings,
    settingsReady: state.settingsReady,
  }));
  const [isOpenPackModalOpen, setIsOpenPackModalOpen] = useState(false);
  const [isTransferPackModalOpen, setIsTransferPackModalOpen] = useState(false);
  const [showViewCardsModal, setShowViewCardsModal] = useState(false);
  const [selectedQty, setSelectedQty] = useState<number>(1);

  const { balance, isFetchingBalance, fetchBalance } = useBalanceStore();

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
    console.log(newCards);
    setShowViewCardsModal(true);
  };

  const handleViewCardsModalClose = () => {
    setShowViewCardsModal(false);
    setIsOpenPackModalOpen(false);
    fetchBalance();
  };

  const selectPackNumberBtnCss = {
    size: {
      base: "sm",
      sm: "sm",
      md: "md",
      lg: "md",
      xl: "md",
      "2xl": "md",
    },
    fontFamily: "CCElephantmenTall Regular",
    fontSize: {
      base: "12px",
      sm: "12px",
      md: "14px",
      lg: "16px",
      xl: "16px",
      "2xl": "16px",
    },
    fontWeight: "regular",
    color: "white",
    px: "10",
    borderRadius: "10px",
    _hover: {
      bgColor: "#12BFA0",
      color: "white",
    },
  };

  const mainBtnCss = {
    size: "lg",
    width: "100%",
    bg: "#15C1A2",
    color: "white",
    _hover: { bg: "#15C1A2d6" },
    borderRadius: "md",
    fontFamily: "CCElephantmenTall Regular",
    fontWeight: "400",
    fontSize: {
      base: "14px",
      sm: "14px",
      md: "18px",
      lg: "20px",
      xl: "20px",
      "2xl": "20px",
    },
    px: "2",
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
          <Box display="flex" flexDirection="column" alignItems="center">
            <Image
              src="/images/card_open.webp"
              alt="Alpha Pack"
              width="500px"
            />

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt="6"
              gap="4"
              flexDirection="column"
              p="4"
            >
              <Box
                display="flex"
                gap="4"
                className="justify-center"
                flexWrap="wrap"
              >
                <Button
                  {...selectPackNumberBtnCss}
                  bgColor={selectedQty === ONE ? "#12BFA0" : "#3A3F49"}
                  onClick={() => setSelectedQty(ONE)}
                >
                  1 PACK
                </Button>
                <Button
                  {...selectPackNumberBtnCss}
                  bgColor={selectedQty === SIX ? "#12BFA0" : "#3A3F49"}
                  onClick={() => setSelectedQty(SIX)}
                >
                  6 PACK
                </Button>
                <Button
                  {...selectPackNumberBtnCss}
                  bgColor={selectedQty === TWELVE ? "#12BFA0" : "#3A3F49"}
                  onClick={() => setSelectedQty(TWELVE)}
                >
                  12 PACK
                </Button>
                <Button
                  size={{
                    base: "sm",
                    sm: "sm",
                    md: "md",
                    lg: "md",
                    xl: "md",
                    "2xl": "md",
                  }}
                  fontFamily="CCElephantmenTall Regular"
                  fontWeight="regular"
                  bgColor="white"
                  px="5"
                  _hover={{
                    bgColor: "white",
                  }}
                  _disabled={{
                    bgColor: "white",
                  }}
                  borderRadius="10px"
                  isDisabled={true}
                >
                  <Text
                    color="#959595"
                    fontSize={{
                      base: "12px",
                      sm: "12px",
                      md: "14px",
                      lg: "16px",
                      xl: "16px",
                      "2xl": "16px",
                    }}
                  >
                    QTY:&nbsp;
                    <Text
                      as="span"
                      color="black"
                      fontSize={{
                        base: "12px",
                        sm: "12px",
                        md: "14px",
                        lg: "16px",
                        xl: "16px",
                        "2xl": "16px",
                      }}
                    >
                      {balance}
                    </Text>
                  </Text>
                </Button>
              </Box>
              <Box
                mt="2"
                width={{
                  base: "100%",
                  sm: "100%",
                  md: "100%",
                  lg: "100%",
                  xl: "100%",
                  "2xl": "100%",
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                gap="2"
                p="2"
              >
                <Button
                  {...mainBtnCss}
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
                  {isFetchingBalance && <Spinner />}
                </Button>
                <Button
                  {...mainBtnCss}
                  onClick={handleTransferPackClick}
                  isDisabled={isFetchingBalance}
                >
                  <Icon as={BiTransferAlt} />
                  &nbsp;TRANSFER PACK
                </Button>
              </Box>
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
        selectedQty={selectedQty}
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
