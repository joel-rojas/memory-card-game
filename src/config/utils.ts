import { MCGameMaxAvailableCards } from "./types";

export function callAll(...fns: Array<Function | undefined>) {
  return (...args: unknown[]) => {
    fns.forEach((fn) => {
      fn && fn(...args);
    });
  };
}

export function getRandomCharCode(maxCards: MCGameMaxAvailableCards = 16): number {
  const MAX_AVAILABLE_CARDS: MCGameMaxAvailableCards = maxCards;
  const INITIAL_CHAR_CODE = 97;
  return INITIAL_CHAR_CODE + Math.floor(Math.random() * MAX_AVAILABLE_CARDS);
};

export function getInitialRandomList<T extends string>(count: number): string[] {
  let nums = new Set<T>();
  while (nums.size < count) {
    const randomCard = `${String.fromCharCode(getRandomCharCode())}_card` as T;
    !nums.has(randomCard) && nums.add(randomCard);
  }
  return Array.from(nums);
};

export function shuffleDeck<T extends unknown[]>(cardDeck: T): T {
  const initialIndex = cardDeck.length - 1;
  for (let i = initialIndex; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardDeck[i], cardDeck[j]] = [cardDeck[j], cardDeck[i]];
  }
  return cardDeck as T;
}