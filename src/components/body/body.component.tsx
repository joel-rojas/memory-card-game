import React from "react";

interface BodyProps {
  children: React.ReactNode;
}

const Body: React.FC<BodyProps> = ({ children }) => {
  return (
    <div className="container flex mx-auto flex-wrap">{children}</div>
  );
};

export default Body;
