import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { WeightEntry, WeightFormValues } from '@/types';
import { STORAGE_KEYS } from '@/constants';
import { loadFromStorage, saveToStorage } from '@/utils/storageUtils';
import { generateId } from '@/utils/helpers';

interface WeightState {
  entries: WeightEntry[];
}

const initialState: WeightState = {
  entries: loadFromStorage<WeightEntry[]>(STORAGE_KEYS.WEIGHT, []),
};

const weightSlice = createSlice({
  name: 'weight',
  initialState,
  reducers: {
    addWeightEntry: (state, action: PayloadAction<WeightFormValues>) => {
      // Replace existing entry for the same date
      state.entries = state.entries.filter((e) => e.date !== action.payload.date);
      state.entries.push({ id: generateId(), ...action.payload });
      state.entries.sort((a, b) => a.date.localeCompare(b.date));
      saveToStorage(STORAGE_KEYS.WEIGHT, state.entries);
    },

    deleteWeightEntry: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter((e) => e.id !== action.payload);
      saveToStorage(STORAGE_KEYS.WEIGHT, state.entries);
    },
  },
});

export const { addWeightEntry, deleteWeightEntry } = weightSlice.actions;
export default weightSlice.reducer;
