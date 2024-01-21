import React from "react";
import { createBrowserRouter } from "react-router-dom";

import { Home, NotFound, Play } from "@pages";
import { MCGameRoutePath } from "@config";

const router = createBrowserRouter([
  { path: MCGameRoutePath.HOME, element: <Home />, errorElement: <NotFound /> },
  { path: MCGameRoutePath.PLAY, element: <Play /> },
]);

export default router;
