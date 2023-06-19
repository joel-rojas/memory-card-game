import { MCGameActionType, MCGameAction } from "@store";
import {
  MCGameCardDeck,
  MCGameCard,
  MCGameCardsShown,
  MCGameState,
} from "@config";

export const gameInitialState: MCGameState = {
  cardDeck: [],
  cardsShown: 0,
};

function shuffleDeck<T extends MCGameCardDeck>(cardDeck: T): T {
  const initialIndex = cardDeck.length - 1;
  for (let i = initialIndex; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardDeck[i], cardDeck[j]] = [cardDeck[j], cardDeck[i]];
  }
  return cardDeck as T;
}

function filterShownCards<T extends MCGameCardDeck>(
  cardDeck: T
): Required<T> | [] {
  const filteredCards = cardDeck.filter((card) => !card.isHidden);
  if (filteredCards.length > 0) {
    const [first, second] = filteredCards;
    return [first, second] as Required<T>;
  }
  return [];
}

function changeCardHiddenStatus({
  list,
  cards,
  isHidden,
}: {
  list: MCGameCardDeck;
  cards: { currentCard: MCGameCard; previousCard?: MCGameCard };
  isHidden: boolean;
}): MCGameCardDeck {
  return list.map((card) => {
    const { currentCard, previousCard } = cards;
    if (currentCard.id === card.id || previousCard?.id === card.id) {
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

function matchesCardId(id: MCGameCard["id"]): string | null {
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
  const firstMatchCardId = matchesCardId(firstCard.id);
  const secondMatchCardId = matchesCardId(secondCard.id);
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
    case MCGameActionType.MATCHED_CARDS: {
      const [firstCard, secondCard] = filterShownCards(state.cardDeck);
      if (firstCard && secondCard) {
        const bothCardsMatched = checkDualCardMatching(firstCard, secondCard);
        return {
          ...state,
          cardsShown: 0,
          cardDeck: bothCardsMatched
            ? changeCardMatchedStatus(state.cardDeck)
            : changeCardHiddenStatus({
                list: state.cardDeck,
                cards: { currentCard: secondCard, previousCard: firstCard },
                isHidden: true,
              }),
        };
      }
      return state;
    }
    case MCGameActionType.SHOW_CARD: {
      const currentCard = action.payload as MCGameCard;
      return {
        ...state,
        cardsShown: (state.cardsShown + 1) as MCGameCardsShown,
        cardDeck: changeCardHiddenStatus({
          list: state.cardDeck,
          cards: { currentCard },
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
    default:
      return state;
  }
}
