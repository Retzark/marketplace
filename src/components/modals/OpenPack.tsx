import { useState, ChangeEvent, FormEvent } from "react";
import usePacksStore from "@/store/usePacksStore";
import useTransactionStore from "@/store/useTransactionStore";
import useAppStore from "@/store/useAppStore";

interface OpenPackProps {
  isOpen: boolean;
  onClose: () => void;
  onCardsOpened: (cards: any) => void;
}

const OpenPack: React.FC<OpenPackProps> = ({
  isOpen,
  onClose,
  onCardsOpened,
}) => {
  const [number, setNumber] = useState<number>(1);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const requestOpenPacks = usePacksStore((state) => state.requestOpenPacks);
  const fetchAndValidateTransaction = useTransactionStore(
    (state) => state.fetchAndValidateTransaction,
  );
  const { settings, settingsReady, error, fetchSettings } = useAppStore(
    (state) => ({
      settings: state.settings,
      settingsReady: state.settingsReady,
      error: state.error,
      fetchSettings: state.fetchSettings,
    }),
  );

  if (!isOpen) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1) {
      setNumber(value);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) {
      alert("Please enter a valid number of packs.");
      return;
    }
    setLoading(true);
    try {
      const transactionId = await requestOpenPacks({
        packSymbol: settings.nft_symbol,
        packs: number,
      });

      const newCards = await fetchAndValidateTransaction(transactionId);
      onCardsOpened(newCards); // Pass the new cards to the parent component
    } catch (error) {
      console.error("Failed to open packs:", error);
      alert("Failed to open packs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md mx-auto rounded-lg shadow-xl overflow-hidden">
        <div className="p-5">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Enter Number of Packs
          </h2>
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="numberInput"
              className="block text-sm font-medium text-gray-700"
            >
              Number of Packs:
            </label>
            <input
              type="number"
              id="numberInput"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={number}
              onChange={handleChange}
              min="1"
              disabled={loading}
            />
            <div className="mt-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-4 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
                disabled={!isValid || loading}
              >
                {loading ? "Opening..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OpenPack;
