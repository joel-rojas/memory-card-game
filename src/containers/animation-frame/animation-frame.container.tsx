import React from "react";

import { useAnimatedCardsFrame } from "@/hooks";
import type { MCAppPreRenderedImgAsset } from "@/config";

interface AnimationFrameProps {
  cardDeck: MCAppPreRenderedImgAsset[];
}

const AnimationFrame: React.FC<AnimationFrameProps> = ({ cardDeck }) => {
  const { layout, containerRef } = useAnimatedCardsFrame(cardDeck);

  return (
    <div className="w-full h-full relative cards" ref={containerRef}>
      {layout?.items.map((card) => {
        return (
          <img
            key={`${card.item.imgId}_${card.index}`}
            className={`card w-56 h-56 sm:w-28 sm:h-28 p-1 select-none pointer-events-none z-10 absolute ${
              card.status
            } ${card.status === "entering" ? "transition duration-200 ease-in" : "transition-none"}`}
            style={{
              transform: `translate3d(${card.position.x}px, ${card.position.y}px, 0px)`,
            }}
            alt=""
            src={card.item.src}
          />
        );
      })}
    </div>
  );
};

export default React.memo(AnimationFrame);
