/* eslint-disable jsx-a11y/alt-text */
import React from "react";

interface CardProps {
  src: string;
}

const Card: React.FC<CardProps> = ({ src }) => {
  return (
    <img
      src={require(`@assets/${src}.png`)}
      loading="lazy"
    />
  );
};

export default Card;
