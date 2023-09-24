import React from "react";

import { Card, Body, Board } from "@components";
import { useGameSetup } from "@hooks";

export default function Play() {
  const { state, handleCardOnClick } = useGameSetup();
  return (
    <Body>
      <Board>
        {state.cardDeck.map((card) => {
          return (
            <Card key={card.uid} card={card} onTap={handleCardOnClick} />
          );
        })}
      </Board>
    </Body>
  );
}
