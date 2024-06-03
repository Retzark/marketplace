const SubscribeSection = () => {
  return (
    <div
      className="relative text-white text-center bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: `url('/images/subscribe-background-image.webp')`,
        height: "50vh",
      }}
    >
      <div className="w-full flex flex-col justify-center items-center h-full">
        <div className="text-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-elephantmen text-center">
          FOLLOW THE SEER’S VISIONS
        </div>
        <div className="w-full px-4 mt-10 mb-10 flex justify-center">
          <div className="relative flex items-center w-full max-w-xl">
            <input
              type="email"
              id="email_address"
              className="w-full border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-4 pr-12 h-20 bg-white"
              placeholder="Your Email"
              required
            />
            <button className="px-4 py-2 h-20 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary-dark">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribeSection;
