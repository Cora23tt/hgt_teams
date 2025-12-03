import "./components/app-shell.js";
import "./components/directory-view.js";
import "./components/attendance-tools.js";
import "./components/news-board.js";
import "./components/profile-insights.js";
import { APP_EVENTS } from "./config/events.js";
import { PWA_CONFIG } from "./config/pwa.js";
import { UI_TIMING } from "./config/ui.js";
import { getCurrentLanguage, t } from "./utils/i18n.js";

document.documentElement.setAttribute("lang", getCurrentLanguage());

let deferredPrompt;

function registerPWA() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register(PWA_CONFIG.serviceWorkerPath, { type: "module" }).catch((error) => {
      console.error("Service worker registration failed", error);
    });
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
  });

  document.addEventListener(APP_EVENTS.INSTALL, async () => {
    if (!deferredPrompt) {
      alert(t("app.installNotReady"));
      return;
    }
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    if (result.outcome === "accepted") {
      deferredPrompt = null;
    }
  });
}

function wireRefresh() {
  document.addEventListener(APP_EVENTS.REFRESH, () => {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = t("app.refreshToast");
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("visible");
    }, UI_TIMING.TOAST_ACTIVATION_DELAY_MS);
    setTimeout(() => {
      toast.classList.remove("visible");
      toast.addEventListener("transitionend", () => toast.remove(), { once: true });
    }, UI_TIMING.TOAST_DISMISS_DELAY_MS);
  });
}

registerPWA();
wireRefresh();
