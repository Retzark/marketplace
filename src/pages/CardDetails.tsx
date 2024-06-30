import React, { Fragment, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Card, SellBookEntry } from "@/types"; // Adjust the import paths as necessary
import useMarketStore from "@/store/useMarketStore";
import Loading from "@/components/Loading"; // Adjust the import path as necessary
import BuyCard from "@/components/modals/BuyCard"; // Adjust the import path as necessary
import ListingsTable from "@/components/ListingsTable"; // Adjust the import path as necessary
import StatsAndMoveset from "@/components/StatsAndMoveset";
import { fetchCardsData } from "@/utils/fetchCardData"; // Adjust the import path as necessary
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Image,
  Text,
} from "@chakra-ui/react";
import useAppStore from "@/store/useAppStore";

const Hero = () => (
  <Box
    position="relative"
    width="full"
    height={{
      base: "415px",
      sm: "415px",
      md: "415px",
      lg: "415px",
      xl: "450px",
      "2xl": "450px",
    }}
    overflow="hidden"
  >
    <Image
      src="/images/marketplace-hero.webp" // Replace with your image path
      alt="Blended Image"
      objectFit="cover"
      width="full"
      height={{
        base: "17vh",
        sm: "22vh",
        md: "40vh",
        lg: "54vh",
        xl: "76vh",
        "2xl": "76vh",
      }}
    />
    <Box
      position="absolute"
      bottom="0"
      left="0"
      width="full"
      height="16%"
      bgGradient={`linear(to-b, rgba(0,0,0,0), #090909)`}
    />
    <Box
      display="flex"
      position="absolute"
      top="0"
      left="0"
      width="full"
      height="full"
      alignItems="center"
      justifyContent="center"
      pointerEvents="none" // This ensures the text doesn't interfere with any click events
    ></Box>
  </Box>
);

