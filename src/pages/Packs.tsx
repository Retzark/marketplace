import { useState } from "react";
import BuyPacks from "@/components/modals/BuyPacks";

const Packs = () => {
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="row">
        <div
          className="relative text-white text-center bg-no-repeat bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage: `url('/images/BANNER-ALPHA-PACK.webp')`,
            height: "70vh", // Ensures the container takes up the full viewport height
            display: "flex", // Establishes the container as a flexbox
            alignItems: "center", // Centers content vertically
            justifyContent: "center", // Centers content horizontally
          }}
        >
          <div className="flex flex-col items-center justify-center w-full px-8">
            {/* Large Header */}
            <div
              className="text-9xl sm:text-9xl md:text-8xl text-white"
              style={{ fontFamily: '"CCElephantmenTall Regular"' }}
            >
              THE ALPHA PACK
            </div>
            <br />

            {/* Sub Header */}
            <div
              className="text-9xl sm:text-6xl md:text-5xl text-secondary"
              style={{ fontFamily: '"CCElephantmenTall Regular"' }}
            >
              5 CARDS, YOURS TO KEEP
            </div>
            <br />

            {/* Description */}
            <div
              className="text-3xl sm:text-6xl md:text-2xl text-white"
              style={{
                fontFamily: '"Poppins"',
                maxWidth: "800px", // Limit width to encourage wrapping
                lineHeight: "1.2", // Adjust line height to fit two lines
                overflow: "hidden", // Hide overflow
                textOverflow: "ellipsis", // Add ellipsis if text is too long
                display: "-webkit-box", // Use webkit box model for line clamping
                WebkitLineClamp: "2", // Clamp text at 2 lines
                WebkitBoxOrient: "vertical", // Set box orientation vertically
              }}
            >
              The Retzark Alpha card deck is a collection of 161 unique cards.
              Each pack contains 5 random cards from the Retzark Alpha card set.
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <button onClick={handleOpenModal} className="">
          Buy Packs
        </button>
      </div>

      {/* Modal component - pass handleClose as a prop to manage closing the modal */}
      {showModal && (
        <BuyPacks showModal={showModal} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Packs;
