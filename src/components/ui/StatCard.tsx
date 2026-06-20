import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, type LucideIcon } from 'lucide-react';
import { clsx } from '@/utils/helpers';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color?: string;      // Tailwind gradient classes
  trend?: number;      // positive = up, negative = down
  delay?: number;
}

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = 'from-primary-500 to-primary-600',
  trend,
  delay = 0,
}: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, delay }}
    className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 shadow-card dark:shadow-card-dark p-4 sm:p-5 flex items-start gap-3 sm:gap-4"
  >
    <div className={clsx('p-2.5 sm:p-3 rounded-xl bg-gradient-to-br text-white shrink-0', color)}>
      <Icon size={20} strokeWidth={2} />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide truncate">{title}</p>
      <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 mt-0.5 leading-none truncate">{value}</p>
      {subtitle && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>
      )}
      {trend !== undefined && (
        <p className={clsx('text-xs font-medium mt-1 inline-flex items-center gap-0.5', trend >= 0 ? 'text-emerald-600' : 'text-red-500')}>
          {trend >= 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />} {Math.abs(trend)}% vs last week
        </p>
      )}
    </div>
  </motion.div>
);

export default StatCard;
