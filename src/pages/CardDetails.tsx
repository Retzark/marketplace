import { useParams, useLocation } from "react-router-dom";
import useAppStore from "@/store/useAppStore";
import { useEffect, useState } from "react";
import useMarketStore from "@/store/useMarketStore";
import { Card, SellBookEntry } from "@/types";
import BuyCard from "@/components/modals/BuyCard";
import Loading from "@/components/Loading";
import ListingsTable from "@/components/ListingsTable";
import userStore from "@/store/userStore";

const CardDetails = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const card = location.state?.card as Card;
  const username = userStore.getState().user?.username;

  const { settings } = useAppStore(); // Assuming user info is stored in useAppStore
  const { fetchSellBook, requestBuy, requestCancel } = useMarketStore();
  const [fetchedCard, setFetchedCard] = useState<Card | null>(null);
  const [sellBookEntries, setSellBookEntries] = useState<SellBookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isListingsLoading, setIsListingsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<SellBookEntry | null>(
    null,
  );

  useEffect(() => {
    const fetchCardDetails = async () => {
      if (!card) {
        setFetchedCard(fetchedCard);
      } else {
        setFetchedCard(card);
      }

      if (settings) {
        const query = {
          "grouping.type": card?.grouping.type || fetchedCard?.grouping.type,
          "grouping.foil": card?.grouping.foil || fetchedCard?.grouping.foil,
          "grouping.edition":
            card?.grouping.edition || fetchedCard?.grouping.edition,
          priceSymbol: settings.currency,
        };

        const fetchedSellBookEntries = await fetchSellBook(query);
        setSellBookEntries(fetchedSellBookEntries);
        setIsListingsLoading(false);
      }
      setIsLoading(false);
    };

    fetchCardDetails();
  }, [id, card, fetchSellBook, settings]);

  const handleBuy = (entry: SellBookEntry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  const confirmBuy = async () => {
    if (selectedEntry) {
      try {
        await requestBuy({ nfts: [selectedEntry.nft_id.toString()] });
        alert("Purchase successful!");
      } catch (error) {
        console.error("Purchase failed:", error);
        alert("Purchase failed. Please try again.");
      } finally {
        setIsModalOpen(false);
        setSelectedEntry(null);
      }
    }
  };

  const handleCancel = async (entry: SellBookEntry) => {
    try {
      await requestCancel({ nfts: [entry.nft_id.toString()] });
      setSellBookEntries((prevEntries) =>
        prevEntries.filter((e) => e.nft_id !== entry.nft_id),
      );
    } catch (error) {
      console.error("Cancel failed:", error);
      alert("Cancel failed. Please try again.");
    }
  };

  if (!settings || isLoading) {
    return <Loading />;
  }

  if (!fetchedCard) {
    return <div className="text-center mt-8">No card details available.</div>;
  }

  return (
    <div>
      <div className="w-full">
        <div
          className="relative flex justify-center text-white text-center bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/marketplace-hero.webp')`,
            height: "70vh",
          }}
        />
        <div className="container mx-auto px-4 mt-8">
          <div className="flex flex-wrap mb-8"></div>
          {isListingsLoading && <Loading />}
          <ListingsTable
            entries={sellBookEntries}
            isLoading={isListingsLoading}
            onBuy={handleBuy}
            onCancel={handleCancel}
            currentUsername={username || ""}
          />
        </div>
      </div>
      <BuyCard
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        entry={selectedEntry}
        onConfirm={confirmBuy}
      />
    </div>
  );
};

// Mock function to simulate fetching card details by ID

export default CardDetails;
