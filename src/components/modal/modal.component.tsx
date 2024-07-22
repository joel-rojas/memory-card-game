import React from "react";

import { Button } from "@components";

interface ModalProps {
  isOpen: boolean;
  closeOnBackground?: boolean;
  onClose?: () => void | null;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose = null,
  closeOnBackground = false,
  children,
}) => {
  const closeModal = () => {
    onClose && onClose();
  };
  const handleModalContentClick = (
    ev: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    ev.stopPropagation();
  };
  const handleModalOnBackgroundClick = () => {
    if (closeOnBackground) {
      closeModal();
    }
  };

  return isOpen ? (
    <div
      className="fixed z-50 left-0 top-0 w-full h-full overflow-auto bg-black/90"
      onClick={handleModalOnBackgroundClick}
    >
      <div
        className="flex flex-col bg-white p-4 my-[10%] mx-auto w-1/2"
        onClick={handleModalContentClick}
      >
        {onClose ? (
          <Button
            type="button"
            label="X"
            btnCls="mb-2 self-end"
            onClick={closeModal}
          />
        ) : null}
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
