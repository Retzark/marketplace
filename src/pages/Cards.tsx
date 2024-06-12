import CollectionCardsList from "@/components/CollectionCardsList";

const Cards = () => {
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
            className="text-5xl sm:text-6xl md:text-8xl text-white items-center justify-center mt-24 sm:mt-32 md:mt-48"
            style={{ fontFamily: '"CCElephantmenTall Regular"' }}
          >
            Collections
          </div>
        </div>
      </div>

      <CollectionCardsList />
    </div>
  );
};

export default Cards;
