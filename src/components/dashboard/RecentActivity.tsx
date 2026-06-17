import { useMemo } from 'react';
import { useAppSelector } from '@/store/hooks';
import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import { formatDisplayDate } from '@/utils/dateUtils';

interface ActivityItem {
  id: string;
  icon: string;
  text: string;
  date: string;
  sortKey: string;
}

const RecentActivity = () => {
  const workouts = useAppSelector((s) => s.workouts.items);
  const weight    = useAppSelector((s) => s.weight.entries);
  const sleep     = useAppSelector((s) => s.sleep.entries);

  const activities = useMemo<ActivityItem[]>(() => {
    const items: ActivityItem[] = [];

    workouts.forEach((w) =>
      items.push({
        id: `w-${w.id}`,
        icon: '💪',
        text: `Logged "${w.name}" workout (${w.duration} min)`,
        date: w.date,
        sortKey: w.createdAt,
      })
    );

    weight.forEach((w) =>
      items.push({
        id: `wt-${w.id}`,
        icon: '⚖️',
        text: `Recorded weight: ${w.weight} kg`,
        date: w.date,
        sortKey: w.date,
      })
    );

    sleep.forEach((s) =>
      items.push({
        id: `sl-${s.id}`,
        icon: '😴',
        text: `Logged ${s.hours}h of sleep`,
        date: s.date,
        sortKey: s.date,
      })
    );

    return items.sort((a, b) => b.sortKey.localeCompare(a.sortKey)).slice(0, 8);
  }, [workouts, weight, sleep]);

  return (
    <Card>
      <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-4">Recent Activity</h3>
      {activities.length === 0 ? (
        <EmptyState
          icon="📭"
          title="No activity yet"
          description="Log a workout, weight, or sleep entry to see it here."
        />
      ) : (
        <div className="space-y-3">
          {activities.map((item) => (
            <div key={item.id} className="flex items-start gap-3">
              <span className="text-base mt-0.5">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700 dark:text-slate-300">{item.text}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">{formatDisplayDate(item.date)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default RecentActivity;
