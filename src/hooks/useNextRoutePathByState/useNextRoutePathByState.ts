import React, { type SetStateAction } from "react";
import { useLocation, useNavigate } from "react-router";

import { useSessionStorage } from "@/hooks";
import {
  useAppContext,
  useGameContext,
  MCActionType,
  MCGameActionType,
} from "@/store";
import { loadImages, type MCAppState, MCGameRoutePath } from "@/config";

type RoutePathConfig = {
  isAllowed: boolean;
  runOnce: boolean;
  validPath: boolean;
};

type PartialAppState = Pick<
  MCAppState,
  "gameLevel" | "gameProgress" | "gameStatus"
>;

const useNextRoutePathByState = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const routePathConfigValue = React.useMemo<RoutePathConfig>(
    () => ({
      isAllowed: false,
      runOnce: true,
      validPath: Object.values(MCGameRoutePath).includes(
        location.pathname as (typeof MCGameRoutePath)[keyof typeof MCGameRoutePath]
      ),
    }),
    [location.pathname]
  );
  const [routePathConfig, setRoutePathConfig] =
    React.useState<RoutePathConfig>(routePathConfigValue);
  const [assetsList, setAssetsList] = React.useState<string[]>([]);
  const { state: appState, dispatch: appDispatch } = useAppContext();
  const { dispatch: gameDispatch } = useGameContext();
  const { gameLevel, gameProgress, gameStatus, imageAssets } = appState;

  const [appStateStorage, setAppStateStorage] = useSessionStorage(
    "appState"
  ) as [PartialAppState, React.Dispatch<SetStateAction<PartialAppState>>];

  // Load the image assets to the appState initially
  React.useLayoutEffect(() => {
    const assetsList: string[] = loadImages();
    setAssetsList(assetsList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save whenever change in appState to sessionStorage
  React.useLayoutEffect(() => {
    setAppStateStorage({ gameLevel, gameProgress, gameStatus });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameLevel, gameProgress, gameStatus]);

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

  // Restart game card deck if game is refreshed
  React.useLayoutEffect(() => {
    if (!appStateStorage) return;

    const { gameStatus, gameProgress } = appStateStorage;
    if (
      location?.pathname === MCGameRoutePath.PLAY &&
      gameProgress === "idle" &&
      gameStatus === "new" &&
      imageAssets.length > 0
    ) {
      gameDispatch({ type: MCGameActionType.START_DECK, payload: imageAssets });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, appStateStorage, imageAssets]);

  // Check if the game is allowed to be played based on the route path and imageAssets
  React.useLayoutEffect(() => {
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
        location.pathname as (typeof MCGameRoutePath)[keyof typeof MCGameRoutePath]
      ),
    }));
  }, [location.pathname]);

  // Reset gameProgress and gameStatus in session storage when the user leaves the game route (app reload)
  React.useEffect(() => {
    const handlePageHide = () => {
      window.sessionStorage.setItem(
        "appState",
        JSON.stringify({
          ...appStateStorage,
          gameProgress: "idle",
          gameStatus: "new",
        })
      );
    };
    window.addEventListener("pagehide", handlePageHide);
    return () => {
      window.removeEventListener("pagehide", handlePageHide);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appStateStorage]);

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
