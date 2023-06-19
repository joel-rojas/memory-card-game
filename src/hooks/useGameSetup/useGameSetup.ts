import * as React from "react";
import { useGameContext } from "@contexts";
import { MCGameCardDeck, MCGameCard } from "@config";
import { MCGameActionType } from "@store";

const useGameSetup = () => {
  const { state, dispatch } = useGameContext();
  const { cardDeck } = state;

  const getRandomCharCode = () => {
    const MAX_AVAILABLE_CARDS = 16;
    const INITIAL_CHAR_CODE = 96;
    return (
      INITIAL_CHAR_CODE + Math.floor(Math.random() * MAX_AVAILABLE_CARDS + 1)
    );
  };

  const getInitialRandomList = (count: number) => {
    let nums = new Set<MCGameCard["id"]>();
    while (nums.size < count) {
      const randomCard = `${String.fromCharCode(getRandomCharCode())}_card`;
      !nums.has(randomCard) && nums.add(randomCard);
    }
    return Array.from(nums);
  };

  const generateDeck = <T extends MCGameCardDeck>(): T => {
    const MAX_CARDS = 10;
    const randomList = getInitialRandomList(MAX_CARDS);
    const list = [];
    let i = 0;
    let count = 0;
    while (i < MAX_CARDS) {
      const id = randomList[i];
      const uid = `${id}_${++count}`;
      const newItem = {
        id,
        uid,
        isMatched: false,
        isHidden: true,
      };
      list.push({ ...newItem }, { ...newItem, uid: `${id}_${++count}` });
      count = 0;
      i++;
    }
    return list as T;
  };

  React.useLayoutEffect(() => {
    cardDeck.length === 0 &&
      dispatch({ type: MCGameActionType.START_DECK, payload: generateDeck() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDeck]);
};

export default useGameSetup;
