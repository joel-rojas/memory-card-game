import { Route, Routes } from "react-router";

import { Home, Play } from "@/pages";
import { MCGameRoutePath } from "@/config";
import { usePlayRouteGuard } from "@/hooks";
import GuardRoute from "./guard.route";

const Root = () => {
  const guardConfig = usePlayRouteGuard();

  return (
    <Routes>
      <Route path={MCGameRoutePath.HOME} element={<Home />} />
      <Route
        path={MCGameRoutePath.PLAY}
        element={
          <GuardRoute
            isPageAllowed={guardConfig.canAccess}
            isLoading={guardConfig.isLoading}
            error={guardConfig.error}
            fallbackPath={guardConfig.fallbackPath}
          >
            <Play />
          </GuardRoute>
        }
      />
    </Routes>
  );
};

export default Root;
