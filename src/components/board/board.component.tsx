import React from "react";

interface BoardProps {
  children: React.ReactNode;
}
const Board: React.FC<BoardProps> = ({ children }) => {
  return <div className="flex justify-evenly flex-wrap">{children}</div>;
};

export default Board;
