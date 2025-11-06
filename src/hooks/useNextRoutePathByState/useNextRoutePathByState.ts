import { useAssetLoader, useRouteProtection, useSessionSync } from "@/hooks";

const useNextRoutePathByState = () => {
  const { isLoading: isLoadingAssets, error: assetError } = useAssetLoader();
  useSessionSync();
  const isNavigable = useRouteProtection();

  if (isLoadingAssets) {
    return { isLoadingAssets: true, assetError: null, isNavigable: false };
  }

  return { isLoadingAssets, assetError, isNavigable };
};

export default useNextRoutePathByState;
