import React from "react";

import type { MCGameRadioButtonProps } from "@/config";

const RadioButton: React.FC<MCGameRadioButtonProps> = ({
  name,
  value,
  checked,
  label,
  onChange,
}) => {
  return (
    <div className="flex justify-start p-1 items-center cursor-pointer">
      <input
        id={`${name}_${value}`}
        type="radio"
        value={value}
        name={name}
        checked={checked}
        className="appearance-none"
        onChange={onChange}
      ></input>

      <label
        htmlFor={`${name}_${value}`}
        className="w-full text-md sm:text-xl md:text-2xl lg:text-3xl cursor-pointer"
      >
        <span className="pr-1">{checked ? "•" : <>&nbsp;</>}</span>
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
