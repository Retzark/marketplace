import React from "react";
import { Card } from "@/types";
import { Box, Divider, Flex, Grid, Image, Text } from "@chakra-ui/react";
import useAppStore from "@/store/useAppStore";

interface StatsAndMovesetProps {
  card: Card;
}

const badgeStyles = {
  hp: "bg-gray-700 text-white",
  atk: "bg-gray-700 text-white",
  spd: "bg-gray-700 text-white",
  egy: "bg-gray-700 text-white",
  basicAttack: "bg-gray-700 text-white",
  ability: "bg-gray-700 text-white",
};

const StatsAndMoveset: React.FC<StatsAndMovesetProps> = ({ card }) => {
  const { settings } = useAppStore((state) => ({
    settings: state.settings,
  }));
  return (
    <Box bgColor="#282C34" borderRadius="lg" p="6">
      <Box display="flex" gap="8" alignItems="start">
        <Box>
          <Image
            borderRadius="7px"
            src={`https://cdn.tribaldex.com/packmanager/${settings.nft_symbol}/${card.grouping.edition}_${card.grouping.type}_${card.grouping.foil}.png`}
            objectFit="contain"
            alt="Card Image"
            width="100%"
            height="100%"
          />
        </Box>

        <Box>
          <Text
            mt="-6px"
            fontFamily="Poppins"
            fontSize="22px"
            fontWeight="bold"
            color="white"
          >
            STATS AND MOVESET
          </Text>
          <Flex
            mt="30px"
            flexWrap="wrap"
            gap={{
              base: "4",
              sm: "4",
              md: "4",
              lg: "4",
              xl: "4",
              "2xl": "4",
            }}
            mb="4"
          >
            <Box
              bgColor="#3A3F49"
              px="4"
              py="2"
              borderRadius="10px"
              display="flex"
              gap="2"
              width="fit-content"
              alignItems="center"
            >
              <Image
                src="/images/hp_icon.svg"
                objectFit="contain"
                alt="HP ICON"
                width="16px"
                height="16px"
              />
              <Text
                fontFamily="CCElephantmenTall Regular"
                fontSize="16px"
                color="white"
              >
                HP: {card.hp}
              </Text>
            </Box>
            <Box
              bgColor="#3A3F49"
              px="4"
              py="2"
              borderRadius="10px"
              display="flex"
              gap="2"
              width="fit-content"
              alignItems="center"
            >
              <Image
                src="/images/atk_icon.svg"
                objectFit="contain"
                alt="ATK ICON"
                width="16px"
                height="16px"
              />
              <Text
                fontFamily="CCElephantmenTall Regular"
                fontSize="16px"
                color="white"
              >
                ATK: {card.atk}
              </Text>
            </Box>
            <Box
              bgColor="#3A3F49"
              px="4"
              py="2"
              borderRadius="10px"
              display="flex"
              gap="2"
              width="fit-content"
              alignItems="center"
            >
              <Image
                src="/images/spd_icon.svg"
                objectFit="contain"
                alt="SPD ICON"
                width="16px"
                height="16px"
              />
              <Text
                fontFamily="CCElephantmenTall Regular"
                fontSize="16px"
                color="white"
              >
                SPD: {card.spd}
              </Text>
            </Box>
            <Box
              bgColor="#3A3F49"
              px="4"
              py="2"
              borderRadius="10px"
              display="flex"
              gap="2"
              width="fit-content"
              alignItems="center"
            >
              <Image
                src="/images/egy_icon.svg"
                objectFit="contain"
                alt="EGY ICON"
                width="16px"
                height="16px"
              />
              <Text
                fontFamily="CCElephantmenTall Regular"
                fontSize="16px"
                color="white"
              >
                EGY: {card.egy}
              </Text>
            </Box>
            <Box
              bgColor="#0031DD"
              px="4"
              py="2"
              borderRadius="10px"
              display="flex"
              gap="2"
              width="fit-content"
              alignItems="center"
            >
              <Image
                src="/images/trn-icon.png"
                objectFit="contain"
                alt="TRN ICON"
                width="16px"
                height="16px"
              />
              <Text
                fontFamily="CCElephantmenTall Regular"
                fontSize="16px"
                color="white"
              >
                TRN: 5
              </Text>
            </Box>
          </Flex>
          <Divider borderColor="#3A3F49" />
          <Box mt="4">
            <Box>
              <Box
                bgColor="#3A3F49"
                px="4"
                py="2"
                borderRadius="10px"
                display="flex"
                gap="2"
                width="fit-content"
                alignItems="center"
              >
                <Image
                  src="/images/basic_attack_icon.svg"
                  objectFit="contain"
                  alt="Basic Attack Icon"
                  width="18px"
                  height="18px"
                />
                <Text
                  fontFamily="CCElephantmenTall Regular"
                  fontSize="18px"
                  color="white"
                >
                  BASIC ATTACK
                </Text>
              </Box>
              <Box mt="4">
                <Text
                  fontFamily="Poppins"
                  fontWeight="400"
                  color="white"
                  fontSize="14px"
                >
                  Deal 1-4 damage to an enemy unit.
                </Text>
              </Box>
            </Box>

            <Box mt="4">
              <Box
                bgColor="#3A3F49"
                px="4"
                py="2"
                borderRadius="10px"
                display="flex"
                gap="2"
                width="fit-content"
                alignItems="center"
              >
                <Image
                  src="/images/ability_icon.svg"
                  objectFit="contain"
                  alt="Ability Icon"
                  width="18px"
                  height="18px"
                />
                <Text
                  fontFamily="CCElephantmenTall Regular"
                  fontSize="18px"
                  color="white"
                >
                  ABILITY
                </Text>
              </Box>
              <Box mt="4">
                <Text
                  fontFamily="Poppins"
                  fontWeight="400"
                  color="white"
                  fontSize="14px"
                >
                  Deal 5-7 damage to an enemy unit, then enter a stance which
                  grants evade for 2 turns. After successfully evading an
                  attack, disables 2 random enemies for 1 turn.
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StatsAndMoveset;
