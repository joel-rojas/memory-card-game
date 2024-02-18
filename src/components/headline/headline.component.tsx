import { MCGameHeadlineProps } from "config";
import React from "react";

const Headline: React.FC<MCGameHeadlineProps> = ({ label, size, type }) => {
  const setupClassListPerSize = (size: string) => {
    switch (size) {
      case "large":
        return "text-4xl md:text-6xl";
      case "medium":
        return "text-2xl  md:text-4xl";
      default:
        return "text-xl";
    }
  };
  return (
    <h1 className={`mb-6 text-center ${setupClassListPerSize(size)}`}>
      {label}
    </h1>
  );
};

export default Headline;
