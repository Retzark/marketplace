import { useState } from "react";
import usePacksStore from "@/store/usePacksStore";
import ViewCards from "@/components/modals/ViewCards"; // Import the modal component

const OpenPack = ({ isOpen, onClose }) => {
  const [number, setNumber] = useState(1);
  const [isValid, setIsValid] = useState(true);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const requestOpenPacks = usePacksStore((state) => state.requestOpenPacks);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1) {
      setNumber(value);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValid) {
      alert("Please enter a valid number of packs.");
      return;
    }
    await requestOpenPacks({ packSymbol: "DATA", packs: number });
    setShowModal(true); // Open the modal after packs are opened
  };

  const handleModalClose = () => {
    setShowModal(false);
    onClose(); // Optional: Close the parent component as well
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
        <div className="bg-white w-full max-w-md mx-auto rounded-lg shadow-xl overflow-hidden">
          <div className="p-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Enter Number of Packs
            </h2>
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="numberInput"
                className="block text-sm font-medium text-gray-700"
              >
                Number of Packs:
              </label>
              <input
                type="number"
                id="numberInput"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={number}
                onChange={handleChange}
                min="1"
              />
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2 px-4 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
                  disabled={!isValid}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showModal && (
        <ViewCards show={showModal} handleClose={handleModalClose} />
      )}
    </>
  );
};

export default OpenPack;
