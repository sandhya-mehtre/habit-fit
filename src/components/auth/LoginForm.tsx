import { useForm } from 'react-hook-form';
import type { LoginFormValues } from '@/types';
import { Input } from '@/components/ui/FormFields';
import Button from '@/components/ui/Button';
import { EMAIL_REGEX } from '@/constants';

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
  isLoading?: boolean;
}

const LoginForm = ({ onSubmit, isLoading }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ defaultValues: { email: '', password: '' } });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
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
        autoComplete="current-password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register('password', { required: 'Password is required' })}
      />

      <Button type="submit" fullWidth loading={isLoading} size="lg" className="mt-2">
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
