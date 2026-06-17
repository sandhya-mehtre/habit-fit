import { clsx } from '@/utils/helpers';

interface SkeletonProps {
  className?: string;
  rounded?: boolean;
}

const Skeleton = ({ className, rounded = false }: SkeletonProps) => (
  <div
    className={clsx(
      'animate-pulse bg-surface-200 dark:bg-surface-700',
      rounded ? 'rounded-full' : 'rounded-lg',
      className
    )}
  />
);

export const SkeletonCard = () => (
  <div className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 p-5 space-y-3">
    <Skeleton className="h-4 w-1/3" />
    <Skeleton className="h-8 w-1/2" />
    <Skeleton className="h-2.5 w-full" />
  </div>
);

export const SkeletonList = ({ count = 3 }: { count?: number }) => (
  <div className="space-y-3">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 p-4 flex items-center gap-4">
        <Skeleton rounded className="h-10 w-10 shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-2/5" />
          <Skeleton className="h-3 w-3/5" />
        </div>
      </div>
    ))}
  </div>
);

export default Skeleton;
