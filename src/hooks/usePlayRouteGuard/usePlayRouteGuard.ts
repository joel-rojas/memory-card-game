import { MCGameRoutePath } from "@/config";
import useNextRoutePathByState from "../useNextRoutePathByState";

const usePlayRouteGuard = () => {
  const { isLoadingAssets, assetError, isNavigable } =
    useNextRoutePathByState();

  return {
    canAccess: !isLoadingAssets && !assetError && isNavigable,
    isLoading: isLoadingAssets,
    error: assetError,
    fallbackPath: MCGameRoutePath.HOME,
  };
};

export default usePlayRouteGuard;
