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
  const hasInitializedRef = React.useRef(false);

  const routeState = React.useMemo<RouteState>(() => {
    const currentPath = location.pathname;
    const isValidPath = Object.values(MCGameRoutePath).includes(
      currentPath as (typeof MCGameRoutePath)[keyof typeof MCGameRoutePath]
    );

    const isPlayRoute = currentPath === MCGameRoutePath.PLAY;

    const hasCacheFlag = Boolean(appStateStorage?.hasLoadedAssets);
    const hasInMemoryAssets = imageAssets.length > 0;

    // Allow staying on /play if either cached or loaded
    const hasRequiredAssets = hasCacheFlag || hasInMemoryAssets;
    const isAllowed = isPlayRoute && hasRequiredAssets;

    // Only initialize when assets are actually in memory and first time
    const shouldInitializeGame =
      isAllowed &&
      hasInMemoryAssets &&
      appStateStorage?.gameProgress === "idle" &&
      appStateStorage?.gameStatus === "new" &&
      !hasInitializedRef.current;

    const shouldResetGame = Boolean(
      isAllowed && shouldInitializeGame && isValidPath
    );

    // Navigation target
    let navigationTarget: string | null = null;
    if (isValidPath) {
      if (isAllowed && currentPath !== MCGameRoutePath.PLAY) {
        navigationTarget = MCGameRoutePath.PLAY;
      } else if (!isAllowed && currentPath !== MCGameRoutePath.HOME) {
        // If user is on /play and we have a cache flag, suppress redirect (stay put while hydrating)
        if (!(isPlayRoute && hasCacheFlag)) {
          navigationTarget = MCGameRoutePath.HOME;
        }
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
    appStateStorage?.gameProgress,
    appStateStorage?.gameStatus,
    appStateStorage?.hasLoadedAssets,
    imageAssets.length,
  ]);

  // Initialize game only once after assets are loaded into memory
  React.useEffect(() => {
    if (routeState.shouldInitializeGame) {
      gameDispatch({
        type: MCGameActionType.START_DECK,
        payload: imageAssets,
      });
      hasInitializedRef.current = true;
    }
  }, [routeState.shouldInitializeGame, imageAssets, gameDispatch]);

  // Optional: reset the init flag when leaving /play
  React.useEffect(() => {
    if (location.pathname !== MCGameRoutePath.PLAY) {
      hasInitializedRef.current = false;
    }
  }, [location.pathname]);

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
