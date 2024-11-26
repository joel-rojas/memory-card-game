import { screen, render } from "@testing-library/react";

import Body from "./body.component";
import { MCGameCard } from "@config";

describe("Body Component", () => {
  it("should render children correctly", () => {
    const { container, rerender } = render(<Body>Test Content</Body>);
    expect(container).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
    // Test rerender with custom DOM element as children
    rerender(
      <Body>
        <p>Render here</p>
      </Body>
    );
    expect(screen.getByText("Render here")).toBeInTheDocument();
    // Test rerender with custom data rendered as custom elements as children
    const mockUICards: MCGameCard[] = [
      {
        id: `1`,
        src: "card1.png",
        uid: "1ui",
        isMatched: false,
        isHidden: true,
      },
      {
        id: `2`,
        src: "card2.png",
        uid: "2ui",
        isMatched: false,
        isHidden: true,
      },
      {
        id: `3`,
        src: "card3.png",
        uid: "3ui",
        isMatched: false,
        isHidden: true,
      },
    ];
    rerender(
      <Body>
        {mockUICards.map((card) => (
          <div key={card.id}>{card.src}</div>
        ))}
      </Body>
    );
    expect(screen.getByText("card1.png")).toBeInTheDocument();
    expect(screen.getByText("card2.png")).toBeInTheDocument();
    expect(screen.getByText("card3.png")).toBeInTheDocument();
  });
});
