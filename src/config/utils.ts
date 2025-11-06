import {
  createCacheKey,
  getCachedResponse,
  MANIFEST_KEY,
  setCachedResponse,
} from "./cache.utils";
import type {
  MCAppPreRenderedImgAsset,
  MCGameCard,
  MCGameCardDeck,
  MCGameMaxAvailableCards,
  MCGameProgress,
} from "./types";

export function callAll<T extends unknown>(
  ...fns: Array<((...args: T[]) => void) | undefined>
) {
  return (...args: T[]) => {
    fns.forEach((fn) => {
      if (fn) fn(...args);
    });
  };
}

export function getRandomCharCode(
  maxCards: MCGameMaxAvailableCards = 20
): number {
  const MAX_AVAILABLE_CARDS: MCGameMaxAvailableCards = maxCards;
  const INITIAL_CHAR_CODE = 97;
  return INITIAL_CHAR_CODE + Math.floor(Math.random() * MAX_AVAILABLE_CARDS);
}

export function getInitialRandomList<T extends string>(
  count: number
): string[] {
  const nums = new Set<T>();
  while (nums.size < count) {
    const randomCard = `${String.fromCharCode(getRandomCharCode())}_card` as T;
    if (!nums.has(randomCard)) nums.add(randomCard);
  }
  return Array.from(nums);
}

export function shuffleDeck<T extends unknown[]>(cardDeck: T): T {
  const initialIndex = cardDeck.length - 1;
  for (let i = initialIndex; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardDeck[i], cardDeck[j]] = [cardDeck[j], cardDeck[i]];
  }
  return cardDeck as T;
}

// Generate a signature for the current card deck state
export function getDeckSignature(deck: MCGameCard[]) {
  return deck
    .map(
      ({ uid, isMatched, isHidden }) =>
        `${uid}:${Number(isMatched)}:${Number(isHidden)}`
    )
    .join("|");
}

function determineCardListMatches(cardDeck: MCGameCardDeck): boolean {
  if (cardDeck.length === 0) return false;
  return cardDeck.every((card) => card.isMatched);
}

export const determineGameProgress = (
  status: MCGameProgress,
  cardDeck: MCGameCardDeck,
  currentCountdown: number
): MCGameProgress => {
  const allCardsMatched = determineCardListMatches(cardDeck);
  if (status === "idle" && !allCardsMatched && currentCountdown > 0) {
    return "inProgress";
  }
  if (status === "inProgress") {
    if (currentCountdown > 0 && allCardsMatched) {
      return "win";
    }
    if (currentCountdown <= 0 && !allCardsMatched) {
      return "lose";
    }
    return "inProgress";
  }
  if (status === "win" || status === "lose") {
    return status;
  }
  return "idle";
};

function loadAssetModule() {
  return import.meta.glob("@/assets/**/*.{png,jpg,jpeg,svg}", {
    eager: true,
    import: "default",
  });
}
// Asset loading functions
export const getAssetMetadata = (): MCAppPreRenderedImgAsset[] => {
  const modules = loadAssetModule();

  return Object.entries(modules).map(([path, url]) => {
    const fileName = path.split("/").pop()!;
    const imgId = fileName.split(".")[0];
    return {
      src: url as string,
      imgId,
      fileName,
      originalPath: path,
    };
  });
};

export const createBlobUrl = (blob: Blob): string => URL.createObjectURL(blob);

