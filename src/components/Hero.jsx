const Hero = () => {
  return (
    <div
      className="relative text-white text-center bg-no-repeat bg-cover bg-center py-48"
      style={{
        backgroundImage: `url('/images/marketplace_banner.webp')`,
      }}
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
        The Marketplace
      </h1>
      <p className="text-xl md:text-2xl lg:text-3xl mb-8">
        Find everything you need, all in one place.
      </p>
      <div className="space-x-4">
        <button className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out">
          Shop Now
        </button>
        <button className="bg-transparent hover:bg-blue-500 text-blue-200 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-md transition duration-300 ease-in-out">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Hero;
