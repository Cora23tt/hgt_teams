const templateCache = new Map();

export async function loadTemplate(templateUrl) {
  const key = templateUrl.toString();
  if (templateCache.has(key)) {
    return templateCache.get(key);
  }

  const response = await fetch(templateUrl);
  if (!response.ok) {
    throw new Error(`Failed to load template: ${key}`);
  }

  const text = await response.text();
  templateCache.set(key, text);
  return text;
}

export function fillTemplate(template, replacements = {}) {
  return Object.entries(replacements).reduce((output, [token, value]) => {
    const placeholder = `{{${token}}}`;
    return output.split(placeholder).join(value ?? "");
  }, template);
}
