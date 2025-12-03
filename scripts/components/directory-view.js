import { employees } from "../data/employees.js";
import { COMPONENT_TAGS } from "../config/component-tags.js";
import { resolveEmployeeStatus } from "../config/employee.js";
import { loadTemplate, fillTemplate } from "../utils/template-loader.js";
import { t } from "../utils/i18n.js";

const layoutTemplatePromise = loadTemplate(new URL("../templates/directory-view.html", import.meta.url));
const cardTemplatePromise = loadTemplate(new URL("../templates/directory-card.html", import.meta.url));

class DirectoryView extends HTMLElement {
  constructor() {
    super();
    this.filtered = [...employees];
  }

  async connectedCallback() {
    await this.render();
  }

  async render() {
    const layoutTemplate = await layoutTemplatePromise;
    this.innerHTML = fillTemplate(layoutTemplate, {
      TITLE: t("directory.title"),
      SUBTITLE: t("directory.subtitle"),
      SEARCH_LABEL: t("directory.searchLabel"),
      SEARCH_PLACEHOLDER: t("directory.searchPlaceholder")
    });

    this.querySelector("#directory-search").addEventListener("input", async (event) => {
      const value = event.target.value.toLowerCase();
      this.filtered = employees.filter((employee) => {
        return (
          employee.name.toLowerCase().includes(value) ||
          employee.department.toLowerCase().includes(value) ||
          employee.location.toLowerCase().includes(value)
        );
      });
      await this.renderList();
    });

    await this.renderList();
  }

  async renderList() {
    const list = this.querySelector("#directory-list");
    if (!list) return;

    const template = await cardTemplatePromise;
    const fieldLabels = {
      LABEL_PHONE: t("directory.phone"),
      LABEL_EMAIL: t("directory.email"),
      LABEL_LOCATION: t("directory.location")
    };
    list.innerHTML = this.filtered
      .map(
        (employee) => {
          const statusMeta = resolveEmployeeStatus(employee.status);
          return fillTemplate(template, {
            DEPARTMENT: employee.department,
            NAME: employee.name,
            ROLE: employee.role,
            STATUS_CLASS: statusMeta.id,
            STATUS_LABEL: statusMeta.label,
            PHONE_LINK: employee.phone.replace(/\s/g, ""),
            PHONE: employee.phone,
            EMAIL: employee.email,
            LOCATION: employee.location,
            ...fieldLabels
          });
        }
      )
      .join("");
  }
}

customElements.define(COMPONENT_TAGS.DIRECTORY_VIEW, DirectoryView);
