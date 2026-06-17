import { clsx } from '@/utils/helpers';

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:  'bg-surface-100 text-slate-700 dark:bg-surface-700 dark:text-slate-300',
  primary:  'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300',
  success:  'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  warning:  'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  danger:   'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  info:     'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
};

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-slate-400',
  primary: 'bg-primary-500',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger:  'bg-red-500',
  info:    'bg-sky-500',
};

const Badge = ({
  label,
  variant = 'default',
  size = 'sm',
  dot = false,
  className,
}: BadgeProps) => (
  <span
    className={clsx(
      'inline-flex items-center gap-1.5 font-medium rounded-full',
      size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm',
      variantClasses[variant],
      className
    )}
  >
    {dot && (
      <span className={clsx('w-1.5 h-1.5 rounded-full', dotColors[variant])} />
    )}
    {label}
  </span>
);

export default Badge;
