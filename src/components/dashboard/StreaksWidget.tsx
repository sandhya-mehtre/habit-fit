import { useAppSelector } from '@/store/hooks';
import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';

const StreaksWidget = () => {
  const habits = useAppSelector((s) => s.habits.items);

  const topStreaks = [...habits]
    .filter((h) => h.streak > 0)
    .sort((a, b) => b.streak - a.streak)
    .slice(0, 5);

  return (
    <Card>
      <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-4">Current Streaks</h3>
      {topStreaks.length === 0 ? (
        <EmptyState
          icon="🔥"
          title="No active streaks"
          description="Complete a habit today to start a streak."
        />
      ) : (
        <div className="space-y-3">
          {topStreaks.map((habit) => (
            <div key={habit.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-lg">{habit.icon}</span>
                <span className="text-sm text-slate-700 dark:text-slate-300 truncate">{habit.name}</span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <span className="text-orange-500 font-bold text-sm">🔥 {habit.streak}</span>
                <span className="text-xs text-slate-400">days</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default StreaksWidget;
