import { newsItems } from "../data/news.js";
import { COMPONENT_TAGS } from "../config/component-tags.js";
import { loadTemplate, fillTemplate } from "../utils/template-loader.js";
import { t, getCurrentLanguage } from "../utils/i18n.js";

const layoutTemplatePromise = loadTemplate(new URL("../templates/news-board.html", import.meta.url));
const itemTemplatePromise = loadTemplate(new URL("../templates/news-item.html", import.meta.url));

class NewsBoard extends HTMLElement {
  async connectedCallback() {
    await this.render();
  }

  async render() {
    const [layoutTemplate, itemTemplate] = await Promise.all([layoutTemplatePromise, itemTemplatePromise]);
    const dateLocale = getCurrentLanguage();
    const listMarkup = newsItems
      .map((item) =>
        fillTemplate(itemTemplate, {
          DATE: new Date(item.date).toLocaleDateString(dateLocale),
          TITLE: item.title,
          SUMMARY: item.summary,
          AUTHOR_LINE: t("news.by", { author: item.author })
        })
      )
      .join("");

    this.innerHTML = fillTemplate(layoutTemplate, {
      TITLE: t("news.title"),
      SUBTITLE: t("news.subtitle"),
      NEWS_ITEMS: listMarkup
    });
  }
}

customElements.define(COMPONENT_TAGS.NEWS_BOARD, NewsBoard);
