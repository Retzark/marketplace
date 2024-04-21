import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/types/Card";
import useFetchNFTMarketData from "@/hooks/useFetchNFTMarketData"; // Assuming the correct import

const NFTCardsList = () => {
  const { data, isLoading, error } = useFetchNFTMarketData();
  const [filteredData, setFilteredData] = useState<Card[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const filtered = selectedFilter
        ? data.filter((item: Card) => item.grouping.foil === selectedFilter)
        : data;
      console.log({ filtered });
      setFilteredData(filtered);
    }
  }, [data, selectedFilter]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
  };

  const handleClick = (cardId: string, card: Card) => {
    navigate(`/card/${cardId}`, { state: { card } });
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
            {filteredData.map((card) => (
              <div
                key={card._id}
                onClick={() => handleClick(card._id, card)}
                className="card bg-white rounded-lg overflow-hidden shadow-md relative cursor-pointer"
              >
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs py-1 px-2 rounded-bl-lg rounded-tr-lg">
                  {card.count}
                </div>
                <img
                  src={`https://cdn.tribaldex.com/packmanager/DATA/${card.grouping.edition}_${card.grouping.type}_${card.grouping.foil}.png`}
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
    </div>
  );
};

export default NFTCardsList;
