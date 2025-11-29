export const APP_EVENTS = Object.freeze({
  INSTALL: "teams:install",
  REFRESH: "teams:refresh"
});

export function dispatchAppEvent(eventName, detail) {
  document.dispatchEvent(new CustomEvent(eventName, { detail }));
}
