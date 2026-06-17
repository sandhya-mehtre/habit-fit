// ─── Habit ────────────────────────────────────────────────────────────────────

export type HabitCategory =
  | 'health'
  | 'fitness'
  | 'mindfulness'
  | 'learning'
  | 'productivity'
  | 'social'
  | 'other';

export type HabitFrequency = 'daily' | 'weekly';

export interface Habit {
  id: string;
  name: string;
  description: string;
  category: HabitCategory;
  frequency: HabitFrequency;
  targetDays: number; // days per week for weekly habits
  color: string;
  icon: string;
  createdAt: string; // ISO date string
  completions: Record<string, boolean>; // key: YYYY-MM-DD
  streak: number;
  longestStreak: number;
}

export interface HabitFormValues {
  name: string;
  description: string;
  category: HabitCategory;
  frequency: HabitFrequency;
  targetDays: number;
  color: string;
  icon: string;
}

// ─── Workout / Fitness ────────────────────────────────────────────────────────

export type WorkoutType =
  | 'strength'
  | 'cardio'
  | 'hiit'
  | 'yoga'
  | 'stretching'
  | 'sports'
  | 'other';

export interface Exercise {
  id: string;
  name: string;
  sets?: number;
  reps?: number;
  weight?: number; // kg
  duration?: number; // minutes
  distance?: number; // km
  notes: string;
}

export interface Workout {
  id: string;
  date: string; // YYYY-MM-DD
  type: WorkoutType;
  name: string;
  duration: number; // minutes
  caloriesBurned?: number;
  exercises: Exercise[];
  notes: string;
  createdAt: string;
}

export interface WorkoutFormValues {
  date: string;
  type: WorkoutType;
  name: string;
  duration: number;
  caloriesBurned?: number;
  notes: string;
}

// ─── Health Metrics ───────────────────────────────────────────────────────────

export interface WeightEntry {
  id: string;
  date: string; // YYYY-MM-DD
  weight: number; // kg
  notes: string;
}

export interface WaterEntry {
  id: string;
  date: string; // YYYY-MM-DD
  amount: number; // ml
}

export interface SleepEntry {
  id: string;
  date: string; // YYYY-MM-DD
  hours: number;
  quality: 1 | 2 | 3 | 4 | 5;
  bedtime: string; // HH:mm
  wakeTime: string; // HH:mm
  notes: string;
}

export interface WeightFormValues {
  date: string;
  weight: number;
  notes: string;
}

export interface WaterFormValues {
  date: string;
  amount: number;
}

export interface SleepFormValues {
  date: string;
  hours: number;
  quality: 1 | 2 | 3 | 4 | 5;
  bedtime: string;
  wakeTime: string;
  notes: string;
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export interface DashboardStats {
  habitsCompletedToday: number;
  totalHabits: number;
  currentLongestStreak: number;
  workoutsThisWeek: number;
  waterTodayMl: number;
  waterGoalMl: number;
  sleepLastNight: number;
  weightLatest: number | null;
}

// ─── UI / Theme ───────────────────────────────────────────────────────────────

export type Theme = 'light' | 'dark';

export interface NavItem {
  label: string;
  path: string;
  icon: string;
}

// ─── Analytics ────────────────────────────────────────────────────────────────

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface HabitChartData {
  date: string;
  completed: number;
  total: number;
  percentage: number;
}

export interface WeeklyStats {
  weekLabel: string;
  habitsRate: number;
  workouts: number;
  avgSleep: number;
  avgWater: number;
}
