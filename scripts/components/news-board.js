import { newsItems } from "../data/news.js";
import { COMPONENT_TAGS } from "../config/component-tags.js";
import { loadTemplate, fillTemplate } from "../utils/template-loader.js";

const layoutTemplatePromise = loadTemplate(new URL("../templates/news-board.html", import.meta.url));
const itemTemplatePromise = loadTemplate(new URL("../templates/news-item.html", import.meta.url));

class NewsBoard extends HTMLElement {
  async connectedCallback() {
    await this.render();
  }

  async render() {
    const [layoutTemplate, itemTemplate] = await Promise.all([layoutTemplatePromise, itemTemplatePromise]);
    const listMarkup = newsItems
      .map((item) =>
        fillTemplate(itemTemplate, {
          DATE: new Date(item.date).toLocaleDateString(),
          TITLE: item.title,
          SUMMARY: item.summary,
          AUTHOR: item.author
        })
      )
      .join("");

    this.innerHTML = fillTemplate(layoutTemplate, { NEWS_ITEMS: listMarkup });
  }
}

customElements.define(COMPONENT_TAGS.NEWS_BOARD, NewsBoard);
