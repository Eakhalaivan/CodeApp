import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { CommandPalette } from '../ui/CommandPalette';
import { ToastContainer } from '../ui/Toast';
import { cn } from '../../utils/cn';
import { useUIStore } from '../../store/uiStore';

export const AppLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { theme } = useUIStore();
  
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
  }, [theme]);

  // Routes that should NOT have the global Sidebar/Navbar
  const isExcluded = ['/', '/login', '/signup'].includes(location.pathname);
  const isWorkspace = location.pathname.startsWith('/problems/') && location.pathname !== '/problems';
  const isMaterialDetail = /^\/materials\/\d+/.test(location.pathname);

  // Auto-collapse sidebar on material detail to give room for topic sidebar
  const effectivelyCollapsed = isCollapsed || isMaterialDetail;

  if (isExcluded) {
    return (
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
        <CommandPalette />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex transition-colors duration-300">
      <Sidebar isCollapsed={effectivelyCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <motion.div 
        initial={false}
        animate={{ paddingLeft: effectivelyCollapsed ? 80 : 260 }}
        className="flex-1 flex flex-col min-w-0"
      >
        <Navbar isCollapsed={effectivelyCollapsed} />
        
        <main className={cn(
          "flex-1 mt-16 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 transition-colors duration-300",
          !isWorkspace && !isMaterialDetail && "p-8"
        )}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: isWorkspace ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: isWorkspace ? 0 : -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={cn(isWorkspace && "h-full")}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </motion.div>

      <CommandPalette />
      <ToastContainer />
    </div>
  );
};
