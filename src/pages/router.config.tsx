import { createBrowserRouter } from "react-router";

import { MCGameRoutePath } from "@/config";
import NotFound from "./NotFound";
import Root from "./root.route";

const routerInstance = createBrowserRouter([
  {
    path: MCGameRoutePath.ANYTHING,
    element: <Root />,
    errorElement: <NotFound />,
  },
]);

export default routerInstance;
