import { render, screen, fireEvent } from "@testing-library/react";
import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi,
  type Mock,
} from "vitest";

import Button from "./button.component";

describe("Button component", () => {
  let mockOnClick: () => Mock;
  beforeEach(() => {
    mockOnClick = vi.fn();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the button with the correct text", () => {
    render(
      <Button type="button" onClick={mockOnClick} label="Start Game"></Button>
    );
    const buttonElement = screen.getByText(/start game/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls the onClick handler when clicked", () => {
    render(<Button type="button" onClick={mockOnClick} label="About"></Button>);
    const buttonElement = screen.getByText(/about/i);
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
