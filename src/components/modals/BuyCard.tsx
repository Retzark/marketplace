import React from "react";
import { SellBookEntry } from "@/types";

interface BuyCardProps {
  isOpen: boolean;
  onRequestClose: () => void;
  entries: SellBookEntry[];
  onConfirm: () => void;
}

const BuyCard: React.FC<BuyCardProps> = ({
  isOpen,
  onRequestClose,
  entries,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-8 rounded-lg shadow-lg z-10 w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-4">Confirm Purchase</h2>
        <div className="mb-4">
          <h3 className="font-bold mb-2">Selected Entries:</h3>
          <table className="min-w-full bg-gray-100 border border-gray-300 rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">CARD ID</th>
                <th className="px-4 py-2 border-b">PRICE</th>
                <th className="px-4 py-2 border-b">SELLER</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.nft_id}>
                  <td className="px-4 py-2 border-b">#{entry.nft_id}</td>
                  <td className="px-4 py-2 border-b">
                    {entry.price} {entry.priceSymbol}
                  </td>
                  <td className="px-4 py-2 border-b">@{entry.account}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded"
            onClick={onRequestClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyCard;
