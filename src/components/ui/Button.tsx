import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from '@/utils/helpers';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
type Size    = 'xs' | 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm',
  secondary:
    'bg-surface-100 text-surface-800 hover:bg-surface-200 dark:bg-surface-800 dark:text-slate-200 dark:hover:bg-surface-700',
  ghost:
    'text-slate-600 hover:bg-surface-100 dark:text-slate-400 dark:hover:bg-surface-800',
  danger:
    'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm',
  success:
    'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 shadow-sm',
};

const sizeClasses: Record<Size, string> = {
  xs: 'px-2.5 py-1 text-xs gap-1',
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-5 py-2.5 text-base gap-2',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      fullWidth = false,
      children,
      className,
      disabled,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          'inline-flex items-center justify-center font-medium rounded-xl',
          'transition-all duration-150 focus:outline-none focus-visible:ring-2',
          'focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && 'w-full',
          className
        )}
        {...rest}
      >
        {loading ? (
          <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
        ) : (
          icon
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
