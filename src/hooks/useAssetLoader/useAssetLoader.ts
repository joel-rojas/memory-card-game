import * as React from "react";
import {
  loadAssets,
  type AppStateFromSessionStorage,
  type PartialAppState,
} from "@/config";
import { MCActionType, useAppContext } from "@/store";
import useSessionStorage from "../useSessionStorage";

const useAssetLoader = () => {
  const { state: appState, dispatch: appDispatch } = useAppContext();
  const [appStorage, setAppStorage] = useSessionStorage(
    "appState"
  ) as AppStateFromSessionStorage;
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Asset loading effect
  React.useEffect(() => {
    const persistAssets = async () => {
      if (
        isLoading ||
        (appState.imageAssets.length > 0 && appStorage?.hasLoadedAssets)
      )
        return;

      if (appStorage?.hasLoadedAssets && appState.imageAssets.length === 0) {
        setAppStorage({
          ...(appStorage as PartialAppState),
          hasLoadedAssets: false,
        });
      }

      setIsLoading(true);
      setError(null);

      try {
        const assets = await loadAssets();

        if (assets.length > 0) {
          appDispatch({ type: MCActionType.LOAD_ASSETS, payload: assets });
          setAppStorage({
            ...(appStorage as PartialAppState),
            hasLoadedAssets: true,
          });
        } else {
          throw new Error("No assets found");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("Error loading assets:", err);
        setAppStorage({
          ...(appStorage as PartialAppState),
          hasLoadedAssets: false,
        });
      } finally {
        setIsLoading(false);
      }
    };

    persistAssets();
  }, [
    appStorage?.hasLoadedAssets,
    appDispatch,
    isLoading,
    appState.imageAssets.length,
    setAppStorage,
  ]);

  return { isLoading, error };
};

export default useAssetLoader;
