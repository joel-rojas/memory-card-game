import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import Board from "./board.component";
import type { MCGameCard } from "@/config";

describe("Board Component", () => {
  it("renders without crashing", async () => {
    const { container, rerender } = render(
      <Board>
        <></>
      </Board>
    );
    const boardElement = await screen.findByTestId("board");
    expect(boardElement).toBeInTheDocument();
    // Test rerender with string as children
    rerender(<Board>{"Test"}</Board>);
    expect(container).toContainHTML("Test");
    // Test rerender with number as children
    rerender(<Board>{1}</Board>);
    expect(container).toContainHTML("1");
    // Test rerender with boolean as children
    rerender(<Board>{true.toString()}</Board>);
    expect(container).toContainHTML("true");
    // Test rerender without children
    rerender(<Board>{undefined}</Board>);
    expect(container).toContainHTML("");
    // Test rerender with multiple children
    const mockUICards: MCGameCard[] = [
      {
        id: `1`,
        src: "card1.png",
        uid: "1ui",
        coverCardSrc: "cover_card.png",
        isMatched: false,
        isHidden: true,
      },
      {
        id: `2`,
        src: "card2.png",
        uid: "2ui",
        coverCardSrc: "cover_card.png",
        isMatched: false,
        isHidden: true,
      },
      {
        id: `3`,
        src: "card3.png",
        uid: "3ui",
        coverCardSrc: "cover_card.png",
        isMatched: false,
        isHidden: true,
      },
    ];
    rerender(
      <Board>
        {mockUICards.map((card) => (
          <div key={card.id}>{card.src}</div>
        ))}
      </Board>
    );
    expect(screen.getByText("card1.png")).toBeInTheDocument();
    expect(screen.getByText("card2.png")).toBeInTheDocument();
    expect(screen.getByText("card3.png")).toBeInTheDocument();
  });
});
