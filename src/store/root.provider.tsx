import React from "react";

import { useSessionStorage } from "@/hooks";
import { appInitialState } from "./app-store";
import type { MCAppState } from "@/config";
import { initialState, rootReducer } from "./root.reducer";
import { RootContext } from './root.context';

const RootProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { gameLevel, gameProgress, gameStatus, imageAssets } = appInitialState;
  const [appStateStorage] = useSessionStorage("appState", {
    gameLevel,
    gameProgress,
    gameStatus,
  }) as unknown as [
    Pick<MCAppState, "gameLevel" | "gameProgress" | "gameStatus">
  ];
  const [state, dispatch] = React.useReducer(rootReducer, {
    ...initialState,
    app: {
      ...appStateStorage,
      imageAssets,
    },
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
