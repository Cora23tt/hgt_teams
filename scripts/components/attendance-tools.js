import { COMPONENT_TAGS } from "../config/component-tags.js";
import { loadTemplate, fillTemplate } from "../utils/template-loader.js";
import { t } from "../utils/i18n.js";

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
    const layoutTemplate = await layoutTemplatePromise;
    this.innerHTML = fillTemplate(layoutTemplate, {
      TITLE: t("attendance.title"),
      SUBTITLE: t("attendance.subtitle"),
      RUNNING_LATE: t("attendance.runningLate"),
      REASON_LABEL: t("attendance.reason"),
      REASON_PLACEHOLDER: t("attendance.reasonPlaceholder"),
      EXPECTED_ARRIVAL: t("attendance.expectedArrival"),
      SEND_ALERT: t("attendance.sendAlert"),
      REQUEST_HOLIDAY: t("attendance.requestHoliday"),
      START_DATE: t("attendance.startDate"),
      END_DATE: t("attendance.endDate"),
      NOTES: t("attendance.notes"),
      NOTES_PLACEHOLDER: t("attendance.notesPlaceholder"),
      SUBMIT_REQUEST: t("attendance.submitRequest"),
      RECENT_ACTIVITY: t("attendance.recentActivity"),
      RECENT_ACTIVITY_SUBTITLE: t("attendance.recentActivitySubtitle")
    });

    this.querySelector("#late-form").addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      this.activity.unshift({
        type: t("attendance.activityLate"),
        detail: formData.get("reason"),
        meta: t("attendance.metaEta", { time: formData.get("eta") }),
        date: new Date()
      });
      event.target.reset();
      await this.renderActivity();
    });

    this.querySelector("#holiday-form").addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      this.activity.unshift({
        type: t("attendance.activityHoliday"),
        detail: `${formData.get("from")} → ${formData.get("to")}`,
        meta: (() => {
          const notesValue = (formData.get("notes") || "").toString().trim();
          return notesValue || t("attendance.noNotes");
        })(),
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
      const emptyTemplate = await emptyActivityTemplatePromise;
      list.innerHTML = fillTemplate(emptyTemplate, { EMPTY_MESSAGE: t("attendance.emptyActivity") });
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
