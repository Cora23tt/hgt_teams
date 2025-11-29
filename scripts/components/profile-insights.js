import { employees, currentUserId } from "../data/employees.js";

const payrollHistory = [
  { month: "Feb", hours: 160, salary: 11800000 },
  { month: "Mar", hours: 162, salary: 12000000 },
  { month: "Apr", hours: 158, salary: 11900000 }
];

class ProfileInsights extends HTMLElement {
  connectedCallback() {
    this.user = employees.find((employee) => employee.id === currentUserId) || employees[0];
    this.render();
  }

  render() {
    const utilization = Math.round((this.user.hoursThisWeek / this.user.hoursTarget) * 100);
    this.innerHTML = `
      <section class="panel">
        <header class="panel-header">
          <div>
            <p class="eyebrow">My dashboard</p>
            <h2>${this.user.name}</h2>
            <p class="subtitle">${this.user.role} · ${this.user.department}</p>
          </div>
        </header>
        <div class="split">
          <div class="card stats-card">
            <h3>Weekly focus</h3>
            <p class="value">${this.user.hoursThisWeek}h</p>
            <p class="meta">Target ${this.user.hoursTarget}h · ${utilization}% of goal</p>
          </div>
          <div class="card stats-card">
            <h3>Estimated salary</h3>
            <p class="value">${(this.user.salary / 1000000).toFixed(1)}M UZS</p>
            <p class="meta">Before tax</p>
          </div>
        </div>
        <section class="payroll">
          <h3>Payroll history</h3>
          <ul>
            ${payrollHistory
              .map(
                (entry) => `
                  <li>
                    <span>${entry.month}</span>
                    <span>${entry.hours}h</span>
                    <span>${(entry.salary / 1000000).toFixed(1)}M UZS</span>
                  </li>
                `
              )
              .join("")}
          </ul>
        </section>
      </section>
    `;
  }
}

customElements.define("profile-insights", ProfileInsights);
