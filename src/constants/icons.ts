import {
  Droplet,
  Footprints,
  Flower2,
  BookOpen,
  Dumbbell,
  Salad,
  Moon,
  Target,
  Brain,
  Heart,
  Zap,
  Sprout,
  Music,
  PenLine,
  Waves,
  Bike,
  type LucideIcon,
} from 'lucide-react';

/**
 * Habit icons are persisted as string keys (not JSX) so they can be safely
 * stored in Redux state / localStorage. This registry maps each key to its
 * Lucide component for rendering.
 */
export const HABIT_ICON_MAP: Record<string, LucideIcon> = {
  droplet:    Droplet,
  run:        Footprints,
  meditate:   Flower2,
  read:       BookOpen,
  strength:   Dumbbell,
  nutrition:  Salad,
  sleep:      Moon,
  target:     Target,
  mind:       Brain,
  heart:      Heart,
  energy:     Zap,
  growth:     Sprout,
  music:      Music,
  write:      PenLine,
  swim:       Waves,
  cycle:      Bike,
};

export const HABIT_ICON_KEYS = Object.keys(HABIT_ICON_MAP);

export const DEFAULT_HABIT_ICON = 'target';

export const getHabitIcon = (key: string): LucideIcon =>
  HABIT_ICON_MAP[key] ?? Target;
