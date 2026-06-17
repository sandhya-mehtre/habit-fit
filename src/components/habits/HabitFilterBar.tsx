import { HABIT_CATEGORIES } from '@/constants';
import type { HabitCategory } from '@/types';
import { clsx } from '@/utils/helpers';

interface HabitFilterBarProps {
  selected: HabitCategory | 'all';
  onSelect: (category: HabitCategory | 'all') => void;
  counts: Record<string, number>;
}

const HabitFilterBar = ({ selected, onSelect, counts }: HabitFilterBarProps) => (
  <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
    <button
      onClick={() => onSelect('all')}
      className={clsx(
        'shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap',
        selected === 'all'
          ? 'bg-primary-600 text-white'
          : 'bg-surface-100 dark:bg-surface-800 text-slate-600 dark:text-slate-400 hover:bg-surface-200 dark:hover:bg-surface-700'
      )}
    >
      All ({counts.all ?? 0})
    </button>
    {HABIT_CATEGORIES.map((cat) => (
      <button
        key={cat.value}
        onClick={() => onSelect(cat.value)}
        className={clsx(
          'shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap',
          selected === cat.value
            ? 'bg-primary-600 text-white'
            : 'bg-surface-100 dark:bg-surface-800 text-slate-600 dark:text-slate-400 hover:bg-surface-200 dark:hover:bg-surface-700'
        )}
      >
        {cat.emoji} {cat.label} ({counts[cat.value] ?? 0})
      </button>
    ))}
  </div>
);

export default HabitFilterBar;
