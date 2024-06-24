import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/types/Card";
import useFetchNFTMarketData from "@/hooks/useFetchNFTMarketData";
import Loading from "@/components/Loading";
import { Box, Flex, Grid, Icon, Image, Text } from "@chakra-ui/react";
import { RiFireFill } from "react-icons/ri";
import useAppStore from "@/store/useAppStore";

interface NFTCardsListProps {
  selectedFaction?: string;
  selectedRarity?: string;
  selectedGameStats?: string;
}

const randomNames = ["Yue", "Yax", "Brix", "Krizator", "Nivlef"];

const NFTCardsList: React.FC<NFTCardsListProps> = ({
  selectedFaction = "",
  selectedRarity = "",
  selectedGameStats = "",
}) => {
  const { data, isLoading, error } = useFetchNFTMarketData();
  const [filteredData, setFilteredData] = useState<Card[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Set the number of items per page

  const navigate = useNavigate();
  const { settings } = useAppStore((state) => ({
    settings: state.settings,
  }));
  useEffect(() => {
    if (data) {
      let filtered = data.filter((item: Card) => item.count > 0); // Filter out cards with count zero

      if (selectedFilter) {
        filtered = filtered.filter(
          (item: Card) => item.grouping.foil === selectedFilter,
        );
      }
      if (selectedFaction) {
        filtered = filtered.filter(
          (item: Card) => item.grouping.faction === selectedFaction,
        );
      }
      if (selectedRarity) {
        filtered = filtered.filter(
          (item: Card) => item.grouping.rarity === selectedRarity,
        );
      }
      if (selectedGameStats) {
        filtered = filtered.filter(
          (item: Card) => item.grouping.gameStats === selectedGameStats,
        );
      }

      setFilteredData(filtered);
    }
  }, [
    data,
    selectedFilter,
    selectedFaction,
    selectedRarity,
    selectedGameStats,
  ]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
    setCurrentPage(1); // Reset to the first page when filter changes
  };

  const handleClick = (card: Card) => {
    navigate(`/card/${card._id}`, { state: { card } });
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Calculate the indices for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loading />
      </div>
    );
  }

  const badges = {
    common: {
      icon: "./images/common-badge.svg",
    },
    rare: {
      icon: "./images/rare-badge.svg",
    },
    epic: {
      icon: "./images/epic-badge.svg",
    },
    legendary: {
      icon: "./images/legendary-badge.svg",
    },
  };

  if (error) return <div>Error: {error.message}</div>;

  return (
    <Box>
      <Box px={{ base: "10px", sm: "20px", md: "30px", lg: "40px" }} py="20px">
        <Text
          fontFamily="Poppins"
          fontWeight="bold"
          fontSize={{
            base: "12px",
            sm: "12px",
            md: "14px",
            lg: "16px",
            xl: "16px",
            "2xl": "16px",
          }}
          color="white"
        >
          1,578,929 Total Cards
        </Text>
      </Box>
      <Box px={{ base: "10px", sm: "20px", md: "30px", lg: "40px" }}>
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(4, 1fr)",
            xl: "repeat(5, 1fr)",
            "2xl": "repeat(5, 1fr)",
          }}
          gap={{
            base: "4",
            sm: "4",
            md: "4",
            lg: "4",
            xl: "4",
            "2xl": "50px",
          }}
        >
          {currentItems.map((card, index) => (
            <Fragment key={card._id}>
              <Box
                bgColor="#3E3B3B"
                onClick={() => handleClick(card)}
                borderRadius="10px"
                overflow="hidden"
                cursor="pointer"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave()}
                transition="transform 0.4s"
                transform={hoveredIndex === index ? "scale(1.05)" : "scale(1)"}
                boxShadow={hoveredIndex === index ? "0 0 65px -37px white" : ""}
              >
                <Box position="relative" width="full" height="auto">
                  <Image
                    src={`https://cdn.tribaldex.com/packmanager/${settings.nft_symbol}/${card.grouping.edition}_${card.grouping.type}_${card.grouping.foil}.png`}
                    objectFit="cover"
                    alt={card.name}
                    h="fit-content"
                    borderTopRightRadius="7px"
                    borderTopLeftRadius="7px"
                  />

                  <Flex
                    position="absolute"
                    top="2"
                    left="2"
                    mt={2}
                    justifyContent="space-between"
                    alignItems="start"
                    width={{
                      base: "93%",
                      xxs: "91%",
                      xs: "90%",
                      sm: "92%",
                      md: "92%",
                      lg: "94%",
                      xl: "94%",
                      "2xl": "94%",
                    }}
                  >
                    <Flex
                      px={{
                        base: "1",
                        sm: "1",
                        md: "1",
                        lg: "3",
                        xl: "3",
                        "2xl": "3",
                      }}
                      py={{
                        base: "1",
                        sm: "1",
                        md: "1",
                        lg: "2",
                        xl: "2",
                        "2xl": "2",
                      }}
                      bgColor="#282C34"
                      borderRadius={{
                        base: "7px",
                        sm: "7px",
                        md: "7px",
                        lg: "10px",
                        xl: "10px",
                        "2xl": "10px",
                      }}
                      alignItems="center"
                    >
                      {/* common: B5B5B5 , rare: FF9104,  epic: DA9466 , legendary: FF4D4D*/}
                      <Text
                        fontFamily="CCElephantmenTall Regular"
                        color={
                          [2, 6, 5].includes(index)
                            ? "#B5B5B5"
                            : [9].includes(index)
                              ? "#FF9104"
                              : [4].includes(index)
                                ? "#FF4D4D"
                                : "#DA9466"
                        }
                        fontSize={{
                          base: "8px",
                          sm: "12px",
                          md: "12px",
                          lg: "14px",
                          xl: "14px",
                          "2xl": "14px",
                        }}
                        letterSpacing="0.5px"
                        display="flex"
                      >
                        <Image
                          src={
                            [2, 6, 5].includes(index)
                              ? badges.rare.icon
                              : [9].includes(index)
                                ? badges.epic.icon
                                : [4].includes(index)
                                  ? badges.legendary.icon
                                  : badges.common.icon
                          }
                          objectFit="contain"
                          w={{
                            base: "8px",
                            sm: "8px",
                            md: "10px",
                            lg: "14px",
                            xl: "14px",
                            "2xl": "14px",
                          }}
                        />
                        &nbsp;#
                        {card._id.toString().padStart(8, "0")}
                      </Text>
                    </Flex>

                    <Flex flexDirection="column" gap="1" alignItems="end">
                      {[3, 8].includes(index) && (
                        <Flex
                          px={{
                            base: "1",
                            sm: "1",
                            md: "1",
                            lg: "3",
                            xl: "3",
                            "2xl": "3",
                          }}
                          py={{
                            base: "1",
                            sm: "1",
                            md: "1",
                            lg: "2",
                            xl: "2",
                            "2xl": "2",
                          }}
                          bgColor="#005BE4"
                          borderRadius={{
                            base: "7px",
                            sm: "7px",
                            md: "7px",
                            lg: "10px",
                            xl: "10px",
                            "2xl": "10px",
                          }}
                          alignItems="center"
                          width="fit-content"
                        >
                          <Text
                            display="flex"
                            alignItems="center"
                            fontFamily="CCElephantmenTall Regular"
                            color="white"
                            fontSize={{
                              base: "8px",
                              sm: "8px",
                              md: "10px",
                              lg: "14px",
                              xl: "14px",
                              "2xl": "14px",
                            }}
                            letterSpacing="0.5px"
                          >
                            {/* <Icon as={RiFireFill} color="white" mt="-2px" /> */}
                            <Image
                              src="./images/limited-icon.svg"
                              objectFit="contain"
                              w={{
                                base: "8px",
                                sm: "8px",
                                md: "10px",
                                lg: "14px",
                                xl: "14px",
                                "2xl": "14px",
                              }}
                              mt="-1px"
                            />
                            &nbsp;LIMITED
                          </Text>
                        </Flex>
                      )}
                      {[1, 2, 3, 6, 8].includes(index) && (
                        <Flex
                          px={{
                            base: "1",
                            sm: "1",
                            md: "1",
                            lg: "3",
                            xl: "3",
                            "2xl": "3",
                          }}
                          py={{
                            base: "1",
                            sm: "1",
                            md: "1",
                            lg: "2",
                            xl: "2",
                            "2xl": "2",
                          }}
                          bgColor="#E40000"
                          borderRadius={{
                            base: "7px",
                            sm: "7px",
                            md: "7px",
                            lg: "10px",
                            xl: "10px",
                            "2xl": "10px",
                          }}
                          alignItems="center"
                          width="fit-content"
                        >
                          <Text
                            display="flex"
                            alignItems="center"
                            fontFamily="CCElephantmenTall Regular"
                            color="white"
                            fontSize={{
                              base: "8px",
                              sm: "8px",
                              md: "10px",
                              lg: "14px",
                              xl: "14px",
                              "2xl": "14px",
                            }}
                            letterSpacing="0.5px"
                          >
                            <Icon as={RiFireFill} color="white" />
                            &nbsp;HOT
                          </Text>
                        </Flex>
                      )}
                    </Flex>
                  </Flex>

                  {/* Bottom overlay */}
                  <Box position="absolute" bottom="2" left="2" mt={2}>
                    <Box
                      bgColor="rgba(58, 63, 73, 0.8)"
                      px="4"
                      py="1"
                      borderRadius="7px"
                    >
                      <Text
                        fontFamily="CCElephantmenTall Regular"
                        fontSize={{
                          base: "12px",
                          sm: "12px",
                          md: "14px",
                          lg: "18px",
                          xl: "18px",
                          "2xl": "20px",
                        }}
                        color="white"
                      >
                        1,203,596 AVAILABLE
                      </Text>
                    </Box>
                  </Box>
                </Box>

                <Box
                  display="flex"
                  justifyContent="center"
                  p="2"
                  textAlign="center"
                  bgColor={hoveredIndex === index ? "#12BFA0" : "#282C34"}
                  transition="all 0.4s ease-out"
                  transform={
                    hoveredIndex === index ? "scale(1.05)" : "scale(1)"
                  }
                >
                  {hoveredIndex === index && (
                    <Image
                      src="./images/currency_logo.svg"
                      objectFit="contain"
                      w={{
                        base: "12px",
                        sm: "14px",
                        md: "18px",
                        lg: "20px",
                        xl: "22px",
                        "2xl": "24px",
                      }}
                      mt="-1px"
                    />
                  )}
                  &nbsp;
                  <Text
                    fontFamily="CCElephantmenTall Regular"
                    color="white"
                    fontSize={{
                      base: "12px",
                      sm: "14px",
                      md: "18px",
                      lg: "20px",
                      xl: "22px",
                      "2xl": "24px",
                    }}
                    textTransform="uppercase"
                    transition="all 0.4s ease-out"
                  >
                    {hoveredIndex === index
                      ? "0.00090234"
                      : randomNames[index % randomNames.length]}
                  </Text>
                </Box>
              </Box>
            </Fragment>
          ))}
        </Grid>
      </Box>
      <Box className="flex justify-center mt-20 mb-20" bgColor="#090909">
        <nav className="inline-flex rounded-md shadow">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-800 bg-gray-800 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50"
          >
            Previous
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`px-4 py-2 border border-gray-800 bg-gray-800 text-sm font-medium text-white ${
                currentPage === number ? "bg-primary" : "hover:bg-gray-700"
              }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
            className="px-4 py-2 border border-gray-800 bg-gray-800 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </nav>
      </Box>
    </Box>
  );
};

export default NFTCardsList;
