import React from "react";

import { MCGameButtonProps } from "@config";

const Button: React.FC<MCGameButtonProps> = ({
  btnCls = "",
  textCls = "",
  onClick,
  label,
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={`p-2 ${btnCls} ${
        textCls.length > 0 ? textCls : "text-lg sm:text-xl md:text-2xl lg:text-3xl"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
