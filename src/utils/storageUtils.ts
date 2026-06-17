import { STORAGE_KEYS } from '@/constants';

export const loadFromStorage = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

export const saveToStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.error(`Failed to save key "${key}" to localStorage`);
  }
};

export const removeFromStorage = (key: string): void => {
  localStorage.removeItem(key);
};

export const clearAllStorage = (): void => {
  Object.values(STORAGE_KEYS).forEach(removeFromStorage);
};
