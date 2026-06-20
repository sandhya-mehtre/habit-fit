import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';

const GuestRoute = () => {
  const currentUser = useAppSelector((s) => s.auth.currentUser);

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
