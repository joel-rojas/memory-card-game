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
import { ModalContent } from "@containers";

export default function Play() {
  const {
    state,
    countdown,
    showGameModal,
    getModalContentProps,
    handlePauseGameClick,
    handleCardOnClick,
  } = useGameSetup();
  return (
    <>
      <Modal isOpen={showGameModal.isShown}>
        <ModalContent contentList={getModalContentProps(showGameModal.type)} />
      </Modal>
      <Header>
        <Button text="Pause" onClick={handlePauseGameClick} />
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
