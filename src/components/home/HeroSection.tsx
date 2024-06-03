const HeroSection = () => {
  return (
    <div
      className="relative text-white text-center bg-no-repeat bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url('/images/BANNER-HOMEPAGE.webp')`,
        height: "70vh",
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="relative w-full flex flex-col items-center justify-center">
          <img
            src="/images/banner-homepage-logo.webp"
            alt="Logo"
            className="w-48 md:w-72 lg:w-96 max-w-full"
          />
          <a href="/packs" className="mt-8">
            <button className="px-8 py-3 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white bg-primary hover:bg-primary-dark rounded-md shadow-lg font-elephantmen">
              BUY CARDS
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
