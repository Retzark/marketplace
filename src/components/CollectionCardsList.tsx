import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/types/Card";
import useFetchCollectionData from "@/hooks/useFetchCollectionData";
import useMarketStore from "@/store/useMarketStore";

const PAGE_SIZE = 15;

const CollectionCardsList = () => {
  const { data, isLoading, error } = useFetchCollectionData();
  const [filteredData, setFilteredData] = useState<
    { card: Card; count: number }[]
  >([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [sellPrice, setSellPrice] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
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
    setCurrentPage(1); // Reset to the first page when filter changes
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

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Calculate the indices for the current page
  const indexOfLastItem = currentPage * PAGE_SIZE;
  const indexOfFirstItem = indexOfLastItem - PAGE_SIZE;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / PAGE_SIZE); i++) {
    pageNumbers.push(i);
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="mx-auto px-10 flex-grow">
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
            {currentItems.map(({ card, count }) => (
              <div
                key={card._id}
                onClick={() => handleClick(card)}
                className="card bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md relative cursor-pointer"
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
      <div className="flex justify-center mt-10 mb-10 bg-black">
        <nav className="inline-flex rounded-md shadow">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-700 bg-gray-800 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50"
          >
            Previous
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`px-4 py-2 border border-gray-700 bg-gray-800 text-sm font-medium text-white ${
                currentPage === number ? "bg-primary" : "hover:bg-gray-700"
              }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
            className="px-4 py-2 border border-gray-700 bg-gray-800 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </nav>
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
