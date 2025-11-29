import { employees } from "../data/employees.js";

class DirectoryView extends HTMLElement {
  constructor() {
    super();
    this.filtered = [...employees];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <section class="panel">
        <header class="panel-header">
          <div>
            <h2>Find a colleague</h2>
            <p class="subtitle">Live status and contact information in one place</p>
          </div>
          <label class="field">
            <span>Search</span>
            <input type="search" id="directory-search" placeholder="Name, department or city" />
          </label>
        </header>
        <div class="grid" id="directory-list"></div>
      </section>
    `;

    this.querySelector("#directory-search").addEventListener("input", (event) => {
      const value = event.target.value.toLowerCase();
      this.filtered = employees.filter((employee) => {
        return (
          employee.name.toLowerCase().includes(value) ||
          employee.department.toLowerCase().includes(value) ||
          employee.location.toLowerCase().includes(value)
        );
      });
      this.renderList();
    });

    this.renderList();
  }

  renderList() {
    const list = this.querySelector("#directory-list");
    if (!list) return;

    list.innerHTML = this.filtered
      .map(
        (employee) => `
          <article class="card">
            <header>
              <div>
                <p class="eyebrow">${employee.department}</p>
                <h3>${employee.name}</h3>
                <p>${employee.role}</p>
              </div>
              <span class="status ${employee.status.toLowerCase().replace(/\s/g, "-")}" aria-label="${employee.status}">
                ${employee.status}
              </span>
            </header>
            <dl>
              <div>
                <dt>Phone</dt>
                <dd><a href="tel:${employee.phone.replace(/\s/g, "")}">${employee.phone}</a></dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd><a href="mailto:${employee.email}">${employee.email}</a></dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>${employee.location}</dd>
              </div>
            </dl>
          </article>
        `
      )
      .join("");
  }
}

customElements.define("directory-view", DirectoryView);
