import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useAppSelector } from '@/store/hooks';
import { formatShortDate } from '@/utils/dateUtils';
import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';

const WeightTrendChart = () => {
  const entries = useAppSelector((s) => s.weight.entries);

  const data = entries.map((e) => ({
    date: formatShortDate(e.date),
    weight: e.weight,
  }));

  if (entries.length === 0) {
    return (
      <Card>
        <EmptyState icon="⚖️" title="No weight data" description="Log your weight to start tracking your trend over time." />
      </Card>
    );
  }

  const minWeight = Math.min(...entries.map((e) => e.weight));
  const maxWeight = Math.max(...entries.map((e) => e.weight));
  const padding = Math.max((maxWeight - minWeight) * 0.2, 1);

  return (
    <Card>
      <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1">Weight Trend</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">All recorded entries</p>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="currentColor" className="text-slate-400" />
          <YAxis
            tick={{ fontSize: 11 }}
            domain={[minWeight - padding, maxWeight + padding]}
            unit="kg"
            stroke="currentColor"
            className="text-slate-400"
          />
          <Tooltip
            contentStyle={{ borderRadius: 12, border: 'none', fontSize: 12, boxShadow: '0 4px 12px rgba(0,0,0,.1)' }}
            formatter={(value: number) => [`${value} kg`, 'Weight']}
          />
          <Line type="monotone" dataKey="weight" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default WeightTrendChart;
