import { useForm } from 'react-hook-form';
import type { Exercise } from '@/types';
import { Input, Textarea } from '@/components/ui/FormFields';
import Button from '@/components/ui/Button';

type ExerciseFormValues = Omit<Exercise, 'id'>;

interface ExerciseFormProps {
  onSubmit: (values: ExerciseFormValues) => void;
  onCancel: () => void;
}

const ExerciseForm = ({ onSubmit, onCancel }: ExerciseFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ExerciseFormValues>({
    defaultValues: { name: '', notes: '' },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Exercise Name"
        placeholder="e.g. Bench Press"
        error={errors.name?.message}
        {...register('name', { required: 'Exercise name is required' })}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input label="Sets" type="number" min={0} {...register('sets', { valueAsNumber: true })} />
        <Input label="Reps" type="number" min={0} {...register('reps', { valueAsNumber: true })} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input label="Weight (kg)" type="number" min={0} step={0.5} {...register('weight', { valueAsNumber: true })} />
        <Input label="Duration (min)" type="number" min={0} {...register('duration', { valueAsNumber: true })} />
      </div>

      <Input label="Distance (km)" type="number" min={0} step={0.1} {...register('distance', { valueAsNumber: true })} />

      <Textarea label="Notes" placeholder="Optional notes" {...register('notes')} />

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Add Exercise</Button>
      </div>
    </form>
  );
};

export default ExerciseForm;
