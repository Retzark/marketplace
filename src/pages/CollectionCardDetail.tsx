import React, { useEffect, useState, Fragment } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Card, SellBookEntry } from "@/types"; // Adjust the import paths as necessary
import Loading from "@/components/Loading"; // Adjust the import path as necessary
import StatsAndMoveset from "@/components/StatsAndMoveset";
import useCardStore from "@/store/useCardStore";
import useMarketStore from "@/store/useMarketStore";
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Text,
  useDisclosure,
  Spinner,
  Image,
} from "@chakra-ui/react";
import useAppStore from "@/store/useAppStore";
import Swal from "sweetalert2";
import SellModal from "@/components/modals/SellModal";

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
  );
};

const CollectionCardDetail = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const card = location.state?.card as Card;
  const fetchCardDetails = useCardStore((state) => state.fetchCardDetails);
  const fetchCollection = useCardStore((state) => state.fetchCollection);
  const requestSell = useMarketStore((state) => state.requestSell);
  const data = useCardStore((state) => state.data);
  const isLoading = useCardStore((state) => state.isLoading);
  const error = useCardStore((state) => state.error);
  const [fetchedCard, setFetchedCard] = useState<Card | null>(null);
  const [sellBookEntries, setSellBookEntries] = useState<SellBookEntry[]>([]);
  const [selectedEntries, setSelectedEntries] = useState<SellBookEntry[]>([]);
  const [isListingsLoading, setIsListingsLoading] = useState(true); // For listings loading
  const [isSubmitting, setIsSubmitting] = useState(false); // For request sell loading state
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedNftId, setSelectedNftId] = useState<number | null>(null);

  const handleSell = (id: number) => {
    setSelectedNftId(id);
    onOpen();
  };

  const handleModalSubmit = async (
    nftId: number,
    price: string,
    priceSymbol: string
  ) => {
    setIsSubmitting(true);
    try {
      await requestSell({
        nfts: [nftId.toString()],
        price: parseFloat(price),
        priceSymbol,
      });
      Swal.fire({
        title: "Success",
        text: `NFT with ID ${nftId} is listed for sale at ${price} ${priceSymbol}.`,
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to list NFT for sale.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Failed to sell NFT:", error);
    } finally {
      setIsSubmitting(false);
      onClose();
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      setIsListingsLoading(true);
      try {
        await fetchCollection(); // Fetch the collection data
        const { card: fetchedCard, sellBookEntries } = await fetchCardDetails(
          id,
          card
        );
        setFetchedCard(fetchedCard);
        setSellBookEntries(sellBookEntries);
        console.log("Card details fetched:", fetchedCard);
        console.log("Sell book entries:", sellBookEntries);
      } catch (error) {
        console.error("Failed to fetch card details:", error);
      } finally {
        setIsListingsLoading(false); // Set listings loading to false after fetching
      }
    };

    fetchDetails();
  }, [id, card, fetchCardDetails, fetchCollection]);

  const filteredData = data.filter(
    (item) => fetchedCard && item.type === fetchedCard.grouping.type
  );

  useEffect(() => {
    console.log("Filtered data:", filteredData);
  }, [filteredData]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center mt-8">
        Failed to load card details: {error.message}
      </div>
    );
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
          <div className="md:col-span-3">
            <StatsAndMoveset card={fetchedCard} />
          </div>
        </div>
        <Box bgColor="#282C34" borderRadius="lg" p="6" mt="8">
          <Text
            mt="-6px"
            fontFamily="Poppins"
            fontSize="22px"
            fontWeight="bold"
            color="white"
          >
            Cards
          </Text>
          <Flex mt="4">
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
              <Flex
                w="100%"
                bgColor="#3A3F49"
                borderRadius="lg"
                alignItems="center"
              >
                <Box w="25%" p="5">
                  <Text
                    fontFamily="CCElephantmenTall Regular"
                    fontSize="20px"
                    fontWeight="400"
                    color="white"
                  >
                    ID
                  </Text>
                </Box>
                <Box w="30%" p="5">
                  <Text
                    fontFamily="CCElephantmenTall Regular"
                    fontSize="20px"
                    fontWeight="400"
                    color="white"
                  >
                    Account
                  </Text>
                </Box>
                <Box w="35%" p="5">
                  <Text
                    fontFamily="CCElephantmenTall Regular"
                    fontSize="20px"
                    fontWeight="400"
                    color="white"
                  >
                    Name
                  </Text>
                </Box>
                <Box w="10%" p="5">
                  <Text
                    fontFamily="CCElephantmenTall Regular"
                    fontSize="20px"
                    fontWeight="400"
                    color="white"
                  >
                    Action
                  </Text>
                </Box>
              </Flex>

              {filteredData.map((item, index) => {
                return (
                  <Fragment key={item.nft_id}>
                    <Flex
                      w="100%"
                      bgColor={index % 2 === 0 ? "#090909" : "transparent"}
                      alignItems="center"
                    >
                      <Box w="25%" p="5">
                        <Text
                          fontFamily="Poppins"
                          fontSize="16px"
                          fontWeight="400"
                          color="white"
                        >
                          #{item.nft_id}
                        </Text>
                      </Box>
                      <Box w="30%" p="5">
                        <Text
                          fontFamily="Poppins"
                          fontSize="16px"
                          fontWeight="400"
                          color="white"
                        >
                          @{item.account}
                        </Text>
                      </Box>
                      <Box w="35%" p="5">
                        <Text
                          fontFamily="Poppins"
                          fontSize="16px"
                          fontWeight="400"
                          color="white"
                        >
                          {item.name}
                        </Text>
                      </Box>
                      <Box w="10%" p="5">
                        <Button
                          onClick={() => handleSell(item.nft_id)}
                          bgColor="green.500"
                          color="white"
                          _hover={{
                            bgColor: "green.700",
                          }}
                        >
                          Sell
                        </Button>
                      </Box>
                    </Flex>
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
              {filteredData.map((item, index) => {
                return (
                  <Fragment key={item.nft_id}>
                    <Grid
                      templateColumns={{
                        base: "repeat(2, 1fr)",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(4, 1fr)",
                      }}
                      gap="2"
                      w="100%"
                      p="2"
                    >
                      <Box>
                        <Text
                          fontFamily="Poppins"
                          fontSize="12px"
                          fontWeight="600"
                          color="white"
                        >
                          ID
                        </Text>
                        <Text
                          mt="2"
                          fontFamily="Poppins"
                          fontSize="10px"
                          fontWeight="400"
                          color="white"
                        >
                          #{item.nft_id}
                        </Text>
                      </Box>
                      <Box>
                        <Text
                          fontFamily="Poppins"
                          fontSize="12px"
                          fontWeight="600"
                          color="white"
                        >
                          ACCOUNT
                        </Text>
                        <Text
                          mt="2"
                          fontFamily="Poppins"
                          fontSize="10px"
                          fontWeight="400"
                          color="white"
                        >
                          @{item.account}
                        </Text>
                      </Box>
                      <Box>
                        <Text
                          fontFamily="Poppins"
                          fontSize="12px"
                          fontWeight="600"
                          color="white"
                        >
                          NAME
                        </Text>
                        <Text
                          mt="2"
                          fontFamily="Poppins"
                          fontSize="10px"
                          fontWeight="400"
                          color="white"
                        >
                          {item.name}
                        </Text>
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems={{ base: "end", sm: "end", md: "start" }}
                      >
                        <Button
                          size="xs"
                          mt="2"
                          w={{
                            base: "100%",
                            sm: "100%",
                            md: "50%",
                          }}
                          onClick={() => handleSell(item.nft_id)}
                          bgColor="green.500"
                          color="white"
                          _hover={{
                            bgColor: "green.700",
                          }}
                        >
                          Sell
                        </Button>
                      </Box>
                    </Grid>
                    {filteredData.length !== index + 1 && <Divider mb="2" />}
                  </Fragment>
                );
              })}
            </Box>
          </Flex>
        </Box>

        <div className="w-full mt-8">
          <SaleHistoryTable entries={saleHistoryEntries} />
        </div>
      </div>
      <SellModal
        isOpen={isOpen}
        onClose={onClose}
        nftId={selectedNftId}
        onSubmit={handleModalSubmit}
      />
      {isSubmitting && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          zIndex="1000"
        >
          <Spinner size="xl" color="white" />
        </Box>
      )}
    </div>
  );
};

export default CollectionCardDetail;
