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
      className={`w-16 sm:w-28 md:w-36 lg:w-48 h-16 sm:h-28 md:h-36 lg:h-48 ${
        isHidden ? "cover-card" : "shadow shadow-gray-400"
      } relative rounded-sm cursor-pointer `}
      onClick={(ev) => onTap(ev, card)}
    >
      <img
        className={`p-1 ${
          isHidden ? "visible" : "invisible"
        } absolute select-none pointer-events-none`}
        src={require(`@assets/cover_card.png`)}
      />
      <img
        className={`w-full h-full rounded-sm ${
          isHidden ? "invisible" : "visible"
        }`}
        src={card.src}
      />
    </div>
  );
};

export default Card;
