import React from "react";
import { useRouteError } from "react-router-dom";

import { Body, Headline, Page } from "@components";

const NotFound = () => {
  useRouteError();

  return (
    <Page>
      <Body fullyCentered>
        <Headline>Oops!! Page is not found!</Headline>
        <Headline clsList="text-xl">Go back and start a new game!</Headline>
      </Body>
    </Page>
  );
};

export default NotFound;
