import LazyLoad from "react-lazyload";

const Packs = () => {
  return (
    <div>
      <div className="row">
        <LazyLoad height="70vh" once>
          <div
            className="relative text-white text-center bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: `url('/images/BANNER-ALPHA-PACK.webp')`,
              height: "70vh",
            }}
          ></div>
        </LazyLoad>
      </div>
    </div>
  );
};

export default Packs;
