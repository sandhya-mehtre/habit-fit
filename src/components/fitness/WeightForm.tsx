import { useForm } from 'react-hook-form';
import type { WeightFormValues } from '@/types';
import { Input, Textarea } from '@/components/ui/FormFields';
import Button from '@/components/ui/Button';
import { todayString } from '@/utils/dateUtils';

interface WeightFormProps {
  onSubmit: (values: WeightFormValues) => void;
  onCancel: () => void;
  defaultValues?: Partial<WeightFormValues>;
}

const WeightForm = ({ onSubmit, onCancel, defaultValues }: WeightFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<WeightFormValues>({
    defaultValues: {
      date: todayString(),
      weight: undefined as unknown as number,
      notes: '',
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Weight (kg)"
          type="number"
          step={0.1}
          min={20}
          max={300}
          error={errors.weight?.message}
          {...register('weight', {
            required: 'Weight is required',
            valueAsNumber: true,
            min: { value: 20, message: 'Enter a valid weight' },
            max: { value: 300, message: 'Enter a valid weight' },
          })}
        />
        <Input
          label="Date"
          type="date"
          error={errors.date?.message}
          {...register('date', { required: 'Date is required' })}
        />
      </div>

      <Textarea label="Notes" placeholder="Optional" {...register('notes')} />

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save Entry</Button>
      </div>
    </form>
  );
};

export default WeightForm;
