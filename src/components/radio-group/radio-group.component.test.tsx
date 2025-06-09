import { render, screen, fireEvent } from "@testing-library/react";
import type { MCGameRadioButtonProps, MCGameRadioGroupProps } from "@/config";
import RadioGroup from "./radio-group.component";

describe("RadioGroup component", () => {
  const mockOptions: MCGameRadioButtonProps[] = [
    {
      type: "radio",
      name: "option1",
      value: "easy",
      checked: false,
      label: "Option 1",
      onChange: vi.fn(),
    },
    {
      type: "radio",
      name: "option2",
      value: "medium",
      checked: false,
      label: "Option 2",
      onChange: vi.fn(),
    },
  ];
  const mockProps: MCGameRadioGroupProps = {
    type: "radio-group",
    options: mockOptions,
  };

  it("renders the radio buttons with the correct labels", () => {
    render(<RadioGroup {...mockProps} />);
    const option1 = screen.getByLabelText(/option 1/i);
    const option2 = screen.getByLabelText(/option 2/i);
    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
  });

  it("calls the onChange handler when a radio button is clicked", () => {
    render(<RadioGroup type="radio-group" options={mockOptions} />);
    const option1 = screen.getByLabelText(/option 1/i);
    fireEvent.click(option1);
    expect(mockOptions[0].onChange).toHaveBeenCalledTimes(1);
  });

  it("does not render anything if options are invalid", () => {
    const { rerender } = render(
      <RadioGroup {...{ ...mockProps, options: null }} />
    );
    expect(screen.queryByLabelText(/option 1/i)).toBeNull();
    expect(screen.queryByLabelText(/option 2/i)).toBeNull();
    // Rerender with empty options
    rerender(<RadioGroup {...{ ...mockProps, options: [] }} />);
    expect(screen.queryByLabelText(/option 1/i)).toBeNull();
    expect(screen.queryByLabelText(/option 2/i)).toBeNull();
  });
});
