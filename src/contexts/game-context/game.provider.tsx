import React, { useReducer } from "react";

import { GameContext } from "@contexts";
import { MCSingleComponentProps } from "@config";
import { gameReducer, gameInitialState } from "@store";

const GameProvider: React.FC<MCSingleComponentProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, {
    ...gameInitialState,
  });

  const contextValue = React.useMemo(
    () => ({ state, dispatch }),
    [state, dispatch]
  );

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export default GameProvider;
