import * as React from "react";
import { useNavigate, useLocation } from "react-router";
import { useGameStateManager } from "@/hooks";
import { MCGameRoutePath } from "@/config";

const useRouteProtection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const routeState = useGameStateManager();

  React.useEffect(() => {
    if (!routeState.isValidPath) {
      throw new Error("Invalid route path");
    }

    // Only navigate forward to PLAY; avoid kicking from PLAY -> HOME.
    if (
      routeState.navigationTarget === MCGameRoutePath.PLAY &&
      location.pathname !== MCGameRoutePath.PLAY
    ) {
      navigate(MCGameRoutePath.PLAY);
    }
  }, [
    routeState.isValidPath,
    routeState.navigationTarget,
    navigate,
    location.pathname,
  ]);

  return routeState.isAllowed;
};

export default useRouteProtection;
