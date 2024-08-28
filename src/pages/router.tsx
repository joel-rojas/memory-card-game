import React from "react";
import { createBrowserRouter } from "react-router-dom";

import { NotFound } from "@pages";
import { MCGameRoutePath } from "@config";
import Root from "./root.route";

const router = createBrowserRouter([
  {
    path: MCGameRoutePath.ANYTHING,
    element: <Root />,
    errorElement: <NotFound />,
  },
]);

export default router;
