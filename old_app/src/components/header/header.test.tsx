import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./header.component";

describe("Header component", () => {
  it("renders children correctly", () => {
    render(
      <Header>
        <div>Test Child</div>
      </Header>
    );
    const childElement = screen.getByText(/test child/i);
    expect(childElement).toBeInTheDocument();
    expect(screen.getByTestId("header")).not.toHaveClass("flex-1");
  });

  it("applies correct flex class when flex prop is provided", () => {
    render(
      <Header flex={1}>
        <div>Test Child</div>
      </Header>
    );
    expect(screen.getByTestId("header")).toHaveClass("flex-1");
  });
});
