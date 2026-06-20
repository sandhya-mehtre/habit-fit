import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSyncUserData } from '@/store/useSyncUserData';
import AppLayout from '@/components/layout/AppLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import GuestRoute from '@/components/auth/GuestRoute';

import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import DashboardPage from '@/pages/DashboardPage';
import HabitsPage from '@/pages/HabitsPage';
import FitnessPage from '@/pages/FitnessPage';
import AnalyticsPage from '@/pages/AnalyticsPage';
import ProfilePage from '@/pages/ProfilePage';
import NotFoundPage from '@/pages/NotFoundPage';

function App() {
  // Keeps habits/workouts/weight/water/sleep slices scoped to whichever
  // user is currently logged in (or guest, if no session exists).
  useSyncUserData();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public auth routes — redirect away if already logged in */}
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        {/* Protected app routes — redirect to /login if not authenticated */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route index path="/" element={<DashboardPage />} />
            <Route path="/habits" element={<HabitsPage />} />
            <Route path="/fitness" element={<FitnessPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>

        {/* Fallback for unauthenticated users hitting an unknown URL */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
