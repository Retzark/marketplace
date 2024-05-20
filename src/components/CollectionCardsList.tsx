import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/types/Card";
import useFetchCollectionData from "@/hooks/useFetchCollectionData";
import useMarketStore from "@/store/useMarketStore";

const CollectionCardsList = () => {
  const { data, isLoading, error } = useFetchCollectionData();
  const [filteredData, setFilteredData] = useState<
    { card: Card; count: number }[]
  >([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [sellPrice, setSellPrice] = useState<string>("");
  const navigate = useNavigate();
  const { requestSell } = useMarketStore();

  useEffect(() => {
    if (data) {
      const cardCountMap: { [key: string]: { card: Card; count: number } } = {};

      data.forEach((card) => {
        const key = `${card.properties.edition}_${card.properties.type}_${card.properties.foil}`;
        if (cardCountMap[key]) {
          cardCountMap[key].count += 1;
        } else {
          cardCountMap[key] = { card, count: 1 };
        }
      });

      const filtered = Object.values(cardCountMap);
      if (selectedFilter) {
        setFilteredData(
          filtered.filter(
            (item) => item.card.properties.foil === selectedFilter,
          ),
        );
      } else {
        setFilteredData(filtered);
      }
    }
  }, [data, selectedFilter]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
  };

  const handleClick = (card: Card) => {
    setSelectedCard(card);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
    setShowModal(false);
    setSellPrice("");
  };

  const handleSellPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSellPrice(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedCard) {
      const nfts = [selectedCard._id.toString()];
      const price = parseFloat(sellPrice);
      const priceSymbol = "SWAP.HIVE";

      try {
        await requestSell({ nfts, price, priceSymbol });
        handleCloseModal();
      } catch (error) {
        console.log(error);
        // Handle error, show error message, etc.
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="container mx-auto px-4">
        <div className="mb-4">
          <select
            value={selectedFilter}
            onChange={handleFilterChange}
            className="form-select block mt-1"
          >
            <option value="">All Types</option>
            <option value="0">Regular</option>
            <option value="1">Gold</option>
          </select>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredData.map(({ card, count }) => (
              <div
                key={card._id}
                onClick={() => handleClick(card)}
                className="card bg-white rounded-lg overflow-hidden shadow-md relative cursor-pointer"
              >
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs py-1 px-2 rounded-bl-lg rounded-tr-lg">
                  {count}
                </div>
                <img
                  src={`https://cdn.tribaldex.com/packmanager/DATA/${card.properties.edition}_${card.properties.type}_${card.properties.foil}.png`}
                  alt={card.name}
                  className="w-full h-full object-cover"
                />
                <div className="p-3">
                  <h3 className="text-md font-semibold">{card.name}</h3>
                  <p className="text-sm mt-1">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && selectedCard && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
            <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">
                Sell {selectedCard.name}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="sellPrice" className="block mb-2">
                    Sell Price:
                  </label>
                  <input
                    type="number"
                    id="sellPrice"
                    value={sellPrice}
                    onChange={handleSellPriceChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Sell
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionCardsList;
