import { render, screen } from "@testing-library/react";

import Countdown from "./countdown.component";

describe("Countdown Component", () => {
  it("renders countdown value", () => {
    render(<Countdown>{60}</Countdown>);
    expect(screen.getByText("60")).toBeInTheDocument();
  });
  it("renders countdown default value if passed countdown value is different than number", () => {
    render(<Countdown>{"60"}</Countdown>);
    expect(screen.getByText("00")).toBeInTheDocument();
  });
});
