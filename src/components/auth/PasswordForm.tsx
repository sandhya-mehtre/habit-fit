import { useForm } from 'react-hook-form';
import type { PasswordChangeFormValues } from '@/types';
import { Input } from '@/components/ui/FormFields';
import Button from '@/components/ui/Button';

interface PasswordFormProps {
  onSubmit: (values: PasswordChangeFormValues) => void;
  isLoading?: boolean;
}

const PasswordForm = ({ onSubmit, isLoading }: PasswordFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<PasswordChangeFormValues>({
    defaultValues: { currentPassword: '', newPassword: '', confirmNewPassword: '' },
  });

  const newPassword = watch('newPassword');

  const submit = (values: PasswordChangeFormValues) => {
    onSubmit(values);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4" noValidate>
      <Input
        label="Current Password"
        type="password"
        autoComplete="current-password"
        error={errors.currentPassword?.message}
        {...register('currentPassword', { required: 'Required' })}
      />
      <Input
        label="New Password"
        type="password"
        autoComplete="new-password"
        error={errors.newPassword?.message}
        {...register('newPassword', {
          required: 'Required',
          minLength: { value: 6, message: 'Must be at least 6 characters' },
        })}
      />
      <Input
        label="Confirm New Password"
        type="password"
        autoComplete="new-password"
        error={errors.confirmNewPassword?.message}
        {...register('confirmNewPassword', {
          required: 'Required',
          validate: (value) => value === newPassword || 'Passwords do not match',
        })}
      />
      <div className="flex justify-end pt-2">
        <Button type="submit" variant="secondary" loading={isLoading}>Update Password</Button>
      </div>
    </form>
  );
};

export default PasswordForm;
