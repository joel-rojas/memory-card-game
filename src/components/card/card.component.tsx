import React from "react";

import type { MCGameCard } from "@/config";

interface CardProps {
  card: MCGameCard;
  onTap: (
    ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    card: MCGameCard
  ) => void;
}

/**
 * Card component represents a single card in the memory card game.
 *
 * @component
 * @param {CardProps} props - The properties for the Card component.
 * @param {MCGameCard} props.card - The card object containing its properties.
 * @param {(ev: React.MouseEvent<HTMLDivElement, MouseEvent>, card: MCGameCard) => void} props.onTap - The function to call when the card is clicked.
 *
 * @returns {React.ReactElement} A JSX element representing the card.
 *
 * @example
 * <Card card={card} onTap={handleCardTap} />
 */
const Card: React.FC<CardProps> = ({
  card,
  onTap,
}: CardProps): React.ReactElement => {
  const { isHidden } = card;  

  return (
    <div
      data-testid={`card-${card.uid}`}
      className={`w-16 sm:w-28 md:w-36 lg:w-48 h-16 sm:h-28 md:h-36 lg:h-48 ${
        isHidden ? "bg-card-slateblue" : "shadow shadow-gray-400"
      } relative rounded-sm cursor-pointer `}
      onClick={(ev) => onTap(ev, card)}
    >
      <img
        className={`p-1 absolute select-none pointer-events-none ${
          isHidden ? "visible" : "invisible"
        }`}
        alt={`cover card`}
        src={card.coverCardSrc}
      />
      <img
        className={`p-1 absolute select-none pointer-events-none ${
          isHidden ? "invisible" : "visible"
        }`}
        alt={`face card`}
        src={card.src}
      />
    </div>
  );
};

export default Card;
