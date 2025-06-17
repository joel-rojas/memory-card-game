import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Text from "./text.component";

describe("Text component", () => {
  it("renders the headline with the correct text and size", () => {
    render(<Text label="Test Headline" size="x-large" type="headline" />);
    const headlineElement = screen.getByText(/test headline/i);
    expect(headlineElement).toBeInTheDocument();
    expect(headlineElement).toHaveClass("text-3xl sm:text-5xl md:text-7xl");
  });

  it("renders the paragraph with the correct text and size", () => {
    render(<Text label="Test Paragraph" size="large" type="paragraph" />);
    const paragraphElement = screen.getByText(/test paragraph/i);
    expect(paragraphElement).toBeInTheDocument();
    expect(paragraphElement).toHaveClass("text-lg md:text-xl");
  });

  it("renders the default size for headline when size is not provided", () => {
    render(<Text label="Default Headline" size="small" type="headline" />);
    const headlineElement = screen.getByText(/default headline/i);
    expect(headlineElement).toBeInTheDocument();
    expect(headlineElement).toHaveClass("text-xl");
  });

  it("renders the default size for paragraph when size is not provided", () => {
    render(<Text label="Default Paragraph" size="small" type="paragraph" />);
    const paragraphElement = screen.getByText(/default paragraph/i);
    expect(paragraphElement).toBeInTheDocument();
    expect(paragraphElement).toHaveClass("text-sm");
  });
});
