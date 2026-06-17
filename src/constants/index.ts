import type { HabitCategory, WorkoutType } from '@/types';

export const HABIT_CATEGORIES: { value: HabitCategory; label: string; emoji: string }[] = [
  { value: 'health',        label: 'Health',        emoji: '❤️'  },
  { value: 'fitness',       label: 'Fitness',       emoji: '💪'  },
  { value: 'mindfulness',   label: 'Mindfulness',   emoji: '🧘'  },
  { value: 'learning',      label: 'Learning',      emoji: '📚'  },
  { value: 'productivity',  label: 'Productivity',  emoji: '⚡'  },
  { value: 'social',        label: 'Social',        emoji: '👥'  },
  { value: 'other',         label: 'Other',         emoji: '✨'  },
];

export const WORKOUT_TYPES: { value: WorkoutType; label: string; emoji: string }[] = [
  { value: 'strength',    label: 'Strength',    emoji: '🏋️' },
  { value: 'cardio',      label: 'Cardio',      emoji: '🏃' },
  { value: 'hiit',        label: 'HIIT',        emoji: '🔥' },
  { value: 'yoga',        label: 'Yoga',        emoji: '🧘' },
  { value: 'stretching',  label: 'Stretching',  emoji: '🤸' },
  { value: 'sports',      label: 'Sports',      emoji: '⚽' },
  { value: 'other',       label: 'Other',       emoji: '🎯' },
];

export const HABIT_COLORS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#ef4444',
  '#f97316', '#eab308', '#22c55e', '#14b8a6',
  '#06b6d4', '#3b82f6',
];

export const HABIT_ICONS = [
  '💧', '🏃', '🧘', '📚', '💪', '🥗', '😴', '🎯',
  '🧠', '❤️', '⚡', '🌱', '🎵', '✍️', '🏊', '🚴',
];

export const WATER_GOAL_ML = 2500;
export const SLEEP_GOAL_HOURS = 8;
export const STORAGE_KEYS = {
  HABITS:   'habitfit_habits',
  WORKOUTS: 'habitfit_workouts',
  WEIGHT:   'habitfit_weight',
  WATER:    'habitfit_water',
  SLEEP:    'habitfit_sleep',
  THEME:    'habitfit_theme',
} as const;

export const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const MONTHS = [
  'Jan','Feb','Mar','Apr','May','Jun',
  'Jul','Aug','Sep','Oct','Nov','Dec',
];
