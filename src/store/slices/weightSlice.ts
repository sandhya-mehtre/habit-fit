import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { WeightEntry, WeightFormValues } from '@/types';
import { STORAGE_KEYS } from '@/constants';
import { loadFromStorage, saveToStorage, userScopedKey } from '@/utils/storageUtils';
import { generateId } from '@/utils/helpers';

interface WeightState {
  entries: WeightEntry[];
  userId: string | null;
}

const initialState: WeightState = {
  entries: [],
  userId: null,
};

const weightSlice = createSlice({
  name: 'weight',
  initialState,
  reducers: {
    setActiveUser: (state, action: PayloadAction<string | null>) => {
      state.userId = action.payload;
      state.entries = loadFromStorage<WeightEntry[]>(
        userScopedKey(STORAGE_KEYS.WEIGHT, action.payload),
        []
      );
    },

    addWeightEntry: (state, action: PayloadAction<WeightFormValues>) => {
      state.entries = state.entries.filter((e) => e.date !== action.payload.date);
      state.entries.push({ id: generateId(), ...action.payload });
      state.entries.sort((a, b) => a.date.localeCompare(b.date));
      saveToStorage(userScopedKey(STORAGE_KEYS.WEIGHT, state.userId), state.entries);
    },

    deleteWeightEntry: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter((e) => e.id !== action.payload);
      saveToStorage(userScopedKey(STORAGE_KEYS.WEIGHT, state.userId), state.entries);
    },
  },
});

export const { setActiveUser, addWeightEntry, deleteWeightEntry } = weightSlice.actions;
export default weightSlice.reducer;
