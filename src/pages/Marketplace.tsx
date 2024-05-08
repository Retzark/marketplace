import NFTCardsList from "@/components/NFTCardsList";

const Marketplace = () => {
  return (
    <div>
      <div className="row">
        <div
          className="relative flex justify-center text-white text-center bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/marketplace-hero.webp')`,
            height: "70vh",
          }}
        >
          <div
            className="text-9xl sm:text-9xl md:text-8xl text-white items-center justify-center mt-48"
            style={{ fontFamily: '"CCElephantmenTall Regular"' }}
          >
            THE MARKETPLACE
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <NFTCardsList />
      </div>
    </div>
  );
};

export default Marketplace;
