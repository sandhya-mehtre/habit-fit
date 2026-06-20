import { configureStore } from '@reduxjs/toolkit';
import authReducer    from './slices/authSlice';
import habitsReducer  from './slices/habitsSlice';
import workoutsReducer from './slices/workoutsSlice';
import weightReducer  from './slices/weightSlice';
import waterReducer   from './slices/waterSlice';
import sleepReducer   from './slices/sleepSlice';
import uiReducer      from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth:     authReducer,
    habits:   habitsReducer,
    workouts: workoutsReducer,
    weight:   weightReducer,
    water:    waterReducer,
    sleep:    sleepReducer,
    ui:       uiReducer,
  },
});

export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
