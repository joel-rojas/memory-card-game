import React from "react";

interface BodyProps {
  fullyCentered?: boolean;
  children: React.ReactNode;
}

const Body: React.FC<BodyProps> = ({ children, fullyCentered = false }) => {
  return (
    <div
      className={`flex flex-1 justify-center ${
        fullyCentered ? "align-center" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Body;
