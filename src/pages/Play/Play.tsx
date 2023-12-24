import React from "react";

import { Card, Body, Board, Header, CountDown, Button } from "@components";
import { useGameSetup } from "@hooks";

export default function Play() {
  const { state, countdown, handleCardOnClick } = useGameSetup();
  return (
    <>
      <Header>
        <Button text='Pause' />
        <CountDown>{countdown}</CountDown>
      </Header>
      <Body>
        <Board>
          {state.cardDeck.map((card) => {
            return (
              <Card key={card.uid} card={card} onTap={handleCardOnClick} />
            );
          })}
        </Board>
      </Body>
    </>
  );
}
