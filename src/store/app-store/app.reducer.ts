import {
  MCActionType,
  type MCAppAction,
  type MCAppActionCustomPayload,
} from "@/store";
import type {
  MCAppState,
  MCGameCardDeck,
  MCGameLevel,
  MCGameProgress,
  MCAppPreRenderedImgAsset,
} from "@/config";

export const appInitialState: MCAppState = {
  gameLevel: { label: "easy", countdown: 60 },
  gameStatus: "new",
  gameProgress: "idle",
  imageAssets: [],
};

function determineCardListMatches(cardDeck: MCGameCardDeck): boolean {
  if (cardDeck.length === 0) return false;
  return cardDeck.every((card) => card.isMatched);
}

function determineGameProgress(
  status: MCGameProgress,
  cardDeck: MCGameCardDeck,
  currentCountdown: number
): MCGameProgress {
  const allCardsMatched = determineCardListMatches(cardDeck);
  if (status === "idle" && !allCardsMatched && currentCountdown > 0) {
    return "inProgress";
  }
  if (status === "inProgress") {
    if (currentCountdown > 0 && allCardsMatched) {
      return "win";
    }
    if (currentCountdown <= 0 && !allCardsMatched) {
      return "lose";
    }
    return "inProgress";
  }
  if (status === "win" || status === "lose") {
    return status;
  }
  return "idle";
}

export function appReducer(state: MCAppState, action: MCAppAction): MCAppState {
  switch (action.type) {
    case MCActionType.CHANGE_STATUS: {
      const status = action.payload as MCAppState["gameStatus"];
      return {
        ...state,
        gameStatus: status,
      };
    }
    case MCActionType.CHANGE_LEVEL: {
      const level = action.payload as MCGameLevel;
      return {
        ...state,
        gameLevel: level,
      };
    }
    case MCActionType.CHANGE_PROGRESS_BY_VALUE: {
      return {
        ...state,
        gameProgress: action.payload as MCGameProgress,
      };
    }
    case MCActionType.CHANGE_PROGRESS: {
      const { cardDeck, countdown } =
        action.payload as MCAppActionCustomPayload;
      return {
        ...state,
        gameProgress: determineGameProgress(
          state.gameProgress,
          cardDeck,
          countdown
        ),
      };
    }
    case MCActionType.LOAD_ASSETS: {
      return {
        ...state,
        imageAssets: action.payload as MCAppPreRenderedImgAsset[],
      };
    }
    case MCActionType.CLEAR_GAME: {
      return { ...appInitialState };
    }
    default:
      return state;
  }
}
