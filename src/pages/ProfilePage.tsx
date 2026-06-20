import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Flame, Dumbbell, CheckCircle2, LogOut } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateProfile, changePassword, logout, clearAuthError } from '@/store/slices/authSlice';
import type { ProfileFormValues, PasswordChangeFormValues } from '@/types';
import { formatDisplayDate } from '@/utils/dateUtils';

import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import ProfileForm from '@/components/auth/ProfileForm';
import PasswordForm from '@/components/auth/PasswordForm';

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.auth.currentUser);
  const error = useAppSelector((s) => s.auth.error);

  const habits   = useAppSelector((s) => s.habits.items);
  const workouts = useAppSelector((s) => s.workouts.items);

  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  if (!user) return null;

  const longestStreak = habits.reduce((max, h) => Math.max(max, h.longestStreak), 0);

  const handleProfileSubmit = (values: ProfileFormValues) => {
    dispatch(clearAuthError());
    dispatch(updateProfile(values));
    toast.success('Profile updated!');
  };

  const handlePasswordSubmit = (values: PasswordChangeFormValues) => {
    dispatch(clearAuthError());
    dispatch(changePassword(values));
    toast.success('Password updated!');
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/login', { replace: true });
  };

  const stats = [
    { label: 'Habits', value: habits.length,  icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30' },
    { label: 'Workouts', value: workouts.length, icon: Dumbbell,    color: 'text-primary-500 bg-primary-50 dark:bg-primary-900/30' },
    { label: 'Best Streak', value: `${longestStreak}d`, icon: Flame, color: 'text-orange-500 bg-orange-50 dark:bg-orange-900/30' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 max-w-3xl"
    >
      {/* Profile header card */}
      <Card>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shrink-0"
            style={{ backgroundColor: user.avatarColor }}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 truncate">{user.name}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              Member since {formatDisplayDate(user.createdAt)}
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            icon={<LogOut size={14} />}
            onClick={() => setLogoutConfirmOpen(true)}
            className="w-full sm:w-auto"
          >
            Log Out
          </Button>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-surface-100 dark:border-surface-700">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex flex-col items-center text-center gap-2">
                <span className={`w-9 h-9 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <Icon size={17} />
                </span>
                <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{stat.value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 -mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Edit profile */}
      <Card>
        <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-4">Edit Profile</h3>
        <ProfileForm user={user} onSubmit={handleProfileSubmit} />
      </Card>

      {/* Change password */}
      <Card>
        <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-4">Change Password</h3>
        <PasswordForm onSubmit={handlePasswordSubmit} />
        {error && <p className="text-sm text-red-500 mt-3">{error}</p>}
      </Card>

      {/* Danger zone */}
      <Card className="border-red-200 dark:border-red-900/40">
        <h3 className="font-semibold text-sm text-red-600 dark:text-red-400 mb-1">Danger Zone</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Logging out will end your session on this device. Your data stays saved and will be here next time you sign in.
        </p>
        <Button
          variant="danger"
          size="sm"
          icon={<LogOut size={14} />}
          onClick={() => setLogoutConfirmOpen(true)}
        >
          Log Out
        </Button>
      </Card>

      <ConfirmDialog
        open={logoutConfirmOpen}
        onClose={() => setLogoutConfirmOpen(false)}
        onConfirm={handleLogout}
        title="Log Out"
        message="Are you sure you want to log out of HabitFit?"
        confirmLabel="Log Out"
        variant="danger"
      />
    </motion.div>
  );
};

export default ProfilePage;
