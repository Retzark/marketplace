import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/types/Card";
import useFetchNFTMarketData from "@/hooks/useFetchNFTMarketData";
import Loading from "@/components/Loading";
import { Box, Grid, Image, Text } from "@chakra-ui/react";
import useAppStore from "@/store/useAppStore";
import useMarketStore from "@/store/useMarketStore";

interface NFTCardsListProps {
  selectedFaction?: string;
  selectedRarity?: string;
  selectedGameStats?: string;
}

const NFTCardsList: React.FC<NFTCardsListProps> = ({
  selectedFaction = "",
  selectedRarity = "",
  selectedGameStats = "",
}) => {
  const { data, isLoading, error } = useFetchNFTMarketData();
  const [filteredData, setFilteredData] = useState<Card[]>([]);
  const [selectedFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Set the number of items per page
  const { fetchSellBook } = useMarketStore();

  const navigate = useNavigate();
  const { settings } = useAppStore((state) => ({
    settings: state.settings,
  }));

  useEffect(() => {
    const fetchAndFilterData = async () => {
      if (data) {
        let filtered = data.filter((item: Card) => item.count > 0); // Filter out cards with count zero

        if (selectedFilter) {
          filtered = filtered.filter(
            (item: Card) => item.grouping.foil === selectedFilter
          );
        }
        if (selectedFaction) {
          filtered = filtered.filter(
            (item: Card) => item.grouping.faction === selectedFaction
          );
        }
        if (selectedRarity) {
          filtered = filtered.filter(
            (item: Card) => item.grouping.rarity === selectedRarity
          );
        }
        if (selectedGameStats) {
          filtered = filtered.filter(
            (item: Card) => item.grouping.gameStats === selectedGameStats
          );
        }

        const updatedFilteredData = await Promise.all(
          filtered.map(async (card) => {
            const query = {
              "grouping.type": card?.grouping.type,
              "grouping.foil": card?.grouping.foil,
              "grouping.edition": card?.grouping.edition,
            };

            try {
              const fetchedSellBookEntries = await fetchSellBook(query);
              if (fetchedSellBookEntries.length > 0) {
                card.price = fetchedSellBookEntries[0].price;
              } else {
                card.price = null; // or set to a default value if no entries are found
              }
            } catch (error) {
              console.error(
                `Failed to fetch sell book entries for card ${card._id}:`,
                error
              );
              card.price = null; // or set to a default value if an error occurs
            }
            return card;
          })
        );

        setFilteredData(updatedFilteredData);
      }
    };

    fetchAndFilterData();
  }, [
    data,
    selectedFilter,
    selectedFaction,
    selectedRarity,
    selectedGameStats,
  ]);

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
          {currentItems.length} Total Cards
        </Text>
      </Box>
      <Box px={{ base: "10px", sm: "20px", md: "30px", lg: "40px" }}>
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(5, 1fr)",
            xl: "repeat(6, 1fr)",
            "2xl": "repeat(6, 1fr)",
          }}
          gap={{
            base: "4",
            sm: "4",
            md: "4",
            lg: "2",
            xl: "2",
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
                boxShadow={hoveredIndex === index ? "0 0 60px -20px green" : ""}
              >
                <Box position="relative" width="full" height="auto">
                  <Image
                    src={`https://cdn.tribaldex.com/packmanager/${settings.nft_symbol}/${card.grouping.edition}_${card.grouping.type}_${card.grouping.foil}.png`}
                    objectFit="cover"
                    alt={card.name}
                    borderTopRightRadius="7px"
                    borderTopLeftRadius="7px"
                  />

                  {/* Bottom overlay */}
                  <Box
                    position="absolute"
                    bottom="2"
                    left={{
                      base: "6.4px",
                      sm: "6.4px",
                      md: "2",
                      lg: "2",
                      xl: "2",
                      "2xl": "2",
                    }}
                    mt={2}
                  >
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
                          md: "12px",
                          lg: "14px",
                          xl: "16px",
                          "2xl": "18px",
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
                  bgColor="#282C34"
                  transition="all 0.4s ease-out"
                  alignItems="center"
                >
                  <Image
                    src="./images/ZARK-TOKEN_1.png"
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
                    {card.price ? card.price.toFixed(2) : "N/A"}
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
