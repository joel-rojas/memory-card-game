import { MCActionType, MCAppAction, MCAppActionCustomPayload } from "@store";
import { MCAppState, MCGameCardDeck, MCGameLevel, MCGameProgress } from "@config";

export const initialState: MCAppState = {
  gameLevel: { label: "easy", countdown: 45 },
  gameStatus: "new",
  gameProgress: 'idle',
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
      }
    }
    case MCActionType.CHANGE_PROGRESS: {
      const { cardDeck, countdown } =
        action.payload as MCAppActionCustomPayload;
      return {
        ...state,
        gameProgress: determineGameProgress(state.gameProgress, cardDeck, countdown),
      };
    }
    case MCActionType.RESET_GAME: {
      return { ...initialState };
    }
    default:
      return state;
  }
}
