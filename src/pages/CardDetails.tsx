import React, { useEffect, useState } from "react";
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
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import { RiFireFill } from "react-icons/ri";
import useAppStore from "@/store/useAppStore";

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

const CardDetails = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const card = location.state?.card as Card;
  const { fetchSellBook, requestBuy, requestCancel } = useMarketStore();
  const [fetchedCard, setFetchedCard] = useState<Card | null>(null);
  const [sellBookEntries, setSellBookEntries] = useState<SellBookEntry[]>([]);
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

  const handleSelect = (entry: SellBookEntry, isSelected: boolean) => {
    setSelectedEntries((prev) => {
      if (isSelected) {
        return [...prev, entry];
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

  const handleCancel = async (entry: SellBookEntry) => {
    try {
      await requestCancel({ nfts: [entry.nft_id.toString()] });
      alert("Cancellation successful!");
      // Optionally, update the state to remove the cancelled entry
      setSellBookEntries((prev) =>
        prev.filter((e) => e.nft_id !== entry.nft_id),
      );
    } catch (error) {
      console.error("Cancellation failed:", error);
      alert("Cancellation failed. Please try again.");
    }
  };

  const confirmBuy = async () => {
    try {
      await requestBuy({
        nfts: selectedEntries.map((entry) => entry.nft_id.toString()),
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
              <Image
                src={`https://cdn.tribaldex.com/packmanager/${settings.nft_symbol}/${fetchedCard.grouping.edition}_${fetchedCard.grouping.type}_${fetchedCard.grouping.foil}.png`}
                objectFit="cover"
                h="290px"
                w="full"
                borderRadius="lg"
              />
              <Box>
                <Text
                  as="h5"
                  fontFamily="CCElephantmenTall Regular"
                  fontSize="32px"
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
                      width="16px"
                      height="16px"
                    />
                    <Text
                      fontFamily="CCElephantmenTall Regular"
                      fontSize="16px"
                      color="#FF4D4D"
                    >
                      LEGENDARY
                    </Text>
                  </Box>
                  <Box
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
                  </Box>
                </Flex>

                <Divider borderColor="#3A3F49" my="4" />
                <Box>
                  <Text
                    as="h5"
                    fontFamily="Poppins"
                    fontSize="16px"
                    color="white"
                    fontWeight="300"
                  >
                    TOTAL PRICE
                  </Text>
                  <Flex alignItems="center" gap="2">
                    <Image
                      src="/images/ZARK-TOKEN_1.png"
                      objectFit="contain"
                      alt="EGY ICON"
                      width="32px"
                      height="32px"
                    />
                    <Text
                      fontFamily="Poppins"
                      fontSize="32px"
                      color="white"
                      fontWeight="bold"
                    >
                      5.083655
                    </Text>
                  </Flex>
                  <Button
                    mt="6"
                    w="full"
                    p="6"
                    bgColor="#12BFA0"
                    fontFamily="CCElephantmenTall Regular"
                    fontSize="24px"
                    color="white"
                    fontWeight="400"
                    gap="4"
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
                      alt="EGY ICON"
                      width="24px"
                      height="24px"
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
