import React, { useReducer } from "react";

import { useSessionStorage } from "@hooks";
import { AppContext } from "@contexts";
import { appReducer, initialState } from "@store";
import { MCAppState, MCSingleComponentProps } from "@config";

const AppProvider: React.FC<MCSingleComponentProps> = ({ children }) => {
  const [appStateStorage] = useSessionStorage("appState", initialState) as [
    MCAppState
  ];

  const [state, dispatch] = useReducer(appReducer, {
    ...appStateStorage,
  });

  const contextValue = React.useMemo(
    () => ({ state, dispatch }),
    [state, dispatch]
  );

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
