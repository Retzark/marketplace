import { useState } from "react";

const OpenPack = ({ isOpen, onClose }) => {
  const [number, setNumber] = useState(1); // Default to 1 to avoid zero

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    onClose(); // Optionally close the modal on submit
  };

  return (
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
              onChange={(e) =>
                setNumber(Math.max(1, parseInt(e.target.value, 10) || 1))
              }
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
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OpenPack;
