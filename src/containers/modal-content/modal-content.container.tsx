import React from "react";

import { MCGameUIPropsList, MCGameCurrentUIProps } from "@config";
import { Button, Headline } from "@components";

interface ModalContentProps {
  contentList: MCGameUIPropsList;
}

const ModalContent: React.FC<ModalContentProps> = ({
  contentList,
}): React.ReactElement => {
  return (
    <div className="flex flex-col items-center justify-center text-8xl">
      {contentList.map((child: MCGameCurrentUIProps) => {
        const key = `${child.type}-${child.text}`;
        switch (child.type) {
          case "title":
            return (
              <Headline
                key={key}
                clsList={
                  child.size === "x-large"
                    ? "text-4xl text-center md:text-6xl"
                    : ""
                }
              >
                {child.text}
              </Headline>
            );
          case "button":
            return (
              <Button
                key={key}
                text={child.text}
                btnCls={child.btnCls}
                onClick={child.onClick}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default ModalContent;
