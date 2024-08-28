import React, { SetStateAction } from "react";
import { useLocation, useNavigate, useBeforeUnload } from "react-router-dom";

import { useSessionStorage } from "@hooks";
import { useAppContext, useGameContext } from "@contexts";
import { MCAppState, MCGameRoutePath } from "@config";
import { MCActionType, MCGameActionType } from "@store";

type RoutePathConfig = {
  isAllowed: boolean;
  runOnce: boolean;
  validPath: boolean;
};

const assets = require.context("@assets", true);
const assetsList = assets.keys().map((asset) => assets(asset));

const useNextRoutePathByState = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const routePathConfigValue = React.useMemo<RoutePathConfig>(
    () => ({
      isAllowed: false,
      runOnce: true,
      validPath: Object.values(MCGameRoutePath).includes(
        location.pathname as MCGameRoutePath
      ),
    }),
    [location.pathname]
  );
  const [routePathConfig, setRoutePathConfig] =
    React.useState<RoutePathConfig>(routePathConfigValue);
  const { state: appState, dispatch: appDispatch } = useAppContext();
  const { dispatch: gameDispatch } = useGameContext();
  const { imageAssets } = appState;

  const [appStateStorage, setAppStateStorage] = useSessionStorage(
    "appState"
  ) as [MCAppState, React.Dispatch<SetStateAction<MCAppState>>];

  // Reset gameProgress to idle in session storage when the user leaves the game route (refresh)
  useBeforeUnload(
    React.useCallback(() => {
      if (location?.pathname === MCGameRoutePath.PLAY) {
        setAppStateStorage((prev) => ({ ...prev, gameProgress: "idle" }));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])
  );

  // Save whenever change in appState to sessionStorage
  React.useLayoutEffect(() => {
    setAppStateStorage(appState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState]);

  // Restart game card deck if game is refreshed
  React.useLayoutEffect(() => {
    if (!appStateStorage) return;

    const { gameStatus, gameProgress, imageAssets } = appStateStorage;
    if (
      location?.pathname === MCGameRoutePath.PLAY &&
      gameProgress === "idle" &&
      gameStatus === "new" &&
      imageAssets.length > 0
    ) {
      gameDispatch({ type: MCGameActionType.START_DECK });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, appStateStorage]);

  // Check if the game is allowed to be played based on the route path and imageAssets
  React.useLayoutEffect(() => {
    imageAssets &&
      setRoutePathConfig((prev) => ({
        ...prev,
        isAllowed:
          location?.pathname === MCGameRoutePath.PLAY && imageAssets.length > 0,
      }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, imageAssets]);

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

  // Check if the current route path is valid
  React.useLayoutEffect(() => {
    setRoutePathConfig((prev) => ({
      ...prev,
      validPath: Object.values(MCGameRoutePath).includes(
        location.pathname as MCGameRoutePath
      ),
    }));
  }, [location.pathname]);

  // Load the image assets to the appState
  React.useLayoutEffect(() => {
    if (imageAssets.length === 0 && assetsList.length > 0) {
      const payload = assetsList.map((asset: string) => {
        const assetId = asset!.split("/").pop();
        const imgId = assetId!.split(".")[0];
        return {
          src: asset,
          imgId,
        };
      });
      appDispatch({ type: MCActionType.LOAD_ASSETS, payload });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetsList, imageAssets]);

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
