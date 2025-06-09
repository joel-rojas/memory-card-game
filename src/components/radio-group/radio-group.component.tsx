import React from "react";

import { RadioButton } from "@/components";
import type { MCGameRadioGroupProps, MCGameRadioButtonProps } from "@/config";

const RadioGroup: React.FC<MCGameRadioGroupProps> = ({ options }) => {
  const renderChildren = (children: MCGameRadioGroupProps["options"]) => {
    const isRadioButtonPropsArray = (
      children: MCGameRadioButtonProps[]
    ): children is MCGameRadioButtonProps[] => {
      return (
        Array.isArray(children) &&
        children.length > 0 &&
        children.every((child) => child.type === "radio")
      );
    };
    const isValidRadioButtonArray = isRadioButtonPropsArray(
      children as MCGameRadioButtonProps[]
    );
    const isValidEl =
      React.isValidElement<React.ReactElement<MCGameRadioButtonProps>[]>(
        children
      );
    if (!isValidEl && !isValidRadioButtonArray) {
      return null;
    }
    if (isValidEl) {
      return children;
    }
    return (children as MCGameRadioButtonProps[]).map(
      (child: MCGameRadioButtonProps, index: number) => {
        return (
          <RadioButton
            type={child.type}
            key={`${child.name}-${child.value}-${index}`}
            name={child.name}
            value={child.value}
            checked={child.checked}
            label={child.label}
            onChange={child.onChange}
          />
        );
      }
    );
  };
  return (
    <fieldset className="flex flex-col">{renderChildren(options)}</fieldset>
  );
};

export default RadioGroup;
