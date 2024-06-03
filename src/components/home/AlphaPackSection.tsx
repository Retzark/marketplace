const AlphaPackSection = () => {
  return (
    <div className="mx-auto px-5 md:px-10 grid gap-10 md:grid-cols-2 items-center">
      <div className="flex justify-center">
        <img
          src="/images/card-pack-home.webp"
          alt="Game Board"
          className="max-w-full h-auto"
        />
      </div>
      <div>
        <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-elephantmen text-white text-center">
          THE ALPHA PACK
        </div>
        <br />
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-elephantmen text-secondary text-center mb-10 italic font-semibold">
          5 CARDS, YOURS TO KEEP
        </div>
        <br />
        <div
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-poppins text-white text-center"
          style={{ lineHeight: "2.0" }}
        >
          The Retzark Alpha card deck is a collection of 161 unique cards. Each
          pack contains 5 random cards from the Retzark Alpha card set.
        </div>
        <div className="flex justify-center">
          <a href="/packs">
            <button className="mt-10 px-10 py-3 rounded-md text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white bg-primary hover:bg-primary-dark shadow-lg font-elephantmen">
              BUY CARDS
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AlphaPackSection;
