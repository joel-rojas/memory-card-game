import { MCActionType, MCAppAction, MCAppActionCustomPayload1 } from "@store";
import { MCGameStatus, MCAppState, MCGameCardDeck, MCGameLevel } from "@config";

export const initialState: MCAppState = {
  gameLevel: { label: "easy", countdown: 45 },
  gameStatus: "idle",
  currentCountdown: 0,
};

function determineCardListMatches(cardList: MCGameCardDeck): boolean {
  return cardList.every((card) => card.isMatched);
}

function determineGameStatus(
  status: MCGameStatus,
  cardList: MCGameCardDeck,
  countdown: number
): MCGameStatus {
  if (status === "inProgress") {
    const allCardsMatched = determineCardListMatches(cardList);
    if (countdown > 0 && allCardsMatched) {
      return "win";
    }
    if (countdown <= 0 && !allCardsMatched) {
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
    case MCActionType.CHECK_STATUS: {
      const { cardDeck, countdown } =
        action.payload as MCAppActionCustomPayload1;
      return {
        ...state,
        gameStatus: determineGameStatus(state.gameStatus, cardDeck, countdown),
      };
    }
    case MCActionType.RESET_GAME: {
      return { ...initialState };
    }
    default:
      return state;
  }
}
