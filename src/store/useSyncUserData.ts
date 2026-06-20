import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { setActiveUser as setHabitsUser } from './slices/habitsSlice';
import { setActiveUser as setWorkoutsUser } from './slices/workoutsSlice';
import { setActiveUser as setWeightUser } from './slices/weightSlice';
import { setActiveUser as setWaterUser } from './slices/waterSlice';
import { setActiveUser as setSleepUser } from './slices/sleepSlice';

/**
 * Whenever the logged-in user changes (login, signup, logout, or on initial
 * app load when a session is restored from localStorage), this hook tells
 * every per-user data slice to reload its items from that user's namespaced
 * storage key. Mount this once near the root of the app.
 */
export const useSyncUserData = (): void => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((s) => s.auth.currentUser?.id ?? null);
  const lastSyncedId = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    if (lastSyncedId.current === userId) return;
    lastSyncedId.current = userId;

    dispatch(setHabitsUser(userId));
    dispatch(setWorkoutsUser(userId));
    dispatch(setWeightUser(userId));
    dispatch(setWaterUser(userId));
    dispatch(setSleepUser(userId));
  }, [userId, dispatch]);
};
