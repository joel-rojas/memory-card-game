import React from "react";
import { createBrowserRouter } from "react-router-dom";

import { Home, Play } from "@pages";

const router = createBrowserRouter([
  { path: "/", element: <Home />},
  { path: "/play", element: <Play /> },
]);

export default router;
