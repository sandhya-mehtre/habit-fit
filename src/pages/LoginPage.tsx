import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { login, clearAuthError } from '@/store/slices/authSlice';
import type { LoginFormValues } from '@/types';
import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, error } = useAppSelector((s) => s.auth);

  // Clear stale errors when arriving fresh at this page
  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      const redirectTo = (location.state as { from?: Location })?.from?.pathname ?? '/';
      toast.success(`Welcome back, ${currentUser.name.split(' ')[0]}!`);
      navigate(redirectTo, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const handleSubmit = (values: LoginFormValues) => {
    dispatch(login(values));
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to continue tracking your progress.">
      <LoginForm onSubmit={handleSubmit} />

      {error && (
        <p className="text-sm text-red-500 mt-4 text-center">{error}</p>
      )}

      <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-6">
        Don't have an account?{' '}
        <Link to="/signup" className="font-medium text-primary-600 dark:text-primary-400 hover:underline">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
