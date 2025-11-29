const ROOT = "/";

const DOCUMENTS = Object.freeze({
  index: "/index.html",
  manifest: "/manifest.json"
});

const STYLES = Object.freeze({
  main: "/styles/main.css"
});

const SCRIPTS = Object.freeze({
  entry: "/scripts/main.js",
  components: Object.freeze([
    "/scripts/components/app-shell.js",
    "/scripts/components/directory-view.js",
    "/scripts/components/attendance-tools.js",
    "/scripts/components/news-board.js",
    "/scripts/components/profile-insights.js"
  ]),
  data: Object.freeze([
    "/scripts/data/employees.js",
    "/scripts/data/news.js"
  ]),
  config: Object.freeze([
    "/scripts/config/component-tags.js",
    "/scripts/config/events.js",
    "/scripts/config/ui.js",
    "/scripts/config/paths.js",
    "/scripts/config/pwa.js",
    "/scripts/config/views.js",
    "/scripts/config/employee.js"
  ])
});

const ASSETS = Object.freeze({
  icon192: "/assets/icon-192.png",
  icon512: "/assets/icon-512.png"
});

export const APP_PATHS = Object.freeze({
  root: ROOT,
  documents: DOCUMENTS,
  styles: STYLES,
  scripts: SCRIPTS,
  assets: ASSETS,
  serviceWorker: "/service-worker.js"
});

export const STATIC_ASSETS = Object.freeze([
  APP_PATHS.root,
  APP_PATHS.documents.index,
  APP_PATHS.styles.main,
  APP_PATHS.scripts.entry,
  ...APP_PATHS.scripts.components,
  ...APP_PATHS.scripts.data,
  ...APP_PATHS.scripts.config,
  APP_PATHS.documents.manifest,
  APP_PATHS.assets.icon192,
  APP_PATHS.assets.icon512
]);
