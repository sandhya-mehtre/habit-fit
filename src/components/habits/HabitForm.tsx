import { useForm, Controller } from 'react-hook-form';
import type { HabitFormValues } from '@/types';
import { HABIT_CATEGORIES, HABIT_COLORS, HABIT_ICONS } from '@/constants';
import { DEFAULT_HABIT_ICON } from '@/constants/icons';
import { Input, Select, Textarea } from '@/components/ui/FormFields';
import Button from '@/components/ui/Button';
import HabitIcon from '@/components/ui/HabitIcon';
import { clsx } from '@/utils/helpers';

interface HabitFormProps {
  defaultValues?: Partial<HabitFormValues>;
  onSubmit: (values: HabitFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const DEFAULT_FORM: HabitFormValues = {
  name: '',
  description: '',
  category: 'health',
  frequency: 'daily',
  targetDays: 7,
  color: HABIT_COLORS[0],
  icon: DEFAULT_HABIT_ICON,
};

const HabitForm = ({ defaultValues, onSubmit, onCancel, isLoading }: HabitFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<HabitFormValues>({
    defaultValues: { ...DEFAULT_FORM, ...defaultValues },
  });

  const frequency = watch('frequency');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name */}
      <Input
        label="Habit Name"
        placeholder="e.g. Morning Run"
        error={errors.name?.message}
        {...register('name', {
          required: 'Name is required',
          maxLength: { value: 60, message: 'Max 60 characters' },
        })}
      />

      {/* Description */}
      <Textarea
        label="Description"
        placeholder="Optional description..."
        rows={2}
        {...register('description')}
      />

      {/* Category + Frequency row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Select
          label="Category"
          options={HABIT_CATEGORIES.map((c) => ({ value: c.value, label: c.label }))}
          error={errors.category?.message}
          {...register('category', { required: true })}
        />
        <Select
          label="Frequency"
          options={[
            { value: 'daily',  label: 'Daily' },
            { value: 'weekly', label: 'Weekly' },
          ]}
          {...register('frequency')}
        />
      </div>

      {/* Target days for weekly */}
      {frequency === 'weekly' && (
        <Input
          label="Target Days per Week"
          type="number"
          min={1}
          max={7}
          error={errors.targetDays?.message}
          {...register('targetDays', {
            valueAsNumber: true,
            min: { value: 1, message: 'At least 1' },
            max: { value: 7, message: 'Max 7' },
          })}
        />
      )}

      {/* Icon picker */}
      <div>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Icon</p>
        <Controller
          name="icon"
          control={control}
          render={({ field }) => (
            <div className="flex flex-wrap gap-2">
              {HABIT_ICONS.map((iconKey) => (
                <button
                  key={iconKey}
                  type="button"
                  onClick={() => field.onChange(iconKey)}
                  aria-label={iconKey}
                  className={clsx(
                    'w-9 h-9 rounded-xl flex items-center justify-center transition-all',
                    field.value === iconKey
                      ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/30 scale-110 text-primary-600 dark:text-primary-400'
                      : 'bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 text-slate-600 dark:text-slate-300'
                  )}
                >
                  <HabitIcon iconKey={iconKey} size={18} />
                </button>
              ))}
            </div>
          )}
        />
      </div>

      {/* Color picker */}
      <div>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Color</p>
        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <div className="flex flex-wrap gap-2">
              {HABIT_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => field.onChange(color)}
                  className={clsx(
                    'w-7 h-7 rounded-full transition-transform',
                    field.value === color && 'ring-2 ring-offset-2 ring-slate-400 scale-110'
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={isLoading}>
          Save Habit
        </Button>
      </div>
    </form>
  );
};

export default HabitForm;
