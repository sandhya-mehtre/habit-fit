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
      icon: '💧',
      label: 'Water',
      value: `${mlToLitres(waterToday)}L`,
      sub: `Goal: ${mlToLitres(WATER_GOAL_ML)}L`,
      ok: waterToday >= WATER_GOAL_ML,
    },
    {
      icon: '😴',
      label: 'Sleep',
      value: sleepToday ? `${sleepToday.hours}h` : '—',
      sub: `Goal: ${SLEEP_GOAL_HOURS}h`,
      ok: !!sleepToday && sleepToday.hours >= SLEEP_GOAL_HOURS,
    },
    {
      icon: '⚖️',
      label: 'Weight',
      value: latestWeight ? `${latestWeight.weight}kg` : '—',
      sub: latestWeight ? latestWeight.date : 'No data',
      ok: true,
    },
  ];

  return (
    <Card>
      <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-4">Today's Health Summary</h3>
      <div className="grid grid-cols-3 gap-3">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col items-center text-center p-3 rounded-xl bg-surface-50 dark:bg-surface-900/50">
            <span className="text-2xl mb-1">{item.icon}</span>
            <span className="text-base font-bold text-slate-900 dark:text-slate-100">{item.value}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.sub}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default HealthSummary;
