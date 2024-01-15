import React from "react";
import { createBrowserRouter } from "react-router-dom";

import { Home, NotFound, Play } from "@pages";

const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <NotFound />},
  { path: "/play", element: <Play /> },
]);

export default router;
