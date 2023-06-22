import React, { useReducer } from "react";

import { AppContext } from "@contexts/app-context";
import { appReducer, initialState } from "@store";
import { MCSingleComponentProps } from "@config";

const AppProvider: React.FC<MCSingleComponentProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, { ...initialState });
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
