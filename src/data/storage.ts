// Define a type for the storage options
type StorageType = 'session' | 'local';

// Helper function to get the correct storage object
function getStorage(type: StorageType): Storage {
  return type === 'session' ? sessionStorage : localStorage;
}

export function getItem<T>(key: string, defaultValue: T, storageType: StorageType = 'local'): T {
  const storage = getStorage(storageType);
  const storedValue = storage.getItem(key);
  if (storedValue === null) {
    return defaultValue;
  }
  try {
    return JSON.parse(storedValue) as T;
  } catch {
    return defaultValue;
  }
}

export function setItem<T>(key: string, value: T, storageType: StorageType = 'local'): void {
  const storage = getStorage(storageType);
  storage.setItem(key, JSON.stringify(value));
}

export function removeItem(key: string, storageType: StorageType = 'local'): void {
  const storage = getStorage(storageType);
  storage.removeItem(key);
}

export function clearStorage(storageType: StorageType = 'local'): void {
  const storage = getStorage(storageType);
  storage.clear();
}
