import React from "react";

/**
 * Board component that arranges its children in a responsive grid layout.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The child elements to be displayed within the board.
 * @returns {React.ReactElement} The rendered board component.
 */
const Board: React.FC<React.PropsWithChildren> = ({
  children,
}: React.PropsWithChildren): React.ReactElement => {
  return (
    <div
      id="board"
      data-testid="board"
      className="grid grid-cols-4 gap-4 place-content-center md:grid-cols-5"
    >
      {children}
    </div>
  );
};

export default Board;
