import { EMPLOYEE_STATUSES, createEmployee } from "../config/employee.js";

export const employees = Object.freeze([
  createEmployee({
    id: 1,
    name: "Azimov Jamshid",
    role: "Network Engineer",
    department: "Infrastructure",
    status: EMPLOYEE_STATUSES.ON_SITE.id,
    email: "jamshid.azimov@hgt.uz",
    phone: "+998 90 123 45 67",
    location: "Tashkent",
    hoursThisWeek: 34,
    hoursTarget: 40,
    salary: 12000000
  }),
  createEmployee({
    id: 2,
    name: "Karimova Mohira",
    role: "HR Specialist",
    department: "People",
    status: EMPLOYEE_STATUSES.REMOTE.id,
    email: "mohira.karimova@hgt.uz",
    phone: "+998 97 765 43 21",
    location: "Samarqand",
    hoursThisWeek: 28,
    hoursTarget: 40,
    salary: 9000000
  }),
  createEmployee({
    id: 3,
    name: "Rustamov Aziz",
    role: "Field Supervisor",
    department: "Operations",
    status: EMPLOYEE_STATUSES.IN_TRANSIT.id,
    email: "aziz.rustamov@hgt.uz",
    phone: "+998 93 456 78 90",
    location: "Namangan",
    hoursThisWeek: 25,
    hoursTarget: 38,
    salary: 8000000
  }),
  createEmployee({
    id: 4,
    name: "Yuldashev Dilshod",
    role: "Metering Analyst",
    department: "Analytics",
    status: EMPLOYEE_STATUSES.ON_SITE.id,
    email: "dilshod.yuldashev@hgt.uz",
    phone: "+998 95 987 65 43",
    location: "Bukhara",
    hoursThisWeek: 39,
    hoursTarget: 40,
    salary: 10500000
  }),
  createEmployee({
    id: 5,
    name: "Musoqulov Amir",
    role: "Technician",
    department: "Service",
    status: EMPLOYEE_STATUSES.ON_LEAVE.id,
    email: "amir.musoqulov@hgt.uz",
    phone: "+998 91 333 22 11",
    location: "Andijan",
    hoursThisWeek: 12,
    hoursTarget: 36,
    salary: 7000000
  })
]);

export const currentUserId = 1;
