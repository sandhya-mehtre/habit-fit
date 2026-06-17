import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSidebarOpen } from '@/store/slices/uiSlice';
import { clsx } from '@/utils/helpers';

const NAV_ITEMS = [
  { path: '/',          label: 'Dashboard',  icon: '🏠' },
  { path: '/habits',    label: 'Habits',     icon: '✅' },
  { path: '/fitness',   label: 'Fitness',    icon: '💪' },
  { path: '/analytics', label: 'Analytics',  icon: '📊' },
];

const Sidebar = () => {
  const dispatch   = useAppDispatch();
  const location   = useLocation();
  const sidebarOpen = useAppSelector((s) => s.ui.sidebarOpen);

  const close = () => dispatch(setSidebarOpen(false));

  const NavItems = () => (
    <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
      {NAV_ITEMS.map((item) => {
        const active =
          item.path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.path);
        return (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={close}
            className={clsx(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
              active
                ? 'bg-primary-600 text-white shadow-glow'
                : 'text-slate-600 dark:text-slate-400 hover:bg-surface-100 dark:hover:bg-surface-700 hover:text-slate-900 dark:hover:text-slate-100'
            )}
          >
            <span className="text-lg w-6 text-center">{item.icon}</span>
            <span>{item.label}</span>
            {active && (
              <motion.div
                layoutId="nav-indicator"
                className="ml-auto w-1.5 h-1.5 rounded-full bg-white/70"
              />
            )}
          </NavLink>
        );
      })}
    </nav>
  );

  const Brand = () => (
    <div className="px-5 py-5 border-b border-surface-100 dark:border-surface-700/60 flex items-center gap-3">
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm">
        HF
      </div>
      <div>
        <p className="font-bold text-sm text-slate-900 dark:text-slate-100">HabitFit</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">Track. Improve. Thrive.</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-white dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700/60 h-screen sticky top-0">
        <Brand />
        <NavItems />
        <div className="px-5 py-4 border-t border-surface-100 dark:border-surface-700/60">
          <p className="text-xs text-slate-400 dark:text-slate-500 text-center">HabitFit v1.0</p>
        </div>
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={close}
            />
            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="lg:hidden fixed top-0 left-0 z-50 flex flex-col w-60 h-full bg-white dark:bg-surface-800 shadow-xl"
            >
              <Brand />
              <NavItems />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
