import type { Habit } from '@/types';
import { toDateString, diffInDays } from './dateUtils';

export const calculateStreak = (completions: Record<string, boolean>): number => {
  const today = new Date();
  let streak = 0;

  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = toDateString(d);

    if (completions[dateStr]) {
      streak++;
    } else if (i === 0) {
      // today not completed yet — don't break streak, check yesterday
      continue;
    } else {
      break;
    }
  }

  return streak;
};

export const calculateLongestStreak = (completions: Record<string, boolean>): number => {
  const dates = Object.keys(completions)
    .filter((d) => completions[d])
    .sort();

  if (dates.length === 0) return 0;

  let longest = 1;
  let current = 1;

  for (let i = 1; i < dates.length; i++) {
    const diff = diffInDays(dates[i], dates[i - 1]);
    if (diff === 1) {
      current++;
      if (current > longest) longest = current;
    } else {
      current = 1;
    }
  }

  return longest;
};

export const getCompletionRate = (
  habit: Habit,
  days: string[]
): number => {
  if (days.length === 0) return 0;
  const completed = days.filter((d) => habit.completions[d]).length;
  return Math.round((completed / days.length) * 100);
};

export const getTodayCompletionCount = (habits: Habit[], today: string): number =>
  habits.filter((h) => h.completions[today]).length;
