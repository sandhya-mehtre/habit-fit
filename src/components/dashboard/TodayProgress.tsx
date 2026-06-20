import { Check, ClipboardList } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleCompletion } from '@/store/slices/habitsSlice';
import { todayString } from '@/utils/dateUtils';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import EmptyState from '@/components/ui/EmptyState';
import HabitIcon from '@/components/ui/HabitIcon';
import { clsx, pct } from '@/utils/helpers';
import { useNavigate } from 'react-router-dom';

const TodayProgress = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const habits = useAppSelector((s) => s.habits.items);
  const today = todayString();

  const completedCount = habits.filter((h) => h.completions[today]).length;
  const completionPct = pct(completedCount, habits.length);

  if (habits.length === 0) {
    return (
      <Card>
        <EmptyState
          icon={ClipboardList}
          title="No habits to track"
          description="Add your first habit to start seeing daily progress here."
          actionLabel="Go to Habits"
          onAction={() => navigate('/habits')}
        />
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">Today's Progress</h3>
        <span className="text-sm font-bold text-primary-600 dark:text-primary-400">{completionPct}%</span>
      </div>
      <ProgressBar value={completionPct} className="mb-4" />

      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {habits.map((habit) => {
          const done = !!habit.completions[today];
          return (
            <button
              key={habit.id}
              onClick={() => dispatch(toggleCompletion({ id: habit.id }))}
              className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors text-left"
            >
              <span
                className={clsx(
                  'w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors',
                  done ? 'bg-emerald-500 border-emerald-500' : 'border-surface-300 dark:border-surface-600'
                )}
              >
                {done && <Check size={12} strokeWidth={3} className="text-white" />}
              </span>
              <span
                className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${habit.color}1A`, color: habit.color }}
              >
                <HabitIcon iconKey={habit.icon} size={13} />
              </span>
              <span className={clsx(
                'text-sm flex-1 truncate',
                done ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-300'
              )}>
                {habit.name}
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
};

export default TodayProgress;
