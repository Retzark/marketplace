import React, { useCallback, useEffect, useState } from "react";
import { SellBookEntry } from "@/types";
import sidechainApi from "@/api/sidechainApi";
import useAppStore from "@/store/useAppStore";
import useUserStore from "@/store/userStore";

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
  const [balance, setBalance] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const user = useUserStore((state) => state.user);

  const { settings, settingsReady } = useAppStore((state) => ({
    settings: state.settings,
    settingsReady: state.settingsReady,
  }));

  const fetchData = useCallback(async () => {
    if (!settingsReady || !settings || !settings.sidechain_rpc) {
      return;
    }
    try {
      const endpoint = "contracts";
      const symbols = ["ZARK"];
      const query = {
        account: user?.username,
        symbol: { $in: symbols },
      };
      const method = Array.isArray(symbols) ? "find" : "findOne";
      const request = {
        method,
        params: {
          contract: "tokens",
          table: "balances",
          query,
        },
      };
      const response = await sidechainApi.call(endpoint, request);
      setBalance(Math.floor(response[0].balance));
    } catch (e) {
      console.error("Failed to fetch or process data:", e);
    }
  }, [settings, settingsReady, user]);

  useEffect(() => {
    if (settingsReady) {
      fetchData();
    }
  }, [fetchData, settingsReady]);

  useEffect(() => {
    const total = entries.reduce((sum, entry) => sum + entry.price, 0);
    setTotalPrice(total);
  }, [entries]);

  // Filter out duplicate entries based on nft_id
  const uniqueEntries = entries.filter(
    (entry, index, self) =>
      index === self.findIndex((e) => e.nft_id === entry.nft_id),
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-2xl z-10 w-full max-w-3xl">
        <h2 className="text-3xl font-semibold mb-6 text-white">
          Confirm Purchase
        </h2>
        <div className="mb-6">
          <h3 className="font-semibold mb-4 text-gray-300">
            Selected Entries:
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-900 border border-gray-700 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-4 py-3 border-b text-left text-gray-300 font-medium">
                    CARD ID
                  </th>
                  <th className="px-4 py-3 border-b text-left text-gray-300 font-medium">
                    PRICE
                  </th>
                  <th className="px-4 py-3 border-b text-left text-gray-300 font-medium">
                    SELLER
                  </th>
                </tr>
              </thead>
              <tbody>
                {uniqueEntries.map((entry) => (
                  <tr key={entry.nft_id} className="hover:bg-gray-700">
                    <td className="px-4 py-3 border-b text-gray-300">
                      #{entry.nft_id}
                    </td>
                    <td className="px-4 py-3 border-b text-gray-300">
                      {entry.price} {entry.priceSymbol}
                    </td>
                    <td className="px-4 py-3 border-b text-gray-300">
                      @{entry.account}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mb-6 text-white">
          <h3 className="font-semibold text-gray-300">Total Price:</h3>
          <p className="text-lg">{totalPrice} ZARK</p>
        </div>
        <div className="mb-6 text-white">
          <h3 className="font-semibold text-gray-300">Current Balance:</h3>
          <p className="text-lg">{balance} ZARK</p>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-red-600 text-white py-2 px-4 rounded-lg shadow hover:bg-red-700 transition duration-200"
            onClick={onRequestClose}
          >
            Cancel
          </button>
          <button
            className={`${
              balance < totalPrice
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } text-white py-2 px-4 rounded-lg shadow transition duration-200`}
            onClick={onConfirm}
            disabled={balance < totalPrice}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyCard;
