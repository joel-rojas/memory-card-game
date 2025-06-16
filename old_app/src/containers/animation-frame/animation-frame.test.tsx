import React from "react";
import { render, screen } from "@testing-library/react";
import AnimationFrame from "./animation-frame.container";
import { useAnimatedCardsFrame } from "@hooks";
import { MCAppPreRenderedImgAsset } from "@config";

jest.mock("@hooks", () => ({
  useAnimatedCardsFrame: jest.fn(),
}));

const mockCardDeck: MCAppPreRenderedImgAsset[] = [
  { imgId: "a_card", src: "a_card.png" },
  { imgId: "b_card", src: "b_card.png" },
  { imgId: "c_card", src: "c_card.png" },
];

describe("AnimationFrame component", () => {
  beforeEach(() => {
    (useAnimatedCardsFrame as jest.Mock).mockReturnValue({
      layout: {
        items: [
          {
            item: mockCardDeck[0],
            index: 0,
            position: { x: 0, y: 0 },
            status: "entering",
          },
          {
            item: mockCardDeck[1],
            index: 1,
            position: { x: 100, y: 100 },
            status: "exiting",
          },
          {
            item: mockCardDeck[2],
            index: 2,
            position: { x: 350, y: 50 },
            status: "exiting",
          },
        ],
      },
      containerRef: React.createRef(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the AnimationFrame component with cards", () => {
    render(<AnimationFrame cardDeck={mockCardDeck} />);
    const cardImages = screen.getAllByRole("img");
    expect(cardImages).toHaveLength(3);
    expect(cardImages[0]).toHaveAttribute("src", "a_card.png");
    expect(cardImages[1]).toHaveAttribute("src", "b_card.png");
    expect(cardImages[2]).toHaveAttribute("src", "c_card.png");
  });

  it("applies correct styles and classes to cards", async () => {
    render(<AnimationFrame cardDeck={mockCardDeck} />);
    const cardImages = screen.getAllByRole("img");
    expect(cardImages[0]).toHaveClass(
      "card w-56 h-56 sm:w-28 sm:h-28 p-1 select-none pointer-events-none z-10 absolute entering transition duration-200 ease-in"
    );
    expect(cardImages[0]).toHaveStyle("transform: translate3d(0px, 0px, 0px)");
    expect(cardImages[1]).toHaveClass(
      "card w-56 h-56 sm:w-28 sm:h-28 p-1 select-none pointer-events-none z-10 absolute exiting transition-none"
    );
    expect(cardImages[1]).toHaveStyle(
      "transform: translate3d(100px, 100px, 0px)"
    );
  });
});
