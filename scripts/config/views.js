import { COMPONENT_TAGS } from "./component-tags.js";

export const VIEW_IDS = Object.freeze({
  DIRECTORY: "directory",
  ATTENDANCE: "attendance",
  NEWS: "news",
  PROFILE: "profile"
});

export const VIEW_CONFIG = Object.freeze({
  [VIEW_IDS.DIRECTORY]: { label: "Colleagues", component: COMPONENT_TAGS.DIRECTORY_VIEW },
  [VIEW_IDS.ATTENDANCE]: { label: "Attendance", component: COMPONENT_TAGS.ATTENDANCE_TOOLS },
  [VIEW_IDS.NEWS]: { label: "Company News", component: COMPONENT_TAGS.NEWS_BOARD },
  [VIEW_IDS.PROFILE]: { label: "My Profile", component: COMPONENT_TAGS.PROFILE_INSIGHTS }
});

export const DEFAULT_VIEW = VIEW_IDS.DIRECTORY;

export function isValidView(viewId) {
  return Object.prototype.hasOwnProperty.call(VIEW_CONFIG, viewId);
}
