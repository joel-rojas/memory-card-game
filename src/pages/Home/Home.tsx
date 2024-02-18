import React from "react";

import { Page, Header, Body } from "@components";
import { MenuContent, ProgressiveMenu } from "@containers";
import { useMainMenuSetup } from "@hooks";
import {
  MCGameButtonProps,
  MCGameMainMenuContentKeys,
  MCGameProgressiveMenuKeys,
  MCGameUIPropsList,
  callAll,
} from "@config";

const Home = () => {
  const { currentMenu, onNextMenu, getMainMenuContentSet } = useMainMenuSetup();
  const renderMenu = React.useCallback(
    (
      currentStep: MCGameMainMenuContentKeys,
      nextMenu: (menu: MCGameMainMenuContentKeys) => void
    ) => {
      const upcomingMenu =
        currentStep === "startGameMenu" ? "gameLevelMenu" : "startGameMenu";
      
      const contentMap = getMainMenuContentSet(currentStep);
      
      const addNextStepEvent = (uiField: MCGameProgressiveMenuKeys) => {
        (contentMap?.[uiField] as MCGameButtonProps).onClick = callAll(
          (contentMap?.[uiField] as MCGameButtonProps)?.onClick,
          () => nextMenu(upcomingMenu)
        );
      };
      addNextStepEvent(
        currentStep === "startGameMenu" ? "startGame" : "backToStart"
      );
      
      const newSet = Object.values(contentMap as MCGameUIPropsList);

      return <MenuContent fullWidth contentList={newSet} />;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentMenu, getMainMenuContentSet]
  );

  return (
    <Page>
      <Header>Home</Header>
      <Body asContainer>
        <ProgressiveMenu
          currentMenu={currentMenu}
          onUpcomingMenu={onNextMenu}
          renderMenu={renderMenu}
        />
      </Body>
    </Page>
  );
};

export default Home;
