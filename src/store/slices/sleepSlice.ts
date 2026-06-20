import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SleepEntry, SleepFormValues } from '@/types';
import { STORAGE_KEYS } from '@/constants';
import { loadFromStorage, saveToStorage, userScopedKey } from '@/utils/storageUtils';
import { generateId } from '@/utils/helpers';

interface SleepState {
  entries: SleepEntry[];
  userId: string | null;
}

const initialState: SleepState = {
  entries: [],
  userId: null,
};

const sleepSlice = createSlice({
  name: 'sleep',
  initialState,
  reducers: {
    setActiveUser: (state, action: PayloadAction<string | null>) => {
      state.userId = action.payload;
      state.entries = loadFromStorage<SleepEntry[]>(
        userScopedKey(STORAGE_KEYS.SLEEP, action.payload),
        []
      );
    },

    addSleepEntry: (state, action: PayloadAction<SleepFormValues>) => {
      state.entries = state.entries.filter((e) => e.date !== action.payload.date);
      state.entries.push({ id: generateId(), ...action.payload });
      state.entries.sort((a, b) => a.date.localeCompare(b.date));
      saveToStorage(userScopedKey(STORAGE_KEYS.SLEEP, state.userId), state.entries);
    },

    deleteSleepEntry: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter((e) => e.id !== action.payload);
      saveToStorage(userScopedKey(STORAGE_KEYS.SLEEP, state.userId), state.entries);
    },
  },
});

export const { setActiveUser, addSleepEntry, deleteSleepEntry } = sleepSlice.actions;
export default sleepSlice.reducer;
