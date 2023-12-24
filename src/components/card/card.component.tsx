/* eslint-disable jsx-a11y/alt-text */
import { MCGameCard } from "@config";
import React from "react";

interface CardProps {
  card: MCGameCard;
  onTap: (
    ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    card: MCGameCard
  ) => void;
}

const Card: React.FC<CardProps> = ({ card, onTap }) => {
  const { id, isHidden } = card;
  return (
    <div
      className={`${
        isHidden ? "cover-card" : "shadow shadow-gray-400"
      } w-16 sm:w-28 md:w-36 lg:w-48 p-1 rounded-sm cursor-pointer`}
      onClick={(ev) => onTap(ev, card)}
    >
      <img
        className="select-none pointer-events-none"
        src={require(`@assets/${isHidden ? "cover_card" : id}.png`)}
      />
    </div>
  );
};

export default Card;
