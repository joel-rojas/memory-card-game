import React from "react";

interface BodyProps {
  fullyCentered?: boolean;
  asColumn?: boolean;
  asContainer?: boolean;
  children: React.ReactNode;
}

const Body: React.FC<BodyProps> = ({
  children,
  fullyCentered = false,
  asColumn = false,
  asContainer = false,
}) => {
  return (
    <div
      className={`flex flex-1 justify-center ${
        fullyCentered ? "items-center" : ""
      } ${asColumn ? "flex-col" : ""}
       ${asContainer ? "container mx-auto" : ""}`}
    >
      {children}
    </div>
  );
};

export default Body;
