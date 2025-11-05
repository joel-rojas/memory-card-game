// Service Worker utilities
export const isServiceWorkerSupported = (): boolean =>
  "serviceWorker" in navigator;

export const registerServiceWorker =
  async (): Promise<ServiceWorkerRegistration | null> => {
    if (!isServiceWorkerSupported()) {
      console.warn("Service Worker not supported");
      return null;
    }

    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });

      console.log("Service Worker registered successfully");
      return registration;
    } catch (error) {
      console.error("Service Worker registration failed:", error);
      return null;
    }
  };

export const sendMessageToServiceWorker = async <T>(
  type: string,
  payload?: unknown
): Promise<T> => {
  if (!navigator.serviceWorker.controller) {
    throw new Error("No active service worker found");
  }

  return new Promise((resolve, reject) => {
    const messageChannel = new MessageChannel();

    messageChannel.port1.onmessage = (event) => {
      if (event.data.error) {
        reject(new Error(event.data.error));
      } else {
        resolve(event.data as T);
      }
    };

    navigator.serviceWorker?.controller?.postMessage({ type, payload }, [
      messageChannel.port2,
    ]);

    setTimeout(() => {
      reject(new Error("Service Worker message timeout"));
    }, 10000);
  });
};

interface CacheStatus {
  cacheNames: string[];
  cacheSizes?: { [cacheName: string]: number };
  lastUpdated?: string;
}

export const getCacheStatus = async (): Promise<CacheStatus | null> => {
  try {
    return await sendMessageToServiceWorker("GET_CACHE_STATUS");
  } catch (error) {
    console.error("Failed to get cache status:", error);
    return null;
  }
};
