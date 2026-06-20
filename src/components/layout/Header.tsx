import { useLocation } from 'react-router-dom';
import { Menu, Sun, Moon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleTheme, toggleSidebar } from '@/store/slices/uiSlice';
import UserMenu from './UserMenu';

const PAGE_TITLES: Record<string, string> = {
  '/':          'Dashboard',
  '/habits':    'Habits',
  '/fitness':   'Fitness',
  '/analytics': 'Analytics',
  '/profile':   'Profile',
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
    <header className="safe-top sticky top-0 z-30 h-14 sm:h-16 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-700/60 flex items-center px-3 sm:px-4 gap-2 sm:gap-4">
      {/* Mobile hamburger */}
      <button
        onClick={() => dispatch(toggleSidebar())}
        className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors shrink-0"
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>

      {/* Page title */}
      <h1 className="flex-1 text-base sm:text-xl font-bold text-slate-900 dark:text-slate-100 truncate">
        {title}
      </h1>

      {/* Right actions */}
      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <UserMenu />
      </div>
    </header>
  );
};

export default Header;
