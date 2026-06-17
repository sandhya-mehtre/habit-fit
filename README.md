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
│   ├── layout/         # Sidebar, Header, AppLayout
│   ├── habits/         # Habit-specific components
│   ├── fitness/        # Workout/weight/water/sleep components
│   ├── dashboard/      # Dashboard widgets
│   └── analytics/      # Chart components
├── pages/              # Route-level pages
├── store/
│   ├── slices/         # Redux Toolkit slices (habits, workouts, weight, water, sleep, ui)
│   ├── hooks.ts         # Typed useAppDispatch / useAppSelector
│   └── index.ts         # Store configuration
├── types/               # Shared TypeScript interfaces
├── constants/            # App-wide constants (categories, colors, storage keys)
├── utils/                # Date, storage, habit-streak, and general helpers
├── App.tsx               # Router setup
├── main.tsx              # App entry point
└── index.css             # Tailwind directives + global styles
```

## Features

- **Habits**: create/edit/delete habits, daily/weekly frequency, categories, streak tracking, completion toggling
- **Fitness**: workout logging with exercises, body weight tracking, water intake quick-log, sleep tracking
- **Dashboard**: overview stat cards, today's progress checklist, current streaks, weekly summary, recent activity feed, quick actions
- **Analytics**: habit completion trend (30 days), weight trend, water intake (7 days), sleep trend (7 days), 12-week statistics
- **UX**: React Hook Form validation, toast notifications, confirmation dialogs before destructive actions, loading skeletons, empty states
- **UI Polish**: Framer Motion page/list/card animations, fully responsive (mobile/tablet/desktop), dark/light theme toggle persisted to Local Storage

## Data Persistence

All data (habits, workouts, weight, water, sleep entries, and theme preference) is persisted to `localStorage` automatically on every mutation via Redux Toolkit reducers, and rehydrated on app load.

## Notes

- Strict TypeScript is enforced project-wide; the `any` type is disallowed via ESLint (`@typescript-eslint/no-explicit-any: error`).
- Path alias `@/` maps to `src/` (configured in both `tsconfig.json` and `vite.config.ts`).
# habit-fit
