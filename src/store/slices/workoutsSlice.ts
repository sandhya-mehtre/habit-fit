import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Workout, WorkoutFormValues, Exercise } from '@/types';
import { STORAGE_KEYS } from '@/constants';
import { loadFromStorage, saveToStorage } from '@/utils/storageUtils';
import { generateId } from '@/utils/helpers';

interface WorkoutsState {
  items: Workout[];
}

const initialState: WorkoutsState = {
  items: loadFromStorage<Workout[]>(STORAGE_KEYS.WORKOUTS, []),
};

const workoutsSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
    addWorkout: (state, action: PayloadAction<WorkoutFormValues>) => {
      const workout: Workout = {
        id: generateId(),
        ...action.payload,
        exercises: [],
        createdAt: new Date().toISOString(),
      };
      state.items.unshift(workout);
      saveToStorage(STORAGE_KEYS.WORKOUTS, state.items);
    },

    updateWorkout: (
      state,
      action: PayloadAction<{ id: string; values: WorkoutFormValues }>
    ) => {
      const idx = state.items.findIndex((w) => w.id === action.payload.id);
      if (idx !== -1) {
        state.items[idx] = { ...state.items[idx], ...action.payload.values };
        saveToStorage(STORAGE_KEYS.WORKOUTS, state.items);
      }
    },

    deleteWorkout: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((w) => w.id !== action.payload);
      saveToStorage(STORAGE_KEYS.WORKOUTS, state.items);
    },

    addExercise: (
      state,
      action: PayloadAction<{ workoutId: string; exercise: Omit<Exercise, 'id'> }>
    ) => {
      const workout = state.items.find((w) => w.id === action.payload.workoutId);
      if (workout) {
        workout.exercises.push({ id: generateId(), ...action.payload.exercise });
        saveToStorage(STORAGE_KEYS.WORKOUTS, state.items);
      }
    },

    removeExercise: (
      state,
      action: PayloadAction<{ workoutId: string; exerciseId: string }>
    ) => {
      const workout = state.items.find((w) => w.id === action.payload.workoutId);
      if (workout) {
        workout.exercises = workout.exercises.filter(
          (e) => e.id !== action.payload.exerciseId
        );
        saveToStorage(STORAGE_KEYS.WORKOUTS, state.items);
      }
    },
  },
});

export const {
  addWorkout,
  updateWorkout,
  deleteWorkout,
  addExercise,
  removeExercise,
} = workoutsSlice.actions;

export default workoutsSlice.reducer;
