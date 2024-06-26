import React, { useState, useEffect } from "react";
import { fetchCardsData } from "@/utils/fetchCardData";

interface Card {
  type: string; // This will be equivalent to the ID from cards.json
  edition: string;
  foil: boolean;
  image: string;
}

interface FetchedCard {
  ID: number;
  NAME: string;
  HP: number;
  ATK: number;
  SPD: number;
  EGY: number;
  RARITY: string;
}

interface ViewCardsProps {
  show: boolean;
  handleClose: () => void;
  cards: Card[];
  removeCardByIndex: (index: number) => void;
}

const ViewCards: React.FC<ViewCardsProps> = ({
  show,
  handleClose,
  cards = [],
}) => {
  const [flipped, setFlipped] = useState<boolean[]>(
    Array(cards.length).fill(false)
  );
  const [hasBeenFlipped, setHasBeenFlipped] = useState<boolean[]>(
    Array(cards.length).fill(false)
  );
  const [fetchedCards, setFetchedCards] = useState<FetchedCard[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCardsData();
        setFetchedCards(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFlipped(Array(cards.length).fill(false)); // Reset flipped state when cards change
    setHasBeenFlipped(Array(cards.length).fill(false)); // Reset hasBeenFlipped state when cards change
  }, [cards]);

  if (!show) return null;

  const handleCardClick = (index: number) => {
    if (!hasBeenFlipped[index]) {
      setFlipped((prevFlipped) => {
        const newFlipped = [...prevFlipped];
        newFlipped[index] = !newFlipped[index];
        return newFlipped;
      });
      setHasBeenFlipped((prevHasBeenFlipped) => {
        const newHasBeenFlipped = [...prevHasBeenFlipped];
        newHasBeenFlipped[index] = true;
        return newHasBeenFlipped;
      });
    }
  };

  const getRarityClass = (type: string) => {
    const card = fetchedCards.find((card) => card.ID === parseInt(type));
    if (!card) return "";
    switch (card.RARITY) {
      case "EPIC":
        return "glow-epic";
      case "LEGENDARY":
        return "glow-legendary";
      default:
        return "";
    }
  };

  const mappedCards = cards.map((card, index) => {
    const rarityClass = flipped[index] ? getRarityClass(card.type) : "";

    return (
      <div
        key={index}
        className="p-2 card-container"
        onClick={() => handleCardClick(index)}
        style={{ width: "259px", height: "363px" }}
      >
        <div
          className={`flip-card ${flipped[index] ? "flipped" : ""}`}
          style={{ width: "100%", height: "100%" }}
        >
          <div className="flip-card-inner">
            <div
              className={`flip-card-front bg-white rounded-lg flex items-center justify-center shadow`}
              style={{ width: "100%", height: "100%" }}
            >
              <img
                src="/images/card-back.png"
                alt="Card Back"
                className="h-full w-full rounded-md"
              />
            </div>
            <div
              className={`flip-card-back bg-white rounded-lg flex items-center justify-center shadow ${rarityClass}`}
              style={{ width: "100%", height: "100%" }}
            >
              <img
                src={card.image}
                alt={card.type}
                className="h-full w-full rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div
      className={`fixed inset-0 z-50 ${show ? "" : "hidden"} overflow-y-auto`}
    >
      <div className="flex justify-center items-center min-h-screen">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
        <div className="bg-[#1A1A1A] p-5 rounded-lg shadow-xl w-full h-full mx-auto overflow-hidden z-10 flex flex-col">
          <div className="flex-grow overflow-y-auto">
            {cards.length > 0 ? (
              <div className="flex flex-wrap justify-center">{mappedCards}</div>
            ) : (
              <p className="text-center text-white">No cards to display</p>
            )}
          </div>
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
          transition: transform 0.3s ease-in-out;
        }
        .flip-card.flipped:hover {
          transform: scale(1.05);
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
        .card-container:hover .flip-card.flipped {
          transform: scale(1.05);
        }
        .glow-epic {
          box-shadow: 0 0 20px 5px rgba(138, 43, 226, 0.8);
          animation: glow-violet 1.5s infinite alternate;
        }
        .glow-legendary {
          box-shadow: 0 0 20px 5px rgba(255, 255, 153, 1);
          animation: glow-yellow 1.5s infinite alternate;
        }
        @keyframes glow-violet {
          from {
            box-shadow: 0 0 20px 5px rgba(138, 43, 226, 0.8);
          }
          to {
            box-shadow: 0 0 40px 10px rgba(138, 43, 226, 1);
          }
        }
        @keyframes glow-yellow {
          from {
            box-shadow: 0 0 20px 5px rgba(255, 255, 204, 1);
          }
          to {
            box-shadow: 0 0 40px 10px rgba(255, 255, 255, 1);
          }
        }
      `}</style>
    </div>
  );
};

export default ViewCards;
