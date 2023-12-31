import React from "react";

import {
  Card,
  Body,
  Board,
  Header,
  CountDown,
  Button,
  Modal,
} from "@components";
import { useGameSetup } from "@hooks";

export default function Play() {
  const {
    state,
    countdown,
    showPauseModal,
    handleCardOnClick,
    handleResetGameClick,
    handleShowModalClick,
    handleCloseModalClick,
  } = useGameSetup();
  return (
    <>
      <Modal isOpen={showPauseModal}>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl text-center md:text-4xl">Game Paused</h1>
          <Button text="Resume" onClick={handleCloseModalClick} />
          <Button text="Reset" onClick={handleResetGameClick} />
          <Button text="Main Menu" onClick={handleCloseModalClick} />
        </div>
      </Modal>
      <Header>
        <Button text="Pause" onClick={handleShowModalClick} />
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
