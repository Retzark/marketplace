import { useState, useEffect } from "react";
import BuyPacksModal from "@/components/modals/BuyPacks";
import Cookies from "js-cookie";
import useAppStore from "@/store/useAppStore";

const Packs = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [affiliate, setAffiliate] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const { settings, settingsReady, error, fetchSettings } = useAppStore(
    (state) => ({
      settings: state.settings,
      settingsReady: state.settingsReady,
      error: state.error,
      fetchSettings: state.fetchSettings,
    }),
  );

  useEffect(() => {
    const affiliateData = Cookies.get("affiliate");
    if (affiliateData) {
      setAffiliate(JSON.parse(affiliateData));
    }
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSelectPack = (pack: string) => {
    setSelectedPack(pack);
    setQuantity(parseInt(pack, 10));
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative text-center bg-no-repeat bg-cover bg-center text-white h-screen sm:h-[70vh]"
        style={{ backgroundImage: `url('/images/BANNER-ALPHA-PACK.webp')` }}
      >
        <div className="flex flex-col items-center justify-center w-full h-full px-4 sm:px-8">
          <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-elephantmen">
            THE ALPHA PACK
          </div>
          <div className="text-xl sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl text-secondary font-elephantmen mt-2 sm:mt-4">
            5 CARDS, YOURS TO KEEP
          </div>
          <div className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-lg text-white max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mt-2 sm:mt-4 font-poppins">
            The Retzark Alpha card deck is a collection of 161 unique cards.
            Each pack contains 5 random cards from the Retzark Alpha card set.
          </div>
        </div>
      </div>

      {/* Packs Section */}
      <div className="px-2 sm:px-4 md:px-8 lg:px-16 my-4 sm:my-8">
        <div className="grid gap-4 sm:gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4">
              <img
                className="w-full md:col-span-1 object-cover rounded-lg"
                src="/images/alpha-pack.webp"
                alt="Alpha Pack"
              />
              <div className="flex flex-col p-2 sm:p-4 text-white md:col-span-2">
                <h5 className="text-2xl sm:text-2xl font-bold mb-5 sm:mb-4 font-poppins">
                  ALPHA PACK
                </h5>
                <div className="flex mb-4 mt-4">
                  <div className="bg-gray-700 text-white px-4 py-2 md:py-3 text-sm md:text-[24px] rounded-md flex font-elephantmen">
                    {settings.packs[0].remaining.toLocaleString()} PACKS
                    REMAINING
                  </div>
                </div>
                <hr className="border-gray-400 border border-gray-400 rounded-md mt-8 mb-8" />
                <p className="text-white text-sm sm:text-base mb-5">
                  The ALPHA PACK set is now available!
                </p>
                <p className="text-white text-sm sm:text-base mb-5">
                  Each pack contains 5 random cards from the Retzark Alpha card
                  set.
                </p>
                <p className="text-white text-sm sm:text-base mb-5">
                  Guaranteed to contain at least one card that is EPIC or
                  better!
                </p>
                <div className="text-white mb-1 md:mt-19 sm:mt-0 sm:col-span-2">
                  <div className="font-bold text-sm sm:text-base mb-5">
                    Drop Rates:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="flex justify-center items-center bg-gray-700 text-white rounded-lg px-2 sm:px-3 py-1 text-xs sm:text-sm md:text-base font-elephantmen whitespace-nowrap max-w-[1/4] h-12">
                      <img
                        src="/images/legendary-badge.svg"
                        alt="LEGENDARY"
                        className="mr-1 flex-shrink-0"
                      />
                      <span>LEGENDARY: 0.25%</span>
                    </div>
                    <div className="flex justify-center items-center bg-gray-700 text-white rounded-lg px-2 sm:px-3 py-1 text-xs sm:text-sm md:text-base font-elephantmen whitespace-nowrap max-w-[1/4] h-12">
                      <img
                        src="/images/epic-badge.svg"
                        alt="EPIC"
                        className="mr-1 flex-shrink-0"
                      />
                      <span>EPIC: 5.75%</span>
                    </div>
                    <div className="flex justify-center items-center bg-gray-700 text-white rounded-lg px-2 sm:px-3 py-1 text-xs sm:text-sm md:text-base font-elephantmen whitespace-nowrap max-w-[1/4] h-12">
                      <img
                        src="/images/rare-badge.svg"
                        alt="RARE"
                        className="mr-1 flex-shrink-0"
                      />
                      <span>RARE: 34%</span>
                    </div>
                    <div className="flex justify-center items-center bg-gray-700 text-white rounded-lg px-2 sm:px-3 py-1 text-xs sm:text-sm md:text-base font-elephantmen whitespace-nowrap max-w-[1/4] h-12">
                      <img
                        src="/images/common-badge.svg"
                        alt="COMMON"
                        className="mr-1 flex-shrink-0"
                      />
                      <span>COMMON: 60%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 sm:p-6">
              <h5 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-4">
                BUY ALPHA PACKS
              </h5>
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => handleSelectPack("10")}
                  className={`${
                    selectedPack === "10"
                      ? "bg-primary text-white"
                      : "bg-gray-700 text-white"
                  } font-bold py-2 px-2 sm:px-4 rounded hover:bg-gray-600 transition duration-150 ease-in-out text-sm sm:text-base`}
                >
                  Buy 10 Packs
                </button>
                <button
                  onClick={() => handleSelectPack("100")}
                  className={`${
                    selectedPack === "100"
                      ? "bg-primary text-white"
                      : "bg-gray-700 text-white"
                  } font-bold py-2 px-2 sm:px-4 rounded hover:bg-gray-600 transition duration-150 ease-in-out text-sm sm:text-base`}
                >
                  Buy 100 Packs
                </button>
                <button
                  onClick={() => handleSelectPack("500")}
                  className={`${
                    selectedPack === "500"
                      ? "bg-primary text-white"
                      : "bg-gray-700 text-white"
                  } font-bold py-2 px-2 sm:px-4 rounded hover:bg-gray-600 transition duration-150 ease-in-out text-sm sm:text-base`}
                >
                  Buy 500 Packs
                </button>
              </div>
              <div className="text-left text-white font-semibold mb-2 text-sm sm:text-base">
                QTY: {selectedPack ? selectedPack : "1"}
              </div>
              <div className="text-lg text-white mb-4 text-left">
                TOTAL PRICE
              </div>
              <div className="flex items-center mb-4">
                <img
                  src="/images/currency_logo.svg"
                  alt="Currency"
                  className="w-6 sm:w-8 h-6 sm:h-8 mr-2"
                />
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  0.083745
                </div>
              </div>
              <button
                className="bg-primary text-white font-bold py-3 px-6 sm:py-2 sm:px-4 rounded mt-4 flex items-center justify-center space-x-2 w-full"
                onClick={handleOpenModal}
              >
                <img
                  src="/images/buy-now.svg"
                  className="w-8 sm:w-10 h-8 sm:h-10"
                  alt="Buy Now"
                />
                <span className="hidden sm:inline">BUY NOW</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <BuyPacksModal
          showModal={showModal}
          onClose={handleCloseModal}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      )}
    </div>
  );
};

export default Packs;
