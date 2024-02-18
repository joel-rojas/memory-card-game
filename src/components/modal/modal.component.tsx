import React from "react";

import { Button } from "@components";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void | null;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose = null, children }) => {
  const closeModal = () => {
    onClose && onClose();
  };

  return isOpen ? (
    <div className="fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-black/90">
      <div className="bg-white p-4 my-[10%] mx-auto w-1/2">
        {onClose ? (
          <Button
            type="button"
            label="X"
            btnCls="close-button"
            onClick={closeModal}
          />
        ) : null}
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
