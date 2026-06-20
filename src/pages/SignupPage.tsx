import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { signup, clearAuthError } from '@/store/slices/authSlice';
import type { SignupFormValues } from '@/types';
import AuthLayout from '@/components/auth/AuthLayout';
import SignupForm from '@/components/auth/SignupForm';

const SignupPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser, error } = useAppSelector((s) => s.auth);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      toast.success(`Welcome to HabitFit, ${currentUser.name.split(' ')[0]}!`);
      navigate('/', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const handleSubmit = (values: SignupFormValues) => {
    dispatch(signup(values));
  };

  return (
    <AuthLayout title="Create your account" subtitle="Start building better habits today — it's free.">
      <SignupForm onSubmit={handleSubmit} />

      {error && (
        <p className="text-sm text-red-500 mt-4 text-center">{error}</p>
      )}

      <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-6">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-primary-600 dark:text-primary-400 hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default SignupPage;
