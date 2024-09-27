export function getItem<T>(key: string, defaultValue: T): T {
  const storedValue = sessionStorage.getItem(key);
  if (storedValue === null) {
    return defaultValue;
  }
  try {
    return JSON.parse(storedValue) as T;
  } catch {
    return defaultValue;
  }
}

export function setItem<T>(key: string, value: T): void {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export function removeItem(key: string): void {
  sessionStorage.removeItem(key);
}

export function clearStorage(): void {
  sessionStorage.clear();
}
