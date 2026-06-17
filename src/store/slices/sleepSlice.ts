import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SleepEntry, SleepFormValues } from '@/types';
import { STORAGE_KEYS } from '@/constants';
import { loadFromStorage, saveToStorage } from '@/utils/storageUtils';
import { generateId } from '@/utils/helpers';

interface SleepState {
  entries: SleepEntry[];
}

const initialState: SleepState = {
  entries: loadFromStorage<SleepEntry[]>(STORAGE_KEYS.SLEEP, []),
};

const sleepSlice = createSlice({
  name: 'sleep',
  initialState,
  reducers: {
    addSleepEntry: (state, action: PayloadAction<SleepFormValues>) => {
      state.entries = state.entries.filter((e) => e.date !== action.payload.date);
      state.entries.push({ id: generateId(), ...action.payload });
      state.entries.sort((a, b) => a.date.localeCompare(b.date));
      saveToStorage(STORAGE_KEYS.SLEEP, state.entries);
    },

    deleteSleepEntry: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter((e) => e.id !== action.payload);
      saveToStorage(STORAGE_KEYS.SLEEP, state.entries);
    },
  },
});

export const { addSleepEntry, deleteSleepEntry } = sleepSlice.actions;
export default sleepSlice.reducer;
