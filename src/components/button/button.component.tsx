import React from "react";

import { MCGameButtonProps } from "@config";

const Button: React.FC<MCGameButtonProps> = ({
  btnCls = "",
  onClick,
  label,
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={`p-2 text-xl lg:text-3xl ${btnCls}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
