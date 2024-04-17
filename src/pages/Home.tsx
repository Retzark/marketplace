import LazyLoad from "react-lazyload";

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
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-auto sm:w-48 md:w-64"
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
          <div className="flex-1 px-0">
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
      </div>
    </div>
  );
};

export default Home;
