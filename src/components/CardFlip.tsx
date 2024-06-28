import { useState, useCallback, useEffect, FC, useRef, useMemo } from "react";
import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { fetchCardsData } from "@/utils/fetchCardData";

interface Card {
  type: string;
  edition: string;
  foil: number;
  image: string;
  rarity: string;
}

interface FetchedCard {
  ID: number;
  NAME: string;
  HP: number;
  ATK: number;
  SPD: number;
  EGY: number;
  RARITY: string;
}

interface ViewCardsProps {
  show: boolean;
  handleClose: () => void;
  cards: Card[];
  removeCardByIndex: (index: number) => void;
}

const CardPackOpener: FC<ViewCardsProps> = ({
  show,
  handleClose,
  cards = [],
}) => {
  const [isFlipped, setIsFlipped] = useState<boolean[]>(
    new Array(cards.length).fill(false)
  );
  const [shakeCompleted, setShakeCompleted] = useState<boolean[]>(
    new Array(cards.length).fill(false)
  );
  const [showCircle, setShowCircle] = useState<boolean[]>(
    new Array(cards.length).fill(false)
  );
  const [showContrast, setShowContrast] = useState<boolean[]>(
    new Array(cards.length).fill(false)
  );
  const [hasBeenFlipped, setHasBeenFlipped] = useState<boolean[]>(
    Array(cards.length).fill(false)
  );
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [fetchedCards, setFetchedCards] = useState<FetchedCard[]>([]);

  useEffect(() => {
    setIsFlipped(Array(cards.length).fill(false));
    setHasBeenFlipped(Array(cards.length).fill(false));
    setShakeCompleted(Array(cards.length).fill(false));
    setShowContrast(Array(cards.length).fill(false));
    setShowCircle(Array(cards.length).fill(false));
  }, [cards]);

  useEffect(() => {
    setIsBusy(false);
    const fetchData = async () => {
      try {
        const data = await fetchCardsData();
        setFetchedCards(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const cardList = useMemo(() => {
    return cards.map((card) => {
      const matchedItem = fetchedCards.find((base) => base.ID === +card.type);
      if (matchedItem) {
        return {
          ...card,
          rarity: matchedItem.RARITY,
        };
      } else {
        return {
          ...card,
          rarity: "UNKNOWN", // Default value if no match found
        };
      }
    });
  }, [cards, fetchedCards]);

  const handleOpenPack = () => {
    cardList.map((card, index) => {
      const { rarity } = card;
      setIsBusy(true);
      setTimeout(() => handleCardAnimation(index, rarity), (index + 1) * 1000);
    });
  };

  const handleCardAnimation = (index: number, rarity: string) => {
    cardRefs.current[index]?.scrollIntoView({ behavior: "smooth" });

    if (rarity === "LEGENDARY") {
      setShakeCompleted((prev) => {
        const updated = [...prev];
        updated[index] = true;
        return updated;
      });

      setTimeout(() => flipCard(index, rarity), 500);
    } else {
      flipCard(index, rarity);
    }
  };

  const flipCard = (index: number, rarity: string) => {
    setIsFlipped((prevFlips) => {
      const flips = [...prevFlips];
      flips[index] = true;
      return flips;
    });

    if (!hasBeenFlipped[index]) {
      setHasBeenFlipped((prevHasBeenFlipped) => {
        const newHasBeenFlipped = [...prevHasBeenFlipped];
        newHasBeenFlipped[index] = true;
        return newHasBeenFlipped;
      });
    }

    if (["EPIC", "LEGENDARY"].includes(rarity)) {
      showEffects(index);
    }
  };

  const showEffects = (index: number) => {
    setShowCircle((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });

    setTimeout(() => {
      setShowCircle((prev) => {
        const updated = [...prev];
        updated[index] = false;
        return updated;
      });
    }, 1000);

    setShowContrast((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });

    setTimeout(() => {
      setShowContrast((prev) => {
        const updated = [...prev];
        updated[index] = false;
        return updated;
      });
    }, 1000);
  };

  const handleCardClick = (index: number, rarity: string) => {
    if (!isFlipped[index]) {
      const card = cards[index];
      handleCardAnimation(index, rarity);
    }
  };

  const getCardAnimation = (index: number, rarity: string) => {
    if (shakeCompleted[index] && !isFlipped[index] && rarity === "LEGENDARY") {
      return { animation: "shake 0.4s" };
    }

    if (!isFlipped[index]) {
      return {};
    }

    const animations: { [key: string]: any } = {
      RARE: { boxShadow: "0 0 20px #B5B5B5", transform: "rotateY(180deg)" },
      EPIC: {
        boxShadow: "0 0 20px #FF9104",
        transition: "transform 0.2s",
        transform: "rotateY(180deg)",
      },
      LEGENDARY: {
        boxShadow: "1px 1px 108px 0px #FF4D4D",
        transition: "transform 0.6s",
        transform: "rotateY(180deg)",
        animation: "glow 1s infinite alternate;",
      },
      default: { boxShadow: "", transform: "rotateY(180deg)" },
    };

    if (animations[rarity]) {
      return animations[rarity];
    } else {
      return animations.default;
    }
  };

  const mappedCards = cardList.map((card, index) => {
    const { rarity } = card;
    return (
      <Box
        ref={(el) => (cardRefs.current[index] = el)}
        position="relative"
        width={{
          base: "109px",
          xxs: "109px",
          xs: "169px",
          sm: "162px",
          md: "148px",
          lg: "206px",
          xl: "214px",
          "2xl": "214px",
        }}
        height={{
          base: "155px",
          xxs: "155px",
          xs: "230px",
          sm: "230px",
          md: "205px",
          lg: "288px",
          xl: "300px",
          "2xl": "300px",
        }}
        sx={{ perspective: "1000px" }}
        onClick={() => handleCardClick(index, rarity)}
        _hover={{
          transform: "scale(1.1)",
          cursor: "pointer",
          transition: "transform 0.4s",
        }}
        transition="transform 0.4s"
        borderRadius="7px"
        pt="6"
      >
        <Box
          position="absolute"
          width="100%"
          height="100%"
          bg="transparent"
          borderRadius="7px"
          sx={{
            transformStyle: "preserve-3d",
            transition: "transform 0.1s",
            transform: isFlipped[index] ? "rotateY(180deg)" : "rotateY(0)",
            ...getCardAnimation(index, rarity),
          }}
          _hover={{
            boxShadow:
              rarity === "LEGENDARY"
                ? "0 0 20px #FF4D4D"
                : rarity === "EPIC"
                  ? "0 0 20px #FF9104"
                  : rarity === "RARE"
                    ? "0 0 20px #B5B5B5"
                    : isFlipped[index]
                      ? "0 0 65px -37px white"
                      : "",
            transition: "transform 0.4s",
          }}
        >
          <Box
            position="absolute"
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="7px"
            sx={{ backgroundColor: "transparent" }}
          >
            <Image
              src="./images/card-back.png"
              alt="Back"
              objectFit="cover"
              width="100%"
              height="100%"
              borderRadius="7px"
            />
          </Box>
          <Box
            className={card.foil === 1 ? "shine" : ""}
            position="absolute"
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            transform="rotateY(180deg)"
            borderRadius="7px"
            sx={{
              backfaceVisibility: "hidden",
              visibility: isFlipped[index] ? "visible" : "hidden",
              backgroundColor: "transparent",
            }}
          >
            <Image
              src={card.image}
              alt={card.image}
              objectFit="cover"
              width="100%"
              height="100%"
              borderRadius="7px"
              className={showContrast[index] ? "contrast" : ""}
            />
          </Box>
        </Box>
        {showCircle[index] && (
          <Box
            className="circle"
            sx={{
              top: "40%",
              left: "40%",
              transform: "translate(-50%, -50%)",
              background:
                rarity === "LEGENDARY"
                  ? "rgba(255, 77, 77, 0.6)"
                  : rarity === "EPIC"
                    ? "rgba(255, 145, 4, 0.6)"
                    : "rgba(255, 77, 77, 0.6)",
            }}
          />
        )}
      </Box>
    );
  });

  return (
    <>
      <Global
        styles={`
          @keyframes shake {
            0% { transform: translate(1px, 1px) rotate(0deg); }
            10% { transform: translate(-1px, -7px) rotate(-1deg); }
            20% { transform: translate(-7px, 0px) rotate(1deg); }
            30% { transform: translate(7px, 2px) rotate(0deg); }
            40% { transform: translate(1px, -7px) rotate(1deg); }
            50% { transform: translate(-1px, 7px) rotate(-1deg); }
            60% { transform: translate(-7px, 1px) rotate(0deg); }
            70% { transform: translate(7px, 1px) rotate(-1deg); }
            80% { transform: translate(-1px, -1px) rotate(1deg); }
            90% { transform: translate(1px, 7px) rotate(0deg); }
            100% { transform: translate(1px, -7px) rotate(-1deg); }
          }

          @keyframes expandCircle {
            100% { opacity: 0; transform: scale(6); }
          }
          
          @keyframes glow {
            from {
              box-shadow: 0 0 80px -10px #FF4D4D;
            }
            to {
              box-shadow: 0 0 80px 10px #FF4D4D;
            }
          }
          
          @keyframes shine {
            0% {
              background-position: -200% center;
            }
            100% {
              background-position: 200% center;
            }
          }

          .shine {
            background: linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%);
            background-size: 200% 100%;
            animation: shine 2s infinite;
          }

          .circle {
            position: absolute;
            width: 80%;
            height: 55%;
            border-radius: 50%;
            animation: expandCircle 1.5s ease-out;
            z-index: 1;
          }

          .contrast {
            filter: brightness(200%);
            transition: filter 1.5s ease-in-out;
          }
        `}
      />
      <Box py="10px" p="0px !important" position="absolute" width="100%">
        {cardList.length ? (
          <Box
            className="flex flex-wrap justify-center"
            gap="6"
            top="40px"
            left="1px"
            overflowY="auto"
            maxH="80vh"
            p={{
              base: "2",
              sm: "2",
              md: "5",
              lg: "10",
              xl: "10",
              "2xl": "10",
            }}
            pb="150px !important"
          >
            {mappedCards}
          </Box>
        ) : (
          <p className="text-center text-white">No cards to display</p>
        )}
        <Box
          p="4"
          bgColor="#000000cf"
          display="flex"
          justifyContent="center"
          mt="10"
          flexDirection="column"
          gap="2"
          alignItems="center"
          position="fixed"
          w="100%"
          bottom="0"
          left="0"
        >
          <Button
            display="flex"
            alignItems="center"
            bg="#15C1A2"
            color="white"
            shadow="md"
            borderColor="#1C465B"
            borderRadius="md"
            fontFamily="CCElephantmenTall Regular"
            fontWeight="400"
            width={{
              base: "100%",
              xs: "100%",
              sm: "30%",
              md: "30%",
              lg: "25%",
              xl: "25%",
              "2xl": "25%",
            }}
            gap="2"
            fontSize={{
              base: "14px",
              xs: "14px",
              sm: "14px",
              md: "20px",
              lg: "25px",
              xl: "25px",
              "2xl": "25px",
            }}
            py="7"
            _hover={{ bg: "#1aa188", transform: "scale(1.06)" }}
            _disabled={{
              bgColor: "#1aa188",
              cursor: "not-allowed",
              transform: "scale(1)",
            }}
            isDisabled={isBusy || isFlipped.includes(true)}
            onClick={handleOpenPack}
          >
            <Image
              src="/images/open-packs-icon.png"
              objectFit="contain"
              alt="HP ICON"
              width="25px"
              height="25px"
            />
            OPEN ALL
          </Button>
          <Button
            display="flex"
            alignItems="center"
            bg="#3A3F49"
            color="white"
            size="md"
            shadow="md"
            borderColor="#1C465B"
            borderRadius="md"
            fontFamily="CCElephantmenTall Regular"
            fontWeight="400"
            width={{
              base: "100%",
              xs: "100%",
              sm: "30%",
              md: "30%",
              lg: "25%",
              xl: "25%",
              "2xl": "25%",
            }}
            gap="2"
            fontSize={{
              base: "14px",
              xs: "14px",
              sm: "14px",
              md: "20px",
              lg: "25px",
              xl: "25px",
              "2xl": "25px",
            }}
            py="6"
            _hover={{ bg: "#525865", transform: "scale(1.04)" }}
            onClick={handleClose}
          >
            <Image
              src="/images/go-back-icon.png"
              objectFit="contain"
              alt="HP ICON"
              width="22px"
              height="22px"
            />
            GO BACK
          </Button>
        </Box>
        {/* <div className="bg-[#1A1A1A] p-5 rounded-lg shadow-xl w-full h-full mx-auto overflow-hidden z-10 flex flex-col">
          <div className="flex-grow overflow-y-auto">

          </div>
        </div> */}
      </Box>
    </>
  );
};

export default CardPackOpener;
