import { employees, currentUserId } from "../data/employees.js";
import { COMPONENT_TAGS } from "../config/component-tags.js";
import { loadTemplate, fillTemplate } from "../utils/template-loader.js";

const payrollHistory = [
  { month: "Feb", hours: 160, salary: 11800000 },
  { month: "Mar", hours: 162, salary: 12000000 },
  { month: "Apr", hours: 158, salary: 11900000 }
];

const layoutTemplatePromise = loadTemplate(new URL("../templates/profile-insights.html", import.meta.url));
const payrollRowTemplatePromise = loadTemplate(new URL("../templates/payroll-row.html", import.meta.url));

class ProfileInsights extends HTMLElement {
  async connectedCallback() {
    this.user = employees.find((employee) => employee.id === currentUserId) || employees[0];
    await this.render();
  }

  async render() {
    const utilization = Math.round((this.user.hoursThisWeek / this.user.hoursTarget) * 100);
    const [layoutTemplate, payrollRowTemplate] = await Promise.all([layoutTemplatePromise, payrollRowTemplatePromise]);
    const payrollRows = payrollHistory
      .map((entry) =>
        fillTemplate(payrollRowTemplate, {
          MONTH: entry.month,
          HOURS: `${entry.hours}h`,
          SALARY: `${(entry.salary / 1000000).toFixed(1)}M UZS`
        })
      )
      .join("");

    this.innerHTML = fillTemplate(layoutTemplate, {
      USER_NAME: this.user.name,
      USER_ROLE_DEPARTMENT: `${this.user.role} · ${this.user.department}`,
      WEEKLY_HOURS: `${this.user.hoursThisWeek}h`,
      WEEKLY_META: `Target ${this.user.hoursTarget}h · ${utilization}% of goal`,
      SALARY_ESTIMATE: `${(this.user.salary / 1000000).toFixed(1)}M UZS`,
      PAYROLL_ROWS: payrollRows
    });
  }
}

customElements.define(COMPONENT_TAGS.PROFILE_INSIGHTS, ProfileInsights);
