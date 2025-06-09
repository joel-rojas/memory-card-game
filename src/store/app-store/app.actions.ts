import type {
  MCGameLevel,
  MCGameStatus,
  MCGameCardDeck,
  MCGameProgress,
  MCAppPreRenderedImgAsset,
} from "@/config";

export const MCActionType = {
  CHECK_STATUS: "Check Game Status",
  CHANGE_PROGRESS: "Change Game Progress",
  CHANGE_PROGRESS_BY_VALUE: "Change Game Progress By Value",
  CHANGE_STATUS: "Change Game Status",
  CHANGE_LEVEL: "Change Game Level",
  CLEAR_GAME: "Clear Game",
  LOAD_ASSETS: "Load Game Assets",
} as const;

export type MCAppAction = {
  type: typeof MCActionType[keyof typeof MCActionType];
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
};

export type MCAppActionCustomPayloads =
  | MCAppActionCustomPayload
  | number
  | MCAppPreRenderedImgAsset[];
