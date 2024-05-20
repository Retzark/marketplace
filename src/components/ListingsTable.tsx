import React from "react";
import { SellBookEntry } from "@/types";
import Loading from "@/components/Loading";

interface ListingsTableProps {
  entries: SellBookEntry[];
  isLoading: boolean;
  onBuy: (entry: SellBookEntry) => void;
  onCancel: (entry: SellBookEntry) => void;
  currentUsername: string;
}

const ListingsTable: React.FC<ListingsTableProps> = ({
  entries,
  isLoading,
  onBuy,
  onCancel,
  currentUsername,
}) => {
  return (
    <div className="w-full mb-8">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
        <h3 className="text-lg font-bold mb-4">Listings</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="py-2 px-4 border">NFT ID</th>
                <th className="py-2 px-4 border">Account</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Team</th>
                <th className="py-2 px-4 border">Category</th>
                <th className="py-2 px-4 border">Edition</th>
                <th className="py-2 px-4 border">Foil</th>
                <th className="py-2 px-4 border">Type</th>
                <th className="py-2 px-4 border">Rarity</th>
                <th className="py-2 px-4 border">Price</th>
                <th className="py-2 px-4 border">Price Symbol</th>
                <th className="py-2 px-4 border">Fee</th>
                <th className="py-2 px-4 border">For Sale</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={14} className="text-center py-4">
                    <Loading />
                  </td>
                </tr>
              ) : (
                entries.map((entry) => (
                  <tr key={entry.nft_id}>
                    <td className="py-2 px-4 border">{entry.nft_id}</td>
                    <td className="py-2 px-4 border">@{entry.account}</td>
                    <td className="py-2 px-4 border">{entry.name}</td>
                    <td className="py-2 px-4 border">{entry.team}</td>
                    <td className="py-2 px-4 border">{entry.category}</td>
                    <td className="py-2 px-4 border">{entry.edition}</td>
                    <td className="py-2 px-4 border">{entry.foil}</td>
                    <td className="py-2 px-4 border">{entry.type}</td>
                    <td className="py-2 px-4 border">{entry.rarity}</td>
                    <td className="py-2 px-4 border">{entry.price}</td>
                    <td className="py-2 px-4 border">{entry.priceSymbol}</td>
                    <td className="py-2 px-4 border">{entry.fee}</td>
                    <td className="py-2 px-4 border">
                      {entry.for_sale ? "Yes" : "No"}
                    </td>
                    <td className="py-2 px-4 border space-x-2">
                      {currentUsername !== entry.account && (
                        <button
                          onClick={() => onBuy(entry)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Buy
                        </button>
                      )}

                      {currentUsername === entry.account && (
                        <button
                          onClick={() => onCancel(entry)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListingsTable;
