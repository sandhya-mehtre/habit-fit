import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Dumbbell, Scale, Moon, BarChart3 } from 'lucide-react';

interface QuickActionsProps {
  onAddHabit: () => void;
  onAddWorkout: () => void;
  onAddWeight: () => void;
  onAddSleep: () => void;
}

const QuickActions = ({ onAddHabit, onAddWorkout, onAddWeight, onAddSleep }: QuickActionsProps) => {
  const navigate = useNavigate();

  const actions = [
    { label: 'New Habit',   icon: CheckCircle2, color: 'from-emerald-500 to-emerald-600', onClick: onAddHabit },
    { label: 'Log Workout', icon: Dumbbell,     color: 'from-primary-500 to-primary-600', onClick: onAddWorkout },
    { label: 'Log Weight',  icon: Scale,        color: 'from-amber-500 to-amber-600',    onClick: onAddWeight },
    { label: 'Log Sleep',   icon: Moon,         color: 'from-violet-500 to-violet-600',  onClick: onAddSleep },
    { label: 'View Analytics', icon: BarChart3, color: 'from-pink-500 to-pink-600',  onClick: () => navigate('/analytics') },
  ];

  return (
    <div className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 p-5">
      <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {actions.map((action, i) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={action.onClick}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-surface-50 dark:bg-surface-900/50 hover:bg-surface-100 dark:hover:bg-surface-700/50 transition-colors"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white`}>
                <Icon size={19} />
              </div>
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300 text-center">{action.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
