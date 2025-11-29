const viewMap = {
  directory: { label: "Colleagues", component: "directory-view" },
  attendance: { label: "Attendance", component: "attendance-tools" },
  news: { label: "Company News", component: "news-board" },
  profile: { label: "My Profile", component: "profile-insights" }
};

class AppShell extends HTMLElement {
  constructor() {
    super();
    this.activeView = "directory";
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
    if (viewMap[hash]) {
      this.activeView = hash;
    }
    window.requestAnimationFrame(() => this.updateActiveView());
  }

  render() {
    const navButtons = Object.entries(viewMap)
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
      document.dispatchEvent(new CustomEvent("teams:refresh"));
    });

    this.querySelector("#cta-install").addEventListener("click", () => {
      document.dispatchEvent(new CustomEvent("teams:install"));
    });

    this.updateActiveView();
  }

  setView(viewKey) {
    if (!viewMap[viewKey]) return;
    this.activeView = viewKey;
    window.location.hash = viewKey;
    this.updateActiveView();
  }

  updateActiveView() {
    const container = this.querySelector("#view-container");
    if (!container) return;

    container.innerHTML = ``;
    const current = viewMap[this.activeView];
    const element = document.createElement(current.component);
    container.appendChild(element);

    this.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.view === this.activeView);
    });
  }
}

customElements.define("app-shell", AppShell);
