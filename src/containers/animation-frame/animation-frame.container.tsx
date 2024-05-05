/* eslint-disable jsx-a11y/alt-text */
import { useAnimatedCardsFrame } from "@hooks";
import React from "react";

interface AnimationFrameProps {
  cardDeck: string[];
}

const AnimationFrame: React.FC<AnimationFrameProps> = ({ cardDeck }) => {
  const { layout, containerRef } = useAnimatedCardsFrame(cardDeck);

  return (
    <div className="w-full h-full relative cards" ref={containerRef}>
      {layout?.items.map((card) => (
        <img
          key={`${card.item}_${card.index}`}
          className={`card w-56 h-56 sm:w-28 sm:h-28 p-1 select-none pointer-events-none z-10 absolute`}
          style={{
            transform: `translate3d(${card.position.x}px, ${card.position.y}px, 0px)`,
          }}
          src={require(`@assets/${card.item}.png`)}
        />
      ))}
    </div>
  );
};

export default React.memo(AnimationFrame);
