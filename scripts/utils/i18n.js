const SUPPORTED_LANGUAGES = ["ru", "uz", "en"];
const DEFAULT_LANGUAGE = "ru";

/**
 * @param {string | undefined | null} value
 */
function normalizeLanguage(value) {
  const normalized = (value || "").toLowerCase();
  if (!normalized) {
    return { original: "", base: "" };
  }
  const [base] = normalized.split("-");
  return { original: normalized, base };
}

function detectLanguage() {
  const candidates = [navigator.language, navigator.userLanguage];

  for (const candidate of candidates) {
    const { original, base } = normalizeLanguage(candidate);
    if (SUPPORTED_LANGUAGES.includes(original)) {
      return original;
    }
    if (SUPPORTED_LANGUAGES.includes(base)) {
      return base;
    }
  }

  return DEFAULT_LANGUAGE;
}

const CURRENT_LANGUAGE = detectLanguage();

const TRANSLATIONS = Object.freeze({
  ru: {
    "app.subtitle": "Будьте на связи с командой в любом месте",
    "app.installCta": "Установить приложение",
    "app.refreshCta": "Обновить данные",
    "app.installNotReady": "Установка пока недоступна. Попробуйте позже.",
    "app.refreshToast": "Данные только что синхронизированы",
    "nav.directory": "Коллеги",
    "nav.attendance": "Посещаемость",
    "nav.news": "Новости компании",
    "nav.profile": "Мой профиль",
    "directory.title": "Найдите коллегу",
    "directory.subtitle": "Актуальные статусы и контакты в одном месте",
    "directory.searchLabel": "Поиск",
    "directory.searchPlaceholder": "Имя, отдел или город",
    "directory.phone": "Телефон",
    "directory.email": "Email",
    "directory.location": "Локация",
    "attendance.title": "Центр посещаемости",
    "attendance.subtitle": "Сообщайте руководителям об изменениях графика и отпуске",
    "attendance.runningLate": "Опаздываю",
    "attendance.reason": "Причина",
    "attendance.reasonPlaceholder": "Пробки, выезд к клиенту…",
    "attendance.expectedArrival": "Ожидаемое прибытие",
    "attendance.sendAlert": "Отправить уведомление",
    "attendance.requestHoliday": "Запросить отпуск",
    "attendance.startDate": "Дата начала",
    "attendance.endDate": "Дата окончания",
    "attendance.notes": "Комментарии",
    "attendance.notesPlaceholder": "Дополнительный контекст",
    "attendance.submitRequest": "Отправить заявку",
    "attendance.recentActivity": "Недавние действия",
    "attendance.recentActivitySubtitle": "Обновления видны HR до удаления",
    "attendance.emptyActivity": "Пока нет обновлений.",
    "attendance.activityLate": "Сообщение об опоздании",
    "attendance.metaEta": "Прибытие в {time}",
    "attendance.activityHoliday": "Запрос на отпуск",
    "attendance.noNotes": "Без комментариев",
    "news.title": "Пульс HGT",
    "news.subtitle": "Объявления компании и статьи",
    "news.by": "Автор {author}",
    "profile.eyebrow": "Моя панель",
    "profile.weeklyFocus": "Задачи недели",
    "profile.estimatedSalary": "Расчетная зарплата",
    "profile.beforeTax": "До вычета налогов",
    "profile.payrollHistory": "История выплат",
    "profile.weeklyMeta": "Цель {targetHours}{hoursSuffix} · {utilization}% плана",
    "common.hoursSuffix": "ч",
    "employee.status.onSite": "На объекте",
    "employee.status.remote": "Удаленно",
    "employee.status.inTransit": "В пути",
    "employee.status.onLeave": "В отпуске",
    "employee.status.unknown": "Неизвестно"
  },
  uz: {
    "app.subtitle": "Har qayerda jamoangiz bilan uyg'un bo'ling",
    "app.installCta": "Ilovani o'rnatish",
    "app.refreshCta": "Ma'lumotlarni yangilash",
    "app.installNotReady": "O'rnatish hali tayyor emas. Birozdan so'ng urinib ko'ring.",
    "app.refreshToast": "Ma'lumotlar hozirgina sinxronlandi",
    "nav.directory": "Hodimlar",
    "nav.attendance": "Davomat",
    "nav.news": "Kompaniya yangiliklari",
    "nav.profile": "Profilim",
    "directory.title": "Hamkasbni toping",
    "directory.subtitle": "Holat va kontaktlar bir joyda",
    "directory.searchLabel": "Qidiruv",
    "directory.searchPlaceholder": "Ism, bo'lim yoki shahar",
    "directory.phone": "Telefon",
    "directory.email": "Email",
    "directory.location": "Manzil",
    "attendance.title": "Davomat markazi",
    "attendance.subtitle": "Rahbarlarga jadval o'zgarishi va ta'til haqida xabar bering",
    "attendance.runningLate": "Kechikayapman",
    "attendance.reason": "Sabab",
    "attendance.reasonPlaceholder": "Tirbandlik, mijozga tashrif…",
    "attendance.expectedArrival": "Taxminiy kelish vaqti",
    "attendance.sendAlert": "Ogohlantirish yuborish",
    "attendance.requestHoliday": "Ta'til so'rash",
    "attendance.startDate": "Boshlanish sanasi",
    "attendance.endDate": "Tugash sanasi",
    "attendance.notes": "Izohlar",
    "attendance.notesPlaceholder": "Qo'shimcha ma'lumot",
    "attendance.submitRequest": "So'rovni yuborish",
    "attendance.recentActivity": "So'nggi faoliyat",
    "attendance.recentActivitySubtitle": "Yangilanishlar HRga o'chirilgunga qadar ko'rinadi",
    "attendance.emptyActivity": "Buguncha yangilanish yo'q.",
    "attendance.activityLate": "Kechikish xabari",
    "attendance.metaEta": "Kelish vaqti {time}",
    "attendance.activityHoliday": "Ta'til so'rovi",
    "attendance.noNotes": "Izohsiz",
    "news.title": "HGT Nabzi",
    "news.subtitle": "Kompaniya e'lonlari va blog yozuvlari",
    "news.by": "Muallif {author}",
    "profile.eyebrow": "Mening panelim",
    "profile.weeklyFocus": "Haftalik diqqat",
    "profile.estimatedSalary": "Taxminiy maosh",
    "profile.beforeTax": "Soliqdan oldin",
    "profile.payrollHistory": "To'lovlar tarixi",
    "profile.weeklyMeta": "Maqsad {targetHours}{hoursSuffix} · {utilization}% bajarildi",
    "common.hoursSuffix": "soat",
    "employee.status.onSite": "Obyektda",
    "employee.status.remote": "Masofadan",
    "employee.status.inTransit": "Yo'lda",
    "employee.status.onLeave": "Ta'tilda",
    "employee.status.unknown": "Noma'lum"
  },
  en: {
    "app.subtitle": "Stay aligned with your crew anywhere",
    "app.installCta": "Install App",
    "app.refreshCta": "Refresh Data",
    "app.installNotReady": "App install prompt is not ready yet. Try again soon.",
    "app.refreshToast": "Data synced just now",
    "nav.directory": "Colleagues",
    "nav.attendance": "Attendance",
    "nav.news": "Company News",
    "nav.profile": "My Profile",
    "directory.title": "Find a colleague",
    "directory.subtitle": "Live status and contact information in one place",
    "directory.searchLabel": "Search",
    "directory.searchPlaceholder": "Name, department or city",
    "directory.phone": "Phone",
    "directory.email": "Email",
    "directory.location": "Location",
    "attendance.title": "Attendance Center",
    "attendance.subtitle": "Notify supervisors about schedule changes or planned leave",
    "attendance.runningLate": "Running late",
    "attendance.reason": "Reason",
    "attendance.reasonPlaceholder": "Traffic, customer visit…",
    "attendance.expectedArrival": "Expected arrival",
    "attendance.sendAlert": "Send Alert",
    "attendance.requestHoliday": "Request holiday",
    "attendance.startDate": "Start date",
    "attendance.endDate": "End date",
    "attendance.notes": "Notes",
    "attendance.notesPlaceholder": "Optional context",
    "attendance.submitRequest": "Submit Request",
    "attendance.recentActivity": "Recent activity",
    "attendance.recentActivitySubtitle": "Updates stay visible to HR until cleared",
    "attendance.emptyActivity": "No updates yet today.",
    "attendance.activityLate": "Late arrival",
    "attendance.metaEta": "ETA {time}",
    "attendance.activityHoliday": "Holiday request",
    "attendance.noNotes": "No notes",
    "news.title": "HGT Pulse",
    "news.subtitle": "Company announcements and blog posts",
    "news.by": "By {author}",
    "profile.eyebrow": "My dashboard",
    "profile.weeklyFocus": "Weekly focus",
    "profile.estimatedSalary": "Estimated salary",
    "profile.beforeTax": "Before tax",
    "profile.payrollHistory": "Payroll history",
    "profile.weeklyMeta": "Target {targetHours}{hoursSuffix} · {utilization}% of goal",
    "common.hoursSuffix": "h",
    "employee.status.onSite": "On-site",
    "employee.status.remote": "Remote",
    "employee.status.inTransit": "In Transit",
    "employee.status.onLeave": "On Leave",
    "employee.status.unknown": "Unknown"
  }
});

export function getCurrentLanguage() {
  return CURRENT_LANGUAGE;
}

export function t(key, replacements = {}) {
  const dictionary = TRANSLATIONS[CURRENT_LANGUAGE] || TRANSLATIONS[DEFAULT_LANGUAGE] || {};
  const fallbackDictionary = TRANSLATIONS[DEFAULT_LANGUAGE] || {};
  const template = dictionary[key] ?? fallbackDictionary[key] ?? key;
  return template.replace(/\{(\w+)\}/g, (match, token) => {
    if (Object.prototype.hasOwnProperty.call(replacements, token)) {
      return replacements[token];
    }
    return match;
  });
}
