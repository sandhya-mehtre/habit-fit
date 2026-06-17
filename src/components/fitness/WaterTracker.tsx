import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addWaterEntry } from '@/store/slices/waterSlice';
import { todayString } from '@/utils/dateUtils';
import { WATER_GOAL_ML } from '@/constants';
import { clamp, mlToLitres } from '@/utils/helpers';
import ProgressBar from '@/components/ui/ProgressBar';
import toast from 'react-hot-toast';

const PRESETS = [
  { label: '250ml', amount: 250, icon: '🥃' },
  { label: '500ml', amount: 500, icon: '🥤' },
  { label: '750ml', amount: 750, icon: '🧴' },
];

const WaterTracker = () => {
  const dispatch = useAppDispatch();
  const entries  = useAppSelector((s) => s.water.entries);

  const today = todayString();
  const todayTotal = useMemo(
    () => entries.filter((e) => e.date === today).reduce((sum, e) => sum + e.amount, 0),
    [entries, today]
  );

  const percentage = clamp(Math.round((todayTotal / WATER_GOAL_ML) * 100), 0, 100);

  const handleAdd = (amount: number) => {
    dispatch(addWaterEntry({ date: today, amount }));
    toast.success(`+${amount}ml logged 💧`);
  };

  return (
    <div className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">💧 Water Intake</h3>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {mlToLitres(todayTotal)}L / {mlToLitres(WATER_GOAL_ML)}L
        </span>
      </div>

      <ProgressBar value={percentage} color="bg-sky-500" size="md" />

      <div className="flex gap-2 mt-4">
        {PRESETS.map((p) => (
          <motion.button
            key={p.amount}
            whileTap={{ scale: 0.93 }}
            onClick={() => handleAdd(p.amount)}
            className="flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-sky-900/40 transition-colors"
          >
            <span className="text-lg">{p.icon}</span>
            <span className="text-xs font-medium">{p.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default WaterTracker;
