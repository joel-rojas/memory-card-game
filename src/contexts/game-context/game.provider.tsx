import React, { useReducer } from "react";

import { GameContext } from "@contexts";
import { MCSingleComponentProps } from "@config";
import { gameReducer, gameInitialState } from "@store";

const GameProvider: React.FC<MCSingleComponentProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, { ...gameInitialState });
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
