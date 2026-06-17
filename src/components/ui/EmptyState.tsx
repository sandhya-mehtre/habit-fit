import Button from './Button';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState = ({ icon, title, description, actionLabel, onAction }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
    <span className="text-5xl mb-4">{icon}</span>
    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">{title}</h3>
    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mb-6">{description}</p>
    {actionLabel && onAction && (
      <Button onClick={onAction}>{actionLabel}</Button>
    )}
  </div>
);

export default EmptyState;
