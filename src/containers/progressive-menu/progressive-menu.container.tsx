import React from "react";

import { MCGameMainMenuContentKeys } from "@config";

interface ProgressiveMenuProps {
  renderMenu: (
    currentMenu: MCGameMainMenuContentKeys,
    nextMenu: (menuKey: MCGameMainMenuContentKeys) => void
  ) => JSX.Element;
  currentMenu: MCGameMainMenuContentKeys;
  onUpcomingMenu: (menuKey: MCGameMainMenuContentKeys) => void;
}

const ProgressiveMenu: React.FC<ProgressiveMenuProps> = ({
  renderMenu,
  currentMenu,
  onUpcomingMenu,
}) => {
  const nextMenu = (menuKey: MCGameMainMenuContentKeys) => {
    onUpcomingMenu(menuKey);
  };
  if (currentMenu) {
    return (
      <div className="flex flex-1 p-4 justify-center items-center bg-white">
        {renderMenu(currentMenu, nextMenu)}
      </div>
    );
  }
  return null;
};

export default ProgressiveMenu;
