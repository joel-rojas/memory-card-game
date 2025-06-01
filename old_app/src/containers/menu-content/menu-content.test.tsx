import { render, screen, fireEvent } from "@testing-library/react";
import MenuContent from "./menu-content.container";
import {
  MCGameButtonProps,
  MCGameRadioButtonProps,
  MCGameRadioGroupProps,
  MCGameUIPropsList,
} from "@config";

describe("MenuContent Component", () => {
  const contentList: MCGameUIPropsList = [
    { type: "headline", label: "Test Headline", size: "large" },
    { type: "paragraph", label: "Test Paragraph", size: "medium" },
    {
      type: "button",
      label: "Test Button",
      btnCls: "btn-primary",
      onClick: jest.fn(),
      textCls: "text-primary",
    },
    {
      type: "radio-group",
      label: "Test Radio Group",
      options: [
        {
          checked: false,
          onChange: jest.fn(),
          name: "Option 1",
          type: "radio",
          value: "easy",
          label: "Test Radio Button 1",
        } as MCGameRadioButtonProps,
        {
            checked: false,
            onChange: jest.fn(),
            name: "Option 2",
            type: "radio",
            value: "medium",
            label: "Test Radio Button 2",
          } as MCGameRadioButtonProps,
      ],
    } as MCGameRadioGroupProps,
  ];

  it("should render all content types correctly", () => {
    render(<MenuContent contentList={contentList} />);

    expect(screen.getByText("Test Headline")).toBeInTheDocument();
    expect(screen.getByText("Test Paragraph")).toBeInTheDocument();
    expect(screen.getByText("Test Button")).toBeInTheDocument();
    expect(screen.getByText("Test Radio Button 1")).toBeInTheDocument();
    expect(screen.getByText("Test Radio Button 2")).toBeInTheDocument();
  });

  it("should handle button click", () => {
    const mockOnClick = jest.fn();
    const buttonContentList = [
      {
        type: "button",
        label: "Clickable Button",
        btnCls: "btn-primary",
        onClick: mockOnClick,
        textCls: "text-primary",
      },
    ] as MCGameButtonProps[];

    render(<MenuContent contentList={buttonContentList} />);
    const button = screen.getByText("Clickable Button");
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("should apply fullWidth class when fullWidth prop is true", () => {
    render(<MenuContent contentList={contentList} fullWidth={true} />);
    const container = screen.getByRole("presentation");

    expect(container).toHaveClass("w-full");
  });

  it("should apply w-auto class when fullWidth prop is false", () => {
    render(<MenuContent contentList={contentList} fullWidth={false} />);
    const container = screen.getByRole("presentation");

    expect(container).toHaveClass("w-auto");
  });
});
