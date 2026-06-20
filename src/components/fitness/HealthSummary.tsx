import { Droplet, Moon, Scale } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import { todayString } from '@/utils/dateUtils';
import { WATER_GOAL_ML, SLEEP_GOAL_HOURS } from '@/constants';
import { mlToLitres } from '@/utils/helpers';
import Card from '@/components/ui/Card';

const HealthSummary = () => {
  const today = todayString();
  const water  = useAppSelector((s) => s.water.entries);
  const sleep  = useAppSelector((s) => s.sleep.entries);
  const weight = useAppSelector((s) => s.weight.entries);

  const waterToday = water.filter((e) => e.date === today).reduce((s, e) => s + e.amount, 0);
  const sleepToday  = sleep.find((e) => e.date === today);
  const latestWeight = weight.length > 0 ? weight[weight.length - 1] : null;

  const items = [
    {
      icon: Droplet,
      iconClass: 'text-sky-500 bg-sky-50 dark:bg-sky-900/30',
      label: 'Water',
      value: `${mlToLitres(waterToday)}L`,
      sub: `Goal: ${mlToLitres(WATER_GOAL_ML)}L`,
    },
    {
      icon: Moon,
      iconClass: 'text-violet-500 bg-violet-50 dark:bg-violet-900/30',
      label: 'Sleep',
      value: sleepToday ? `${sleepToday.hours}h` : '—',
      sub: `Goal: ${SLEEP_GOAL_HOURS}h`,
    },
    {
      icon: Scale,
      iconClass: 'text-amber-500 bg-amber-50 dark:bg-amber-900/30',
      label: 'Weight',
      value: latestWeight ? `${latestWeight.weight}kg` : '—',
      sub: latestWeight ? latestWeight.date : 'No data',
    },
  ];

  return (
    <Card>
      <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-4">Today's Health Summary</h3>
      <div className="grid grid-cols-3 gap-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex flex-col items-center text-center p-3 rounded-xl bg-surface-50 dark:bg-surface-900/50">
              <span className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 ${item.iconClass}`}>
                <Icon size={17} />
              </span>
              <span className="text-base font-bold text-slate-900 dark:text-slate-100">{item.value}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.sub}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default HealthSummary;
