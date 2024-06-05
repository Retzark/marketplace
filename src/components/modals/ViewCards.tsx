import React from "react";

function ViewCards({
  show,
  handleClose,
  cards = [],
  removeCardByIndex,
  rareTypes,
  epicTypes,
}) {
  if (!show) return null;

  const handleCardClick = (index) => {
    removeCardByIndex(index); // Call Zustand store method to remove a card
  };

  return (
    <div className={`fixed inset-0 z-50 ${show ? "" : "hidden"}`}>
      <div className="flex justify-center items-center min-h-screen">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
        <div className="bg-white p-5 rounded-lg shadow-xl max-w-6xl mx-auto overflow-hidden z-10">
          {cards.length > 0 ? (
            <div className="-mx-2">
              <div className="flex flex-wrap">
                {cards.map(({ type, edition, foil, image }, index) => (
                  <div key={index} className="p-2 sm:w-1/2 md:w-1/4 lg:w-1/4">
                    <div
                      className={`packmanager-card bg-white rounded-lg p-4 flex items-center justify-center shadow ${
                        rareTypes && rareTypes.has(type)
                          ? "border-2 border-yellow-400"
                          : ""
                      } ${
                        epicTypes && epicTypes.has(type)
                          ? "border-2 border-purple-500"
                          : ""
                      }`}
                      onClick={() => handleCardClick(index)}
                    >
                      <img
                        src={image}
                        alt={`Type ${type}, Edition ${edition}, Foil ${foil}`}
                        className="max-h-60 w-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center">No cards to display</p>
          )}

          <div className="text-center mt-5">
            <button
              onClick={handleClose}
              className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
              style={{ transition: "all .15s ease" }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCards;
