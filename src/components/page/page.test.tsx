import React from "react";
import { render, screen } from "@testing-library/react";
import Page from "./page.component";

describe("Page component", () => {
  it("renders children correctly", () => {
    render(
      <Page>
        <div>Test Child</div>
      </Page>
    );
    const childElement = screen.getByText(/test child/i);
    expect(childElement).toBeInTheDocument();
  });
});