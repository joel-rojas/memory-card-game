import * as React from "react";
import { useLocation } from "react-router";

import { MCGameRoutePath, type AppStateFromSessionStorage } from "@/config";
import {
  MCActionType,
  MCGameActionType,
  useAppContext,
  useGameDispatch,
} from "@/store";
import { useSessionStorage } from "@/hooks";

type RouteState = {
  isAllowed: boolean;
  isValidPath: boolean;
  shouldInitializeGame: boolean;
  shouldResetGame: boolean;
  navigationTarget: string | null;
};

const useGameStateManager = () => {
  const location = useLocation();
  const [appStateStorage] = useSessionStorage(
    "appState"
  ) as AppStateFromSessionStorage;
  const { state: appState, dispatch: appDispatch } = useAppContext();
  const gameDispatch = useGameDispatch();
  const { imageAssets } = appState;
  // Compute all routing logic in one place
  const routeState = React.useMemo<RouteState>(() => {
    const currentPath = location.pathname;
    const isValidPath = Object.values(MCGameRoutePath).includes(
      currentPath as (typeof MCGameRoutePath)[keyof typeof MCGameRoutePath]
    );

    const isPlayRoute = currentPath === MCGameRoutePath.PLAY;
    const hasRequiredAssets = !!(
      appStateStorage?.hasLoadedAssets && imageAssets.length > 0
    );
    const isAllowed = isPlayRoute && hasRequiredAssets;

    // Determine if we should initialize game from storage
    const shouldInitializeGame =
      isAllowed &&
      appStateStorage?.gameProgress === "idle" &&
      appStateStorage?.gameStatus === "new";

    // Determine if we should reset game state
    const shouldResetGame = !!(
      isAllowed &&
      shouldInitializeGame &&
      isValidPath
    );

    // Determine navigation target
    let navigationTarget: string | null = null;
    if (isValidPath) {
      if (isAllowed && currentPath !== MCGameRoutePath.PLAY) {
        navigationTarget = MCGameRoutePath.PLAY;
      } else if (!isAllowed && currentPath !== MCGameRoutePath.HOME) {
        navigationTarget = MCGameRoutePath.HOME;
      }
    }

    return {
      isAllowed,
      isValidPath,
      shouldInitializeGame,
      shouldResetGame,
      navigationTarget,
    };
  }, [
    location.pathname,
    imageAssets.length,
    appStateStorage?.gameProgress,
    appStateStorage?.gameStatus,
    appStateStorage?.hasLoadedAssets,
    imageAssets,
  ]);

  // Game initialization logic
  React.useEffect(() => {
    if (routeState.shouldInitializeGame) {
      gameDispatch({
        type: MCGameActionType.START_DECK,
        payload: imageAssets,
      });
    }
  }, [routeState.shouldInitializeGame, gameDispatch]);

  // Game state reset - state updates
  React.useEffect(() => {
    if (routeState.shouldResetGame) {
      appDispatch({ type: MCActionType.CHANGE_STATUS, payload: "new" });
      appDispatch({
        type: MCActionType.CHANGE_PROGRESS_BY_VALUE,
        payload: "inProgress",
      });
      gameDispatch({ type: MCGameActionType.RESET_DECK });
    }
  }, [routeState.shouldResetGame, appDispatch, gameDispatch]);

  return routeState;
};

export default useGameStateManager;
