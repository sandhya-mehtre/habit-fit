import { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { useAppSelector } from '@/store/hooks';
import { getLast7Days, formatShortDate } from '@/utils/dateUtils';
import { WATER_GOAL_ML } from '@/constants';
import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';

const WaterIntakeChart = () => {
  const entries = useAppSelector((s) => s.water.entries);
  const days = getLast7Days();

  const data = useMemo(
    () =>
      days.map((day) => ({
        date: formatShortDate(day),
        amount: entries.filter((e) => e.date === day).reduce((sum, e) => sum + e.amount, 0),
      })),
    [entries, days]
  );

  if (entries.length === 0) {
    return (
      <Card>
        <EmptyState icon="💧" title="No water logged" description="Log your water intake to see your weekly hydration chart." />
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1">Water Intake</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Last 7 days (goal: {WATER_GOAL_ML}ml)</p>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="currentColor" className="text-slate-400" />
          <YAxis tick={{ fontSize: 11 }} unit="ml" stroke="currentColor" className="text-slate-400" />
          <Tooltip
            contentStyle={{ borderRadius: 12, border: 'none', fontSize: 12, boxShadow: '0 4px 12px rgba(0,0,0,.1)' }}
            formatter={(value: number) => [`${value} ml`, 'Water']}
          />
          <ReferenceLine y={WATER_GOAL_ML} stroke="#0ea5e9" strokeDasharray="4 4" />
          <Bar dataKey="amount" fill="#38bdf8" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default WaterIntakeChart;
