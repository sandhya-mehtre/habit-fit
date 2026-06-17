import { useAppSelector } from '@/store/hooks';
import StatCard from '@/components/ui/StatCard';
import { todayString, getLast7Days } from '@/utils/dateUtils';
import { mlToLitres, pct } from '@/utils/helpers';
import { WATER_GOAL_ML } from '@/constants';

const OverviewCards = () => {
  const habits   = useAppSelector((s) => s.habits.items);
  const workouts = useAppSelector((s) => s.workouts.items);
  const water    = useAppSelector((s) => s.water.entries);
  const sleep    = useAppSelector((s) => s.sleep.entries);

  const today = todayString();
  const last7 = getLast7Days();

  const habitsCompletedToday = habits.filter((h) => h.completions[today]).length;
  const longestCurrentStreak = habits.reduce((max, h) => Math.max(max, h.streak), 0);
  const workoutsThisWeek = workouts.filter((w) => last7.includes(w.date)).length;
  const waterToday = water.filter((e) => e.date === today).reduce((s, e) => s + e.amount, 0);
  const lastSleep = sleep.length > 0 ? sleep[sleep.length - 1] : null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Habits Today"
        value={`${habitsCompletedToday}/${habits.length}`}
        subtitle={habits.length > 0 ? `${pct(habitsCompletedToday, habits.length)}% complete` : 'No habits yet'}
        icon="✅"
        color="from-emerald-500 to-emerald-600"
        delay={0}
      />
      <StatCard
        title="Best Streak"
        value={`${longestCurrentStreak}d`}
        subtitle="Keep it going!"
        icon="🔥"
        color="from-orange-500 to-orange-600"
        delay={0.05}
      />
      <StatCard
        title="Workouts (7d)"
        value={workoutsThisWeek}
        subtitle="This week"
        icon="💪"
        color="from-primary-500 to-primary-600"
        delay={0.1}
      />
      <StatCard
        title="Water Today"
        value={`${mlToLitres(waterToday)}L`}
        subtitle={`Goal ${mlToLitres(WATER_GOAL_ML)}L`}
        icon="💧"
        color="from-sky-500 to-sky-600"
        delay={0.15}
      />
      {lastSleep && (
        <StatCard
          title="Last Sleep"
          value={`${lastSleep.hours}h`}
          subtitle={lastSleep.date === today ? 'Last night' : lastSleep.date}
          icon="😴"
          color="from-violet-500 to-violet-600"
          delay={0.2}
        />
      )}
    </div>
  );
};

export default OverviewCards;
