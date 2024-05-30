import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/types/Card";
import useFetchNFTMarketData from "@/hooks/useFetchNFTMarketData";

interface NFTCardsListProps {
  selectedFaction: string;
  selectedRarity: string;
  selectedGameStats: string;
}

const randomNames = ["Yue", "Yax", "Brix", "Krizator", "Nivlef"];

const NFTCardsList: React.FC<NFTCardsListProps> = ({
  selectedFaction,
  selectedRarity,
  selectedGameStats,
}) => {
  const { data, isLoading, error } = useFetchNFTMarketData();
  const [filteredData, setFilteredData] = useState<Card[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Set the number of items per page
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      let filtered = data.filter((item: Card) => item.count > 0); // Filter out cards with count zero

      if (selectedFilter) {
        filtered = filtered.filter(
          (item: Card) => item.grouping.foil === selectedFilter,
        );
      }
      if (selectedFaction) {
        filtered = filtered.filter(
          (item: Card) => item.grouping.faction === selectedFaction,
        );
      }
      if (selectedRarity) {
        filtered = filtered.filter(
          (item: Card) => item.grouping.rarity === selectedRarity,
        );
      }
      if (selectedGameStats) {
        filtered = filtered.filter(
          (item: Card) => item.grouping.gameStats === selectedGameStats,
        );
      }

      setFilteredData(filtered);
    }
  }, [
    data,
    selectedFilter,
    selectedFaction,
    selectedRarity,
    selectedGameStats,
  ]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
    setCurrentPage(1); // Reset to the first page when filter changes
  };

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

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {currentItems.map((card, index) => (
            <div
              key={card._id}
              onClick={() => handleClick(card)}
              className="card bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md relative cursor-pointer"
            >
              <div className="absolute top-0 left-0 bg-black text-white text-xs py-1 px-2 rounded-br-lg">
                #{card._id.toString().padStart(8, "0")}
              </div>
              <div className="absolute top-0 right-0 bg-red-600 text-white text-xs py-1 px-2 rounded-bl-lg">
                HOT
              </div>
              <img
                src={`https://cdn.tribaldex.com/packmanager/DATA/${card.grouping.edition}_${card.grouping.type}_${card.grouping.foil}.png`}
                alt={card.name}
                className="w-full object-cover"
                style={{ height: "300px" }} // Adjust the height as per your original image size
              />
              <div className="text-center bg-gray-900 text-white py-2">
                1,203,596 AVAILABLE
              </div>
              <div className="p-3 text-center">
                <h3 className="text-md font-semibold text-white">
                  {randomNames[index % randomNames.length]}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-20 mb-20 bg-black">
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
      </div>
    </div>
  );
};

export default NFTCardsList;
