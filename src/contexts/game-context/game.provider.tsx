import React, { useReducer } from "react";

import { GameContext } from "@contexts";
import { MCGameCardDeck, MCSingleComponentProps } from "@config";
import { gameReducer, gameInitialState } from "@store";
import { useSessionStorage } from "@hooks";

const GameProvider: React.FC<MCSingleComponentProps> = ({ children }) => {
  const [cardDeckStorage] = useSessionStorage("cardDeck", gameInitialState.cardDeck) as [
    MCGameCardDeck
  ];
  const [state, dispatch] = useReducer(gameReducer, {
    ...gameInitialState,
    cardDeck: cardDeckStorage,
  });

  const contextValue = React.useMemo(
    () => ({ state, dispatch }),
    [state, dispatch]
  );

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
