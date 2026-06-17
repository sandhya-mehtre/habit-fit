import { useMemo } from 'react';
import { useAppSelector } from '@/store/hooks';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import { getLast7Days } from '@/utils/dateUtils';
import { pct } from '@/utils/helpers';

const WeeklySummary = () => {
  const habits   = useAppSelector((s) => s.habits.items);
  const workouts = useAppSelector((s) => s.workouts.items);
  const water    = useAppSelector((s) => s.water.entries);
  const sleep    = useAppSelector((s) => s.sleep.entries);

  const last7 = getLast7Days();

  const stats = useMemo(() => {
    let totalPossible = 0;
    let totalCompleted = 0;
    habits.forEach((h) => {
      last7.forEach((day) => {
        totalPossible++;
        if (h.completions[day]) totalCompleted++;
      });
    });

    const workoutsCount = workouts.filter((w) => last7.includes(w.date)).length;

    const sleepEntries = sleep.filter((s) => last7.includes(s.date));
    const avgSleep = sleepEntries.length > 0
      ? sleepEntries.reduce((sum, s) => sum + s.hours, 0) / sleepEntries.length
      : 0;

    const waterEntries = water.filter((w) => last7.includes(w.date));
    const avgWater = waterEntries.length > 0
      ? waterEntries.reduce((sum, w) => sum + w.amount, 0) / 7
      : 0;

    return {
      habitRate: pct(totalCompleted, totalPossible),
      workoutsCount,
      avgSleep: Math.round(avgSleep * 10) / 10,
      avgWater: Math.round(avgWater),
    };
  }, [habits, workouts, water, sleep, last7]);

  return (
    <Card>
      <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-4">This Week's Summary</h3>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-500 dark:text-slate-400">Habit Completion Rate</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">{stats.habitRate}%</span>
          </div>
          <ProgressBar value={stats.habitRate} color="bg-emerald-500" />
        </div>

        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="text-center">
            <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{stats.workoutsCount}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Workouts</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{stats.avgSleep}h</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Avg Sleep</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{(stats.avgWater / 1000).toFixed(1)}L</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Avg Water</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeeklySummary;
