import { type ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { clsx } from '@/utils/helpers';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm:  'max-w-sm',
  md:  'max-w-md',
  lg:  'max-w-lg',
  xl:  'max-w-2xl',
};

const Modal = ({ open, onClose, title, children, size = 'md' }: ModalProps) => {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={clsx(
              'relative w-full bg-white dark:bg-surface-800 rounded-2xl shadow-xl',
              'border border-surface-200 dark:border-surface-700',
              'max-h-[90vh] flex flex-col overflow-hidden',
              sizeClasses[size]
            )}
          >
            {/* Header */}
            {title && (
              <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-surface-100 dark:border-surface-700 shrink-0">
                <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 truncate pr-2">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 shrink-0"
                >
                  <X size={18} />
                </button>
              </div>
            )}

            {/* Body — scrolls independently so tall forms never get clipped on short viewports */}
            <div className="px-4 sm:px-6 py-4 sm:py-5 overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
