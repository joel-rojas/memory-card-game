import React, { createContext } from "react";
import { type RootState, type RootAction } from "./root.reducer";

interface RootContextType {
  state: RootState;
  dispatch: React.Dispatch<RootAction>;
}

export const RootContext = createContext<RootContextType | null>(null);
