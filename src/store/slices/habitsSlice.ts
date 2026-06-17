import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Habit, HabitFormValues } from '@/types';
import { STORAGE_KEYS } from '@/constants';
import { loadFromStorage, saveToStorage } from '@/utils/storageUtils';
import { generateId } from '@/utils/helpers';
import { calculateStreak, calculateLongestStreak } from '@/utils/habitUtils';
import { todayString } from '@/utils/dateUtils';

interface HabitsState {
  items: Habit[];
}

const initialState: HabitsState = {
  items: loadFromStorage<Habit[]>(STORAGE_KEYS.HABITS, []),
};

const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    addHabit: (state, action: PayloadAction<HabitFormValues>) => {
      const habit: Habit = {
        id: generateId(),
        ...action.payload,
        createdAt: new Date().toISOString(),
        completions: {},
        streak: 0,
        longestStreak: 0,
      };
      state.items.push(habit);
      saveToStorage(STORAGE_KEYS.HABITS, state.items);
    },

    updateHabit: (
      state,
      action: PayloadAction<{ id: string; values: HabitFormValues }>
    ) => {
      const idx = state.items.findIndex((h) => h.id === action.payload.id);
      if (idx !== -1) {
        state.items[idx] = {
          ...state.items[idx],
          ...action.payload.values,
        };
        saveToStorage(STORAGE_KEYS.HABITS, state.items);
      }
    },

    deleteHabit: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((h) => h.id !== action.payload);
      saveToStorage(STORAGE_KEYS.HABITS, state.items);
    },

    toggleCompletion: (
      state,
      action: PayloadAction<{ id: string; date?: string }>
    ) => {
      const { id, date = todayString() } = action.payload;
      const habit = state.items.find((h) => h.id === id);
      if (!habit) return;

      habit.completions[date] = !habit.completions[date];
      if (!habit.completions[date]) delete habit.completions[date];

      habit.streak = calculateStreak(habit.completions);
      habit.longestStreak = calculateLongestStreak(habit.completions);

      saveToStorage(STORAGE_KEYS.HABITS, state.items);
    },

    rehydrateHabits: (state) => {
      state.items = loadFromStorage<Habit[]>(STORAGE_KEYS.HABITS, []);
    },
  },
});

export const {
  addHabit,
  updateHabit,
  deleteHabit,
  toggleCompletion,
  rehydrateHabits,
} = habitsSlice.actions;

export default habitsSlice.reducer;
