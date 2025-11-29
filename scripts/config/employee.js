export const EMPLOYEE_STATUSES = Object.freeze({
  ON_SITE: { id: "on-site", label: "On-site" },
  REMOTE: { id: "remote", label: "Remote" },
  IN_TRANSIT: { id: "in-transit", label: "In Transit" },
  ON_LEAVE: { id: "on-leave", label: "On Leave" }
});

Object.values(EMPLOYEE_STATUSES).forEach((status) => Object.freeze(status));

export const EMPLOYEE_STATUS_BY_ID = Object.freeze(
  Object.values(EMPLOYEE_STATUSES).reduce((acc, status) => {
    acc[status.id] = status;
    return acc;
  }, {})
);

/**
 * @typedef {Object} Employee
 * @property {number} id
 * @property {string} name
 * @property {string} role
 * @property {string} department
 * @property {string} status
 * @property {string} email
 * @property {string} phone
 * @property {string} location
 * @property {number} hoursThisWeek
 * @property {number} hoursTarget
 * @property {number} salary
 */
export const EMPLOYEE_FIELDS = Object.freeze([
  "id",
  "name",
  "role",
  "department",
  "status",
  "email",
  "phone",
  "location",
  "hoursThisWeek",
  "hoursTarget",
  "salary"
]);

/**
 * @param {Partial<Record<keyof Employee, any>>} data
 * @returns {Employee}
 */
export function createEmployee(data) {
  EMPLOYEE_FIELDS.forEach((field) => {
    if (!(field in data)) {
      throw new Error(`Missing employee field "${field}"`);
    }
  });
  return Object.freeze({ ...data });
}

export function resolveEmployeeStatus(statusId) {
  if (EMPLOYEE_STATUS_BY_ID[statusId]) {
    return EMPLOYEE_STATUS_BY_ID[statusId];
  }
  const normalized = (statusId || "unknown").toString().trim().toLowerCase().replace(/\s+/g, "-");
  const fallbackId = normalized || "unknown";
  const fallbackLabel = statusId || "Unknown";
  return { id: fallbackId, label: fallbackLabel };
}
