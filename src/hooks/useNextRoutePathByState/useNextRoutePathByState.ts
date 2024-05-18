import React from "react";

import { useSessionStorage } from "@hooks";
import { useAppContext, useGameContext } from "@contexts";
import { MCAppState, MCGameCardDeck, MCGameRoutePath } from "@config";
import { useLocation, useNavigate } from "react-router-dom";
import { MCActionType, MCGameActionType } from "@store";

type RoutePathConfig = {
  isAllowed: boolean;
  runOnce: boolean;
  validPath: boolean;
};

const useNextRoutePathByState = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [routePathConfig, setRoutePathConfig] = React.useState<RoutePathConfig>(
    {
      isAllowed: false,
      runOnce: true,
      validPath: Object.values(MCGameRoutePath).includes(
        location.pathname as MCGameRoutePath
      ),
    }
  );
  const { state: appState, dispatch: appDispatch } = useAppContext();
  const { state: gameState, dispatch: gameDispatch } = useGameContext();
  const { cardDeck } = gameState;

  const [appStateStorage, setAppStateStorage] = useSessionStorage(
    "appState"
  ) as [MCAppState, React.Dispatch<MCAppState>];
  const [cardDeckStorage, setCardDeckStorage] = useSessionStorage(
    "cardDeck"
  ) as [MCGameCardDeck, React.Dispatch<MCGameCardDeck>];

  // Save appState and cardDeck to sessionStorage
  React.useLayoutEffect(() => {
    setAppStateStorage(appState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState]);

  React.useLayoutEffect(() => {
    cardDeck.length > 0 &&
      appState.gameStatus === "new" &&
      setCardDeckStorage(cardDeck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState, cardDeck]);

  // Check if the game is allowed to be played based on the appState and cardDeck
  React.useLayoutEffect(() => {
    appStateStorage &&
      setRoutePathConfig((prev) => ({
        ...prev,
        isAllowed:
          appStateStorage.gameProgress !== "idle" && cardDeckStorage.length > 0,
      }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appStateStorage, cardDeckStorage]);

  // Reset the game status, progress, and deck once the game is allowed to be played
  // and if the app was refreshed
  React.useLayoutEffect(() => {
    if (
      routePathConfig.isAllowed &&
      routePathConfig.runOnce &&
      routePathConfig.validPath
    ) {
      appDispatch({ type: MCActionType.CHANGE_STATUS, payload: "new" });
      appDispatch({
        type: MCActionType.CHANGE_PROGRESS_BY_VALUE,
        payload: "inProgress",
      });
      gameDispatch({ type: MCGameActionType.RESET_DECK });
      setRoutePathConfig((prev) => ({ ...prev, runOnce: false }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routePathConfig]);

  React.useLayoutEffect(() => {
    setRoutePathConfig((prev) => ({
      ...prev,
      validPath: Object.values(MCGameRoutePath).includes(
        location.pathname as MCGameRoutePath
      ),
    }));
  }, [location.pathname]);

  // Redirect to the next route path
  React.useEffect(() => {
    if (routePathConfig.validPath) {
      if (routePathConfig.isAllowed) {
        navigate(MCGameRoutePath.PLAY);
      } else {
        navigate(MCGameRoutePath.HOME);
      }
    } else {
      throw new Error("Invalid route path");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routePathConfig]);

  return routePathConfig.isAllowed;
};

export default useNextRoutePathByState;
