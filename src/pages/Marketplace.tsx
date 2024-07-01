import NFTCardsList from "@/components/NFTCardsList";
import { useState } from "react";
import { FaFilter, FaHeart } from "react-icons/fa6";
import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";

const Marketplace = () => {
  const [selectedFaction, setSelectedFaction] = useState("");
  const [selectedRarity, setSelectedRarity] = useState("");
  const [selectedGameStats, setSelectedGameStats] = useState("");

  const buttonStyle = {
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: "14px",
    bgColor: "transparent",
    color: "white",
    border: "0.5px solid white",
    borderColor: "#1f2937",
    _hover: { bgColor: "transparent", borderColor: "#4e5d73" },
  };

  return (
    <div>
      <Box>
        {/*<Box*/}
        {/*  position="relative"*/}
        {/*  width="full"*/}
        {/*  height={{*/}
        {/*    base: "145px",*/}
        {/*    sm: "183px",*/}
        {/*    md: "255px",*/}
        {/*    lg: "350px",*/}
        {/*    xl: "520px",*/}
        {/*    "2xl": "520px",*/}
        {/*  }}*/}
        {/*  overflow="hidden"*/}
        {/*>*/}
        {/*  <Image*/}
        {/*    src="./images/marketplace-hero.webp" // Replace with your image path*/}
        {/*    alt="Blended Image"*/}
        {/*    objectFit="cover"*/}
        {/*    width="full"*/}
        {/*    height={{*/}
        {/*      base: "17vh",*/}
        {/*      sm: "22vh",*/}
        {/*      md: "40vh",*/}
        {/*      lg: "54vh",*/}
        {/*      xl: "76vh",*/}
        {/*      "2xl": "76vh",*/}
        {/*    }}*/}
        {/*  />*/}
        {/*  <Box*/}
        {/*    position="absolute"*/}
        {/*    bottom="0"*/}
        {/*    left="0"*/}
        {/*    width="full"*/}
        {/*    height="16%"*/}
        {/*    bgGradient={`linear(to-b, rgba(0,0,0,0), #090909)`}*/}
        {/*  />*/}
        {/*  <Flex*/}
        {/*    position="absolute"*/}
        {/*    top="0"*/}
        {/*    left="0"*/}
        {/*    width="full"*/}
        {/*    height="full"*/}
        {/*    align="center"*/}
        {/*    justify="center"*/}
        {/*    pointerEvents="none" // This ensures the text doesn't interfere with any click events*/}
        {/*  >*/}
        {/*    <Text*/}
        {/*      fontWeight="regular"*/}
        {/*      color="white"*/}
        {/*      textAlign="center"*/}
        {/*      fontSize={{*/}
        {/*        base: "30px",*/}
        {/*        sm: "30px",*/}
        {/*        md: "60px",*/}
        {/*        lg: "80px",*/}
        {/*        xl: "100px",*/}
        {/*        "2xl": "100px",*/}
        {/*      }}*/}
        {/*      className="font-elephantmen"*/}
        {/*    >*/}
        {/*      THE MARKETPLACE*/}
        {/*    </Text>*/}
        {/*  </Flex>*/}
        {/*</Box>*/}
        {/*<Flex*/}
        {/*  px={{ base: "10px", sm: "20px", md: "30px", lg: "40px" }}*/}
        {/*  flexWrap="wrap"*/}
        {/*  justifyContent="start"*/}
        {/*  mt="2"*/}
        {/*  mb={{*/}
        {/*    base: "2px",*/}
        {/*    sm: "2px",*/}
        {/*    md: "2px",*/}
        {/*    lg: "2",*/}
        {/*    xl: "2",*/}
        {/*    "2xl": "2",*/}
        {/*  }}*/}
        {/*  gap="2"*/}
        {/*>*/}
        {/*  <Button {...buttonStyle}>All Filters</Button>*/}
        {/*  <Button {...buttonStyle}>*/}
        {/*    <Icon as={FaFilter} />*/}
        {/*  </Button>*/}
        {/*  <Button*/}
        {/*    {...buttonStyle}*/}
        {/*    onClick={() => setSelectedFaction("faction1")}*/}
        {/*  >*/}
        {/*    Faction*/}
        {/*  </Button>*/}
        {/*  <Button {...buttonStyle} onClick={() => setSelectedRarity("rarity1")}>*/}
        {/*    Rarity*/}
        {/*  </Button>*/}
        {/*  <Button*/}
        {/*    {...buttonStyle}*/}
        {/*    onClick={() => setSelectedGameStats("stat1")}*/}
        {/*  >*/}
        {/*    Game Stats*/}
        {/*  </Button>*/}
        {/*  <Button {...buttonStyle}>*/}
        {/*    <Icon as={FaHeart} />*/}
        {/*    &nbsp;Favorites*/}
        {/*  </Button>*/}
        {/*</Flex>*/}
        <NFTCardsList
          selectedFaction={selectedFaction}
          selectedRarity={selectedRarity}
          selectedGameStats={selectedGameStats}
        />
      </Box>
    </div>
  );
};

export default Marketplace;
