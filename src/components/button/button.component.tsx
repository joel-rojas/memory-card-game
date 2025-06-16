import React from "react";

import type { MCGameButtonProps } from "@/config";

/**
 * Button component for the memory card game.
 *
 * @component
 * @param {MCGameButtonProps} props - The properties for the Button component.
 * @param {string} [props.btnCls=""] - Additional CSS classes for the button element.
 * @param {string} [props.textCls=""] - Additional CSS classes for the text inside the button.
 * @param {(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void} props.onClick - The function to call when the button is clicked.
 * @param {string} props.label - The text label to display inside the button.
 * @param {string} [props.type="button"] - The type attribute for the button element.
 * @returns {React.ReactElement} The rendered button component.
 */
const Button: React.FC<MCGameButtonProps> = ({
  btnCls = "",
  textCls = "",
  onClick,
  label,
  type = "button",
}: MCGameButtonProps) => {
  return (
    <button
      type={type}
      className={`p-2 ${btnCls} ${
        textCls.length > 0
          ? textCls
          : "text-lg sm:text-xl md:text-2xl lg:text-3xl"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
