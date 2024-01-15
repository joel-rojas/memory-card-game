import React from "react";

interface ButtonProps {
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  btnCls?: string;
}
const Button: React.FC<ButtonProps> = ({ btnCls = "", onClick, text }) => {
  return (
    <button className={`p-2 text-xl lg:text-3xl ${btnCls}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
