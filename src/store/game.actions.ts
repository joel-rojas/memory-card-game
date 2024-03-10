import { MCGameCard, MCGameCardDeck } from "@config";

export enum MCGameActionType {
  START_DECK = "Start Deck",
  MATCHED_CARDS = "Matched Cards",
  SHOW_CARD = "Show Card",
  RESET_DECK = "Reset Deck",
  CLEAR_GAME = "Clear Game",
}

export type MCGameAction = {
  type: MCGameActionType;
  payload?: MCGameActionPayload;
};

export type MCGameActionPayload = MCGameCard | MCGameCardDeck;
