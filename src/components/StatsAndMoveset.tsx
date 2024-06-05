import React from "react";
import { Card } from "@/types";

interface StatsAndMovesetProps {
  card: Card;
}

const badgeStyles = {
  hp: "bg-gray-700 text-white",
  atk: "bg-gray-700 text-white",
  spd: "bg-gray-700 text-white",
  egy: "bg-gray-700 text-white",
  basicAttack: "bg-gray-700 text-white",
  ability: "bg-gray-700 text-white",
};

const StatsAndMoveset: React.FC<StatsAndMovesetProps> = ({ card }) => {
  return (
    <div className="flex flex-col bg-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">STATS AND MOVESET</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        <img
          className="w-full lg:w-full rounded-lg p-4"
          src={`https://cdn.tribaldex.com/packmanager/DATA/${card.grouping.edition}_${card.grouping.type}_${card.grouping.foil}.png`}
          alt="Card Image"
        />
        <div className="lg:col-span-2 text-white">
          <h2 className="text-3xl font-bold mb-4">{card.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div
              className={`flex items-center ${badgeStyles.hp} rounded-lg px-3 py-1`}
              style={{
                height: "40px",
              }}
            >
              <span className="mr-1 flex-shrink-0">
                <img src="/images/hp_icon.svg" alt="HP Icon" />
              </span>
              <span className="font-elephantmen text-2xl">HP: {card.hp}</span>
            </div>
            <div
              className={`flex items-center ${badgeStyles.atk} rounded-lg px-3 py-1`}
              style={{
                height: "40px",
              }}
            >
              <span className="mr-1 flex-shrink-0">
                <img src="/images/atk_icon.svg" alt="ATK Icon" />
              </span>
              <span className="font-elephantmen text-2xl">ATK: {card.atk}</span>
            </div>
            <div
              className={`flex items-center ${badgeStyles.spd} rounded-lg px-3 py-1`}
              style={{
                height: "40px",
              }}
            >
              <span className="mr-1 flex-shrink-0">
                <img src="/images/spd_icon.svg" alt="SPD Icon" />
              </span>
              <span className="font-elephantmen text-2xl">SPD: {card.spd}</span>
            </div>
            <div
              className={`flex items-center ${badgeStyles.egy} rounded-lg px-3 py-1`}
              style={{
                height: "40px",
              }}
            >
              <span className="mr-1 flex-shrink-0">
                <img src="/images/egy_icon.svg" alt="EGY Icon" />
              </span>
              <span className="font-elephantmen text-2xl">EGY: {card.egy}</span>
            </div>
          </div>
          <hr />
          <div className="mt-10">
            <div
              className={`flex items-center justify-center ${badgeStyles.basicAttack} rounded-lg px-3 py-1 mb-2`}
              style={{
                maxWidth: "200px", // Adjust this value as necessary
                height: "40px",
              }}
            >
              <span className="mr-1 flex-shrink-0">
                <img
                  src="/images/basic_attack_icon.svg"
                  alt="Basic Attack Icon"
                />
              </span>
              <span className="font-elephantmen text-2xl text-center">
                BASIC ATTACK
              </span>
            </div>
            <p className="mb-4 mt-4 font-poppins">
              Deal 1-4 damage to an enemy unit.
            </p>
            <div
              className={`flex items-center justify-center ${badgeStyles.ability} rounded-lg px-3 py-1 mb-2`}
              style={{
                maxWidth: "120px", // Adjust this value as necessary
                height: "40px",
              }}
            >
              <span className="mr-1 flex-shrink-0">
                <img src="/images/ability_icon.svg" alt="Ability Icon" />
              </span>
              <span className="font-elephantmen text-2xl text-center">
                ABILITY
              </span>
            </div>
            <p className="mb-4 mt-4 font-poppins">
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
