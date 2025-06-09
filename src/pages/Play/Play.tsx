import React from "react";

import {
  Card,
  Body,
  Board,
  Header,
  CountDown,
  Button,
  Modal,
  Page,
} from "@/components";
import { useGameSetup } from "@/hooks";
import { MenuContent } from "@/containers";

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
    <Page>
      <Modal isOpen={showGameModal.isShown}>
        <MenuContent contentList={getModalContentProps(showGameModal.type)} />
      </Modal>
      <Header>
        <Button type="button" label="Pause" onClick={handlePauseGameClick} />
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
    </Page>
  );
}
