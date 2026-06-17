import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import DashboardPage from '@/pages/DashboardPage';
import HabitsPage from '@/pages/HabitsPage';
import FitnessPage from '@/pages/FitnessPage';
import AnalyticsPage from '@/pages/AnalyticsPage';
import NotFoundPage from '@/pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index path="/" element={<DashboardPage />} />
          <Route path="/habits" element={<HabitsPage />} />
          <Route path="/fitness" element={<FitnessPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
