import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header  from './Header';

const AppLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div className="flex h-screen bg-surface-50 dark:bg-surface-950 overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
            <Outlet />
          </div>
        </main>
      </div>

      <Toaster
        position={isMobile ? 'top-center' : 'top-right'}
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--toast-bg, #1e293b)',
            color:      '#f1f5f9',
            borderRadius: '12px',
            fontSize: '14px',
            border: '1px solid rgba(255,255,255,0.08)',
            maxWidth: '92vw',
          },
        }}
        containerStyle={isMobile ? { top: 64 } : undefined}
      />
    </div>
  );
};

export default AppLayout;
