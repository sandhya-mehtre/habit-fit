import { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell,
} from 'recharts';
import { useAppSelector } from '@/store/hooks';
import { getLast7Days, formatShortDate } from '@/utils/dateUtils';
import { SLEEP_GOAL_HOURS } from '@/constants';
import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import { Moon } from 'lucide-react';

const SleepTrendChart = () => {
  const entries = useAppSelector((s) => s.sleep.entries);
  const days = getLast7Days();

  const data = useMemo(
    () =>
      days.map((day) => {
        const entry = entries.find((e) => e.date === day);
        return {
          date: formatShortDate(day),
          hours: entry?.hours ?? 0,
        };
      }),
    [entries, days]
  );

  if (entries.length === 0) {
    return (
      <Card>
        <EmptyState icon={Moon} title="No sleep data" description="Log your sleep hours to track your rest patterns." />
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1">Sleep Trend</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Last 7 days (goal: {SLEEP_GOAL_HOURS}h)</p>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="currentColor" className="text-slate-400" />
          <YAxis tick={{ fontSize: 11 }} unit="h" domain={[0, 12]} stroke="currentColor" className="text-slate-400" />
          <Tooltip
            contentStyle={{ borderRadius: 12, border: 'none', fontSize: 12, boxShadow: '0 4px 12px rgba(0,0,0,.1)' }}
            formatter={(value: number) => [`${value}h`, 'Sleep']}
          />
          <ReferenceLine y={SLEEP_GOAL_HOURS} stroke="#8b5cf6" strokeDasharray="4 4" />
          <Bar dataKey="hours" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.hours >= SLEEP_GOAL_HOURS ? '#8b5cf6' : '#c4b5fd'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default SleepTrendChart;