const SaleHistoryTable: React.FC<{ entries: SellBookEntry[] }> = ({
  entries,
}) => {
  return (
    <>
      <Box bgColor="#282C34" borderRadius="lg" p="6">
        <Text
          mt="-6px"
          fontFamily="Poppins"
          fontSize="22px"
          fontWeight="bold"
          color="white"
        >
          SALE HISTORY
        </Text>
        <Box display="flex" mt="4">
          <Box
            w="100%"
            bgColor="#3A3F49"
            borderRadius="lg"
            flexDirection="column"
            p="2"
            display={{
              base: "none",
              sm: "none",
              md: "none",
              lg: "flex",
              xl: "flex",
              "2xl": "flex",
            }}
          >
            <Box
              display="flex"
              w="100%"
              bgColor="#3A3F49"
              borderRadius="lg"
              alignItems="center"
            >
              <Box w="33.3%" p="5">
                <Text
                  fontFamily="CCElephantmenTall Regular"
                  fontSize="20px"
                  fontWeight="400"
                  color="white"
                >
                  BUYER
                </Text>
              </Box>
              <Box w="33.3%" p="5">
                <Text
                  fontFamily="CCElephantmenTall Regular"
                  fontSize="20px"
                  fontWeight="400"
                  color="white"
                >
                  SELLER
                </Text>
              </Box>
              <Box w="33.3%" p="5">
                <Text
                  fontFamily="CCElephantmenTall Regular"
                  fontSize="20px"
                  fontWeight="400"
                  color="white"
                >
                  DATE / PRICE
                </Text>
              </Box>
            </Box>

            {entries.map((entry, index) => {
              return (
                <Fragment key={index}>
                  <Box
                    display="flex"
                    w="100%"
                    bgColor={index % 2 === 0 ? "#090909" : "transparent"}
                    alignItems="center"
                  >
                    <Box w="33.3%" p="5">
                      <Text
                        fontFamily="Poppins"
                        fontSize="16px"
                        fontWeight="400"
                        color="white"
                        display="flex"
                        gap="2"
                      >
                        @{entry.buyer}
                      </Text>
                      <Text
                        fontFamily="Poppins"
                        fontSize="12px"
                        fontWeight="400"
                        color="white"
                        display="flex"
                        gap="2"
                      >
                        ({entry.buyerAddress})
                      </Text>
                    </Box>
                    <Box w="33.3%" p="5">
                      <Text
                        fontFamily="Poppins"
                        fontSize="16px"
                        fontWeight="400"
                        color="white"
                        display="flex"
                        gap="2"
                      >
                        @{entry.seller}
                      </Text>
                      <Text
                        fontFamily="Poppins"
                        fontSize="12px"
                        fontWeight="400"
                        color="white"
                        display="flex"
                        gap="2"
                      >
                        ({entry.sellerAddress})
                      </Text>
                    </Box>
                    <Box w="33.3%" p="5">
                      <Text
                        fontFamily="Poppins"
                        fontSize="16px"
                        fontWeight="400"
                        color="white"
                        display="flex"
                        gap="2"
                      >
                        <Image
                          src="/images/ZARK-TOKEN_1.png"
                          objectFit="contain"
                          className="h-5"
                        />
                        {entry.price} {entry.priceSymbol}
                      </Text>
                      <Text
                        fontFamily="Poppins"
                        fontSize="12px"
                        fontWeight="400"
                        color="white"
                        display="flex"
                        gap="2"
                      >
                        {entry.date}
                      </Text>
                    </Box>
                  </Box>
                </Fragment>
              );
            })}
          </Box>
          <Box
            w="100%"
            bgColor="#3A3F49"
            borderRadius="lg"
            flexDirection="column"
            p="2"
            display={{
              base: "flex",
              sm: "flex",
              md: "flex",
              lg: "none",
              xl: "none",
              "2xl": "none",
            }}
          >
            {entries.map((entry, index) => {
              return (
                <Fragment key={entry.nft_id}>
                  <Grid
                    templateColumns={{
                      base: "repeat(2, 1fr)",
                      sm: "repeat(2, 1fr)",
                      md: "repeat(3, 1fr)",
                    }}
                    gap="2"
                    w="100%"
                    p={{
                      base: "1",
                      sm: "1",
                      md: "2",
                    }}
                  >
                    <Box p="2">
                      <Text
                        fontFamily="Poppins"
                        fontSize={{
                          base: "12px",
                          sm: "12px",
                          md: "14px",
                        }}
                        fontWeight="600"
                        color="white"
                        display="flex"
                        gap="2"
                      >
                        BUYER
                      </Text>
                      <Text
                        fontFamily="Poppins"
                        fontSize={{
                          base: "12px",
                          sm: "12px",
                          md: "14px",
                        }}
                        fontWeight="400"
                        color="white"
                        display="flex"
                        gap="2"
                      >
                        @{entry.buyer}
                      </Text>
                      <Text
                        fontFamily="Poppins"
                        fontSize={{
                          base: "10px",
                          sm: "10px",
                          md: "12px",
                        }}
                        fontWeight="400"
                        color="white"
                        display="flex"
                        gap="2"
                      >
                        ({entry.buyerAddress})
                      </Text>
                    </Box>
                    <Box p="2">
                      <Text
                        fontFamily="Poppins"
                        fontSize={{
                          base: "12px",
                          sm: "12px",
                          md: "14px",
                        }}
                        fontWeight="600"
                        color="white"
                        display="flex"
                        gap="2"
                      >
                        SELLER
                      </Text>
                      <Text
                        fontFamily="Poppins"
                        fontSize={{
                          base: "12px",
                          sm: "12px",
                          md: "14px",
                        }}
                        fontWeight="400"
                        color="white"
                        display="flex"
                        gap="2"
                      >
                        @{entry.seller}
                      </Text>
                      <Text
                        fontFamily="Poppins"
                        fontSize={{
                          base: "10px",
                          sm: "10px",
                          md: "12px",
                        }}
                        fontWeight="400"
                        color="white"
                        display="flex"
                        gap="2"
                      >
                        ({entry.sellerAddress})
                      </Text>
                    </Box>
                    <Box p="2">
                      <Text
                        fontFamily="Poppins"
                        fontSize={{
                          base: "12px",
                          sm: "12px",
                          md: "14px",
                        }}
                        fontWeight="600"
                        color="white"
                        display="flex"
                        gap="2"
                      >
                        DATE / PRICE
                      </Text>
                      <Text
                        fontFamily="Poppins"
                        fontSize={{
                          base: "12px",
                          sm: "12px",
                          md: "14px",
                        }}
                        fontWeight="400"
                        color="white"
                        display="flex"
                        gap="2"
                      >
                        <Image
                          src="/images/ZARK-TOKEN_1.png"
                          objectFit="contain"
                          className="h-5"
                        />
                        {entry.price} {entry.priceSymbol}
                      </Text>
                      <Text
                        fontFamily="Poppins"
                        fontSize={{
                          base: "10px",
                          sm: "10px",
                          md: "12px",
                        }}
                        fontWeight="400"
                        color="white"
                        display="flex"
                        gap="2"
                      >
                        {entry.date}
                      </Text>
                    </Box>
                  </Grid>
                  {entries.length !== index + 1 && <Divider mb="2" />}
                </Fragment>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
};

const CardDetails = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const card = location.state?.card as Card;
  const { fetchSellBook, requestBuy } = useMarketStore();
  const [fetchedCard, setFetchedCard] = useState<Card | null>(null);
  const [sellBookEntries, setSellBookEntries] = useState<SellBookEntry[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [selectedEntries, setSelectedEntries] = useState<SellBookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isListingsLoading, setIsListingsLoading] = useState(true); // For listings loading
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { settings } = useAppStore((state) => ({
    settings: state.settings,
  }));
  const [saleHistoryEntries] = useState<SellBookEntry[]>([
    {
      buyer: "valkangel",
      buyerAddress: "0xd5d3...ec55",
      seller: "slayers214",
      sellerAddress: "0xd343...e2f1",
      price: "0.083655",
      priceSymbol: "L3",
      date: "Feb 05, 2024",
      nft_id: "1",
    },
    {
      buyer: "elite8000",
      buyerAddress: "0xd5d3...ec55",
      seller: "bruH07",
      sellerAddress: "0xd343...e2f1",
      price: "0.053655",
      priceSymbol: "L3",
      date: "Jan 01, 2024",
      nft_id: "2",
    },
  ]); // Dummy sale history data

  useEffect(() => {
    const fetchCardDetails = async () => {
      // Fetch the JSON data
      try {
        const data = await fetchCardsData();

        // Find the card data from JSON
        const cardFromJson = data.find((c) => c.ID === parseInt(id));
        if (cardFromJson) {
          setFetchedCard({
            _id: cardFromJson.ID.toString(),
            name: cardFromJson.NAME,
            type: "Type", // Adjust this if you have a type in your JSON
            description: "Description", // Adjust this if you have a description in your JSON
            count: 1, // Adjust this if you have a count in your JSON
            hp: cardFromJson.HP,
            atk: cardFromJson.ATK,
            spd: cardFromJson.SPD,
            egy: cardFromJson.EGY,
            rarity: cardFromJson.RARITY,
            grouping: {
              type: card?.grouping.type,
              foil: card?.grouping.foil, // Assuming foil is not provided in the JSON, default to "0"
              edition: card?.grouping.edition, // Assuming edition is not provided in the JSON, default to "0"
            },
          } as Card);
        }
      } catch (error) {
        console.error("Failed to fetch cards data:", error);
        return;
      }

      const query = {
        "grouping.type": card?.grouping.type || fetchedCard?.grouping.type,
        "grouping.foil": card?.grouping.foil || fetchedCard?.grouping.foil,
        "grouping.edition":
          card?.grouping.edition || fetchedCard?.grouping.edition,
      };

      const fetchedSellBookEntries = await fetchSellBook(query);
      setSellBookEntries(fetchedSellBookEntries);

      setIsListingsLoading(false); // Set listings loading to false after fetching
      setIsLoading(false);
    };

    fetchCardDetails();
  }, [id, card, fetchSellBook]);

  useEffect(() => {
    // Calculate the initial total price based on the least priced item
    if (sellBookEntries.length > 0) {
      const leastPricedItem = sellBookEntries.reduce((minItem, currentItem) => {
        return parseFloat(currentItem.price) < parseFloat(minItem.price)
          ? currentItem
          : minItem;
      });

      setTotalPrice(leastPricedItem.price);
    }
  }, [sellBookEntries]);

  useEffect(() => {
    // Calculate the total price based on the selected entries
    if (selectedEntries.length > 0) {
      const total = selectedEntries.reduce(
        (sum, entry) => sum + parseFloat(entry.price),
        0,
      );
      setTotalPrice(total);
    } else if (sellBookEntries.length > 0) {
      // Reset to least priced item if no entries are selected
      const leastPricedItem = sellBookEntries.reduce((minItem, currentItem) => {
        return parseFloat(currentItem.price) < parseFloat(minItem.price)
          ? currentItem
          : minItem;
      });

      setTotalPrice(leastPricedItem.price);
    }
  }, [selectedEntries, sellBookEntries]);

  const handleSelect = (entry: SellBookEntry, isSelected: boolean) => {
    setSelectedEntries((prev) => {
      if (isSelected) {
        // Add entry if not already in the list
        const newEntries = [...prev, entry].filter(
          (value, index, self) =>
            index === self.findIndex((e) => e.nft_id === value.nft_id),
        );
        return newEntries;
      } else {
        return prev.filter((e) => e.nft_id !== entry.nft_id);
      }
    });
  };

  const handleBuyNow = () => {
    if (selectedEntries.length > 0) {
      setIsModalOpen(true);
    } else {
      alert("Please select at least one entry to buy.");
    }
  };

  const confirmBuy = async () => {
    try {
      const filteredEntries = selectedEntries.filter(
        (entry, index, self) =>
          index === self.findIndex((e) => e.nft_id === entry.nft_id),
      );
      await requestBuy({
        nfts: filteredEntries.map((entry) => entry.nft_id.toString()),
      });
      alert("Purchase successful!");
    } catch (error) {
      console.error("Purchase failed:", error);
      alert("Purchase failed. Please try again.");
    } finally {
      setIsModalOpen(false);
      setSelectedEntries([]);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!fetchedCard) {
    return <div className="text-center mt-8">No card details available.</div>;
  }

  return (
    <div className="relative">
      <Hero />
      <div
        className="container mx-auto px-4"
        style={{ marginTop: "-390px", position: "relative" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2">
            <StatsAndMoveset card={fetchedCard} />
          </div>
          <Box>
            <Box bgColor="#282C34" borderRadius="lg" p="6">
              <Box display="flex" justifyContent="center">
                <Image
                  src={`https://cdn.tribaldex.com/packmanager/${settings.nft_symbol}/${fetchedCard.grouping.edition}_${fetchedCard.grouping.type}_${fetchedCard.grouping.foil}.png`}
                  objectFit="cover"
                  w="245px"
                  borderRadius="lg"
                  boxShadow="0 0 60px -40px white"
                />
              </Box>

              <Box mt="2">
                <Text
                  as="h5"
                  fontFamily="CCElephantmenTall Regular"
                  fontSize={{
                    base: "25px",
                    sm: "25px",
                    md: "25px",
                    lg: "28px",
                    xl: "32px",
                    "2xl": "32px",
                  }}
                  color="white"
                >
                  {fetchedCard.name}
                </Text>
                <Flex gap="2" flexWrap="wrap">
                  <Box
                    bgColor="#3A3F49"
                    px="4"
                    py="2"
                    borderRadius="10px"
                    display="flex"
                    gap="1"
                    width="fit-content"
                    alignItems="center"
                    mt="2"
                  >
                    <Image
                      src="/images/legendary-badge.svg"
                      objectFit="contain"
                      alt="EGY ICON"
                      w={{
                        base: "12px",
                        sm: "12px",
                        md: "12px",
                        lg: "14px",
                        xl: "16px",
                        "2xl": "16px",
                      }}
                    />
                    <Text
                      fontFamily="CCElephantmenTall Regular"
                      fontSize={{
                        base: "12px",
                        sm: "12px",
                        md: "12px",
                        lg: "14px",
                        xl: "16px",
                        "2xl": "16px",
                      }}
                      color="#FF4D4D"
                    >
                      LEGENDARY
                    </Text>
                  </Box>
                  {/* <Box
                    bgColor="#E40000"
                    px="4"
                    py="2"
                    borderRadius="10px"
                    display="flex"
                    gap="1"
                    width="fit-content"
                    alignItems="center"
                    mt="2"
                  >
                    <Icon as={RiFireFill} color="white" mt="-2px" />
                    <Text
                      fontFamily="CCElephantmenTall Regular"
                      fontSize="16px"
                      color="white"
                    >
                      HOT
                    </Text>
                  </Box>
                  <Box
                    bgColor="#005BE4"
                    px="4"
                    py="2"
                    borderRadius="10px"
                    display="flex"
                    gap="1"
                    width="fit-content"
                    alignItems="center"
                    mt="2"
                  >
                    <Image
                      src="/images/limited-icon.svg"
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
                      LIMITED
                    </Text>
                  </Box> */}
                </Flex>

                <Divider borderColor="#3A3F49" my="4" />
                <Box>
                  <Text
                    as="h5"
                    fontFamily="Poppins"
                    fontSize={{
                      base: "12px",
                      sm: "12px",
                      md: "12px",
                      lg: "14px",
                      xl: "16px",
                      "2xl": "16px",
                    }}
                    color="white"
                    fontWeight="300"
                  >
                    PRICE
                  </Text>
                  <Flex alignItems="center" gap="2" mt="2">
                    <Image
                      src="/images/ZARK-TOKEN_1.png"
                      objectFit="contain"
                      alt="EGY ICON"
                      w={{
                        base: "25px",
                        sm: "25px",
                        md: "25px",
                        lg: "28px",
                        xl: "32px",
                        "2xl": "32px",
                      }}
                    />
                    <Text
                      fontFamily="Poppins"
                      fontSize={{
                        base: "25px",
                        sm: "25px",
                        md: "25px",
                        lg: "28px",
                        xl: "32px",
                        "2xl": "32px",
                      }}
                      color="white"
                      fontWeight="bold"
                    >
                      {parseFloat(totalPrice).toFixed(2)}{" "}
                      {sellBookEntries[0]?.priceSymbol}
                    </Text>
                  </Flex>
                  <Button
                    mt="6"
                    w="full"
                    p="6"
                    bgColor="#12BFA0"
                    fontFamily="CCElephantmenTall Regular"
                    fontSize={{
                      base: "20px",
                      sm: "20px",
                      md: "20px",
                      lg: "20px",
                      xl: "24px",
                      "2xl": "24px",
                    }}
                    color="white"
                    fontWeight="400"
                    gap="2"
                    _hover={{
                      bgColor: "#12BFA0",
                      opacity: "0.8",
                      transform: "scale(1.05)",
                    }}
                    onClick={handleBuyNow}
                  >
                    <Image
                      src="/images/buy-now.svg"
                      objectFit="contain"
                      alt="buy now"
                      w={{
                        base: "20px",
                        sm: "20px",
                        md: "20px",
                        lg: "20px",
                        xl: "24px",
                        "2xl": "24px",
                      }}
                    />
                    BUY NOW
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </div>

        <Box>
          <ListingsTable
            entries={sellBookEntries}
            isLoading={isListingsLoading}
            onSelect={handleSelect}
          />
        </Box>

        <div className="w-full mt-8">
          <SaleHistoryTable entries={saleHistoryEntries} />
        </div>

        <BuyCard
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          entries={selectedEntries}
          onConfirm={confirmBuy}
        />
      </div>
    </div>
  );
};

export default CardDetails;
