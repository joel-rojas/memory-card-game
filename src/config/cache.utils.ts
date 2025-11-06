// Cache utilities with functional approach
export const CACHE_NAME = "memory-game-assets-v1";
export const MANIFEST_KEY = "/assets-manifest";

// Pure functions for cache operations
export const createCacheKey = (fileName: string): string =>
  `/assets/${fileName}`;

export const isCacheSupported = (): boolean => {
  // Check for caches API in both window and service worker contexts
  if (typeof window !== "undefined") {
    return "caches" in window && "serviceWorker" in navigator;
  } else if (typeof self !== "undefined") {
    return "caches" in self;
  }
  return false;
};

export const openCache = async (): Promise<Cache> =>
  await caches.open(CACHE_NAME);

// Cache operations
export const getCachedResponse = async (
  key: string
): Promise<Response | null> => {
  try {
    if (!isCacheSupported()) return null;
    const cache = await openCache();
    return (await cache.match(key)) || null;
  } catch (error) {
    console.error(`Failed to get cached response for ${key}:`, error);
    return null;
  }
};

export const setCachedResponse = async (
  key: string,
  response: Response
): Promise<void> => {
  try {
    if (!isCacheSupported()) return;
    const cache = await openCache();
    await cache.put(key, response.clone());
  } catch (error) {
    console.error(`Failed to cache response for ${key}:`, error);
  }
};

export const deleteCachedResponse = async (key: string): Promise<void> => {
  try {
    if (!isCacheSupported()) return;
    const cache = await openCache();
    await cache.delete(key);
  } catch (error) {
    console.error(`Failed to delete cached response for ${key}:`, error);
  }
};

export const clearCache = async (): Promise<void> => {
  try {
    if (!isCacheSupported()) return;
    await caches.delete(CACHE_NAME);
    console.log("Cache cleared successfully");
  } catch (error) {
    console.error("Failed to clear cache:", error);
  }
};

export const hasCachedResponse = async (key: string): Promise<boolean> => {
  const response = await getCachedResponse(key);
  return response !== null;
};
