import React, { useState, useEffect } from "react";
import { Card } from "@/types/Card";
import useFetchCollectionData from "@/hooks/useFetchCollectionData";
import useAppStore from "@/store/useAppStore";
import CardItem from "@/components/CardItem";
import Pagination from "@/components/Pagination";

const PAGE_SIZE = 15;

const CollectionCardsList = () => {
  const { data, isLoading, error } = useFetchCollectionData();
  const [filteredData, setFilteredData] = useState<
    { card: Card; count: number }[]
  >([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { settings } = useAppStore((state) => ({
    settings: state.settings,
  }));

  useEffect(() => {
    if (data) {
      const cardCountMap: { [key: string]: { card: Card; count: number } } = {};

      data.forEach((card) => {
        const key = `${card.edition}_${card.type}_${card.foil}`;
        if (cardCountMap[key]) {
          cardCountMap[key].count += 1;
        } else {
          cardCountMap[key] = { card, count: 1 };
        }
      });

      const filtered = Object.values(cardCountMap);
      if (selectedFilter) {
        setFilteredData(
          filtered.filter((item) => item.card.foil === selectedFilter),
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

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Calculate the indices for the current page
  const indexOfLastItem = currentPage * PAGE_SIZE;
  const indexOfFirstItem = indexOfLastItem - PAGE_SIZE;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

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
              <CardItem
                key={card.type}
                card={card}
                count={count}
                settings={settings}
              />
            ))}
          </div>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={filteredData.length}
        pageSize={PAGE_SIZE}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CollectionCardsList;
