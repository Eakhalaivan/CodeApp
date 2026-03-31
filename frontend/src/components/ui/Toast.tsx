import { motion, AnimatePresence } from 'framer-motion';
import { useToastStore } from '../../store/toastStore';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  const icons = {
    success: <CheckCircle size={18} className="text-success" />,
    error: <XCircle size={18} className="text-red-500" />,
    info: <AlertCircle size={18} className="text-primary" />,
  };

  return (
    <div className="fixed bottom-8 right-8 z-[300] flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.1 } }}
            className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-4 pr-12 min-w-[300px] relative flex items-center gap-4"
          >
            {icons[toast.type]}
            <p className="text-sm font-bold text-white">{toast.message}</p>
            <button 
              onClick={() => removeToast(toast.id)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/5 rounded-lg text-slate-500"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
