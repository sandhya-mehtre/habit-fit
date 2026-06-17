import { clsx, clamp } from '@/utils/helpers';

interface ProgressBarProps {
  value: number;   // 0-100
  color?: string;  // Tailwind bg class OR hex
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

const sizeClasses = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' };

const ProgressBar = ({
  value,
  color = 'bg-primary-500',
  size = 'md',
  showLabel = false,
  animated = true,
  className,
}: ProgressBarProps) => {
  const pct = clamp(value, 0, 100);

  return (
    <div className={clsx('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-xs text-slate-500 dark:text-slate-400">{pct}%</span>
        </div>
      )}
      <div className={clsx('w-full bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className={clsx(
            'h-full rounded-full',
            animated && 'transition-all duration-500 ease-out',
            color
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
