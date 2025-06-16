import { render, screen, fireEvent } from "@testing-library/react";

import Card from "./card.component";

describe("Card Component", () => {
  const mockCardProp = {
    card: {
      id: "a",
      src: "card-a.png",
      uid: "1a",
      isMatched: false,
      isHidden: true,
    },
    onTap: vi.fn(),
  };

  it("renders card component", () => {
    render(<Card {...mockCardProp} />);
    const cardElement = screen.getByTestId(`card-${mockCardProp.card.uid}`);
    expect(cardElement).toBeInTheDocument();
  });

  it("displays the card image when flipped", () => {
    render(
      <Card
        {...mockCardProp}
        card={{ ...mockCardProp.card, isHidden: false }}
      />
    );
    const cardEl = screen.getByAltText(/face card/i);
    expect(cardEl).toBeInTheDocument();
    expect(cardEl).toHaveClass("visible");
    expect(cardEl).toHaveAttribute("src", "card-a.png");
    expect(screen.getByAltText(/cover card/i)).toHaveClass("invisible");
  });

  it("does not display the card image when not flipped", () => {
    render(<Card {...mockCardProp} />);
    const coverCardEl = screen.queryByAltText(/cover card/i);
    expect(coverCardEl).toBeInTheDocument();
    expect(coverCardEl).toHaveClass("visible");
    expect(coverCardEl).toHaveAttribute(
      "src",
      expect.stringContaining("cover_card.png")
    );
    expect(screen.queryByAltText(/face card/i)).toHaveClass("invisible");
  });

  it("calls onClick when card is clicked", () => {
    render(<Card {...mockCardProp} />);
    const cardElement = screen.getByTestId(`card-${mockCardProp.card.uid}`);
    fireEvent.click(cardElement);
    expect(mockCardProp.onTap).toHaveBeenCalledTimes(1);
  });
});
