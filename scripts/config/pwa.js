import { APP_PATHS, STATIC_ASSETS } from "./paths.js";

const CACHE_PREFIX = "teamshgt";
const CACHE_VERSION = 1;

export const PWA_CONFIG = Object.freeze({
  cachePrefix: CACHE_PREFIX,
  cacheVersion: CACHE_VERSION,
  cacheName: `${CACHE_PREFIX}-v${CACHE_VERSION}`,
  serviceWorkerPath: APP_PATHS.serviceWorker,
  assets: STATIC_ASSETS
});
