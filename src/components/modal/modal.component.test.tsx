import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./modal.component";

describe("Modal component", () => {
  const mockOnClose = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the modal when isOpen is true", () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>
    );
    const modalContent = screen.getByText(/modal content/i);
    expect(modalContent).toBeInTheDocument();
  });

  it("does not render the modal when isOpen is false", () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>
    );
    const modalContent = screen.queryByText(/modal content/i);
    expect(modalContent).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>
    );
    const closeButton = screen.getByText(/x/i);
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when background is clicked and closeOnBackground is true", () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} closeOnBackground={true}>
        <div>Modal Content</div>
      </Modal>
    );
    const background = screen.getByTestId("modalBackground");
    fireEvent.click(background);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when modal content is clicked", () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>
    );
    const modalContent = screen.getByText(/modal content/i);
    fireEvent.click(modalContent);
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
