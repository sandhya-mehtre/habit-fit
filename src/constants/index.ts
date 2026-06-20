import type { HabitCategory, WorkoutType } from '@/types';
import {
  Heart,
  Dumbbell,
  Flower2,
  BookOpen,
  Zap,
  Users,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { Footprints, Flame, PersonStanding, Target as TargetIcon } from 'lucide-react';
import { HABIT_ICON_KEYS } from './icons';

export const HABIT_CATEGORIES: { value: HabitCategory; label: string; icon: LucideIcon }[] = [
  { value: 'health',        label: 'Health',        icon: Heart },
  { value: 'fitness',       label: 'Fitness',       icon: Dumbbell },
  { value: 'mindfulness',   label: 'Mindfulness',   icon: Flower2 },
  { value: 'learning',      label: 'Learning',      icon: BookOpen },
  { value: 'productivity',  label: 'Productivity',  icon: Zap },
  { value: 'social',        label: 'Social',        icon: Users },
  { value: 'other',         label: 'Other',         icon: Sparkles },
];

export const WORKOUT_TYPES: { value: WorkoutType; label: string; icon: LucideIcon }[] = [
  { value: 'strength',    label: 'Strength',    icon: Dumbbell },
  { value: 'cardio',      label: 'Cardio',      icon: Footprints },
  { value: 'hiit',        label: 'HIIT',        icon: Flame },
  { value: 'yoga',        label: 'Yoga',        icon: Flower2 },
  { value: 'stretching',  label: 'Stretching',  icon: PersonStanding },
  { value: 'sports',      label: 'Sports',      icon: PersonStanding },
  { value: 'other',       label: 'Other',       icon: TargetIcon },
];

export const HABIT_COLORS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#ef4444',
  '#f97316', '#eab308', '#22c55e', '#14b8a6',
  '#06b6d4', '#3b82f6',
];

/** Icon keys selectable when creating/editing a habit — see constants/icons.ts */
export const HABIT_ICONS = HABIT_ICON_KEYS;

export const WATER_GOAL_ML = 2500;
export const SLEEP_GOAL_HOURS = 8;
export const STORAGE_KEYS = {
  HABITS:   'habitfit_habits',
  WORKOUTS: 'habitfit_workouts',
  WEIGHT:   'habitfit_weight',
  WATER:    'habitfit_water',
  SLEEP:    'habitfit_sleep',
  THEME:    'habitfit_theme',
  USERS:    'habitfit_users',
  SESSION:  'habitfit_session',
} as const;

export const AVATAR_COLORS = [
  '#6366f1', '#ec4899', '#f97316', '#22c55e',
  '#06b6d4', '#8b5cf6', '#ef4444', '#14b8a6',
];

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const MONTHS = [
  'Jan','Feb','Mar','Apr','May','Jun',
  'Jul','Aug','Sep','Oct','Nov','Dec',
];
