import { COMPONENT_TAGS } from "../config/component-tags.js";

class AttendanceTools extends HTMLElement {
  constructor() {
    super();
    this.activity = [];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <section class="panel">
        <header class="panel-header">
          <div>
            <h2>Attendance Center</h2>
            <p class="subtitle">Notify supervisors about schedule changes or planned leave</p>
          </div>
        </header>
        <div class="split">
          <form id="late-form" class="card form-card">
            <h3>Running late</h3>
            <label class="field">
              <span>Reason</span>
              <input name="reason" required placeholder="Traffic, customer visit…" />
            </label>
            <label class="field">
              <span>Expected arrival</span>
              <input name="eta" type="time" required />
            </label>
            <button class="primary">Send Alert</button>
          </form>
          <form id="holiday-form" class="card form-card">
            <h3>Request holiday</h3>
            <label class="field">
              <span>Start date</span>
              <input type="date" name="from" required />
            </label>
            <label class="field">
              <span>End date</span>
              <input type="date" name="to" required />
            </label>
            <label class="field">
              <span>Notes</span>
              <textarea name="notes" rows="3" placeholder="Optional context"></textarea>
            </label>
            <button class="primary">Submit Request</button>
          </form>
        </div>
        <section class="timeline" id="activity-feed">
          <h3>Recent activity</h3>
          <p class="subtitle">Updates stay visible to HR until cleared</p>
          <ul></ul>
        </section>
      </section>
    `;

    this.querySelector("#late-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      this.activity.unshift({
        type: "Late arrival",
        detail: formData.get("reason"),
        meta: `ETA ${formData.get("eta")}`,
        date: new Date()
      });
      event.target.reset();
      this.renderActivity();
    });

    this.querySelector("#holiday-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      this.activity.unshift({
        type: "Holiday request",
        detail: `${formData.get("from")} → ${formData.get("to")}`,
        meta: formData.get("notes") || "No notes",
        date: new Date()
      });
      event.target.reset();
      this.renderActivity();
    });

    this.renderActivity();
  }

  renderActivity() {
    const list = this.querySelector("#activity-feed ul");
    if (!list) return;
    const items = this.activity.slice(0, 5);
    if (!items.length) {
      list.innerHTML = `<li>No updates yet today.</li>`;
      return;
    }

    list.innerHTML = items
      .map((item) => {
        const time = item.date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        return `
          <li>
            <div>
              <p class="eyebrow">${item.type}</p>
              <p>${item.detail}</p>
              <p class="meta">${item.meta}</p>
            </div>
            <time>${time}</time>
          </li>
        `;
      })
      .join("");
  }
}

customElements.define(COMPONENT_TAGS.ATTENDANCE_TOOLS, AttendanceTools);
