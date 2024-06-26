import React, { useEffect, useState, Fragment } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Card, SellBookEntry } from "@/types"; // Adjust the import paths as necessary
import Loading from "@/components/Loading"; // Adjust the import path as necessary
import ListingsTable from "@/components/ListingsTable"; // Adjust the import path as necessary
import StatsAndMoveset from "@/components/StatsAndMoveset";
import useCardStore from "@/store/useCardStore";
import useMarketStore from "@/store/useMarketStore";
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { RiFireFill } from "react-icons/ri";
import useAppStore from "@/store/useAppStore";
import Swal from "sweetalert2";
import SellModal from "@/components/modals/SellModal";

const Hero = () => (
  <div className="relative w-full">
    <div
      className="relative flex justify-center text-white text-center bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: `url('/images/marketplace-hero.webp')`,
        height: "70vh",
      }}
    ></div>
  </div>
);

const SaleHistoryTable: React.FC<{ entries: SellBookEntry[] }> = ({
  entries,
}) => {
  return (
    <div className="w-full mb-8">
      <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4">
        <h3 className="text-lg font-bold text-white mb-4">SALE HISTORY</h3>
        <div className="flex flex-col space-y-4">
          <div className="hidden md:block">
            <table className="min-w-full bg-gray-900 border border-gray-700 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-800">
                  <th className="px-4 py-3 text-white text-left">BUYER</th>
                  <th className="px-4 py-3 text-white text-left">SELLER</th>
                  <th className="px-4 py-3 text-white text-left">
                    DATE / PRICE
                  </th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr
                    key={index}
                    className="text-white bg-gray-900"
                    style={{ height: "60px" }}
                  >
                    <td className="border-t border-gray-700 px-4 py-3 text-left">
                      @{entry.buyer} ({entry.buyerAddress})
                    </td>
                    <td className="border-t border-gray-700 px-4 py-3 text-left">
                      @{entry.seller} ({entry.sellerAddress})
                    </td>
                    <td className="border-t border-gray-700 px-4 py-3 text-left">
                      <div>
                        {entry.price} {entry.priceSymbol}
                      </div>
                      <div>{entry.date}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="block md:hidden">
            {entries.map((entry, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-700 rounded-lg shadow-md p-4 flex flex-col space-y-2"
              >
                <div className="flex justify-between text-white">
                  <span className="font-bold">BUYER:</span>
                  <span>
                    @{entry.buyer} ({entry.buyerAddress})
                  </span>
                </div>
                <div className="flex justify-between text-white">
                  <span className="font-bold">SELLER:</span>
                  <span>
                    @{entry.seller} ({entry.sellerAddress})
                  </span>
                </div>
                <div className="flex justify-between text-white">
                  <span className="font-bold">DATE / PRICE:</span>
                  <div>
                    <div>
                      {entry.price} {entry.priceSymbol}
                    </div>
                    <div>{entry.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
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
    priceSymbol: string,
  ) => {
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
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to list NFT for sale.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Failed to sell NFT:", error);
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      setIsListingsLoading(true);
      try {
        await fetchCollection(); // Fetch the collection data
        const { card: fetchedCard, sellBookEntries } = await fetchCardDetails(
          id,
          card,
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
    (item) => fetchedCard && item.type === fetchedCard.grouping.type,
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
                      templateColumns="repeat(2, 1fr)"
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
                          Action
                        </Text>
                        <Button
                          mt="2"
                          w="full"
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
    </div>
  );
};

export default CollectionCardDetail;
