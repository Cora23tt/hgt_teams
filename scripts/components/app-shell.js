import { COMPONENT_TAGS } from "../config/component-tags.js";
import { APP_EVENTS, dispatchAppEvent } from "../config/events.js";
import { DEFAULT_VIEW, VIEW_CONFIG, isValidView } from "../config/views.js";

class AppShell extends HTMLElement {
  constructor() {
    super();
    this.activeView = DEFAULT_VIEW;
    this.boundHashHandler = () => this.syncViewWithHash();
  }

  connectedCallback() {
    this.render();
    window.addEventListener("hashchange", this.boundHashHandler);
    this.syncViewWithHash();
  }

  disconnectedCallback() {
    window.removeEventListener("hashchange", this.boundHashHandler);
  }

  syncViewWithHash() {
    const hash = window.location.hash.replace("#", "");
    if (isValidView(hash)) {
      this.activeView = hash;
    }
    window.requestAnimationFrame(() => this.updateActiveView());
  }

  render() {
    const navButtons = Object.entries(VIEW_CONFIG)
      .map(
        ([key, value]) => `
          <button class="nav-btn" data-view="${key}">
            ${value.label}
          </button>
        `
      )
      .join("");

    this.innerHTML = `
      <header class="app-header">
        <div>
          <p class="eyebrow">Hududgazta'minot</p>
          <h1>TeamsHGT</h1>
          <p class="subtitle">Stay aligned with your crew anywhere</p>
        </div>
        <div class="cta-group">
          <button class="primary" id="cta-install">Install App</button>
          <button class="ghost" id="cta-refresh">Refresh Data</button>
        </div>
      </header>
      <nav class="app-nav">
        ${navButtons}
      </nav>
      <main id="view-container"></main>
    `;

    this.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const view = btn.dataset.view;
        this.setView(view);
      });
    });

    this.querySelector("#cta-refresh").addEventListener("click", () => {
      dispatchAppEvent(APP_EVENTS.REFRESH);
    });

    this.querySelector("#cta-install").addEventListener("click", () => {
      dispatchAppEvent(APP_EVENTS.INSTALL);
    });

    this.updateActiveView();
  }

  setView(viewKey) {
    if (!isValidView(viewKey)) return;
    this.activeView = viewKey;
    window.location.hash = viewKey;
    this.updateActiveView();
  }

  updateActiveView() {
    const container = this.querySelector("#view-container");
    if (!container) return;

    container.innerHTML = ``;
    const current = VIEW_CONFIG[this.activeView] || VIEW_CONFIG[DEFAULT_VIEW];
    if (!current) return;
    const element = document.createElement(current.component);
    container.appendChild(element);

    this.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.view === this.activeView);
    });
  }
}

customElements.define(COMPONENT_TAGS.APP_SHELL, AppShell);
