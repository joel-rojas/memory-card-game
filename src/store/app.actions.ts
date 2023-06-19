import { MCGameLevel, MCGameStatus, MCGameCardDeck } from "@config";

export enum MCActionType {
  CHECK_STATUS = "Check Game Status",
  CHANGE_STATUS = "Change Game Status",
  CHANGE_LEVEL = "Change Game Level",
  RESET_GAME = "Reset Game",
}

export type MCAppAction = {
  type: MCActionType;
  payload: MCAppActionPayload;
};

export type MCAppActionPayload =
  | MCGameStatus
  | MCGameLevel
  | MCAppActionCustomPayloads;

export type MCAppActionCustomPayload1 = {
  cardDeck: MCGameCardDeck;
  countdown: number;
}

export type MCAppActionCustomPayloads = MCAppActionCustomPayload1 | number;
