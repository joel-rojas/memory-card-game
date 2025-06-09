import React from "react";
import { useRouteError } from "react-router";

import { Body, Text, Page } from "@/components";

const NotFound = () => {
  useRouteError();

  return (
    <Page>
      <Body fullyCentered asColumn asContainer>
        <Text size="large" type="headline" label="Oops!! Page is not found!" />
        <Text
          size="small"
          type="headline"
          label="Go back and start a new game!"
        />
      </Body>
    </Page>
  );
};

export default NotFound;
