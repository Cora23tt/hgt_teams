import { newsItems } from "../data/news.js";
import { COMPONENT_TAGS } from "../config/component-tags.js";

class NewsBoard extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <section class="panel">
        <header class="panel-header">
          <div>
            <h2>HGT Pulse</h2>
            <p class="subtitle">Company announcements and blog posts</p>
          </div>
        </header>
        <div class="stack">
          ${newsItems
            .map(
              (item) => `
                <article class="card news-card">
                  <header>
                    <p class="eyebrow">${new Date(item.date).toLocaleDateString()}</p>
                    <h3>${item.title}</h3>
                  </header>
                  <p>${item.summary}</p>
                  <footer class="meta">By ${item.author}</footer>
                </article>
              `
            )
            .join("")}
        </div>
      </section>
    `;
  }
}

customElements.define(COMPONENT_TAGS.NEWS_BOARD, NewsBoard);
