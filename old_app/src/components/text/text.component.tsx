import React from "react";

import { MCGameTextProps, MCGameTextSizes, MCGameUITypes } from "@config";

const Text: React.FC<MCGameTextProps> = ({ label, size, type }) => {
  const setupClassListPerSize = (
    type: MCGameUITypes,
    size: MCGameTextSizes
  ) => {
    if (type === "headline") {
      switch (size) {
        case "x-large":
          return "text-3xl sm:text-5xl md:text-7xl";
        case "large":
          return "text-2xl sm:text-4xl md:text-6xl";
        case "medium":
          return "text-xl sm:text-2xl  md:text-4xl";
        default:
          return "text-xl";
      }
    }
    if (type === "paragraph") {
      switch (size) {
        case "large":
          return "text-lg md:text-xl";
        case "medium":
          return "text-md md:text-lg";
        default:
          return "text-sm";
      }
    }
  };
  if (type === "headline") {
    return (
      <h1 className={`mb-6 text-center ${setupClassListPerSize(type, size)}`}>
        {label}
      </h1>
    );
  }
  if (type === "paragraph") {
    return (
      <p className={`mb-2 ${setupClassListPerSize(type, size)}`}>{label}</p>
    );
  }
  return null;
};

export default Text;
