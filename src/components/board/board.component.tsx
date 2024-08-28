import React from "react";

interface BoardProps {
  children: React.ReactElement | React.ReactElement[];
}
const Board: React.FC<BoardProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-4 gap-4 place-content-center md:grid-cols-5">
      {children}
    </div>
  );
};

export default Board;
