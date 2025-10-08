import * as React from "react";
import { useNavigate } from "react-router";

import { useGameStateManager } from "@/hooks";

const useRouteProtection = () => {
  const navigate = useNavigate();
  const routeState = useGameStateManager();
  // Navigation logic
  React.useEffect(() => {
    if (!routeState.isValidPath) {
      throw new Error("Invalid route path");
    }

    if (routeState.navigationTarget) {
      navigate(routeState.navigationTarget);
    }
  }, [routeState.isValidPath, routeState.navigationTarget, navigate]);

  return routeState.isAllowed;
};

export default useRouteProtection;
