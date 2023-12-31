import * as React from "react";
import { useAppContext, useGameContext } from "@contexts";
import { MCGameCardDeck, MCGameCard } from "@config";
import { MCActionType, MCGameActionType } from "@store";

const useGameSetup = () => {
  const { state: gameState, dispatch: gameDispatch } = useGameContext();
  const { state: appState, dispatch: appDispatch } = useAppContext();
  const [showPauseModal, setShowPauseModal] = React.useState<boolean>(false);
  const { gameStatus, gameLevel } = appState;
  const { cardDeck } = gameState;
  const [countdown, setCountdown] = React.useState<number>(gameLevel.countdown);
  const MAX_CARDS_SHOWN_PER_TURN = 2;

  const getRandomCharCode = () => {
    const MAX_AVAILABLE_CARDS = 16;
    const INITIAL_CHAR_CODE = 97;
    return INITIAL_CHAR_CODE + Math.floor(Math.random() * MAX_AVAILABLE_CARDS);
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
        gameState.cardsShown.counter < MAX_CARDS_SHOWN_PER_TURN &&
        !card.isMatched
      ) {
        gameDispatch({
          type: MCGameActionType.SHOW_CARD,
          payload: card,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gameState.cardsShown]
  );

  const handleResetGameClick = () => {
    appDispatch({ type: MCActionType.CHANGE_STATUS, payload: "new" });
    gameDispatch({ type: MCGameActionType.RESET_DECK });
    setCountdown(gameLevel.countdown);
    setShowPauseModal(false);
  };

  const handleShowModalClick = () => {
    setShowPauseModal(true);
  };

  const handleCloseModalClick = () => {
    setShowPauseModal(false);
  };

  // TODO: Refactor this side effect to generate deck once a game is started
  React.useLayoutEffect(() => {
    cardDeck.length === 0 &&
      gameDispatch({ type: MCGameActionType.START_DECK, payload: generateDeck() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDeck]);

  // Check game status at the start of the game
  React.useEffect(() => {
    appDispatch({ type: MCActionType.CHANGE_PROGRESS, payload: "inProgress" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Init and process game countdown timer
  React.useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;
    if (
      (countdown < 0 ||
        gameStatus === "new" ||
        gameStatus === "pause" ||
        gameStatus === "reset") &&
      timerId
    ) {
      clearInterval(timerId);
      return;
    }
    if (!showPauseModal && countdown >= 0) {
      timerId = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      timerId && clearInterval(timerId);
    };
  }, [countdown, gameStatus, showPauseModal]);

  // Check game progress on every shown card and countdown value change
  React.useEffect(() => {
    if (countdown >= 0) {
      appDispatch({
        type: MCActionType.CHANGE_PROGRESS,
        payload: { cardDeck, countdown },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDeck, countdown]);

  // Check if a pair of cards shown are matched
  React.useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (gameState.cardsShown.counter === MAX_CARDS_SHOWN_PER_TURN) {
      timer = setTimeout(() => {
        gameDispatch({ type: MCGameActionType.MATCHED_CARDS });
      }, 500);
    }
    return () => {
      timer && clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.cardsShown.counter]);

  // TODO: Temporary log to check game status
  React.useEffect(() => {
    console.log("GAME STATUS", appState.gameStatus);
  }, [appState]);

  return {
    state: gameState,
    countdown,
    showPauseModal,
    handleResetGameClick,
    handleShowModalClick,
    handleCloseModalClick,
    handleCardOnClick,
  };
};

export default useGameSetup;
