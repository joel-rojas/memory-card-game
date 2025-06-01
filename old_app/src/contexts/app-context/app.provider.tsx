import React, { useReducer } from "react";

import { useSessionStorage } from "@hooks";
import { AppContext } from "@contexts";
import { appReducer, initialState } from "@store";
import { MCAppState, MCSingleComponentProps } from "@config";

const AppProvider: React.FC<MCSingleComponentProps> = ({ children }) => {
  const { gameLevel, gameProgress, gameStatus, imageAssets } = initialState;
  const [appStateStorage] = useSessionStorage("appState", {
    gameLevel,
    gameProgress,
    gameStatus,
  }) as unknown as [Pick<MCAppState, "gameLevel" | "gameProgress" | "gameStatus">];

  const [state, dispatch] = useReducer(appReducer, {
    ...appStateStorage,
    imageAssets,
  });

  const contextValue = React.useMemo(
    () => ({ state, dispatch }),
    [state, dispatch]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
