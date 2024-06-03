const MarketplaceSection = () => {
  return (
    <div className="mt-72">
      <div className="text-center text-white">
        <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-elephantmen">
          THE MARKETPLACE
        </div>
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-elephantmen text-secondary italic font-semibold">
          BUY, SELL, TRADE!
        </div>
        <div
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-poppins text-white mt-12 px-5 md:px-10"
          style={{ lineHeight: "2.0" }}
        >
          Don’t have the card you need? Want to get rid of your duplicate
          legendary? Buy, sell, and trade with anyone, anywhere!
        </div>
        <a href="/marketplace">
          <button
            className="mt-10 px-5 py-3 rounded-md text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-white bg-primary hover:bg-primary-dark shadow-lg font-elephantmen"
            style={{ lineHeight: "2.0" }}
          >
            VIEW MARKETPLACE
          </button>
        </a>
      </div>
    </div>
  );
};

export default MarketplaceSection;
