import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RadioButton from "./radio.component";
import type { MCGameRadioButtonProps } from "@/config";

describe("RadioButton component", () => {
  const mockProps: MCGameRadioButtonProps = {
    name: "testRadio",
    value: "easy",
    type: "radio",
    checked: false,
    label: "Test Label",
    onChange: vi.fn(),
  };

  it("renders the radio button with the correct label", () => {
    render(<RadioButton {...mockProps} />);
    const labelElement = screen.getByText(/test label/i);
    expect(labelElement).toBeInTheDocument();
  });

  it("renders the radio button as checked when the checked prop is true", () => {
    render(<RadioButton {...mockProps} checked={true} />);
    const radioElement = screen.getByLabelText(/test label/i) as HTMLInputElement;
    expect(radioElement.checked).toBe(true);
  });

  it("calls the onChange handler when clicked", () => {
    render(<RadioButton {...mockProps} />);
    const radioElement = screen.getByLabelText(/test label/i);
    fireEvent.click(radioElement);
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
  });
});