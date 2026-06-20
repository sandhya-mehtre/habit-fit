import { useForm } from 'react-hook-form';
import type { SignupFormValues } from '@/types';
import { Input } from '@/components/ui/FormFields';
import Button from '@/components/ui/Button';
import { EMAIL_REGEX } from '@/constants';

interface SignupFormProps {
  onSubmit: (values: SignupFormValues) => void;
  isLoading?: boolean;
}

const SignupForm = ({ onSubmit, isLoading }: SignupFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormValues>({
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const password = watch('password');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Input
        label="Full Name"
        autoComplete="name"
        placeholder="Jane Doe"
        error={errors.name?.message}
        {...register('name', {
          required: 'Name is required',
          minLength: { value: 2, message: 'Name is too short' },
        })}
      />

      <Input
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register('email', {
          required: 'Email is required',
          pattern: { value: EMAIL_REGEX, message: 'Enter a valid email' },
        })}
      />

      <Input
        label="Password"
        type="password"
        autoComplete="new-password"
        placeholder="At least 6 characters"
        error={errors.password?.message}
        {...register('password', {
          required: 'Password is required',
          minLength: { value: 6, message: 'Must be at least 6 characters' },
        })}
      />

      <Input
        label="Confirm Password"
        type="password"
        autoComplete="new-password"
        placeholder="Re-enter password"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword', {
          required: 'Please confirm your password',
          validate: (value) => value === password || 'Passwords do not match',
        })}
      />

      <Button type="submit" fullWidth loading={isLoading} size="lg" className="mt-2">
        Create Account
      </Button>
    </form>
  );
};

export default SignupForm;
