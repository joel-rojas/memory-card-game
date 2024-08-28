import React from "react";

import { Page, Header, Body, Modal } from "@components";
import { AnimationFrame, MenuContent, ProgressiveMenu } from "@containers";
import { useMainMenuSetup } from "@hooks";
import {
  MCGameButtonProps,
  MCGameMainMenuContentKeys,
  MCGameProgressiveMenuKeys,
  MCGameUIPropsList,
  callAll,
} from "@config";

const Home = () => {
  const {
    currentMenu,
    onNextMenu,
    getMainMenuContentSet,
    showAboutModal,
    getAboutModalContentSet,
    handleAboutModalClick,
    cardDeck,
  } = useMainMenuSetup();

  const renderMenu = React.useCallback(
    (
      currentStep: MCGameMainMenuContentKeys,
      nextMenu: (menu: MCGameMainMenuContentKeys) => void
    ): JSX.Element => {
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
      <Modal
        isOpen={showAboutModal}
        onClose={() => handleAboutModalClick(false)}
        closeOnBackground
      >
        <MenuContent contentList={getAboutModalContentSet()} />
      </Modal>
      <Header flex={1}>
        <AnimationFrame cardDeck={cardDeck} />
      </Header>
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
