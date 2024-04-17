const Cards = () => {
  return (
    <div className="marketplace-page">
      <h1 className="text-3xl font-bold text-center my-8">Cards</h1>
      <div className="items-list">
        {/* Placeholder content to simulate marketplace items */}
        <div className="item bg-gray-100 p-6 rounded-lg shadow-md m-4">
          <h2 className="text-xl font-bold">Item 1</h2>
          <p>$100</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-150">
            Buy Now
          </button>
        </div>
        <div className="item bg-gray-100 p-6 rounded-lg shadow-md m-4">
          <h2 className="text-xl font-bold">Item 2</h2>
          <p>$250</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-150">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
