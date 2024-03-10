import { MCGameActionType, MCGameAction } from "@store";
import {
  MCGameCardDeck,
  MCGameCard,
  MCGameState,
  MCGameSelectedCards,
  MCGameCardsShown,
} from "@config";

export const gameInitialState: MCGameState = {
  cardDeck: [],
  cardsShown: {
    counter: 0,
    selectedCards: null,
  },
};

function getRandomCharCode(): number {
  const MAX_AVAILABLE_CARDS = 16;
  const INITIAL_CHAR_CODE = 97;
  return INITIAL_CHAR_CODE + Math.floor(Math.random() * MAX_AVAILABLE_CARDS);
};

function getInitialRandomList(count: number): string[] {
  let nums = new Set<MCGameCard["id"]>();
  while (nums.size < count) {
    const randomCard = `${String.fromCharCode(getRandomCharCode())}_card`;
    !nums.has(randomCard) && nums.add(randomCard);
  }
  return Array.from(nums);
};

function generateDeck<T extends MCGameCardDeck>(): T {
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

function shuffleDeck<T extends MCGameCardDeck>(cardDeck: T): T {
  const initialIndex = cardDeck.length - 1;
  for (let i = initialIndex; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardDeck[i], cardDeck[j]] = [cardDeck[j], cardDeck[i]];
  }
  return cardDeck as T;
}
function changeCardHiddenStatus({
  list,
  cards,
  isHidden,
}: {
  list: MCGameCardDeck;
  cards: { currentCard: MCGameCard; previousCard: MCGameCard | null };
  isHidden: boolean;
}): MCGameCardDeck {
  const { currentCard, previousCard } = cards;
  return list.map((card) => {
    if (
      card.uid === currentCard.uid ||
      (previousCard && card.uid === previousCard.uid)
    ) {
      return { ...card, isHidden };
    }
    return card;
  });
}

function changeCardMatchedStatus(cardList: MCGameCardDeck): MCGameCardDeck {
  return cardList.map((card) => {
    if (!card.isHidden) {
      card.isMatched = true;
    }
    return card;
  });
}

function matchesCardId(id: MCGameCard["uid"]): string | null {
  const cardIdRegex = /^((?:[a-z]_card))(?:_\d)$/;
  const idMatch = id.match(cardIdRegex);
  if (cardIdRegex.test(id) && idMatch) {
    return idMatch[1];
  }
  return null;
}

function checkDualCardMatching<T extends MCGameCard>(
  firstCard: T,
  secondCard: T
): boolean {
  const firstMatchCardId = matchesCardId(firstCard.uid);
  const secondMatchCardId = matchesCardId(secondCard.uid);
  return Boolean(
    firstMatchCardId &&
      secondMatchCardId &&
      firstMatchCardId === secondMatchCardId
  );
}

function resetDeck<T extends MCGameCardDeck>(cardList: T) {
  return cardList.map((card) => {
    card.isHidden = true;
    card.isMatched = false;
    return card;
  });
}

export function gameReducer(
  state: MCGameState,
  action: MCGameAction
): MCGameState {
  switch (action.type) {
    case MCGameActionType.START_DECK: {
      return {
        ...gameInitialState,
        cardDeck: shuffleDeck(generateDeck()),
      };
    }
    case MCGameActionType.MATCHED_CARDS: {
      const { selectedCards } = state.cardsShown;
      const [firstCard, secondCard] = Object.keys(
        selectedCards as MCGameSelectedCards
      );
      if (firstCard && secondCard) {
        const bothCardsMatched = checkDualCardMatching(
          selectedCards![firstCard],
          selectedCards![secondCard]
        );
        return {
          cardsShown: { counter: 0, selectedCards: null },
          cardDeck: bothCardsMatched
            ? changeCardMatchedStatus(state.cardDeck)
            : changeCardHiddenStatus({
                list: state.cardDeck,
                cards: {
                  currentCard: selectedCards![secondCard],
                  previousCard: selectedCards![firstCard],
                },
                isHidden: true,
              }),
        };
      }
      return state;
    }
    case MCGameActionType.SHOW_CARD: {
      const currentCard = action.payload as MCGameCard;
      if (
        state.cardsShown.counter > 0 &&
        state.cardsShown.selectedCards?.hasOwnProperty(currentCard.uid) &&
        state.cardsShown.selectedCards?.[currentCard.uid].uid ===
          currentCard.uid
      ) {
        return state;
      }
      return {
        cardsShown: {
          counter: (state.cardsShown.counter +
            1) as MCGameCardsShown["counter"],
          selectedCards: {
            ...state.cardsShown.selectedCards,
            [currentCard.uid]: currentCard,
          },
        },
        cardDeck: changeCardHiddenStatus({
          list: state.cardDeck,
          cards: { currentCard, previousCard: null },
          isHidden: false,
        }),
      };
    }
    case MCGameActionType.RESET_DECK: {
      return {
        ...gameInitialState,
        cardDeck: shuffleDeck(resetDeck(state.cardDeck)),
      };
    }
    case MCGameActionType.CLEAR_GAME: {
      return gameInitialState;
    }
    default:
      return state;
  }
}
