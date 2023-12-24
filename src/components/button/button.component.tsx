import React from "react";

interface ButtonProps {
  text: string;
  btnCls?: string;
}
const Button: React.FC<ButtonProps> = ({ btnCls = "", text }) => {
  return (
    <button className={`p-2 text-xl lg:text-3xl ${btnCls}`}>{text}</button>
  );
};

export default Button;
