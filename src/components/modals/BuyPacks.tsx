import useAppStore from "@/store/useAppStore";
import { useEffect, useState } from "react";
import usePacksStore from "@/store/usePacksStore";
interface Currency {
  symbol: string;
  name: string;
}

const BuyPacksModal = ({ showModal, onClose }) => {
  const { settings, settingsReady, error, fetchSettings } = useAppStore(
    (state) => ({
      settings: state.settings,
      settingsReady: state.settingsReady,
      error: state.error,
      fetchSettings: state.fetchSettings,
    }),
  );
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [currency, setCurrency] = useState<string>("HIVE");
  const [modalBusy, setModalBusy] = useState<boolean>(false);
  const [symbol, setSymbol] = useState<string>("DATA");
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (!settings && !error) {
      fetchSettings();
    }
  }, [settings, error, fetchSettings]);

  if (!showModal) {
    return null;
  }

  // Compute currencies from settings similarly to Vue's computed property
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (settings && settings.currencies) {
      const formattedCurrencies = settings.currencies.map((c) => ({
        symbol: c.symbol,
        name: `${c.name} (${c.symbol})`,
      }));
      setCurrencies(formattedCurrencies);
    }
  }, [settings]); // Dependency on settings

  if (!settingsReady) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading settings. Please try again later.</div>; // Display error state
  }

  const handleBuyPacks = () => {
    usePacksStore.getState().startPurchase({
      payment_method: "crypto",
      currency: "DATA",
      items: [{ symbol: "DATA", quantity: 1 }],
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <div className="flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Buy Packs
            </h3>
            <button
              onClick={onClose}
              className="bg-transparent border-0 text-black"
            >
              <span className="text-black">X</span>
            </button>
          </div>
          <div className="mt-2 justify-center">
            {settings.packs.map((pack, index) => (
              <div
                key={index}
                className="p-4 md:w-full flex flex-col items-center justify-center border text-center"
              >
                <img
                  src="/images/card-pack-home.webp"
                  alt={`${pack.symbol} Icon`}
                  className="justify-center w-80" // Ensures the image is centered if not already
                />
                <div className="symbol">{pack.symbol}</div>
                <div className="cards">{pack.cards} cards inside</div>
                <div className="price">${pack.price}</div>
                <div className="available">
                  Available {pack.remaining.toLocaleString()} of{" "}
                  {pack.quantity.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-5 mb-3">
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            className="block w-48 p-2 text-lg text-center border rounded mx-auto" // Tailwind CSS for styling
            min={1}
            max={2000}
          />
        </div>
        <div className="mt-3 flex justify-center items-center">
          <div className="cryptoPay">
            <label
              htmlFor="currency-select"
              className="block text-sm font-medium text-gray-700"
            >
              Choose Currency:
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              {currencies.map((c) => (
                <option key={c.symbol} value={c.symbol}>
                  {c.name}
                </option>
              ))}
            </select>
            <button
              className={`ml-2 py-2 px-4 rounded font-bold ${modalBusy ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"} text-white`}
              disabled={modalBusy}
              onClick={handleBuyPacks}
            >
              {modalBusy ? "Processing..." : "Pay"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyPacksModal;
