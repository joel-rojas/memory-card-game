import { MCGameLevel, MCGameStatus, MCGameCardDeck, MCGameProgress } from "@config";

export enum MCActionType {
  CHECK_STATUS = "Check Game Status",
  CHANGE_PROGRESS = "Change Game Progress",
  CHANGE_PROGRESS_BY_VALUE = "Change Game Progress By Value",
  CHANGE_STATUS = "Change Game Status",
  CHANGE_LEVEL = "Change Game Level",
  RESET_GAME = "Reset Game",
}

export type MCAppAction = {
  type: MCActionType;
  payload?: MCAppActionPayload;
};

export type MCAppActionPayload =
  | MCGameStatus
  | MCGameProgress
  | MCGameLevel
  | MCAppActionCustomPayloads;

export type MCAppActionCustomPayload = {
  cardDeck: MCGameCardDeck;
  countdown: number;
}

export type MCAppActionCustomPayloads = MCAppActionCustomPayload | number;
