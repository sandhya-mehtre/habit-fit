import { useForm } from 'react-hook-form';
import type { ProfileFormValues, PublicUser } from '@/types';
import { Input, Textarea } from '@/components/ui/FormFields';
import Button from '@/components/ui/Button';
import { EMAIL_REGEX } from '@/constants';

interface ProfileFormProps {
  user: PublicUser;
  onSubmit: (values: ProfileFormValues) => void;
  isLoading?: boolean;
}

const ProfileForm = ({ user, onSubmit, isLoading }: ProfileFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      name: user.name,
      email: user.email,
      heightCm: user.heightCm,
      goalWeightKg: user.goalWeightKg,
      bio: user.bio ?? '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          error={errors.name?.message}
          {...register('name', { required: 'Name is required' })}
        />
        <Input
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: { value: EMAIL_REGEX, message: 'Enter a valid email' },
          })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Height (cm)"
          type="number"
          min={50}
          max={250}
          placeholder="Optional"
          {...register('heightCm', { valueAsNumber: true })}
        />
        <Input
          label="Goal Weight (kg)"
          type="number"
          step={0.1}
          min={20}
          max={300}
          placeholder="Optional"
          {...register('goalWeightKg', { valueAsNumber: true })}
        />
      </div>

      <Textarea
        label="Bio"
        placeholder="A short note about your fitness journey..."
        {...register('bio')}
      />

      <div className="flex justify-end pt-2">
        <Button type="submit" loading={isLoading}>Save Changes</Button>
      </div>
    </form>
  );
};

export default ProfileForm;
