# HabitFit — Personal Habit & Fitness Tracker

A modern, portfolio-worthy habit and fitness tracking dashboard built with React 19, TypeScript, Redux Toolkit, and Tailwind CSS.

## Tech Stack

- **React 19** + **TypeScript** (strict mode, no `any`)
- **Vite** — build tool
- **Redux Toolkit** — global state management
- **React Router v6** — client-side routing
- **Tailwind CSS** — styling with dark mode
- **React Hook Form** — form state & validation
- **Recharts** — analytics charts
- **Framer Motion** — animations
- **react-hot-toast** — toast notifications
- **Local Storage** — data persistence

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Other scripts

```bash
npm run build     # Type-check and build for production
npm run preview   # Preview the production build
npm run lint       # Run ESLint
```

## Folder Structure

```
src/
├── components/
│   ├── ui/            # Reusable primitives (Button, Card, Modal, Badge, etc.)
│   ├── layout/         # Sidebar, Header, UserMenu, AppLayout
│   ├── auth/            # AuthLayout, LoginForm, SignupForm, ProfileForm, PasswordForm, route guards
│   ├── habits/         # Habit-specific components
│   ├── fitness/        # Workout/weight/water/sleep components
│   ├── dashboard/      # Dashboard widgets
│   └── analytics/      # Chart components
├── pages/              # Route-level pages (incl. Login, Signup, Profile)
├── store/
│   ├── slices/         # Redux Toolkit slices (auth, habits, workouts, weight, water, sleep, ui)
│   ├── hooks.ts         # Typed useAppDispatch / useAppSelector
│   ├── useSyncUserData.ts # Keeps data slices scoped to the active logged-in user
│   └── index.ts         # Store configuration
├── types/               # Shared TypeScript interfaces
├── constants/            # App-wide constants (categories, colors, storage keys)
├── utils/                # Date, storage, habit-streak, and general helpers
├── App.tsx               # Router setup with protected/guest route guards
├── main.tsx              # App entry point
└── index.css             # Tailwind directives + global styles + mobile-safety rules
```

## Features

- **Authentication**: signup, login, logout, and profile editing — all stored locally (no backend required). Each user's habits, workouts, weight, water, and sleep data are kept isolated per account in `localStorage`. Protected routes redirect to `/login` when not authenticated; auth pages redirect logged-in users back to the dashboard.
- **Habits**: create/edit/delete habits, daily/weekly frequency, categories, streak tracking, completion toggling
- **Fitness**: workout logging with exercises, body weight tracking, water intake quick-log, sleep tracking
- **Dashboard**: overview stat cards, today's progress checklist, current streaks, weekly summary, recent activity feed, quick actions
- **Analytics**: habit completion trend (30 days), weight trend, water intake (7 days), sleep trend (7 days), 12-week statistics
- **UX**: React Hook Form validation, toast notifications, confirmation dialogs before destructive actions, loading skeletons, empty states
- **UI Polish**: Framer Motion page/list/card animations, fully responsive (mobile/tablet/desktop) with touch-friendly tap targets, dark/light theme toggle persisted to Local Storage

## Authentication Notes

This app has no backend, so "authentication" works entirely client-side:

- Account records (`name`, `email`, a non-cryptographic password hash) are stored in `localStorage` under `habitfit_users`.
- The active session is just the logged-in user's id, stored under `habitfit_session`.
- **This is a demo-grade auth implementation only** — the password hashing is a simple non-cryptographic checksum, not bcrypt/argon2, and there is no server-side verification. Do not reuse this pattern for an app with real user data or real passwords; swap in a real backend (e.g. Supabase Auth, Auth0, Firebase Auth, or your own API) before shipping anything beyond a portfolio demo.

## Mobile Responsiveness

The UI is mobile-first throughout:

- Sidebar collapses into a slide-in drawer (triggered by the header hamburger) below the `lg` breakpoint; a persistent sidebar appears at `lg` and up.
- All card grids, stat grids, and form field rows collapse to a single column on small screens and progressively add columns at `sm`/`lg`.
- Modals are height-constrained (`max-h-[90vh]`) with independently scrolling bodies so long forms never get clipped on short viewports.
- Touch-only devices show card action buttons (edit/delete) at full opacity by default, since `:hover` doesn't exist on touch; larger screens keep the hover-reveal treatment.
- Inputs use a 16px font size on mobile to prevent iOS Safari's auto-zoom-on-focus behavior, stepping down to 14px at `sm` and up.
- Toast notifications reposition to `top-center` (below the fixed header) on small screens to avoid overlapping the navbar.

## Data Persistence

All data (habits, workouts, weight, water, sleep entries, account records, session, and theme preference) is persisted to `localStorage` automatically on every mutation via Redux Toolkit reducers, and rehydrated on app load. Habit/fitness data is namespaced per logged-in user (e.g. `habitfit_habits::<userId>`), so multiple accounts on the same browser never see each other's data.

## First Run

On first launch you'll land on **Sign Up** (`/signup`). Create an account with a name, email, and password (min. 6 characters) — there's no email verification since everything is local. You'll be redirected to the dashboard immediately after signing up, and back to `/login` whenever you log out from the Profile page or the header user menu.

## Notes

- Strict TypeScript is enforced project-wide; the `any` type is disallowed via ESLint (`@typescript-eslint/no-explicit-any: error`).
- Path alias `@/` maps to `src/` (configured in both `tsconfig.json` and `vite.config.ts`).
