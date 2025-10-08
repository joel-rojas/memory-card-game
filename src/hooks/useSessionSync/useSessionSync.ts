import * as React from "react";

import type { AppStateFromSessionStorage } from "@/config";
import { useAppContext } from "@/store";
import { useSessionStorage } from "@/hooks";

const useSessionSync = () => {
  const { state: appState } = useAppContext();

  const { gameLevel, gameProgress, gameStatus, imageAssets } = appState;

  const [appStateStorage, setAppStateStorage] = useSessionStorage(
    "appState"
  ) as AppStateFromSessionStorage;

  // Session storage sync
  React.useEffect(() => {
    setAppStateStorage({
      ...appStateStorage,
      gameLevel,
      gameProgress,
      gameStatus,
      hasLoadedAssets: imageAssets.length > 0,
    });
  }, [
    gameLevel,
    gameProgress,
    gameStatus,
    imageAssets.length,
    setAppStateStorage,
  ]);

  // Page visibility cleanup - event handling
  React.useEffect(() => {
    const handlePageHide = () => {
      if (appStateStorage) {
        window.sessionStorage.setItem(
          "appState",
          JSON.stringify({
            ...appStateStorage,
            gameProgress: "idle",
            gameStatus: "new",
          })
        );
      }
    };

    window.addEventListener("pagehide", handlePageHide);
    return () => window.removeEventListener("pagehide", handlePageHide);
  }, [appStateStorage]);
};
export default useSessionSync;
