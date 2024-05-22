import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Card, SellBookEntry } from "@/types"; // Adjust the import paths as necessary
import useMarketStore from "@/store/useMarketStore";
import Loading from "@/components/Loading"; // Adjust the import path as necessary
import BuyCard from "@/components/modals/BuyCard"; // Adjust the import path as necessary
import ListingsTable from "@/components/ListingsTable"; // Adjust the import path as necessary
import StatsAndMoveset from "@/components/StatsAndMoveset";
import useUserStore from "@/store/userStore"; // Adjust the import path as necessary

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
  const user = useUserStore((state) => state.user);

  const currentUsername = user?.username; // Replace this with actual username fetching logic

  useEffect(() => {
    const fetchCardDetails = async () => {
      if (!card) {
        // Fetch the card details if not provided via state
        setFetchedCard(fetchedCard);
      } else {
        setFetchedCard(card);
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
        style={{ marginTop: "-390px", position: "relative", zIndex: 10 }}
      >
        <div className="flex flex-wrap mb-8">
          <div className="w-full md:w-3/4 mb-4 px-2">
            <div className="flex flex-col items-center bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 h-full">
              <StatsAndMoveset card={fetchedCard} />
            </div>
          </div>
          <div className="w-full md:w-1/4 mb-4 px-2">
            <div className="flex flex-col items-center bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 h-full">
              <img
                className="object-cover w-full rounded-t-lg h-44 md:h-auto md:w-44 md:rounded-none md:rounded-l-lg p-4"
                src={`https://cdn.tribaldex.com/packmanager/DATA/${fetchedCard.grouping.edition}_${fetchedCard.grouping.type}_${fetchedCard.grouping.foil}.png`}
                alt="Card Image"
              />
              <div className="flex flex-col justify-between p-4 leading-normal text-white h-full">
                <h5 className="text-2xl font-bold mb-4">{fetchedCard.name}</h5>
                <div className="flex items-center mb-4">
                  <span className="bg-red-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
                    Legendary
                  </span>
                  <span className="bg-yellow-600 text-white px-2 py-1 ml-2 rounded-full text-sm font-semibold">
                    Hot
                  </span>
                </div>
                <p className="text-xl font-bold">Total Price</p>
                <p className="text-3xl font-semibold text-green-500">
                  5.083655
                </p>
                <button
                  className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={handleBuyNow}
                >
                  BUY NOW
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-3/4  px-2">
          <ListingsTable
            entries={sellBookEntries}
            isLoading={isListingsLoading}
            onSelect={handleSelect}
          />
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
