import { useForm } from 'react-hook-form';
import type { SleepFormValues } from '@/types';
import { Input, Select, Textarea } from '@/components/ui/FormFields';
import Button from '@/components/ui/Button';
import { todayString } from '@/utils/dateUtils';

interface SleepFormProps {
  onSubmit: (values: SleepFormValues) => void;
  onCancel: () => void;
  defaultValues?: Partial<SleepFormValues>;
}

const SleepForm = ({ onSubmit, onCancel, defaultValues }: SleepFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<SleepFormValues>({
    defaultValues: {
      date: todayString(),
      hours: 8,
      quality: 3,
      bedtime: '23:00',
      wakeTime: '07:00',
      notes: '',
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Hours Slept"
          type="number"
          step={0.5}
          min={0}
          max={24}
          error={errors.hours?.message}
          {...register('hours', {
            required: 'Required',
            valueAsNumber: true,
            min: { value: 0, message: 'Invalid' },
            max: { value: 24, message: 'Invalid' },
          })}
        />
        <Input
          label="Date"
          type="date"
          {...register('date', { required: 'Date is required' })}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input label="Bedtime" type="time" {...register('bedtime')} />
        <Input label="Wake Time" type="time" {...register('wakeTime')} />
      </div>

      <Select
        label="Sleep Quality"
        options={[
          { value: 1, label: '😫 Poor' },
          { value: 2, label: '😕 Below Average' },
          { value: 3, label: '🙂 Average' },
          { value: 4, label: '😄 Good' },
          { value: 5, label: '🤩 Excellent' },
        ]}
        {...register('quality', { valueAsNumber: true })}
      />

      <Textarea label="Notes" placeholder="Optional" {...register('notes')} />

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save Entry</Button>
      </div>
    </form>
  );
};

export default SleepForm;
