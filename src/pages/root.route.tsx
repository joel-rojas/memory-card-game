import { Route, Routes } from "react-router";

import { Home, Play } from "@/pages";
import { MCGameRoutePath } from "@/config";
import { useNextRoutePathByState } from "@/hooks";
import GuardRoute from "./guard.route";

const Root = () => {
  const isAllowed = useNextRoutePathByState();
  return (
    <Routes>
      <Route path={MCGameRoutePath.HOME} element={<Home />} />
      <Route
        path={MCGameRoutePath.PLAY}
        element={
          <GuardRoute isPageAllowed={isAllowed}>
            <Play />
          </GuardRoute>
        }
      />
    </Routes>
  );
};

export default Root;
