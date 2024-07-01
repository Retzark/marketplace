import useAppStore from "@/store/useAppStore";
import { useEffect, useState } from "react";
import usePacksStore from "@/store/usePacksStore";

interface Currency {
  symbol: string;
  name: string;
}

interface BuyPacksModalProps {
  showModal: boolean;
  onClose: () => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const BuyPacksModal: React.FC<BuyPacksModalProps> = ({
  showModal,
  onClose,
  quantity,
  setQuantity,
}) => {
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
  const [symbol, setSymbol] = useState<string>(settings.nft_symbol);

  useEffect(() => {
    if (!settings && !error) {
      fetchSettings();
    }
  }, [settings, error, fetchSettings]);

  if (!showModal) {
    return null;
  }

  useEffect(() => {
    if (settings && settings.currencies) {
      const formattedCurrencies = settings.currencies.map((c) => ({
        symbol: c.symbol,
        name: `${c.name} (${c.symbol})`,
      }));
      setSymbol(settings.nft_symbol);
      setCurrencies(formattedCurrencies);
    }
  }, [settings]);

  if (!settingsReady) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading settings. Please try again later.</div>;
  }

  const handleBuyPacks = () => {
    usePacksStore.getState().startPurchase({
      paymentMethod: "crypto",
      currency: currency,
      items: [{ symbol: symbol, quantity }],
      quantity,
    });
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setQuantity(parseInt(value, 10) || 0);
    }
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 2000));
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-gray-900">
        <div className="mt-3 text-center">
          <div className="flex justify-between items-center">
            <h3
              className="text-lg leading-6 font-medium text-white"
              style={{ fontFamily: '"CCElephantmenTall Regular"' }}
            >
              Buy Packs
            </h3>
            <button
              onClick={onClose}
              className="bg-transparent border-0 text-white"
            >
              <span className="text-white">X</span>
            </button>
          </div>
          <div className="mt-2 justify-center">
            {settings.packs.map((pack, index) => (
              <div
                key={index}
                className="p-4 md:w-full flex flex-col items-center justify-center border text-center bg-gray-800 rounded-lg mb-4"
              >
                <img
                  src="/images/card-pack-home.webp"
                  alt={`${pack.symbol} Icon`}
                  className="justify-center w-80"
                />
                <div className="symbol text-white">{pack.symbol}</div>
                <div className="cards text-white">
                  {pack.cards} cards inside
                </div>
                <div className="price text-white">
                  ${pack.price * (quantity || 0)}
                </div>
                <div className="available text-white">
                  Available {pack.remaining.toLocaleString()} of{" "}
                  {pack.quantity.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-5 mb-3">
          <div className="flex items-center">
            <button
              onClick={decrementQuantity}
              className="bg-gray-700 text-white px-3 py-3 rounded-l"
              disabled={quantity <= 1}
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              className="block w-20 p-2 text-lg text-center border-t border-b bg-gray-800 text-white"
              min={1}
              max={2000}
            />
            <button
              onClick={incrementQuantity}
              className="bg-gray-700 text-white px-3 py-3 rounded-r"
              disabled={quantity >= 2000}
            >
              +
            </button>
          </div>
        </div>
        <div className="mt-3 flex justify-center items-center">
          <div className="cryptoPay text-white">
            <label
              htmlFor="currency-select"
              className="block text-sm font-medium text-white"
            >
              Choose Currency:
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded"
            >
              {currencies.map((c) => (
                <option key={c.symbol} value={c.symbol}>
                  {c.name}
                </option>
              ))}
            </select>
            <button
              className={`ml-2 py-2 px-4 rounded font-bold ${
                modalBusy ? "bg-gray-500" : "bg-green-500 hover:bg-green-700"
              } text-white`}
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
