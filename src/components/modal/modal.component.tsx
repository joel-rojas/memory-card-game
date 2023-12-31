import React from "react";

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
    <div className="fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-black/50">
      <div className="bg-white p-4 my-[10%] mx-auto w-1/2">
        {onClose ? (
          <button className="close-button" onClick={closeModal}>
            X
          </button>
        ) : null}
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
