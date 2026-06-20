import { useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useAppSelector } from '@/store/hooks';
import { getLast30Days, formatShortDate } from '@/utils/dateUtils';
import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import { TrendingUp } from 'lucide-react';
import { pct } from '@/utils/helpers';

const HabitCompletionChart = () => {
  const habits = useAppSelector((s) => s.habits.items);
  const days = getLast30Days();

  const data = useMemo(
    () =>
      days.map((day) => {
        const completed = habits.filter((h) => h.completions[day]).length;
        return {
          date: formatShortDate(day),
          percentage: pct(completed, habits.length || 1),
        };
      }),
    [habits, days]
  );

  if (habits.length === 0) {
    return (
      <Card>
        <EmptyState icon={TrendingUp} title="No data yet" description="Add habits and start completing them to see trends here." />
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1">Habit Completion Rate</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Last 30 days</p>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="habitGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-surface-200 dark:text-surface-700" opacity={0.3} />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} interval={4} stroke="currentColor" className="text-slate-400" />
          <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} unit="%" stroke="currentColor" className="text-slate-400" />
          <Tooltip
            contentStyle={{ borderRadius: 12, border: 'none', fontSize: 12, boxShadow: '0 4px 12px rgba(0,0,0,.1)' }}
            formatter={(value: number) => [`${value}%`, 'Completion']}
          />
          <Area type="monotone" dataKey="percentage" stroke="#6366f1" strokeWidth={2} fill="url(#habitGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default HabitCompletionChart;
