import React, { useState, useEffect } from "react";

interface Card {
  type: string;
  edition: string;
  foil: boolean;
  image: string;
}

interface ViewCardsProps {
  show: boolean;
  handleClose: () => void;
  cards: Card[];
  removeCardByIndex: (index: number) => void;
  rareTypes?: Set<string>;
  epicTypes?: Set<string>;
}

const ViewCards: React.FC<ViewCardsProps> = ({
  show,
  handleClose,
  cards = [],
  removeCardByIndex,
  rareTypes,
  epicTypes,
}) => {
  const [flipped, setFlipped] = useState<boolean[]>(
    Array(cards.length).fill(false),
  );

  useEffect(() => {
    setFlipped(Array(cards.length).fill(false)); // Reset flipped state when cards change
  }, [cards]);

  if (!show) return null;

  const handleCardClick = (index: number) => {
    setFlipped((prevFlipped) => {
      const newFlipped = [...prevFlipped];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${show ? "" : "hidden"} overflow-y-auto`}
    >
      <div className="flex justify-center items-center min-h-screen">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
        <div className="bg-white p-5 rounded-lg shadow-xl max-w-6xl w-full mx-auto overflow-hidden z-10">
          {cards.length > 0 ? (
            <div className="flex flex-wrap justify-center">
              {cards.map(({ type, edition, foil, image }, index) => (
                <div
                  key={index}
                  className="p-2"
                  onClick={() => handleCardClick(index)}
                  style={{ width: "259px", height: "363px" }}
                >
                  <div
                    className={`flip-card ${flipped[index] ? "flipped" : ""}`}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <div className="flip-card-inner">
                      <div
                        className={`flip-card-front bg-white rounded-lg flex items-center justify-center shadow ${
                          rareTypes && rareTypes.has(type)
                            ? "border-2 border-yellow-400"
                            : ""
                        } ${
                          epicTypes && epicTypes.has(type)
                            ? "border-2 border-purple-500"
                            : ""
                        }`}
                        style={{ width: "100%", height: "100%" }}
                      >
                        <img
                          src="/images/card-back.png"
                          alt="Card Back"
                          className="h-full w-full object-cover rounded-md"
                        />
                      </div>
                      <div
                        className={`flip-card-back bg-white rounded-lg flex items-center justify-center shadow ${
                          rareTypes && rareTypes.has(type)
                            ? "border-2 border-yellow-400"
                            : ""
                        } ${
                          epicTypes && epicTypes.has(type)
                            ? "border-2 border-purple-500"
                            : ""
                        }`}
                        style={{ width: "100%", height: "100%" }}
                      >
                        <img
                          src={image}
                          alt={`Type ${type}, Edition ${edition}, Foil ${foil}`}
                          className="h-full w-full  rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
      <style>{`
        .flip-card {
          perspective: 1000px;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        .flip-card.flipped .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default ViewCards;
