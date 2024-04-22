import { useState } from "react";
import LazyLoad from "react-lazyload";
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
        <LazyLoad height="70vh" once>
          <div
            className="relative text-white text-center bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: `url('/images/BANNER-ALPHA-PACK.webp')`,
              height: "70vh",
            }}
          >
            <button
              onClick={handleOpenModal}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
              Buy Packs
            </button>
          </div>
        </LazyLoad>
      </div>

      {/* Modal component - pass handleClose as a prop to manage closing the modal */}
      {showModal && (
        <BuyPacks showModal={showModal} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Packs;
