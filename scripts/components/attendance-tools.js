import { COMPONENT_TAGS } from "../config/component-tags.js";
import { loadTemplate, fillTemplate } from "../utils/template-loader.js";

const layoutTemplatePromise = loadTemplate(new URL("../templates/attendance-tools.html", import.meta.url));
const activityItemTemplatePromise = loadTemplate(new URL("../templates/attendance-activity-item.html", import.meta.url));
const emptyActivityTemplatePromise = loadTemplate(new URL("../templates/attendance-activity-empty.html", import.meta.url));

class AttendanceTools extends HTMLElement {
  constructor() {
    super();
    this.activity = [];
  }

  async connectedCallback() {
    await this.render();
  }

  async render() {
    this.innerHTML = await layoutTemplatePromise;

    this.querySelector("#late-form").addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      this.activity.unshift({
        type: "Late arrival",
        detail: formData.get("reason"),
        meta: `ETA ${formData.get("eta")}`,
        date: new Date()
      });
      event.target.reset();
      await this.renderActivity();
    });

    this.querySelector("#holiday-form").addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      this.activity.unshift({
        type: "Holiday request",
        detail: `${formData.get("from")} → ${formData.get("to")}`,
        meta: formData.get("notes") || "No notes",
        date: new Date()
      });
      event.target.reset();
      await this.renderActivity();
    });

    await this.renderActivity();
  }

  async renderActivity() {
    const list = this.querySelector("#activity-feed ul");
    if (!list) return;
    const items = this.activity.slice(0, 5);
    if (!items.length) {
      list.innerHTML = await emptyActivityTemplatePromise;
      return;
    }

    const template = await activityItemTemplatePromise;
    list.innerHTML = items
      .map((item) => {
        const time = item.date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        return fillTemplate(template, {
          TYPE: item.type,
          DETAIL: item.detail,
          META: item.meta,
          TIME: time
        });
      })
      .join("");
  }
}

customElements.define(COMPONENT_TAGS.ATTENDANCE_TOOLS, AttendanceTools);
