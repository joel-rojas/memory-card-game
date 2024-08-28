import React, { useContext } from "react";
import { MCAppState } from "@config";
import { MCAppAction } from "@store";

type MCAppContextType = {
  state: MCAppState;
  dispatch: React.Dispatch<MCAppAction>;
} | null;

export const AppContext = React.createContext<MCAppContextType>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Context is not defined");
  }
  return context;
};
