import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";

import { useWindowResize } from "@hooks";

type LayoutItem = {
  index: number;
  item: string;
  position: { x: number; y: number };
};

type Layout = {
  items: LayoutItem[];
  state?: Flip.FlipState | null;
};

gsap.registerPlugin(Flip);

const useAnimatedCardsFrame = (cardDeck: string[]) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const timelineRef = React.useRef<gsap.core.Timeline>();
  const [counter, setCounter] = React.useState(0);
  const query = gsap.utils.selector(containerRef);
  const [layout, setLayout] = React.useState<Layout | null>(null);
  const screenDimensions = useWindowResize();

  /**
   * @description Add a layout item to the layout
   * @param {number} index - The index of the card
   * @returns {LayoutItem} - The layout item
   */
  const addLayoutItem = React.useCallback(
    (index: number): LayoutItem => {
      return {
        index,
        item: cardDeck[index % cardDeck.length],
        position: {
          x: Math.random() * containerRef.current!.clientWidth,
          y: Math.random() * containerRef.current!.clientHeight,
        },
      };
    },
    [cardDeck]
  );

  /**
   * @description Get the maximum number of cards to show based on the screen type
   * @constant {number} MAX_ITEMS - The maximum number of items
   */
  const MAX_ITEMS = React.useMemo(() => {
    if (screenDimensions.type === "desktop") {
      return 5;
    }
    if (screenDimensions.type === "tablet") {
      return 3;
    }
    return 1;
  }, [screenDimensions]);

  /**
   * @description Generate layout items based on the MAX_ITEMS
   * @param {number} nextIdx - The next index to start from
   * @returns {LayoutItem[]} - The layout items
   */
  const getLayoutItems = React.useCallback(
    (nextIdx = 0): LayoutItem[] => {
      return Array.from({ length: MAX_ITEMS }, (_, index) =>
        addLayoutItem(index + nextIdx)
      );
    },
    [MAX_ITEMS, addLayoutItem]
  );

  // Initialize the layout
  React.useEffect(() => {
    if (!containerRef.current) return;

    if (layout === null && cardDeck.length > 0) {
      setLayout({
        items: getLayoutItems(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout, cardDeck]);

  // Animate the cards using GSAP hook
  useGSAP(
    () => {
      if (!containerRef.current) return;
      if (!layout || (layout && !layout.state)) return;

      timelineRef.current = Flip.from(layout!.state!, {
        absolute: true,
        ease: "power1.inOut",
        targets: query(".cards, .card"),
        simple: true,
        scale: true,
        onEnter: (elements) => {
          return gsap.fromTo(
            elements,
            {
              opacity: 0,
              scale: 0,
            },
            {
              duration: 0.5,
              opacity: 1,
              scale: 1,
              delay: 0.2,
            }
          );
        },
        onLeave: (elements) => {
          return gsap.to(elements, {
            opacity: 0,
            scale: 0,
          });
        },
        onComplete: () => {
          let cards = containerRef.current!;
          cards?.appendChild(cards.lastChild!);
        },
      });
    },
    {
      scope: containerRef,
      dependencies: [layout, query, cardDeck],
    }
  );

  // Update the layout every second
  React.useEffect(() => {
    if (!layout) return;

    let timerId: NodeJS.Timer = setInterval(() => {
      let nextIndex = counter + MAX_ITEMS - 1;
      if (layout!.items.length >= cardDeck.length) {
        nextIndex = 0;
      }
      const state = Flip.getState(query(".cards, .card"));

      setLayout({
        state,
        items: getLayoutItems(nextIndex),
      } as Layout);

      setCounter((prev) => prev + MAX_ITEMS);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDeck, query, MAX_ITEMS]);

  return {
    containerRef,
    layout,
  };
};

export default useAnimatedCardsFrame;
