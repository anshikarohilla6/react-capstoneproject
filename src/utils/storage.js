export function readStoredValue(key, fallbackValue) {
  if (typeof window === 'undefined') {
    return fallbackValue;
  }

  const rawValue = window.localStorage.getItem(key);

  if (rawValue === null) {
    return fallbackValue;
  }

  try {
    return JSON.parse(rawValue);
  } catch {
    return rawValue;
  }
}

export function writeStoredValue(key, value) {
  if (typeof window === 'undefined') {
    return;
  }

  if (typeof value === 'string') {
    window.localStorage.setItem(key, value);
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}