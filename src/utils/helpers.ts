export const generateId = (): string =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const clsx = (...classes: (string | undefined | false | null)[]): string =>
  classes.filter(Boolean).join(' ');

export const mlToLitres = (ml: number): string => (ml / 1000).toFixed(1);

export const kgToLbs = (kg: number): number => Math.round(kg * 2.20462 * 10) / 10;

export const formatWeight = (kg: number): string => `${kg} kg`;

export const capitalise = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

export const pct = (part: number, total: number): number =>
  total === 0 ? 0 : Math.round((part / total) * 100);
