import NFTCardsList from "@/components/NFTCardsList";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faFilter } from "@fortawesome/free-solid-svg-icons";

const Marketplace = () => {
  const [selectedFaction, setSelectedFaction] = useState("");
  const [selectedRarity, setSelectedRarity] = useState("");
  const [selectedGameStats, setSelectedGameStats] = useState("");

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
            THE MARKETPLACE
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-start my-4 px-4 sm:px-10">
        <button className="mx-1 my-1 px-4 py-2 bg-black text-white rounded flex items-center border border-gray-800">
          <FontAwesomeIcon icon={faFilter} className="mr-2" />
          All Filters
        </button>
        <button
          className="mx-1 my-1 px-4 py-2 bg-black text-white rounded border border-gray-800"
          onClick={() => setSelectedFaction("faction1")}
        >
          Faction
        </button>
        <button
          className="mx-1 my-1 px-4 py-2 bg-black text-white rounded border border-gray-800"
          onClick={() => setSelectedRarity("rarity1")}
        >
          Rarity
        </button>
        <button
          className="mx-1 my-1 px-4 py-2 bg-black text-white rounded border border-gray-800"
          onClick={() => setSelectedGameStats("stat1")}
        >
          Game Stats
        </button>
        <button className="mx-1 my-1 px-4 py-2 bg-black text-white rounded flex items-center border border-gray-800">
          <FontAwesomeIcon icon={faHeart} className="mr-2" />
          Favorites
        </button>
      </div>
      <NFTCardsList
        selectedFaction={selectedFaction}
        selectedRarity={selectedRarity}
        selectedGameStats={selectedGameStats}
      />
    </div>
  );
};

export default Marketplace;
