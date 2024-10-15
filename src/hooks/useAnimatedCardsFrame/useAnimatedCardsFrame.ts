import React from "react";

import { useWindowResize } from "@hooks";
import {
  MCAppPreRenderedImgAsset,
  MCAppAnimatedCardLayout,
  MCAppAnimatedCardLayoutItem,
} from "@config";

const useAnimatedCardsFrame = (cardDeck: MCAppPreRenderedImgAsset[]) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [counter, setCounter] = React.useState(-1);
  const [layout, setLayout] = React.useState<MCAppAnimatedCardLayout | null>(
    null
  );
  const screenDimensions = useWindowResize();

  /**
   * @description Calculate the image position
   * @returns {object} - The x and y position of the image
   */
  const calculateImgPosition = React.useCallback(() => {
    const container = containerRef.current!;
    if (!container) return { x: 0, y: 0 };
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const isMobile = screenDimensions.type === "mobile";
    const defaultWidth = isMobile ? 224 : 112;
    const img = container!.children[0]! as HTMLImageElement;
    const imgWidth = !img ? defaultWidth : img.clientWidth;
    if (containerWidth === 0 || containerHeight === 0 || imgWidth === 0) {
      return { x: 0, y: 0 };
    }
    let x = Math.random() * containerWidth;
    let y = Math.random() * containerHeight;
    if (x + imgWidth / 2 > containerWidth) {
      x -= isMobile ? imgWidth * 2 : imgWidth;
    }
    if (y + imgWidth / 2 > containerHeight) {
      y -= isMobile ? imgWidth * 2 : imgWidth;
    }
    if (x < imgWidth / 2) {
      x += imgWidth / 2;
    }
    if (y < imgWidth / 2) {
      y = y + imgWidth / 2;
    }
    return { x, y };
  }, [screenDimensions]);

  /**
   * @description Add a layout item to the layout
   * @param {number} index - The index of the card
   * @returns {MCAppAnimatedCardLayoutItem} - The layout item
   */
  const setupLayoutItem = React.useCallback(
    (
      params: Partial<MCAppAnimatedCardLayoutItem>
    ): MCAppAnimatedCardLayoutItem => {
      const {
        index = 0,
        item = cardDeck[index % cardDeck.length],
        position = { x: 0, y: 0 },
        status = "entering",
      } = params;
      return {
        index,
        item,
        position,
        status,
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

  // Initialize the layout
  React.useEffect(() => {
    if (!containerRef.current) return;

    if (layout === null && cardDeck.length > 0) {
      setLayout({
        items: cardDeck.map((_, index) =>
          setupLayoutItem({
            index,
            position: calculateImgPosition(),
            status: "exiting",
          })
        ),
      });
      setCounter(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout, cardDeck]);

  // Update the layout every second and a half
  // to show the next set of cards
  // and change positions of the exiting cards
  React.useEffect(() => {
    if (!layout || counter === -1) return;

    let timerId: NodeJS.Timer = setInterval(() => {
      let currentIdx = counter;
      let nextIndex = counter + MAX_ITEMS - 1;

      if (currentIdx >= cardDeck.length - 1) {
        currentIdx = 0;
        nextIndex = MAX_ITEMS - 1;
        setCounter(currentIdx);
      }

      setLayout({
        items: layout!.items.map((item) => {
          if (item.index === currentIdx && currentIdx <= nextIndex) {
            currentIdx += 1;
            return setupLayoutItem({
              ...item,
              status: "entering",
            });
          }
          return setupLayoutItem({
            ...item,
            position: calculateImgPosition(),
            status: "exiting",
          });
        }),
      } as MCAppAnimatedCardLayout);

      setCounter((prev) => prev + MAX_ITEMS);
    }, 1500);

    return () => {
      clearInterval(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDeck, MAX_ITEMS, counter]);

  return {
    containerRef,
    layout,
  };
};

export default useAnimatedCardsFrame;
