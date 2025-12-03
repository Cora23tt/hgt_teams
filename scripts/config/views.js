import { COMPONENT_TAGS } from "./component-tags.js";
import { t } from "../utils/i18n.js";

export const VIEW_IDS = Object.freeze({
  DIRECTORY: "directory",
  ATTENDANCE: "attendance",
  NEWS: "news",
  PROFILE: "profile"
});

export const VIEW_CONFIG = Object.freeze({
  [VIEW_IDS.DIRECTORY]: { labelKey: "nav.directory", component: COMPONENT_TAGS.DIRECTORY_VIEW },
  [VIEW_IDS.ATTENDANCE]: { labelKey: "nav.attendance", component: COMPONENT_TAGS.ATTENDANCE_TOOLS },
  [VIEW_IDS.NEWS]: { labelKey: "nav.news", component: COMPONENT_TAGS.NEWS_BOARD },
  [VIEW_IDS.PROFILE]: { labelKey: "nav.profile", component: COMPONENT_TAGS.PROFILE_INSIGHTS }
});

export const DEFAULT_VIEW = VIEW_IDS.DIRECTORY;

export function isValidView(viewId) {
  return Object.prototype.hasOwnProperty.call(VIEW_CONFIG, viewId);
}

export function getViewLabel(viewId) {
  const view = VIEW_CONFIG[viewId];
  if (!view || !view.labelKey) return "";
  return t(view.labelKey);
}
