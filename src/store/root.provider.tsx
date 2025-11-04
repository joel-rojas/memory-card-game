import React from "react";

import { useSessionStorage } from "@/hooks";
import { appInitialState } from "./app-store";
import type { AppStateFromSessionStorage, MCAppState } from "@/config";
import { initialState, rootReducer } from "./root.reducer";
import { RootContext } from "./root.context";

const RootProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { gameLevel, gameProgress, gameStatus, imageAssets } = appInitialState;
  const [appStateStorage] = useSessionStorage("appState", {
    gameLevel,
    gameProgress,
    gameStatus,
    hasLoadedAssets: false,
  }) as unknown as AppStateFromSessionStorage;
  const [state, dispatch] = React.useReducer(rootReducer, {
    ...initialState,
    app: {
      ...appInitialState,
      ...(appStateStorage && {
        gameLevel: appStateStorage.gameLevel ?? appInitialState.gameLevel,
        gameProgress: appStateStorage.gameProgress ?? appInitialState.gameProgress,
        gameStatus: appStateStorage.gameStatus ?? appInitialState.gameStatus,
      }),
      imageAssets,
    } as MCAppState,
  });

  const contextValue = React.useMemo(
    () => ({ state, dispatch }),
    [state, dispatch]
  );

  return (
    <RootContext.Provider value={contextValue}>{children}</RootContext.Provider>
  );
};

export default RootProvider;
