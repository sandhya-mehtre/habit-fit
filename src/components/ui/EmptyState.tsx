import type { LucideIcon } from 'lucide-react';
import Button from './Button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState = ({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-10 sm:py-16 px-4 text-center">
    <div className="w-14 h-14 rounded-2xl bg-surface-100 dark:bg-surface-700/60 flex items-center justify-center mb-4">
      <Icon size={26} className="text-slate-400 dark:text-slate-500" strokeWidth={1.75} />
    </div>
    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">{title}</h3>
    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mb-6">{description}</p>
    {actionLabel && onAction && (
      <Button onClick={onAction}>{actionLabel}</Button>
    )}
  </div>
);

export default EmptyState;
