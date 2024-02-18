import React from "react";
import { useRouteError } from "react-router-dom";

import { Body, Headline, Page } from "@components";

const NotFound = () => {
  useRouteError();

  return (
    <Page>
      <Body fullyCentered asColumn asContainer>
        <Headline size="large" type="headline" label="Oops!! Page is not found!" />
        <Headline
          size="small"
          type="headline"
          label="Go back and start a new game!"
        />
      </Body>
    </Page>
  );
};

export default NotFound;
