import React from "react";
import { useNavigate } from "react-router-dom";

import {
  MCGameMainMenuContentKeys,
  MCGameUISetPropsMap,
  MCGameLevelKeys,
  MCGameRoutePath,
  MCGameCurrentUIProps,
  MCGameProgressiveMenuKeys,
} from "@config";
import { useAppContext } from "@contexts";
import { MCActionType } from "@store";

const useMainMenuSetup = () => {
  const navigate = useNavigate();
  const { dispatch } = useAppContext();
  const [currentMenu, setCurrentMenu] =
    React.useState<MCGameMainMenuContentKeys>("startGameMenu");
  const onNextMenu = (menuKey: MCGameMainMenuContentKeys) => {
    setCurrentMenu(menuKey);
  };
  const [selectedGameLevel, setSelectedGameLevel] =
    React.useState<MCGameLevelKeys>("easy");

  const handleStartGameClick = () => {};
  const handleGoBackClick = () => {};
  const handleAboutClick = () => {};

  const handleGameLevelChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const level = event.target.value as MCGameLevelKeys;
    setSelectedGameLevel(level);
    dispatch({
      type: MCActionType.CHANGE_LEVEL,
      payload: {
        label: level,
        countdown: level === "easy" ? 60 : level === "medium" ? 40 : 20,
      },
    });
  };

  const handlePlayGameClick = () => {
    navigate(MCGameRoutePath.PLAY);
  };

  const getMainMenuContentSet = React.useCallback(
    (renderedMenu: MCGameMainMenuContentKeys) => {
      const menuContentSet: MCGameUISetPropsMap<
        MCGameMainMenuContentKeys,
        MCGameUISetPropsMap<MCGameProgressiveMenuKeys, MCGameCurrentUIProps>
      > = {
        startGameMenu: {
          startGame: {
            label: "Start Game",
            type: "button",
            name: "startGame",
            onClick: handleStartGameClick,
          },
          about: {
            label: "About",
            type: "button",
            onClick: handleAboutClick,
          },
        },
        gameLevelMenu: {
          backToStart: {
            label: "< Back",
            onClick: handleGoBackClick,
            type: "button",
            name: "backToStart",
            btnCls: "mb-4 self-start lg:text-xl",
          },
          gameLevel: {
            type: "radio-group",
            options: [
              {
                label: "Easy",
                name: "gameLevel",
                checked: selectedGameLevel === "easy",
                value: "easy",
                type: "radio",
                onChange: handleGameLevelChange,
              },
              {
                label: "Medium",
                name: "gameLevel",
                checked: selectedGameLevel === "medium",
                value: "medium",
                type: "radio",
                onChange: handleGameLevelChange,
              },
              {
                label: "Hard",
                name: "gameLevel",
                checked: selectedGameLevel === "hard",
                value: "hard",
                type: "radio",
                onChange: handleGameLevelChange,
              },
            ],
          },
          play: {
            label: "Play",
            type: "button",
            btnCls: "mt-3 text-2xl sm:text-3xl md:text-4xl",
            onClick: handlePlayGameClick,
          },
        },
      };
      return menuContentSet[renderedMenu];
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedGameLevel]
  );

  return {
    currentMenu,
    onNextMenu,
    getMainMenuContentSet,
  };
};

export default useMainMenuSetup;
