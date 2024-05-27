import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Card, SellBookEntry } from "@/types"; // Adjust the import paths as necessary
import useMarketStore from "@/store/useMarketStore";
import Loading from "@/components/Loading"; // Adjust the import path as necessary
import BuyCard from "@/components/modals/BuyCard"; // Adjust the import path as necessary
import ListingsTable from "@/components/ListingsTable"; // Adjust the import path as necessary
import StatsAndMoveset from "@/components/StatsAndMoveset";
import { fetchCardsData } from "@/utils/fetchCardData"; // Adjust the import path as necessary

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
  const [cardsData, setCardsData] = useState<any[]>([]);
  const [saleHistoryEntries, setSaleHistoryEntries] = useState<SellBookEntry[]>(
    [
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
    ],
  ); // Dummy sale history data

  useEffect(() => {
    const fetchCardDetails = async () => {
      // Fetch the JSON data
      try {
        const data = await fetchCardsData();
        setCardsData(data);

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
      console.log(selectedEntries);
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
        style={{ marginTop: "-390px", position: "relative", zIndex: 10 }}
      >
        <div className="flex flex-wrap mb-8">
          <div className="w-full md:w-3/4 mb-4 px-2">
            <div className="flex flex-col items-center bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 h-full">
              <StatsAndMoveset card={fetchedCard} />
            </div>
          </div>
          <div className="w-full md:w-1/4 mb-4 px-2">
            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 h-full">
              <img
                className="object-cover w-full rounded-t-lg h-44 md:h-72 md:rounded-none md:rounded-t-lg"
                src={`https://cdn.tribaldex.com/packmanager/DATA/${fetchedCard.grouping.edition}_${fetchedCard.grouping.type}_${fetchedCard.grouping.foil}.png`}
                alt="Card Image"
              />
              <div className="flex flex-col justify-between p-4 leading-normal text-white">
                <h5 className="text-2xl font-bold mb-4">{fetchedCard.name}</h5>
                <div className="flex mb-4">
                  <span className="bg-red-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
                    {fetchedCard.rarity}
                  </span>
                </div>
                <p className="text-xl font-bold">Total Price</p>
                <p className="text-3xl font-semibold inline-flex items-center">
                  <img
                    src="/images/currency_logo.svg"
                    className="w-7 h-7 mr-1"
                    alt="Ascension Level Icon"
                  />
                  5.083655
                </p>
                <button
                  className="bg-primary text-white font-bold py-2 px-4 rounded mt-4 flex items-center justify-center space-x-2"
                  onClick={handleBuyNow}
                >
                  <img
                    src="/images/buy-now.svg"
                    className="w-7 h-7"
                    alt="Ascension Level Icon"
                  />
                  <span>BUY NOW</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-3/4 px-2">
          <ListingsTable
            entries={sellBookEntries}
            isLoading={isListingsLoading}
            onSelect={handleSelect}
          />
        </div>

        <div className="w-3/4 px-2 mt-8">
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
