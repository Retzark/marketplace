import { useState, ChangeEvent, FormEvent } from "react";
import usePacksStore from "@/store/usePacksStore";

interface TransferPackProps {
  isOpen: boolean;
  onClose: () => void;
}

const TransferPack: React.FC<TransferPackProps> = ({ isOpen, onClose }) => {
  const [number, setNumber] = useState<number>(1); // Number of packs
  const [username, setUsername] = useState<string>(""); // Username
  const [isValid, setIsValid] = useState<boolean>(true); // Validity of the input
  const requestTransferPack = usePacksStore(
    (state) => state.requestTransferPack,
  );
  const [showModal, setShowModal] = useState<boolean>(false); // Manage modal visibility

  if (!isOpen) return null;

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1) {
      setNumber(value);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) {
      alert("Please enter a valid number of packs.");
      return;
    }
    await requestTransferPack({ recipient: username, quantity: number });
    setShowModal(true); // Open the modal after packs are opened
  };

  const handleModalClose = () => {
    setShowModal(false);
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
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={handleUsernameChange}
              />
              <label
                htmlFor="numberInput"
                className="block text-sm font-medium text-gray-700"
              >
                Number of Packs:
              </label>
              <input
                type="number"
                id="quantity"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={number}
                onChange={handleNumberChange}
                min="1"
              />

              <div className="mt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleModalClose}
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
    </>
  );
};

export default TransferPack;
