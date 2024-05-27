import React, { useState } from "react";
import BuyPacksModal from "@/components/modals/BuyPacks";

const Packs = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPack, setSelectedPack] = useState(null);

  const handleOpenModal = (pack) => {
    setSelectedPack(pack);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSelectPack = (pack) => {
    setSelectedPack(pack);
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
            <div className="flex flex-col md:flex-row bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6">
              <img
                className="w-full md:w-1/3 object-cover rounded-t-lg md:rounded-none md:rounded-l-lg p-4"
                src="/images/alpha-pack.webp"
                alt="Alpha Pack"
              />
              <div className="flex flex-col justify-between p-4 leading-normal text-white">
                <h5
                  className="text-2xl font-bold mb-4"
                  style={{
                    fontFamily: '"Poppins"',
                    fontSize: "30px",
                  }}
                >
                  ALPHA PACK
                </h5>
                <div
                  className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm flex items-center justify-center"
                  style={{
                    fontFamily: '"CCElephantmenTall Regular"',
                    height: "40px",
                    fontSize: "24px",
                    width: "300px",
                    maxWidth: "100%", // Ensures responsiveness
                  }}
                >
                  1,203,596 PACKS REMAINING
                </div>

                <p className="text-white mb-1">
                  The ALPHA PACK set is now available!
                </p>
                <p className="text-white mb-1">
                  Each pack contains 5 random cards from the Retzark Alpha card
                  set.
                </p>
                <p className="text-white font-bold mb-1">
                  Guaranteed to contain at least one card that is EPIC or
                  better!
                </p>
                <div className="text-white mb-1">
                  <div className="font-bold mb-1">Drop Rates:</div>
                  <div className="flex flex-wrap justify-start gap-2">
                    <div
                      className={`flex items-center bg-gray-700 text-white rounded-lg px-3 py-1 mr-1 mb-1`}
                      style={{
                        fontFamily: '"CCElephantmenTall Regular"',
                        width: "100%",
                        maxWidth: "180px",
                        height: "40px",
                        fontSize: "18px",
                      }}
                    >
                      <span className="mr-1 flex-shrink-0">
                        <img src="/images/legendary-badge.svg" alt="SPD Icon" />
                      </span>
                      <span> LEGENDARY: 0.25%</span>
                    </div>

                    <div
                      className={`flex items-center bg-gray-700 text-white rounded-lg px-3 py-1 mr-1 mb-1`}
                      style={{
                        fontFamily: '"CCElephantmenTall Regular"',
                        width: "100%",
                        maxWidth: "131px",
                        height: "40px",
                        fontSize: "18px",
                      }}
                    >
                      <span className="mr-1 flex-shrink-0">
                        <img src="/images/legendary-badge.svg" alt="SPD Icon" />
                      </span>
                      <span> EPIC: 5.75%</span>
                    </div>

                    <div
                      className={`flex items-center bg-gray-700 text-white rounded-lg px-3 py-1 mr-1 mb-1`}
                      style={{
                        fontFamily: '"CCElephantmenTall Regular"',
                        width: "100%",
                        maxWidth: "131px",
                        height: "40px",
                        fontSize: "18px",
                      }}
                    >
                      <span className="mr-1 flex-shrink-0">
                        <img src="/images/legendary-badge.svg" alt="SPD Icon" />
                      </span>
                      <span> RARE: 34%</span>
                    </div>

                    <div
                      className={`flex items-center bg-gray-700 text-white rounded-lg px-3 py-1 mr-1 mb-1`}
                      style={{
                        fontFamily: '"CCElephantmenTall Regular"',
                        width: "100%",
                        maxWidth: "152px",
                        fontSize: "18px",
                      }}
                    >
                      <span className="mr-1 flex-shrink-0">
                        <img src="/images/legendary-badge.svg" alt="SPD Icon" />
                      </span>
                      <span> COMMON: 60%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/3 px-2">
            <div className="h-32 md:h-64 lg:h-80 xl:h-96">
              <div className="flex flex-col bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6">
                <h5 className="text-2xl font-bold text-white mb-4 text-left">
                  BUY ALPHA PACKS
                </h5>
                <div className="flex flex-row space-x-2 mb-4">
                  <button
                    onClick={() => handleSelectPack("10")}
                    className={`${
                      selectedPack === "10"
                        ? "bg-primary text-white"
                        : "bg-gray-700 text-white"
                    } font-bold py-2 px-4 rounded hover:bg-gray-600 transition duration-150 ease-in-out text-left`}
                    style={{
                      fontSize: "15px",
                      borderRadius: "20px",
                    }}
                  >
                    Buy 10 Packs
                  </button>
                  <button
                    onClick={() => handleSelectPack("100")}
                    className={`${
                      selectedPack === "100"
                        ? "bg-primary text-white"
                        : "bg-gray-700 text-white"
                    } font-bold py-2 px-4 rounded hover:bg-gray-600 transition duration-150 ease-in-out text-left`}
                    style={{
                      fontSize: "15px",
                      borderRadius: "20px",
                    }}
                  >
                    Buy 100 Packs
                  </button>
                  <button
                    onClick={() => handleSelectPack("500")}
                    className={`${
                      selectedPack === "500"
                        ? "bg-primary text-white"
                        : "bg-gray-700 text-white"
                    } font-bold py-2 px-4 rounded hover:bg-gray-600 transition duration-150 ease-in-out text-left`}
                    style={{
                      fontSize: "15px",
                      borderRadius: "20px",
                    }}
                  >
                    Buy 500 Packs
                  </button>
                </div>
                <div className="w-full text-left text-white font-semibold mb-2">
                  QTY: {selectedPack ? selectedPack : "130"}
                </div>
                <div className="text-lg text-white mb-4 text-left">
                  TOTAL PRICE
                </div>
                <div className="flex items-center mb-4">
                  <img
                    src="/images/currency_logo.svg"
                    alt="LB Icon"
                    className="w-8 h-8 mr-2"
                  />
                  <div className="text-3xl font-bold text-white">0.083745</div>
                </div>
                <button className="bg-primary text-white font-bold py-2 px-4 rounded mt-4 flex items-center justify-center space-x-2">
                  <img
                    src="/images/buy-now.svg"
                    className="w-7 h-7"
                    alt="Ascension Level Icon"
                  />
                  <span>BUY NOW</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <BuyPacksModal showModal={showModal} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Packs;
