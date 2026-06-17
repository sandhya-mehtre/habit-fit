import { forwardRef, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { clsx } from '@/utils/helpers';

// ─── Base styles ─────────────────────────────────────────────────────────────
const baseInputCls = clsx(
  'w-full rounded-xl border border-surface-200 dark:border-surface-600',
  'bg-white dark:bg-surface-900 text-slate-900 dark:text-slate-100',
  'placeholder:text-slate-400 dark:placeholder:text-slate-500',
  'px-3 py-2 text-sm transition-colors duration-150',
  'focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500',
  'disabled:opacity-50 disabled:cursor-not-allowed'
);

// ─── Input ────────────────────────────────────────────────────────────────────
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...rest }, ref) => {
    const fieldId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={fieldId} className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={fieldId}
          className={clsx(baseInputCls, error && 'border-red-500 focus:border-red-500 focus:ring-red-500/40', className)}
          {...rest}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
        {hint && !error && <p className="text-xs text-slate-500 dark:text-slate-400">{hint}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

// ─── Select ───────────────────────────────────────────────────────────────────
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string | number; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, id, ...rest }, ref) => {
    const fieldId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={fieldId} className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={fieldId}
          className={clsx(baseInputCls, 'cursor-pointer', error && 'border-red-500', className)}
          {...rest}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';

// ─── Textarea ─────────────────────────────────────────────────────────────────
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...rest }, ref) => {
    const fieldId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={fieldId} className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={fieldId}
          rows={3}
          className={clsx(baseInputCls, 'resize-none', error && 'border-red-500', className)}
          {...rest}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
