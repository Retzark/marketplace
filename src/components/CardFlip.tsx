import { useState, useCallback, useEffect, FC } from "react";
import { motion } from "framer-motion";
import { Box, Button, Flex, Grid, Image } from "@chakra-ui/react";
import { Global } from "@emotion/react";

// Define the Card interface
interface Card {
  id: number;
  name: string;
  imageUrl: string;
  rarity: string;
}

// Sample cards data (replace with your actual card data)
const sampleCards: Card[] = [
  {
    id: 1,
    name: "Card 1",
    imageUrl: "./images/YUE-BASIC-1.png",
    rarity: "Common",
  },
  {
    id: 5,
    name: "Card 2",
    imageUrl: "./images/YUE-BASIC-1.png",
    rarity: "Rare",
  },
  {
    id: 8,
    name: "Card 3",
    imageUrl: "./images/YUE-BASIC-1.png",
    rarity: "Legendary",
  },
  {
    id: 4,
    name: "Card 4",
    imageUrl: "./images/YUE-BASIC-1.png",
    rarity: "Common",
  },
  {
    id: 11,
    name: "Card 5",
    imageUrl: "./images/YUE-BASIC-1.png",
    rarity: "Epic",
  },
  {
    id: 23,
    name: "Card 6",
    imageUrl: "./images/YUE-BASIC-1.png",
    rarity: "Common",
  },
  {
    id: 34,
    name: "Card 7",
    imageUrl: "./images/YUE-BASIC-1.png",
    rarity: "Common",
  },
];

