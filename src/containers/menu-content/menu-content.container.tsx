import React from "react";

import { MCGameUIPropsList, MCGameCurrentUIProps } from "@config";
import { Button, Text, RadioGroup } from "@components";

interface MenuContentProps {
  contentList: MCGameUIPropsList;
  fullWidth?: boolean;
}

const MenuContent: React.FC<MenuContentProps> = ({
  contentList,
  fullWidth = false,
}): React.ReactElement => {
  const renderChild = (child: MCGameCurrentUIProps) => {
    const key = `${child.type}-${child.label}`;
    switch (child.type) {
      case "headline":
      case "paragraph":
        return (
          <Text
            type={child.type}
            key={key}
            size={child.size}
            label={child.label}
          />
        );
      case "button":
        return (
          <Button
            type={child.type}
            key={key}
            label={child.label}
            btnCls={child.btnCls}
            onClick={child.onClick}
            textCls={child.textCls}
          />
        );
      case "radio-group":
        return (
          <RadioGroup type={child.type} key={key} options={child.options} />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center ${
        fullWidth ? "w-full" : "w-auto"
      }`}
    >
      {contentList.map(renderChild)}
    </div>
  );
};

export default MenuContent;
