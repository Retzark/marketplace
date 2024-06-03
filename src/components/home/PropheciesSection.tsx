const PropheciesSection = () => {
  return (
    <div
      className="relative text-white text-center bg-no-repeat bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url('/images/home-prophecy-background.webp')`,
        height: "80vh",
      }}
    >
      <div>
        <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-elephantmen">
          THE PROPHECIES OF KRULL
        </div>
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-elephantmen text-secondary">
          THE WHITEPAPER YOU NEED TO READ.
        </div>
        <div className="w-full sm:w-3/4 md:w-1/2 mx-auto text-lg sm:text-xl md:text-2xl lg:text-3xl text-white mt-12 font-poppins">
          Peruse the ancient book of <b> Krull the dreamer </b> to learn
          in-depth information about Retzark.
        </div>
        <a href="https://peakd.com/retzark/@retzark/the-prophecies-of-krull-retzark-white-paper">
          <button className="mt-10 px-5 py-3 rounded-md text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-white bg-primary hover:bg-primary-dark shadow-lg font-elephantmen uppercase">
            Read Whitepaper
          </button>
        </a>
      </div>
    </div>
  );
};

export default PropheciesSection;
