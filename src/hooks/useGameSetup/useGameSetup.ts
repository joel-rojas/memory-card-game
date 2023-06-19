import * as React from "react";
import { useGameContext } from "@contexts";
import { MCGameCardDeck } from "@config";

const useAppSetup = () => {
  const { state } = useGameContext();
  const generateDeck = <T extends MCGameCardDeck>(): T => {
    const MAX_CARDS = 11;
    const DOUBLE = 2;
    const INITIAL_CHAR_CODE = 97;
    const list = [];
    let i = 0;
    let count = 0;
    while (i < MAX_CARDS) {
      while (count < DOUBLE) {
        const id = `${String.fromCharCode(
          INITIAL_CHAR_CODE + i
        )}_card_${++count}`;
        list.push({
          id,
          isMatched: false,
          isHidden: true,
        });
        if (count === DOUBLE) {
          break;
        }
      }
      count = 0;
      i++;
    }
    return list as T;
  };

  React.useEffect(() => {
    state && state.cardDeck.length === 0 && generateDeck();
  }, [state]);
};

export default useAppSetup;
