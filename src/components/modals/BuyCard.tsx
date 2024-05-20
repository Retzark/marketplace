import React from "react";

interface SellBookEntry {
  nft_id: number;
  account: string;
  name: string;
  team: string;
  category: string;
  edition: number;
  foil: number;
  type: number;
  rarity: string;
  price: number;
  priceSymbol: string;
  fee: number;
  for_sale: boolean;
}

interface BuyCardProps {
  isOpen: boolean;
  onRequestClose: () => void;
  entry: SellBookEntry | null;
  onConfirm: () => void;
}

const BuyCard: React.FC<BuyCardProps> = ({
  isOpen,
  onRequestClose,
  entry,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-2xl mb-4">Confirm Purchase</h2>
        {entry && (
          <div>
            <p className="mb-2">
              Price: {entry.price} {entry.priceSymbol}
            </p>
            <p className="mb-4">Seller: {entry.account}</p>
            <button
              onClick={onConfirm}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Confirm
            </button>
            <button
              onClick={onRequestClose}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyCard;
