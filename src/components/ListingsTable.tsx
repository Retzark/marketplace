import React, { useState, useEffect } from "react";
import { SellBookEntry } from "@/types";
import Loading from "@/components/Loading";

interface ListingsTableProps {
  entries: SellBookEntry[];
  isLoading: boolean;
  onSelect: (entry: SellBookEntry, isSelected: boolean) => void;
}

const ListingsTable: React.FC<ListingsTableProps> = ({
  entries,
  isLoading,
  onSelect,
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedEntries, setSelectedEntries] = useState<Set<number>>(
    new Set(),
  );

  useEffect(() => {
    if (selectAll) {
      const newSelectedEntries = new Set(entries.map((entry) => entry.nft_id));
      setSelectedEntries(newSelectedEntries);
      entries.forEach((entry) => onSelect(entry, true));
    } else {
      setSelectedEntries(new Set());
      entries.forEach((entry) => onSelect(entry, false));
    }
  }, [selectAll, entries]);

  const handleSelect = (entry: SellBookEntry, isSelected: boolean) => {
    const newSelectedEntries = new Set(selectedEntries);
    if (isSelected) {
      newSelectedEntries.add(entry.nft_id);
    } else {
      newSelectedEntries.delete(entry.nft_id);
    }
    setSelectedEntries(newSelectedEntries);
    onSelect(entry, isSelected);
  };

  const handleEntryCheckboxChange = (entry: SellBookEntry) => {
    const isSelected = selectedEntries.has(entry.nft_id);
    handleSelect(entry, !isSelected);
  };

  useEffect(() => {
    if (selectedEntries.size === entries.length) {
      setSelectAll(true);
    } else if (selectedEntries.size === 0) {
      setSelectAll(false);
    }
  }, [selectedEntries, entries.length]);

  return (
    <div className="w-full mb-8">
      <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4">
        <h3 className="text-lg font-bold text-white mb-4">LISTINGS</h3>
        {isLoading ? (
          <div className="text-center py-4">
            <Loading />
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            <div className="hidden md:block">
              <table
                className="min-w-full border border-gray-700 rounded-lg shadow-md overflow-hidden"
                style={{ backgroundColor: "#3A3F49" }}
              >
                <thead
                  className="rounded-t-lg"
                  style={{ backgroundColor: "#3A3F49" }}
                >
                  <tr
                    className="bg-gray-800"
                    style={{ backgroundColor: "#3A3F49" }}
                  >
                    <th
                      className="px-4 py-3 text-white text-center rounded-tl-lg"
                      style={{
                        fontFamily: '"CCElephantmenTall Regular"',
                        fontSize: "24px",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={(e) => setSelectAll(e.target.checked)}
                        className="form-checkbox h-5 w-5 text-green-500 border-gray-300 rounded focus:ring-0 focus:ring-offset-0"
                      />
                    </th>
                    <th
                      className="px-4 py-3 text-white text-left"
                      style={{
                        fontFamily: '"CCElephantmenTall Regular"',
                        fontSize: "24px",
                      }}
                    >
                      PRICE
                    </th>
                    <th
                      className="px-4 py-3 text-white text-left"
                      style={{
                        fontFamily: '"CCElephantmenTall Regular"',
                        fontSize: "24px",
                      }}
                    >
                      ASC LVL
                    </th>
                    <th
                      className="px-4 py-3 text-white text-left"
                      style={{
                        fontFamily: '"CCElephantmenTall Regular"',
                        fontSize: "24px",
                      }}
                    >
                      CARD ID
                    </th>
                    <th
                      className="px-4 py-3 text-white text-left rounded-tr-lg"
                      style={{
                        fontFamily: '"CCElephantmenTall Regular"',
                        fontSize: "24px",
                      }}
                    >
                      SELLER
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, index) => (
                    <tr
                      key={entry.nft_id}
                      className={`text-white ${
                        index === entries.length - 1 ? "rounded-b-lg" : ""
                      } ${index % 2 === 0 ? "bg-[#090909]" : "bg-[#3A3F49]"}`}
                      style={{ height: "82px" }}
                    >
                      <td className="border-t border-gray-700 px-4 py-3 text-center">
                        <input
                          type="checkbox"
                          checked={selectedEntries.has(entry.nft_id)}
                          onChange={() => handleEntryCheckboxChange(entry)}
                          className="form-checkbox h-5 w-5 text-green-500 border-gray-300 rounded focus:ring-0 focus:ring-offset-0"
                        />
                      </td>
                      <td
                        className="border-t border-gray-700 px-4 py-3 text-left"
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "18px",
                        }}
                      >
                        <div className="flex items-center">
                          <img
                            src="/images/currency_logo.svg"
                            alt="LB Icon"
                            className="w-6 h-6 mr-2"
                          />
                          {entry.price} {entry.priceSymbol}
                        </div>
                      </td>
                      <td
                        className="border-t border-gray-700 px-4 py-3 text-left"
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "18px",
                        }}
                      >
                        <div className="flex items-center">
                          <img
                            src="/images/asc_lvl_gray.svg"
                            className="w-5 h-5 mr-1"
                            alt="Ascension Level Icon"
                          />
                          <img
                            src="/images/asc_lvl_gray.svg"
                            className="w-5 h-5 mr-1"
                            alt="Ascension Level Icon"
                          />
                          <img
                            src="/images/asc_lvl_red.svg"
                            className="w-5 h-5 mr-1"
                            alt="Ascension Level Icon"
                          />
                        </div>
                      </td>
                      <td
                        className="border-t border-gray-700 px-4 py-3 text-left"
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "18px",
                        }}
                      >
                        #{entry.nft_id}
                      </td>
                      <td
                        className={`border-t border-gray-700 px-4 py-3 text-left ${
                          index === entries.length - 1
                            ? "rounded-bl-lg rounded-br-lg"
                            : ""
                        }`}
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "18px",
                        }}
                      >
                        @{entry.account}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="block md:hidden">
              {entries.map((entry, index) => (
                <div
                  key={entry.nft_id}
                  className={`bg-gray-900 border border-gray-700 rounded-lg shadow-md p-4 flex flex-col space-y-2 ${
                    index % 2 === 0 ? "bg-[#090909]" : "bg-[#3A3F49]"
                  }`}
                >
                  <div className="flex justify-between text-white">
                    <span className="font-bold">SELECT:</span>
                    <input
                      type="checkbox"
                      checked={selectedEntries.has(entry.nft_id)}
                      onChange={() => handleEntryCheckboxChange(entry)}
                      className="form-checkbox h-5 w-5 text-green-500 border-gray-300 rounded focus:ring-0 focus:ring-offset-0"
                    />
                  </div>
                  <div
                    className="flex justify-between text-white"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "18px",
                    }}
                  >
                    <span className="font-bold">PRICE:</span>
                    <span>
                      <img
                        src="/images/lb-icon.svg"
                        alt="Price Icon"
                        className="inline mr-2"
                      />
                      {entry.price} {entry.priceSymbol}
                    </span>
                  </div>
                  <div
                    className="flex justify-between text-white"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "18px",
                    }}
                  >
                    <span className="font-bold">ASC LVL:</span>
                    <span>
                      <img
                        src="/images/asc_lvl_gray.svg"
                        className="w-4 h-4 mr-1"
                        alt="Ascension Level Icon"
                      />
                      <img
                        src="/images/asc_lvl_gray.svg"
                        className="w-4 h-4 mr-1"
                        alt="Ascension Level Icon"
                      />
                      <img
                        src="/images/asc_lvl_red.svg"
                        className="w-4 h-4"
                        alt="Ascension Level Icon"
                      />
                    </span>
                  </div>
                  <div
                    className="flex justify-between text-white"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "18px",
                    }}
                  >
                    <span className="font-bold">CARD ID:</span>
                    <span>#{entry.nft_id}</span>
                  </div>
                  <div
                    className="flex justify-between text-white"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "18px",
                    }}
                  >
                    <span className="font-bold">SELLER:</span>
                    <span>@{entry.account}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingsTable;
