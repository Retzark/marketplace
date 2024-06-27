import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/types/Card";
import { Box, Image, Text } from "@chakra-ui/react";

interface CardItemProps {
  card: Card;
  count: number;
  settings: any;
}

const CardItem: React.FC<CardItemProps> = ({ card, count, settings }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/collection/card/${card.type}`, { state: { card } });
  };

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <>
      <Fragment key={card._id}>
        <Box
          bgColor="#3E3B3B"
          onClick={handleClick}
          borderRadius="10px"
          overflow="hidden"
          cursor="pointer"
          onMouseEnter={() => handleMouseEnter(count)}
          onMouseLeave={() => handleMouseLeave()}
          transition="transform 0.4s"
          transform={hoveredIndex === count ? "scale(1.05)" : "scale(1)"}
          boxShadow={hoveredIndex === count ? "0 0 60px -20px green" : ""}
        >
          <Box position="relative">
            <Image
              src={`https://cdn.tribaldex.com/packmanager/${settings.nft_symbol}/${card.edition}_${card.type}_${card.foil}.png`}
              objectFit="cover"
              alt={card.name}
              borderTopRightRadius="7px"
              borderTopLeftRadius="7px"
            />
            <Box
              display="flex"
              position="absolute"
              top="-4px"
              left="9px"
              mt={2}
              justifyContent="end"
              alignItems="end"
              width={{
                base: "93%",
                xxs: "93%",
                xs: "90%",
                sm: "92%",
                md: "92%",
                lg: "94%",
                xl: "94%",
                "2xl": "94%",
              }}
            >
              <Box
                display="flex"
                justifyContent="center"
                py="1"
                px="4"
                bgColor="#005BE4"
                borderRadius="10px"
                alignItems="center"
              >
                <Text
                  display="flex"
                  alignItems="center"
                  fontFamily="CCElephantmenTall Regular"
                  justifyContent="center"
                  color="white"
                  fontSize={{
                    base: "10px",
                    xxs: "10px",
                    xs: "12px",
                    sm: "10px",
                    md: "10px",
                    lg: "12px",
                    xl: "16px",
                    "2xl": "16px",
                  }}
                  letterSpacing="0.5px"
                >
                  {count}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Fragment>
      {/* <div
        onClick={handleClick}
        className="card bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md relative cursor-pointer"
      >
        <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs py-1 px-2 rounded-bl-lg rounded-tr-lg">
          {count}
        </div>
        <img
          src={`https://cdn.tribaldex.com/packmanager/${settings.nft_symbol}/${card.edition}_${card.type}_${card.foil}.png`}
          alt={card.name}
          className="w-full h-full object-cover"
        />
        <div className="p-3">
          <h3 className="text-md font-semibold">{card.name}</h3>
          <p className="text-sm mt-1">{card.description}</p>
        </div>
      </div> */}
    </>
  );
};

export default CardItem;
