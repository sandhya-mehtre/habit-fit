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

/**
 * Namespaces a base storage key by the currently logged-in user's id so that
 * each user's habits/workouts/weight/water/sleep data stay isolated within
 * the same browser's localStorage.
 */
export const userScopedKey = (baseKey: string, userId: string | null): string =>
  userId ? `${baseKey}::${userId}` : `${baseKey}::guest`;
