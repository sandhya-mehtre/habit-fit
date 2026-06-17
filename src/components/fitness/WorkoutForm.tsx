import { useForm } from 'react-hook-form';
import type { WorkoutFormValues } from '@/types';
import { WORKOUT_TYPES } from '@/constants';
import { Input, Select, Textarea } from '@/components/ui/FormFields';
import Button from '@/components/ui/Button';
import { todayString } from '@/utils/dateUtils';

interface WorkoutFormProps {
  defaultValues?: Partial<WorkoutFormValues>;
  onSubmit: (values: WorkoutFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const DEFAULT_FORM: WorkoutFormValues = {
  date: todayString(),
  type: 'strength',
  name: '',
  duration: 30,
  caloriesBurned: undefined,
  notes: '',
};

const WorkoutForm = ({ defaultValues, onSubmit, onCancel, isLoading }: WorkoutFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkoutFormValues>({
    defaultValues: { ...DEFAULT_FORM, ...defaultValues },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Workout Name"
        placeholder="e.g. Upper Body Strength"
        error={errors.name?.message}
        {...register('name', { required: 'Name is required' })}
      />

      <div className="grid grid-cols-2 gap-3">
        <Select
          label="Type"
          options={WORKOUT_TYPES.map((t) => ({ value: t.value, label: `${t.emoji} ${t.label}` }))}
          {...register('type', { required: true })}
        />
        <Input
          label="Date"
          type="date"
          error={errors.date?.message}
          {...register('date', { required: 'Date is required' })}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Duration (minutes)"
          type="number"
          min={1}
          error={errors.duration?.message}
          {...register('duration', {
            required: 'Duration is required',
            valueAsNumber: true,
            min: { value: 1, message: 'Must be at least 1 minute' },
          })}
        />
        <Input
          label="Calories Burned"
          type="number"
          min={0}
          placeholder="Optional"
          {...register('caloriesBurned', { valueAsNumber: true })}
        />
      </div>

      <Textarea
        label="Notes"
        placeholder="How did it feel? Any PRs?"
        {...register('notes')}
      />

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={isLoading}>
          Save Workout
        </Button>
      </div>
    </form>
  );
};

export default WorkoutForm;
