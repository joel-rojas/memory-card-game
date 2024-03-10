/* eslint-disable jsx-a11y/alt-text */
import React from "react";

interface AnimationFrameProps {
  cardDeck: string[];
}

const AnimationFrame: React.FC<AnimationFrameProps> = ({ cardDeck }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  return (
    <div className="w-full h-full relative" ref={containerRef}>
      {cardDeck.map(card => (
        <img
          key={card}
          className={`w-48 h-48 sm:w-28 sm:h-28 p-1 invisible absolute select-none pointer-events-none`}
          src={require(`@assets/${card}.png`)}
        />
      ))}
    </div>
  );
};

export default AnimationFrame;
