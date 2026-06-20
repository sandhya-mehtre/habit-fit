import { useMemo } from 'react';
import { Dumbbell, Scale, Moon, Inbox, type LucideIcon } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import { formatDisplayDate } from '@/utils/dateUtils';

interface ActivityItem {
  id: string;
  icon: LucideIcon;
  iconClass: string;
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
        icon: Dumbbell,
        iconClass: 'text-primary-500 bg-primary-50 dark:bg-primary-900/30',
        text: `Logged "${w.name}" workout (${w.duration} min)`,
        date: w.date,
        sortKey: w.createdAt,
      })
    );

    weight.forEach((w) =>
      items.push({
        id: `wt-${w.id}`,
        icon: Scale,
        iconClass: 'text-amber-500 bg-amber-50 dark:bg-amber-900/30',
        text: `Recorded weight: ${w.weight} kg`,
        date: w.date,
        sortKey: w.date,
      })
    );

    sleep.forEach((s) =>
      items.push({
        id: `sl-${s.id}`,
        icon: Moon,
        iconClass: 'text-violet-500 bg-violet-50 dark:bg-violet-900/30',
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
          icon={Inbox}
          title="No activity yet"
          description="Log a workout, weight, or sleep entry to see it here."
        />
      ) : (
        <div className="space-y-3">
          {activities.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="flex items-start gap-3">
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${item.iconClass}`}>
                  <Icon size={14} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700 dark:text-slate-300">{item.text}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{formatDisplayDate(item.date)}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default RecentActivity;
