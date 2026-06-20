import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';
import Button from '@/components/ui/Button';

const NotFoundPage = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center text-center py-24"
  >
    <div className="w-20 h-20 rounded-3xl bg-surface-100 dark:bg-surface-700/60 flex items-center justify-center mb-6">
      <Compass size={40} className="text-slate-400 dark:text-slate-500" strokeWidth={1.5} />
    </div>
    <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Page not found</h1>
    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-sm">
      The page you're looking for doesn't exist or has been moved.
    </p>
    <Link to="/">
      <Button>Back to Dashboard</Button>
    </Link>
  </motion.div>
);

export default NotFoundPage;
