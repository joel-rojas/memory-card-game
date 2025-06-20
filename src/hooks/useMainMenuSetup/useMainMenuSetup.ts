import React, { startTransition } from "react";
import { useNavigate } from "react-router";

import {
  type MCGameMainMenuContentKeys,
  type MCGameUISetPropsMap,
  type MCGameLevelKeys,
  MCGameRoutePath,
  type MCGameCurrentUIProps,
  type MCGameProgressiveMenuKeys,
  type MCGameUIPropsList,
  shuffleDeck,
} from "@/config";
import { useAppContext, useGameContext } from "@/store";
import { MCActionType, MCGameActionType } from "@/store";

const useMainMenuSetup = () => {
  const navigate = useNavigate();
  const { state: appState, dispatch } = useAppContext();
  const { dispatch: gameDispatch } = useGameContext();
  const [showAboutModal, setShowAboutModal] = React.useState(false);
  const [currentMenu, setCurrentMenu] =
    React.useState<MCGameMainMenuContentKeys>("startGameMenu");
  const onNextMenu = (menuKey: MCGameMainMenuContentKeys) => {
    setCurrentMenu(menuKey);
  };
  const [selectedGameLevel, setSelectedGameLevel] =
    React.useState<MCGameLevelKeys>("easy");
  const { imageAssets } = appState;

  const cardDeck = React.useMemo(
    () =>
      imageAssets?.length > 0
        ? shuffleDeck(
            imageAssets.filter((asset) => !asset.imgId.includes("cover_card"))
          )
        : [],
    [imageAssets]
  );

  const handleStartGameClick = () => {};
  const handleGoBackClick = () => {};

  const handleAboutModalClick = (isShown: boolean) => {
    setShowAboutModal(isShown);
  };

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
    startTransition(() => {
      dispatch({
        type: MCActionType.CHANGE_PROGRESS_BY_VALUE,
        payload: "inProgress",
      });
      gameDispatch({
        type: MCGameActionType.START_DECK,
        payload: imageAssets,
      });
      startTransition(() => {
        navigate(MCGameRoutePath.PLAY);
      });
    });
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
            textCls: "text-2xl sm:text-3xl md:text-4xl",
            onClick: handleStartGameClick,
          },
          about: {
            label: "About",
            type: "button",
            onClick: () => handleAboutModalClick(true),
            textCls: "text-2xl sm:text-3xl md:text-4xl",
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
            btnCls: "mt-3",
            textCls: "text-2xl sm:text-3xl md:text-4xl",
            onClick: handlePlayGameClick,
          },
        },
      };
      return menuContentSet[renderedMenu];
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedGameLevel]
  );

  const getAboutModalContentSet = (): MCGameUIPropsList => {
    return [
      {
        label: "About",
        type: "headline",
        size: "large",
      },
      {
        label:
          "This is a memory game. The objective of the game is to find all the matching pairs of cards before time ends.",
        type: "paragraph",
        size: "small",
      },
      {
        label: "©2024 Made by Emerson Rojas.",
        type: "paragraph",
        size: "small",
      },
    ];
  };

  return {
    currentMenu,
    onNextMenu,
    getMainMenuContentSet,
    showAboutModal,
    getAboutModalContentSet,
    handleAboutModalClick,
    cardDeck,
  };
};

export default useMainMenuSetup;
