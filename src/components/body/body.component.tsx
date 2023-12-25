import React from "react";

interface BodyProps {
  children: React.ReactNode;
}

const Body: React.FC<BodyProps> = ({ children }) => {
  return (
    <div className="flex flex-1 justify-center">
      {children}
    </div>
  );
};

export default Body;
