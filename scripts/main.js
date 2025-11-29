import "./components/app-shell.js";
import "./components/directory-view.js";
import "./components/attendance-tools.js";
import "./components/news-board.js";
import "./components/profile-insights.js";

let deferredPrompt;

function registerPWA() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js").catch((error) => {
      console.error("Service worker registration failed", error);
    });
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
  });

  document.addEventListener("teams:install", async () => {
    if (!deferredPrompt) {
      alert("App install prompt is not ready yet. Try again soon.");
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
  document.addEventListener("teams:refresh", () => {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = "Data synced just now";
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("visible");
    }, 10);
    setTimeout(() => {
      toast.classList.remove("visible");
      toast.addEventListener("transitionend", () => toast.remove(), { once: true });
    }, 2500);
  });
}

registerPWA();
wireRefresh();
