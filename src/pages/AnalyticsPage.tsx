import { motion } from 'framer-motion';
import HabitCompletionChart from '@/components/analytics/HabitCompletionChart';
import WeightTrendChart from '@/components/analytics/WeightTrendChart';
import WaterIntakeChart from '@/components/analytics/WaterIntakeChart';
import SleepTrendChart from '@/components/analytics/SleepTrendChart';
import WeeklyMonthlyStats from '@/components/analytics/WeeklyMonthlyStats';

const AnalyticsPage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="space-y-6"
  >
    <p className="text-sm text-slate-500 dark:text-slate-400">
      A complete view of your habits and fitness trends over time.
    </p>

    <HabitCompletionChart />

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <WaterIntakeChart />
      <SleepTrendChart />
    </div>

    <WeightTrendChart />

    <WeeklyMonthlyStats />
  </motion.div>
);

export default AnalyticsPage;
