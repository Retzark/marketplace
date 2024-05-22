import React from "react";
import { Card } from "@/types";

interface StatsAndMovesetProps {
  card: Card;
}

const StatsAndMoveset: React.FC<StatsAndMovesetProps> = ({ card }) => {
  return (
    <div className="flex flex-col bg-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">STATS AND MOVESET</h2>
      <div className="flex flex-col lg:flex-row items-center">
        <img
          className="w-full lg:w-1/3 rounded-lg p-4"
          src={`https://cdn.tribaldex.com/packmanager/DATA/${card.grouping.edition}_${card.grouping.type}_${card.grouping.foil}.png`}
          alt="Card Image"
        />
        <div className="flex-1 lg:ml-6 text-white">
          <h2 className="text-3xl font-bold mb-4">{card.name}</h2>
          <div className="flex flex-wrap mb-4">
            <div className="flex items-center bg-red-600 rounded-full px-2 py-1 mr-2 mb-2">
              HP: 10
            </div>
            <div className="flex items-center bg-purple-600 rounded-full px-2 py-1 mr-2 mb-2">
              ATK: 7
            </div>
            <div className="flex items-center bg-blue-600 rounded-full px-2 py-1 mr-2 mb-2">
              SPD: 8
            </div>
            <div className="flex items-center bg-green-600 rounded-full px-2 py-1 mr-2 mb-2">
              EGY: 7
            </div>
            <div className="flex items-center bg-yellow-600 rounded-full px-2 py-1 mb-2">
              TRN: 5
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Basic Attack</h3>
            <p className="mb-4">Deal 1-4 damage to an enemy unit.</p>
            <h3 className="text-xl font-bold mb-2">Ability</h3>
            <p>
              Deal 5-7 damage to an enemy unit, then enter a stance which grants
              evade for 2 turns. After successfully evading an attack, disables
              2 random enemies for 1 turn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsAndMoveset;
