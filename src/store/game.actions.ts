import { MCGameCard } from "@config";

export enum MCGameActionType {
  MATCHED_CARDS = "Matched Cards",
  SHOW_CARD = "Show Card",
  RESET_DECK = "Reset Deck",
}

export type MCGameAction = {
  type: MCGameActionType;
  payload: MCGameActionPayload;
};

export type MCGameActionPayload = MCGameCard;
