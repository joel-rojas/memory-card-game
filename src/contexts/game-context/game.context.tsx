import React, { useContext } from "react";
import { MCGameState } from "@config";
import { MCGameAction } from "@store";

type MCGameContextType = {
  state: MCGameState;
  dispatch: React.Dispatch<MCGameAction>;
} | null;

export const GameContext = React.createContext<MCGameContextType>(null);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("Context is not defined");
  }
  return context;
};
