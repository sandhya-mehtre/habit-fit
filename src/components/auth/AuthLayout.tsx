import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

const AuthLayout = ({ title, subtitle, children }: AuthLayoutProps) => (
  <div className="min-h-screen flex bg-surface-50 dark:bg-surface-950">
    {/* Branding panel — hidden on small screens to keep mobile focused on the form */}
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-violet-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] [background-size:32px_32px]" />
      <div className="relative z-10 flex flex-col justify-between p-10 sm:p-12 text-white w-full">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center font-bold text-sm">
            HF
          </div>
          <span className="font-bold text-lg">HabitFit</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md"
        >
          <h2 className="text-3xl font-bold leading-tight mb-3">
            Build better habits, one day at a time.
          </h2>
          <p className="text-white/80 text-sm leading-relaxed">
            Track habits, workouts, sleep, hydration and weight in one clean
            dashboard — and watch your streaks grow.
          </p>
        </motion.div>

        <p className="text-xs text-white/60">© {new Date().getFullYear()} HabitFit. All data stays on your device.</p>
      </div>
    </div>

    {/* Form panel */}
    <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-sm"
      >
        {/* Mobile-only brand mark */}
        <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm">
            HF
          </div>
          <span className="font-bold text-lg text-slate-900 dark:text-slate-100">HabitFit</span>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 text-center sm:text-left">
          {title}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-7 text-center sm:text-left">
          {subtitle}
        </p>

        <div className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 shadow-card dark:shadow-card-dark p-6 sm:p-7">
          {children}
        </div>
      </motion.div>
    </div>
  </div>
);

export default AuthLayout;
