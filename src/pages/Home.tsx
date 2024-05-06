import LazyLoad from "react-lazyload";
import NFTCardsList from "@/components/NFTCardsList";

const Home = () => {
  return (
    <div>
      {/* Row for the Hero Section */}
      <div className="row">
        <LazyLoad height="70vh" once>
          <div
            className="relative text-white text-center bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: `url('/images/BANNER-HOMEPAGE.webp')`,
              height: "70vh",
            }}
          >
            <img
              src="/images/banner-homepage-logo.webp"
              alt="Logo"
              className="mx-auto block w-full h-auto sm:w-48 md:w-64"
            />
          </div>
        </LazyLoad>
      </div>
      {/* Row for the Promotional Section */}
      <div className="row">
        <div className="w-full h-44 bg-custom-yellow">
          <div className="flex items-center justify-between p-4">
            <div
              className="text-4xl font-elephantmen sm:text-6xl md:text-5xl"
              style={{ fontFamily: '"CCElephantmenTall Regular"' }}
            >
              ALPHA PACK IS NOW LIVE
            </div>
            <div
              className="text-4xl sm:text-6xl md:text-5xl"
              style={{ fontFamily: '"CCElephantmenTall Regular"' }}
            >
              AVAILABLE ON ANDROID AND IOS
            </div>
            <div
              className="text-4xl sm:text-6xl md:text-5xl"
              style={{ fontFamily: '"CCElephantmenTall Regular"' }}
            >
              FAST MATCHES! ONLY 5 MINUTES SHORT!
            </div>
          </div>
        </div>
      </div>
      {/* Row for the Main Content Section */}
      <div className="row">
        <div className="mx-5 h-full flex flex-row">
          {/* Text Container */}
          <div className="flex-1 px-0 mt-36">
            <div
              className="text-9xl sm:text-9xl md:text-8xl text-white"
              style={{ fontFamily: '"CCElephantmenTall Regular"' }}
            >
              THE RUNDOWN
            </div>
            <br />
            <div
              className="text-9xl sm:text-6xl md:text-5xl text-secondary"
              style={{ fontFamily: '"CCElephantmenTall Regular"' }}
            >
              COLLECT, SELECT, BATTLE!
            </div>
            <br />
            <div
              className="text-3xl sm:text-6xl md:text-2xl text-white"
              style={{ fontFamily: '"Poppins"' }}
            >
              RETZARK lets you experience the ever expanding world of Arondaze
              in the form of a fast-paced, tactical card battler. Carefully
              craft your team from a full roster of characters unique to the
              story, then head into the arena to duke it out with like-minded
              adversaries to see who can deal the most damage to their base— all
              in just a couple of minutes.
            </div>
          </div>

          {/* Image Container */}
          <div className="flex-1 flex justify-end px-0 items-center">
            <img
              src="/images/game-board-home.webp"
              alt="Game Board"
              className="h-auto max-w-full"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-5">
        {" "}
        {/* Ensuring the container is centered and has a maximum width */}
        {/* Single Row for Image and Text */}
        <div className="flex flex-row items-center my-5">
          {" "}
          {/* Flex row to hold image and text side by side */}
          {/* Image Container */}
          <div className="flex-1 flex justify-center items-center">
            <img
              src="/images/card-pack-home.webp"
              alt="Game Board"
              className="max-w-full h-auto"
            />
          </div>
          {/* Text Container */}
          <div className="flex-1">
            {/* Large Header */}
            <div
              className="text-9xl sm:text-9xl md:text-8xl text-white text-center"
              style={{ fontFamily: '"CCElephantmenTall Regular"' }}
            >
              THE ALPHA PACK
            </div>
            <br />

            {/* Sub Header */}
            <div
              className="text-9xl sm:text-6xl md:text-5xl text-secondary text-center"
              style={{ fontFamily: '"CCElephantmenTall Regular"' }}
            >
              5 CARDS, YOURS TO KEEP
            </div>
            <br />

            {/* Description */}
            <div
              className="text-3xl sm:text-6xl md:text-2xl text-white text-center"
              style={{ fontFamily: '"Poppins"' }}
            >
              The Retzark Alpha card deck is a collection of 161 unique cards.
              Each pack contains 5 random cards from the Retzark Alpha card set.
            </div>
            <div className="row mx-5 h-full flex flex-row justify-center items-center">
              {/* Image Container modified to center the text and use the full width */}
              <div className="w-full flex justify-center items-center">
                <div className="text-9xl sm:text-6xl md:text-5xl text-secondary text-center">
                  <button
                    className="px-3 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary-dark" // Assuming you have a darker variation for hover state
                  >
                    BUY CARDS
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-72">
        <div className="row mx-5 mb-10 h-full flex flex-row justify-center items-center">
          {/* Image Container modified to center the text and use the full width */}
          <div className="w-full flex justify-center items-center">
            <div
              className="text-9xl sm:text-9xl md:text-8xl text-white text-center"
              style={{ fontFamily: '"CCElephantmenTall Regular"' }}
            >
              THE MARKETPLACE
            </div>
          </div>
        </div>
        <div className="row mx-5 h-full flex flex-row justify-center items-center">
          {/* Image Container modified to center the text and use the full width */}
          <div className="w-full flex justify-center items-center">
            <div
              className="text-9xl sm:text-6xl md:text-5xl text-secondary text-center"
              style={{ fontFamily: '"CCElephantmenTall Regular"' }}
            >
              BUY, SELL, TRADE!
            </div>
          </div>
        </div>
        <div className="row mx-5 h-full flex justify-center items-center">
          {/* Centered text container modified to half width */}
          <div className="w-1/2 flex justify-center items-center mt-12">
            <div
              className="text-3xl sm:text-2xl md:text-2xl text-white text-center"
              style={{ fontFamily: '"Poppins"' }}
            >
              Don’t have the card you need? Want to get rid of your duplicate
              legendary? Buy, sell, and trade with anyone, anywhere!
            </div>
          </div>
        </div>

        <div className="row mx-5 h-full flex flex-row justify-center items-center">
          {/* Image Container modified to center the text and use the full width */}
          <div className="w-full flex justify-center items-center">
            <div className="text-9xl sm:text-6xl md:text-5xl text-secondary text-center">
              <button
                className="px-3 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary-dark" // Assuming you have a darker variation for hover state
              >
                VIEW MARKETPLACE
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-60">
        <div className="row mx-5 mb-10 h-full flex flex-row justify-center items-center">
          {/* Image Container modified to center the text and use the full width */}
          <div className="w-full flex justify-center items-center">
            <NFTCardsList />
          </div>
        </div>
      </div>

      <div className="row mt-60">
        <div
          className="relative text-white text-center bg-no-repeat bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage: `url('/images/home-prophecy-background.webp')`,
            height: "80vh",
          }}
        >
          <div>
            <div className="w-full flex justify-center items-center">
              <div
                className="text-9xl sm:text-9xl md:text-8xl text-white text-center"
                style={{ fontFamily: '"CCElephantmenTall Regular"' }}
              >
                THE PROPHECHIES OF KRULL
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
              <div
                className="text-9xl sm:text-6xl md:text-5xl text-secondary text-center"
                style={{ fontFamily: '"CCElephantmenTall Regular"' }}
              >
                THE WHITEPAPER YOU NEED TO READ.
              </div>
            </div>
            <div className="w-full flex justify-center items-center mt-12">
              <div
                className="w-1/2 sm:text-2xl md:text-2xl text-white text-center"
                style={{ fontFamily: '"Poppins"' }}
              >
                Peruse the ancient book of <b> Krull the dreamer </b> to learn
                in depth information about Retzark.
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
              <div className="text-9xl sm:text-6xl md:text-5xl text-secondary text-center">
                <button
                  className="px-3 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary-dark" // Assuming you have a darker variation for hover state
                >
                  VIEW MARKETPLACE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="relative text-white text-center bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/subscribe-background-image.webp')`,
          height: "50vh",
        }}
      >
        <div className="w-full flex flex-col justify-center items-center h-full">
          <div
            className="text-black text-9xl sm:text-9xl md:text-8xl text-center"
            style={{ fontFamily: '"CCElephantmenTall Regular"' }}
          >
            FOLLOW THE SEER’S VISIONS
          </div>

          <div className="w-full flex justify-center items-center mt-10">
            <div className="w-full px-4">
              {" "}
              {/* Added px-4 for some padding, adjust as needed */}
              <input
                type="text"
                id="first_name"
                className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
