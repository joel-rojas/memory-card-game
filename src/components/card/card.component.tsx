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
    <div className="p-1 shadow-md" onClick={(ev) => onTap(ev, card)}>
      {isHidden ? (
        <img src={require(`@assets/cover_card.png`)} loading="lazy" />
      ) : (
        <img src={require(`@assets/${id}.png`)} loading="lazy" />
      )}
    </div>
  );
};

export default Card;
