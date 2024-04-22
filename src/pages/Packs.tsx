import LazyLoad from "react-lazyload";

const Packs = () => {
  return (
    <div>
      <div className="row">
        <LazyLoad height="70vh" once>
          <div
            className="relative text-white text-center bg-no-repeat bg-cover bg-center flex justify-center items-center"
            style={{
              backgroundImage: `url('/images/BANNER-ALPHA-PACK.webp')`,
              height: "70vh",
            }}
          >
            <div className="flex flex-row items-center my-5">
              {" "}
              <div className="flex-1">
                {/* Large Header */}
                <div
                  className="text-9xl sm:text-9xl md:text-10xl text-white text-center"
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
                  The Retzark Alpha card deck is a collection of 161 unique
                  cards. Each pack
                </div>

                <div
                  className="mt-3 text-3xl sm:text-6xl md:text-2xl text-white text-center"
                  style={{ fontFamily: '"Poppins"' }}
                >
                  contains 5 random cards from the Retzark Alpha card set.
                </div>
              </div>
            </div>
          </div>
        </LazyLoad>
      </div>
      <div className="flex flex-row items-center my-5 justify-center">
        <a
          href="#"
          className="block w-full md:w-8/12 flex flex-row items-start bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <img
            src="/images/card-pack-home.webp"
            alt="Descriptive Alt Text"
            className="w-1/4 rounded-l-lg object-cover self-start"
          />
          <div className="p-6 flex-grow">
            <h5
              className="mb-5 text-7xl font-bold tracking-tight text-white dark:text-white"
              style={{ fontFamily: '"Poppins"' }}
            >
              ALPHA PACK
            </h5>
            <hr />

            <p
              className="mt-5 text-2xl  dark:text-white"
              style={{ fontFamily: '"Poppins"' }}
            >
              The ALPHA PACK set is now available!
            </p>

            <p
              className="mt-5 text-2xl  dark:text-white"
              style={{ fontFamily: '"Poppins"' }}
            >
              Each pack contains 5 random cards from the Retzark Alpha card set.
            </p>

            <p
              className="mt-5 text-2xl  dark:text-white"
              style={{ fontFamily: '"Poppins"', fontWeight: "bold" }}
            >
              Guaranteed to contain at least one card that is EPIC or better!
            </p>

            <p
              className="mt-5 text-2xl  dark:text-white"
              style={{ fontFamily: '"Poppins"', fontWeight: "bold" }}
            >
              Drop Rates:
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Packs;
