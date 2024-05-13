import { useState } from "react";
import BuyPacks from "@/components/modals/BuyPacks";

const Packs = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div
        className="flex items-center justify-center relative text-center bg-no-repeat bg-cover bg-center text-white h-screen sm:h-[70vh] sm:w-[100]"
        style={{ backgroundImage: `url('/images/BANNER-ALPHA-PACK.webp')` }}
      >
        <div className="flex flex-col items-center justify-center w-full px-4 sm:px-8">
          <div
            className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl"
            style={{ fontFamily: '"CCElephantmenTall Regular"' }}
          >
            THE ALPHA PACK
          </div>
          <br />
          <div
            className="text-2xl sm:text-3xl md:text-2xl lg:text-2xl xl:text-4xl text-secondary"
            style={{ fontFamily: '"CCElephantmenTall Regular"' }}
          >
            5 CARDS, YOURS TO KEEP
          </div>
          <br />
          <div
            className="text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-2xl text-white max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl"
            style={{
              fontFamily: '"Poppins"',
              lineHeight: "1.2",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            The Retzark Alpha card deck is a collection of 161 unique cards.
            Each pack contains 5 random cards from the Retzark Alpha card set.
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 md:px-16 lg:px-32 my-8">
        <div className="flex flex-col md:flex-row -mx-2">
          <div className="md:w-2/3 px-2 mb-4 md:mb-0">
            <a
              href="#"
              className="flex flex-col md:flex-row  bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <img
                className="w-full md:w-1/4 object-cover rounded-t-lg p-12 md:rounded-none md:rounded-l-lg md:h-auto"
                src="/images/alpha-pack.webp"
                alt="/"
              />
              <div className="flex flex-col w-full">
                <h5 className="mb-2 mt-12 text-lg md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  ALPHA PACK
                </h5>
                <p className="mb-3 font-normal text-sm md:text-base text-gray-700 dark:text-gray-400">
                  The ALPHA PACK set is now available!
                </p>
                <p className="mb-3 font-normal text-sm md:text-base text-gray-700 dark:text-gray-400">
                  Each pack contains 5 random cards from the Retzark Alpha card
                  set.
                </p>
                <p className="mb-3 font-bold text-sm md:text-base text-gray-700 dark:text-gray-400">
                  Guaranteed to contain at least one card that is EPIC or
                  better!
                </p>

                <p className="mb-3 font-bold text-sm md:text-base text-gray-700 dark:text-gray-400">
                  Drop Rates:
                </p>
              </div>
            </a>
          </div>

          <div className="md:w-1/3 px-2">
            <div className="h-32 md:h-64 lg:h-80 xl:h-96">
              <a
                href="#"
                className="flex flex-col md:flex-row items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="flex flex-col justify-between p-4 leading-normal w-full">
                  <h5 className="mb-2 text-lg md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Buy Alpha Packs
                  </h5>
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => setShowModal(true)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-150 ease-in-out"
                    >
                      Buy 10 Packs
                    </button>
                    <button
                      onClick={() => setShowModal(true)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-150 ease-in-out"
                    >
                      Buy 100 Packs
                    </button>
                    <button
                      onClick={() => setShowModal(true)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-150 ease-in-out"
                    >
                      Buy 500 Packs
                    </button>
                    <hr />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <BuyPacks showModal={showModal} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Packs;
