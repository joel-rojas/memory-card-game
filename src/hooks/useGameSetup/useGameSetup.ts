import * as React from "react";
import { useAppContext, useGameContext } from "@contexts";
import { MCGameCardDeck, MCGameCard } from "@config";
import { MCActionType, MCGameActionType } from "@store";

const useGameSetup = () => {
  const { state, dispatch } = useGameContext();
  const { state: appState, dispatch: appDispatch } = useAppContext();
  const [countdown, setCountdown] = React.useState<number>(
    appState.gameLevel.countdown
  );
  const { cardDeck } = state;
  const MAX_CARDS_SHOWN_PER_TURN = 2;

  const getRandomCharCode = () => {
    const MAX_AVAILABLE_CARDS = 16;
    const INITIAL_CHAR_CODE = 96;
    return (
      INITIAL_CHAR_CODE + Math.floor(Math.random() * MAX_AVAILABLE_CARDS + 1)
    );
  };

  const getInitialRandomList = (count: number) => {
    let nums = new Set<MCGameCard["id"]>();
    while (nums.size < count) {
      const randomCard = `${String.fromCharCode(getRandomCharCode())}_card`;
      !nums.has(randomCard) && nums.add(randomCard);
    }
    return Array.from(nums);
  };

  const generateDeck = <T extends MCGameCardDeck>(): T => {
    const MAX_CARDS = 10;
    const randomList = getInitialRandomList(MAX_CARDS);
    const list = [];
    let i = 0;
    let count = 0;
    while (i < MAX_CARDS) {
      const id = randomList[i];
      const uid = `${id}_${++count}`;
      const newItem = {
        id,
        uid,
        isMatched: false,
        isHidden: true,
      };
      list.push({ ...newItem }, { ...newItem, uid: `${id}_${++count}` });
      count = 0;
      i++;
    }
    return list as T;
  };

  const handleCardOnClick = React.useCallback(
    (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
      card: MCGameCard
    ): void => {
      if (
        state.cardsShown.counter < MAX_CARDS_SHOWN_PER_TURN &&
        !card.isMatched
      ) {
        dispatch({
          type: MCGameActionType.SHOW_CARD,
          payload: card,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.cardsShown]
  );

  // TODO: Refactor this side effect to generate deck once a game is started
  React.useLayoutEffect(() => {
    cardDeck.length === 0 &&
      dispatch({ type: MCGameActionType.START_DECK, payload: generateDeck() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDeck]);

  // Check game status at the start of the game
  React.useEffect(() => {
    appDispatch({ type: MCActionType.CHANGE_STATUS, payload: "inProgress" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Init and process game countdown timer
  React.useEffect(() => {
    if (countdown < 0) {
      return;
    }
    const timerId = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [countdown]);

  // Check game status on every shown card and countdown value change
  React.useEffect(() => {
    appDispatch({
      type: MCActionType.CHECK_STATUS,
      payload: { cardDeck, countdown },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDeck, countdown]);

  // Check if a pair of cards shown are matched
  React.useEffect(() => {
    if (state.cardsShown.counter === MAX_CARDS_SHOWN_PER_TURN) {
      setTimeout(() => {
        dispatch({ type: MCGameActionType.MATCHED_CARDS });
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.cardsShown.counter]);

  // TODO: Temporary log to check game status
  React.useEffect(() => {
    console.log("GAME STATUS", appState.gameStatus);
  }, [appState]);

  return {
    state,
    handleCardOnClick,
  };
};

export default useGameSetup;
