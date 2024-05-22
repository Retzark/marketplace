import React from "react";
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
              <table className="min-w-full bg-gray-900 border border-gray-700 rounded-lg shadow-md">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-white text-left"></th>
                    <th className="px-4 py-2 text-white text-left">PRICE</th>
                    <th className="px-4 py-2 text-white text-left">ASC LVL</th>
                    <th className="px-4 py-2 text-white text-left">CARD ID</th>
                    <th className="px-4 py-2 text-white text-left">SELLER</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry.nft_id} className="text-white">
                      <td className="border-t border-gray-700 px-4 py-2 text-left">
                        <input
                          type="checkbox"
                          onChange={(e) => onSelect(entry, e.target.checked)}
                        />
                      </td>
                      <td className="border-t border-gray-700 px-4 py-2 text-left">
                        {entry.price} {entry.priceSymbol}
                      </td>
                      <td className="border-t border-gray-700 px-4 py-2 text-left">
                        {/* Add asc level icons here */}
                      </td>
                      <td className="border-t border-gray-700 px-4 py-2 text-left">
                        #{entry.nft_id}
                      </td>
                      <td className="border-t border-gray-700 px-4 py-2 text-left">
                        @{entry.account}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="block md:hidden">
              {entries.map((entry) => (
                <div
                  key={entry.nft_id}
                  className="bg-gray-900 border border-gray-700 rounded-lg shadow-md p-4 flex flex-col space-y-2"
                >
                  <div className="flex justify-between text-white">
                    <span className="font-bold">SELECT:</span>
                    <input
                      type="checkbox"
                      onChange={(e) => onSelect(entry, e.target.checked)}
                    />
                  </div>
                  <div className="flex justify-between text-white">
                    <span className="font-bold">PRICE:</span>
                    <span>
                      {entry.price} {entry.priceSymbol}
                    </span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span className="font-bold">ASC LVL:</span>
                    <span>{/* Add asc level icons here */}</span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span className="font-bold">CARD ID:</span>
                    <span>#{entry.nft_id}</span>
                  </div>
                  <div className="flex justify-between text-white">
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
