import React from "react";
import { render, screen } from "@testing-library/react";
import Board from "./board.component";

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
    rerender(<Board>{'Test'}</Board>);
    expect(container).toContainHTML('Test');
    // Test rerender with number as children
    rerender(<Board>{1}</Board>);
    expect(container).toContainHTML('1');
    // Test rerender with boolean as children
    rerender(<Board>{true.toString()}</Board>);
    expect(container).toContainHTML('true');
    // Test rerender without children
    rerender(<Board>{undefined}</Board>);
    expect(container).toContainHTML('');
    // Test rerender with multiple children
    rerender(
      <Board>
        <div>Test 1</div>
        <div>Test 2</div>
      </Board>
    );
    expect(container).toContainHTML('Test 1');
    expect(container).toContainHTML('Test 2');
  });
});
