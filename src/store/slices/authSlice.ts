import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  User,
  PublicUser,
  SignupFormValues,
  LoginFormValues,
  ProfileFormValues,
  PasswordChangeFormValues,
} from '@/types';
import { STORAGE_KEYS, AVATAR_COLORS } from '@/constants';
import { loadFromStorage, saveToStorage, removeFromStorage } from '@/utils/storageUtils';
import { generateId } from '@/utils/helpers';

interface AuthState {
  currentUser: PublicUser | null;
  status: 'idle' | 'loading';
  error: string | null;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Naive client-side hash. Not cryptographically secure — fine for a demo
 *  app with no real backend; never reused for anything security-critical. */
const hashPassword = (password: string): string => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    hash = (hash << 5) - hash + password.charCodeAt(i);
    hash |= 0;
  }
  return `h${hash}_${password.length}`;
};

const toPublicUser = (user: User): PublicUser => ({
  id: user.id,
  name: user.name,
  email: user.email,
  avatarColor: user.avatarColor,
  createdAt: user.createdAt,
  heightCm: user.heightCm,
  goalWeightKg: user.goalWeightKg,
  bio: user.bio,
});

const getUsers = (): User[] => loadFromStorage<User[]>(STORAGE_KEYS.USERS, []);
const saveUsers = (users: User[]): void => saveToStorage(STORAGE_KEYS.USERS, users);

const getSessionUserId = (): string | null =>
  loadFromStorage<string | null>(STORAGE_KEYS.SESSION, null);

const setSessionUserId = (id: string | null): void => {
  if (id) saveToStorage(STORAGE_KEYS.SESSION, id);
  else removeFromStorage(STORAGE_KEYS.SESSION);
};

const restoreSession = (): PublicUser | null => {
  const sessionId = getSessionUserId();
  if (!sessionId) return null;
  const user = getUsers().find((u) => u.id === sessionId);
  return user ? toPublicUser(user) : null;
};

// ── Initial state ────────────────────────────────────────────────────────────

const initialState: AuthState = {
  currentUser: restoreSession(),
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signup: (state, action: PayloadAction<SignupFormValues>) => {
      const { name, email, password } = action.payload;
      const users = getUsers();
      const normalizedEmail = email.trim().toLowerCase();

      if (users.some((u) => u.email === normalizedEmail)) {
        state.error = 'An account with this email already exists.';
        return;
      }

      const newUser: User = {
        id: generateId(),
        name: name.trim(),
        email: normalizedEmail,
        passwordHash: hashPassword(password),
        avatarColor: AVATAR_COLORS[users.length % AVATAR_COLORS.length],
        createdAt: new Date().toISOString(),
      };

      saveUsers([...users, newUser]);
      setSessionUserId(newUser.id);
      state.currentUser = toPublicUser(newUser);
      state.error = null;
    },

    login: (state, action: PayloadAction<LoginFormValues>) => {
      const { email, password } = action.payload;
      const normalizedEmail = email.trim().toLowerCase();
      const users = getUsers();
      const user = users.find((u) => u.email === normalizedEmail);

      if (!user || user.passwordHash !== hashPassword(password)) {
        state.error = 'Invalid email or password.';
        return;
      }

      setSessionUserId(user.id);
      state.currentUser = toPublicUser(user);
      state.error = null;
    },

    logout: (state) => {
      setSessionUserId(null);
      state.currentUser = null;
      state.error = null;
    },

    updateProfile: (state, action: PayloadAction<ProfileFormValues>) => {
      if (!state.currentUser) return;
      const users = getUsers();
      const idx = users.findIndex((u) => u.id === state.currentUser!.id);
      if (idx === -1) return;

      const normalizedEmail = action.payload.email.trim().toLowerCase();
      const emailTaken = users.some(
        (u, i) => i !== idx && u.email === normalizedEmail
      );
      if (emailTaken) {
        state.error = 'That email is already used by another account.';
        return;
      }

      users[idx] = {
        ...users[idx],
        name: action.payload.name.trim(),
        email: normalizedEmail,
        heightCm: action.payload.heightCm,
        goalWeightKg: action.payload.goalWeightKg,
        bio: action.payload.bio,
      };

      saveUsers(users);
      state.currentUser = toPublicUser(users[idx]);
      state.error = null;
    },

    changePassword: (state, action: PayloadAction<PasswordChangeFormValues>) => {
      if (!state.currentUser) return;
      const users = getUsers();
      const idx = users.findIndex((u) => u.id === state.currentUser!.id);
      if (idx === -1) return;

      if (users[idx].passwordHash !== hashPassword(action.payload.currentPassword)) {
        state.error = 'Current password is incorrect.';
        return;
      }

      users[idx] = {
        ...users[idx],
        passwordHash: hashPassword(action.payload.newPassword),
      };
      saveUsers(users);
      state.error = null;
    },

    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const {
  signup,
  login,
  logout,
  updateProfile,
  changePassword,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;