export const fetchAsset = async (url: string): Promise<Response> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch asset: ${response.status}`);
  }
  return response;
};

// Asset caching functions
export const cacheAsset = async (
  asset: MCAppPreRenderedImgAsset
): Promise<boolean> => {
  try {
    if (!asset.fileName) return false;

    const cacheKey = createCacheKey(asset.fileName);
    const response = await fetchAsset(asset.src);
    await setCachedResponse(cacheKey, response);

    return true;
  } catch (error) {
    console.warn(`Failed to cache asset ${asset.fileName}:`, error);
    return false;
  }
};

export const cacheAssets = async (
  assets: MCAppPreRenderedImgAsset[]
): Promise<void> => {
  // Cache the manifest
  await cacheManifest(assets);
};

export const cacheManifest = async (
  assets: MCAppPreRenderedImgAsset[]
): Promise<void> => {
  const manifestResponse = new Response(JSON.stringify(assets), {
    headers: { "Content-Type": "application/json" },
  });
  await setCachedResponse(MANIFEST_KEY, manifestResponse);
};

// Asset loading functions
export const loadCachedManifest = async (): Promise<
  MCAppPreRenderedImgAsset[] | null
> => {
  try {
    const manifestResponse = await getCachedResponse(MANIFEST_KEY);
    if (!manifestResponse) return null;

    return (await manifestResponse.json()) as MCAppPreRenderedImgAsset[];
  } catch (error) {
    console.error("Failed to load cached manifest:", error);
    return null;
  }
};

export const convertCachedAssetToBlobUrl = async (
  asset: MCAppPreRenderedImgAsset
): Promise<MCAppPreRenderedImgAsset | null> => {
  try {
    if (!asset.fileName) return null;

    const cacheKey = createCacheKey(asset.fileName);
    const cachedResponse = await getCachedResponse(cacheKey);

    if (!cachedResponse) return null;

    const blob = await cachedResponse.blob();
    const blobUrl = createBlobUrl(blob);

    return {
      ...asset,
      src: blobUrl,
    };
  } catch (error) {
    console.error(`Failed to convert cached asset ${asset.fileName}:`, error);
    return null;
  }
};

export const loadCachedAssets = async (): Promise<
  MCAppPreRenderedImgAsset[]
> => {
  try {
    const cachedManifest = await loadCachedManifest();
    if (!cachedManifest) return [];

    const assetPromises = cachedManifest.map(convertCachedAssetToBlobUrl);
    const results = await Promise.all(assetPromises);

    const validAssets = results.filter(Boolean) as MCAppPreRenderedImgAsset[];

    if (validAssets.length === cachedManifest.length) {
      return validAssets;
    }

    // Some assets are missing, return empty to force fresh load
    return [];
  } catch (error) {
    console.error("Failed to load cached assets:", error);
    return [];
  }
};

export const loadFreshAssets = async (): Promise<
  MCAppPreRenderedImgAsset[]
> => {
  const assets = getAssetMetadata();

  if (assets.length > 0) {
    // Cache assets asynchronously (don't wait)
    cacheAssets(assets).catch((error) => {
      console.warn("Failed to cache fresh assets:", error);
    });
  }

  return assets;
};

// Main asset loading function
export const loadAssets = async (): Promise<MCAppPreRenderedImgAsset[]> => {
  // Try cache first
  const cachedAssets = await loadCachedAssets();

  if (cachedAssets.length > 0) {
    return cachedAssets;
  }

  // Fallback to fresh assets
  return await loadFreshAssets();
};

// Load individual asset with cache fallback
export const getCardSourceFromCache = async (
  name: string
): Promise<string | null> => {
  try {
    const cacheKey = createCacheKey(`${name}.png`); // Adjust filename as needed
    const cachedResponse = await getCachedResponse(cacheKey);

    if (cachedResponse) {
      const blob = await cachedResponse.blob();
      return URL.createObjectURL(blob);
    }

    // Fallback to asset metadata lookup
    return getCardSrc(name);
  } catch (error) {
    console.error("Failed to get card from cache:", error);

    // Final fallback to asset metadata lookup
    const assets = getAssetMetadata();
    const coverAsset = assets.find((asset) => asset.imgId === "cover_card");
    return coverAsset?.src || null;
  }
};

// Fallback to Vite glob import
export const getCardSrc = (name: string): string | null => {
  const assets = getAssetMetadata();
  const coverAsset = assets.find((asset) => asset.imgId === name);
  return coverAsset?.src || null;
};
