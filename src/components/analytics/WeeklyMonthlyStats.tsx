import { useMemo } from 'react';
import { useAppSelector } from '@/store/hooks';
import { getLast12Weeks, getWeekLabel } from '@/utils/dateUtils';
import { pct } from '@/utils/helpers';
import Card from '@/components/ui/Card';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

const WeeklyMonthlyStats = () => {
  const habits   = useAppSelector((s) => s.habits.items);
  const workouts = useAppSelector((s) => s.workouts.items);

  const weeks = getLast12Weeks();

  const weeklyData = useMemo(
    () =>
      weeks.map((weekDays) => {
        let possible = 0;
        let completed = 0;
        habits.forEach((h) => {
          weekDays.forEach((day) => {
            possible++;
            if (h.completions[day]) completed++;
          });
        });
        const workoutCount = workouts.filter((w) => weekDays.includes(w.date)).length;

        return {
          week: getWeekLabel(weekDays),
          habitRate: pct(completed, possible || 1),
          workouts: workoutCount,
        };
      }),
    [habits, workouts, weeks]
  );

  const last4Weeks = weeklyData.slice(-4);
  const avgHabitRate = Math.round(
    last4Weeks.reduce((sum, w) => sum + w.habitRate, 0) / (last4Weeks.length || 1)
  );
  const totalWorkoutsMonth = last4Weeks.reduce((sum, w) => sum + w.workouts, 0);

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1">12-Week Trend</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Habit completion rate & workout frequency</p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={weeklyData} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="week" tick={{ fontSize: 10 }} interval={1} stroke="currentColor" className="text-slate-400" />
            <YAxis yAxisId="left" tick={{ fontSize: 11 }} unit="%" stroke="currentColor" className="text-slate-400" />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} stroke="currentColor" className="text-slate-400" />
            <Tooltip contentStyle={{ borderRadius: 12, border: 'none', fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar yAxisId="left" dataKey="habitRate" name="Habit Rate (%)" fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="workouts" name="Workouts" fill="#22c55e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">Avg Monthly Habit Rate</p>
          <p className="text-3xl font-bold text-primary-600 dark:text-primary-400 mt-1">{avgHabitRate}%</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Based on last 4 weeks</p>
        </Card>
        <Card>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">Workouts This Month</p>
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{totalWorkoutsMonth}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Based on last 4 weeks</p>
        </Card>
      </div>
    </div>
  );
};

export default WeeklyMonthlyStats;
