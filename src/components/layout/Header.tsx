import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleTheme, toggleSidebar } from '@/store/slices/uiSlice';

const PAGE_TITLES: Record<string, string> = {
  '/':          'Dashboard',
  '/habits':    'Habits',
  '/fitness':   'Fitness',
  '/analytics': 'Analytics',
};

const Header = () => {
  const dispatch = useAppDispatch();
  const theme    = useAppSelector((s) => s.ui.theme);
  const location = useLocation();

  const title =
    Object.entries(PAGE_TITLES).find(([path]) =>
      path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
    )?.[1] ?? 'HabitFit';

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-700/60 flex items-center px-4 gap-4">
      {/* Mobile hamburger */}
      <button
        onClick={() => dispatch(toggleSidebar())}
        className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
        aria-label="Open navigation"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Page title */}
      <h1 className="flex-1 text-xl font-bold text-slate-900 dark:text-slate-100">
        {title}
      </h1>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        {/* Avatar placeholder */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-xs font-bold">
          U
        </div>
      </div>
    </header>
  );
};

export default Header;
