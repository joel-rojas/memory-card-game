import * as React from "react";
import { useNavigate } from "react-router";

import {
  type MCGameCard,
  type MCGameCurrentModalActionKeys,
  type MCGameCurrentUIProps,
  type MCGameModalType,
  MCGameRoutePath,
  type MCGameUIPropsList,
  type MCGameUISetPropsMap,
  determineGameProgress,
  getDeckSignature,
} from "@/config";
import {
  MCActionType,
  MCGameActionType,
  useAppContext,
  useGameContext,
} from "@/store";

type MCGameProgressCheckSignature = {
  signature: string;
  countdown: number;
};

const useGameSetup = () => {
  const navigate = useNavigate();
  const { state: gameState, dispatch: gameDispatch } = useGameContext();
  const { state: appState, dispatch: appDispatch } = useAppContext();
  const [showGameModal, setShowGameModal] = React.useState<MCGameModalType>({
    type: "end",
    isShown: false,
  });
  const { gameStatus, gameLevel, gameProgress, imageAssets } = appState;
  const { cardDeck } = gameState;
  const [countdown, setCountdown] = React.useState<number>(gameLevel.countdown);
  const prevProgressCheck = React.useRef<MCGameProgressCheckSignature>({
    signature: "",
    countdown: gameLevel.countdown,
  });
  const MAX_CARDS_SHOWN_PER_TURN = 2;

  const handleCardOnClick = React.useCallback(
    (
      _: React.MouseEvent<HTMLDivElement, MouseEvent>,
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
    gameProgress === "win"
      ? gameDispatch({
          type: MCGameActionType.START_DECK,
          payload: imageAssets,
        })
      : gameDispatch({ type: MCGameActionType.RESET_DECK });
    appDispatch({
      type: MCActionType.CHANGE_PROGRESS_BY_VALUE,
      payload: "inProgress",
    });
    setCountdown(gameLevel.countdown);
    setShowGameModal((prev) => ({ ...prev, isShown: false }));
  };

  const handlePauseGameClick = () => {
    appDispatch({ type: MCActionType.CHANGE_STATUS, payload: "pause" });
    handleShowModalClick("pause");
  };

  const handleResumeGameClick = () => {
    appDispatch({ type: MCActionType.CHANGE_STATUS, payload: "resume" });
    setShowGameModal((prev) => ({ ...prev, isShown: false }));
  };

  const handleMainMenuClick = () => {
    React.startTransition(() => {
      appDispatch({ type: MCActionType.CLEAR_GAME });
      gameDispatch({ type: MCGameActionType.CLEAR_GAME });
      setShowGameModal((prev) => ({ ...prev, isShown: false }));
      React.startTransition(() => {
        navigate(MCGameRoutePath.HOME, { replace: true });
      });
    });
  };

  const handleShowModalClick = (type: MCGameModalType["type"]) => {
    setShowGameModal({ ...showGameModal, type, isShown: true });
  };

  const getModalContentProps = (
    type: MCGameModalType["type"]
  ): MCGameUIPropsList => {
    const contentPropsMap: MCGameUISetPropsMap<
      MCGameCurrentModalActionKeys,
      MCGameCurrentUIProps
    > = {
      title: {
        label: "",
        type: "headline",
        size: "large",
      },
      resume: {
        label: "Resume",
        type: "button",
        onClick: handleResumeGameClick,
      },
      reset: {
        label: "Reset",
        type: "button",
        onClick: handleResetGameClick,
      },
      mainMenu: {
        label: "Main Menu",
        type: "button",
        onClick: handleMainMenuClick,
      },
    };
    switch (type) {
      case "pause":
        return [
          { ...contentPropsMap.title, label: "Game Paused" },
          contentPropsMap.resume,
          contentPropsMap.reset,
          contentPropsMap.mainMenu,
        ] as MCGameUIPropsList;
      case "end":
        return [
          {
            ...contentPropsMap.title,
            size: "x-large",
            label: gameProgress === "win" ? "You Win!" : "You Lose!",
          },
          {
            ...contentPropsMap.reset,
            label:
              gameProgress === "win"
                ? "Restart"
                : contentPropsMap?.reset?.label,
          },
          contentPropsMap.mainMenu,
        ] as MCGameUIPropsList;
      default:
        return [] as MCGameUIPropsList;
    }
  };

  // Init and process game countdown timer
  React.useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;
    if (
      (gameStatus === "new" ||
        gameStatus === "pause" ||
        gameStatus === "end" ||
        gameStatus === "reset") &&
      timerId
    ) {
      clearInterval(timerId);
      return;
    }
    if (gameStatus !== "pause" && gameStatus !== "end" && countdown > 0) {
      timerId = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      timerId && clearInterval(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown, gameStatus]);

  // Check if game is over and show modal if user won or lost the game
  React.useEffect(() => {
    if (gameStatus !== "end" && (countdown === 0 || gameProgress === "win")) {
      appDispatch({ type: MCActionType.CHANGE_STATUS, payload: "end" });
      handleShowModalClick("end");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown, gameStatus, gameProgress]);

  // Check game progress on every shown card and countdown value change
  React.useEffect(() => {
    const prev = prevProgressCheck.current;
    const currentSignature = getDeckSignature(cardDeck);

    if (prev.signature === currentSignature && prev.countdown === countdown) {
      return;
    }

    const nextProgress = determineGameProgress(
      appState.gameProgress,
      cardDeck,
      countdown
    );
    if (nextProgress !== appState.gameProgress) {
      appDispatch({
        type: MCActionType.CHANGE_PROGRESS,
        payload: { cardDeck, countdown },
      });
    }

    prevProgressCheck.current = { signature: currentSignature, countdown };
  }, [cardDeck, countdown, appState.gameProgress, appDispatch]);

  // Check if a pair of cards shown are matched with buffer time
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

  return {
    state: gameState,
    countdown,
    showGameModal,
    getModalContentProps,
    handleCardOnClick,
    handlePauseGameClick,
  };
};

export default useGameSetup;
