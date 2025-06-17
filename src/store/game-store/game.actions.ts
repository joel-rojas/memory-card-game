import type {
  MCAppPreRenderedImgAsset,
  MCGameCard,
  MCGameCardDeck,
} from "@/config";

export const MCGameActionType = {
  START_DECK: "Start Deck",
  MATCHED_CARDS: "Matched Cards",
  SHOW_CARD: "Show Card",
  RESET_DECK: "Reset Deck",
  CLEAR_GAME: "Clear Game",
  ERROR: "Error",
} as const;

export type MCGameAction = {
  type: (typeof MCGameActionType)[keyof typeof MCGameActionType];
  payload?: MCGameActionPayload;
};

export type MCGameActionPayload =
  | MCGameCard
  | MCGameCardDeck
  | MCAppPreRenderedImgAsset[];