const CardPackOpener: FC = () => {
  const [isFlipped, setIsFlipped] = useState<boolean[]>(
    new Array(sampleCards.length).fill(false)
  );
  const [shakeCompleted, setShakeCompleted] = useState<boolean[]>(
    new Array(sampleCards.length).fill(false)
  );
  const [showCircle, setShowCircle] = useState<boolean[]>(
    new Array(sampleCards.length).fill(false)
  );
  const [showContrast, setShowContrast] = useState<boolean[]>(
    new Array(sampleCards.length).fill(false)
  );

  const handleOpenPack = useCallback(() => {
    sampleCards.forEach((card, index) => {
      setTimeout(() => handleCardAnimation(card, index), (index + 1) * 1000);
    });
  }, []);

  const [columns, setColumns] = useState(2);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width >= 1536) setColumns(5);
      else if (width >= 1200) setColumns(5);
      else if (width >= 960) setColumns(4);
      else if (width >= 768) setColumns(3);
      else if (width >= 568) setColumns(2);
      else if (width >= 511) setColumns(2);
      else if (width >= 320) setColumns(2);
      else setColumns(2);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const handleCardAnimation = (card: Card, index: number) => {
    if (card.rarity === "Legendary") {
      setShakeCompleted((prev) => {
        const updated = [...prev];
        updated[index] = true;
        return updated;
      });

      setTimeout(() => flipCard(card, index), 500);
    } else {
      flipCard(card, index);
    }
  };

  const flipCard = (card: Card, index: number) => {
    setIsFlipped((prevFlips) => {
      const flips = [...prevFlips];
      flips[index] = true;
      return flips;
    });

    if (["Epic", "Legendary"].includes(card.rarity)) {
      showEffects(card, index);
    }
  };

  const showEffects = (card: Card, index: number) => {
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

  const handleCardClick = (index: number) => {
    if (!isFlipped[index]) {
      const card = sampleCards[index];
      handleCardAnimation(card, index);
    }
  };

  const getCardAnimation = (rarity: string, index: number) => {
    if (shakeCompleted[index] && !isFlipped[index] && rarity === "Legendary") {
      return { animation: "shake 0.4s" };
    }

    if (!isFlipped[index]) {
      return {};
    }

    const animations: { [key: string]: any } = {
      Rare: { boxShadow: "0 0 20px #B5B5B5", transform: "rotateY(180deg)" },
      Epic: {
        boxShadow: "0 0 20px #FF9104",
        transition: "transform 0.2s",
        transform: "rotateY(180deg)",
      },
      Legendary: {
        boxShadow: "0 0 20px #FF4D4D",
        transition: "transform 0.6s",
        transform: "rotateY(180deg)",
      },
      default: { boxShadow: "0 0 20px #DA9466", transform: "rotateY(180deg)" },
    };

    if (animations[rarity]) {
      return animations[rarity];
    } else {
      return animations.default;
    }
  };

  const renderCards = () => {
    const rows = [];
    const numRows = Math.ceil(sampleCards.length / columns);

    for (let i = 0; i < numRows; i++) {
      const startIndex = i * columns;
      const endIndex = startIndex + columns;
      const rowCards = sampleCards.slice(startIndex, endIndex);

      rows.push(
        <div
          key={i}
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          {rowCards.map((card, index) => {
            const actualIndex = startIndex + index;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flex: 1,
                  maxWidth: `${100 / columns}%`,
                  boxSizing: "border-box",
                  padding: "0.5rem",
                }}
              >
                <Box
                  position="relative"
                  width={{
                    base: "130px",
                    xxs: "130px",
                    xs: "169px",
                    sm: "162px",
                    md: "148px",
                    lg: "206px",
                    xl: "214px",
                    "2xl": "214px",
                  }}
                  height={{
                    base: "182px",
                    xxs: "182px",
                    xs: "230px",
                    sm: "230px",
                    md: "205px",
                    lg: "288px",
                    xl: "300px",
                    "2xl": "300px",
                  }}
                  sx={{ perspective: "1000px" }}
                  onClick={() => handleCardClick(actualIndex)}
                  _hover={{
                    transform: "scale(1.1)",
                    cursor: "pointer",
                    transition: "transform 0.4s",
                  }}
                  boxShadow={
                    card.rarity === "Legendary"
                      ? "0 0 20px #FF4D4D"
                      : card.rarity === "Epic"
                        ? "0 0 20px #FF9104"
                        : ""
                  }
                  transition="transform 0.4s"
                  borderRadius="7px"
                >
                  <Box
                    position="absolute"
                    width="100%"
                    height="100%"
                    bg="transparent"
                    borderRadius="7px"
                    boxShadow="md"
                    sx={{
                      transformStyle: "preserve-3d",
                      transition: "transform 0.1s",
                      transform: isFlipped[actualIndex]
                        ? "rotateY(180deg)"
                        : "rotateY(0)",
                      ...getCardAnimation(card.rarity, actualIndex),
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
                        visibility: isFlipped[actualIndex]
                          ? "visible"
                          : "hidden",
                        backgroundColor: "transparent",
                      }}
                    >
                      <Image
                        src={card.imageUrl}
                        alt={card.name}
                        objectFit="cover"
                        width="100%"
                        height="100%"
                        borderRadius="7px"
                        className={showContrast[actualIndex] ? "contrast" : ""}
                      />
                    </Box>
                  </Box>
                  {showCircle[actualIndex] && (
                    <Box
                      className="circle"
                      sx={{
                        top: "40%",
                        left: "40%",
                        transform: "translate(-50%, -50%)",
                        background:
                          card.rarity === "Legendary"
                            ? "rgba(255, 77, 77, 0.6)"
                            : card.rarity === "Epic"
                              ? "rgba(255, 145, 4, 0.6)"
                              : "rgba(255, 77, 77, 0.6)",
                      }}
                    />
                  )}
                </Box>
              </motion.div>
            );
          })}
        </div>
      );
    }

    return rows;
  };

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
      <Box px={{ base: "10px", sm: "20px", md: "30px", lg: "40px" }} py="20px">
        <Flex justifyContent="center" mb="10">
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
            onClick={handleOpenPack}
          >
            OPEN ALL
          </Button>
        </Flex>
        <Grid
          mt="4"
          gap={{
            base: "2",
            sm: "2",
            md: "8",
            lg: "10",
            xl: "10",
            "2xl": "10",
          }}
        >
          {renderCards()}
        </Grid>
      </Box>
    </>
  );
};

export default CardPackOpener;
