/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

interface AnimationFrameProps {
  cardDeck: string[];
}

type LayoutItem = {
  index: number;
  item: string;
  position: { x: number; y: number };
  status: "entered" | "exiting";
};

type Layout = {
  items: LayoutItem[];
  state?: Flip.FlipState | null;
};

gsap.registerPlugin(Flip);
let counter = 0;

const AnimationFrame: React.FC<AnimationFrameProps> = ({ cardDeck }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const timelineRef = React.useRef<gsap.core.Timeline>();
  const query = gsap.utils.selector(containerRef);
  const [layout, setLayout] = React.useState<Layout>(() => ({
    items: [
      {
        index: counter,
        item: cardDeck[counter],
        status: "entered",
        position: { x: 0, y: 0 },
      },
    ],
  }));

  const removeItems = React.useCallback(
    (exitingItems: LayoutItem[]) => {
      if (!exitingItems.length) return;

      setLayout((prev) => ({
        state: Flip.getState(query(".cards, .card")),
        items: prev.items.filter((item) => !exitingItems.includes(item)),
      }));
    },
    [query]
  );

  const { contextSafe } = useGSAP(
    () => {
      if (!layout.state) return;
      const exiting = layout.items.filter((item) => item.status === "exiting");

      timelineRef.current = Flip.from(layout.state, {
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
              x: Math.random() * containerRef.current!.clientWidth,
              y: Math.random() * containerRef.current!.clientHeight,
            },
            {
              duration: 0.5,
              opacity: 1,
              scale: 1,
              delay: 0.2,
              x: layout.items[0].position.x,
              y: layout.items[0].position.y,
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
      timelineRef.current.add(() => removeItems(exiting));
    },
    {
      scope: containerRef,
      dependencies: [layout, query, cardDeck, removeItems],
    }
  );

  React.useEffect(() => {
    let timerId: NodeJS.Timer = setInterval(() => {
      const nextIndex = ++counter;
      console.log(
        "nextIndex",
        nextIndex,
        cardDeck[nextIndex % cardDeck.length]
      );
      const state = Flip.getState(query(".cards, .card"));
      setLayout(
        {
          state,
          items: [
            {
              index: nextIndex,
              item: cardDeck[nextIndex % cardDeck.length],
              position: {
                x: Math.random() * containerRef.current!.clientWidth,
                y: Math.random() * containerRef.current!.clientHeight,
              },
              status: "entered",
            },
            ...layout.items.map((it) => ({ ...it, status: "exiting" })),
          ],
        } as Layout
      );
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDeck, query]);

  return (
    <div className="w-full h-full relative cards" ref={containerRef}>
      {layout.items.map((card) => (
        <img
          key={`${card.item}_${card.index}`}
          className={`card w-48 h-48 sm:w-28 sm:h-28 p-1 select-none pointer-events-none z-10 ${card.status}`}
          style={{
            position: "absolute",
            transform: `translate3d(${card.position.x}px, ${card.position.y}px, 0px)`,
          }}
          src={require(`@assets/${card.item}.png`)}
        />
      ))}
    </div>
  );
};

export default AnimationFrame;
