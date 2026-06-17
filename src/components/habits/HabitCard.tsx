import { motion } from 'framer-motion';
import type { Habit } from '@/types';
import { todayString } from '@/utils/dateUtils';
import { clsx } from '@/utils/helpers';
import Badge from '@/components/ui/Badge';
import { HABIT_CATEGORIES } from '@/constants';

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: string) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (id: string) => void;
  index?: number;
}

const HabitCard = ({ habit, onToggle, onEdit, onDelete, index = 0 }: HabitCardProps) => {
  const today = todayString();
  const isCompletedToday = !!habit.completions[today];
  const categoryInfo = HABIT_CATEGORIES.find((c) => c.value === habit.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      layout
      className={clsx(
        'group relative bg-white dark:bg-surface-800 rounded-2xl border p-4 transition-all duration-200',
        isCompletedToday
          ? 'border-emerald-300 dark:border-emerald-700/60 bg-emerald-50/40 dark:bg-emerald-900/10'
          : 'border-surface-200 dark:border-surface-700'
      )}
    >
      <div className="flex items-start gap-3">
        {/* Completion toggle */}
        <button
          onClick={() => onToggle(habit.id)}
          aria-label="Toggle completion"
          className={clsx(
            'mt-0.5 w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 border-2',
            isCompletedToday
              ? 'bg-emerald-500 border-emerald-500 text-white scale-100'
              : 'border-surface-300 dark:border-surface-600 hover:border-primary-400 text-transparent'
          )}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-lg leading-none">{habit.icon}</span>
            <h3 className={clsx(
              'font-semibold text-sm text-slate-900 dark:text-slate-100 truncate',
              isCompletedToday && 'line-through text-slate-400 dark:text-slate-500'
            )}>
              {habit.name}
            </h3>
          </div>

          {habit.description && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              {habit.description}
            </p>
          )}

          <div className="flex items-center gap-2 mt-2.5 flex-wrap">
            <Badge label={categoryInfo?.label ?? habit.category} variant="default" size="sm" />
            <Badge label={habit.frequency === 'daily' ? 'Daily' : `${habit.targetDays}x/week`} variant="info" size="sm" />
            {habit.streak > 0 && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-500">
                🔥 {habit.streak} day{habit.streak !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(habit)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors"
            aria-label="Edit habit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(habit.id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
            aria-label="Delete habit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default HabitCard;
