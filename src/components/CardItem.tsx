import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/types/Card";

interface CardItemProps {
  card: Card;
  count: number;
  settings: any;
}

const CardItem: React.FC<CardItemProps> = ({ card, count, settings }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/collection/card/${card.type}`, { state: { card } });
  };

  return (
    <div
      onClick={handleClick}
      className="card bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md relative cursor-pointer"
    >
      <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs py-1 px-2 rounded-bl-lg rounded-tr-lg">
        {count}
      </div>
      <img
        src={`https://cdn.tribaldex.com/packmanager/${settings.nft_symbol}/${card.edition}_${card.type}_${card.foil}.png`}
        alt={card.name}
        className="w-full h-full object-cover"
      />
      <div className="p-3">
        <h3 className="text-md font-semibold">{card.name}</h3>
        <p className="text-sm mt-1">{card.description}</p>
      </div>
    </div>
  );
};

export default CardItem;
