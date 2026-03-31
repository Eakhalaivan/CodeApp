import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Code2, BookOpen, Trophy, Settings, LogOut, ChevronLeft, ChevronRight, User, GraduationCap, Terminal, ChevronDown } from 'lucide-react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { useAuthStore } from '../../store/authStore';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
}

const topNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Code2, label: 'Problems', path: '/problems' },
];

const learningSubItems = [
  { icon: BookOpen, label: 'Study Material', path: '/materials' },
  { icon: Terminal, label: 'Coding Method', path: '/coding-method' },
  { icon: Trophy, label: 'Roadmaps', path: '/roadmaps' },
];

const bottomNavItems = [
  { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();

  const isLearningActive = location.pathname.startsWith('/materials') || location.pathname.startsWith('/coding-method') || location.pathname.startsWith('/roadmaps');
  const [learningOpen, setLearningOpen] = useState(isLearningActive);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const NavItem = ({ item }: { item: { icon: any; label: string; path: string } }) => (
    <NavLink
      to={item.path}
      className={({ isActive }) => cn(
        "flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group relative",
        isActive
          ? "bg-primary text-white shadow-glow-primary/20"
          : "text-secondary-foreground hover:bg-muted/40 hover:text-foreground"
      )}
    >
      {({ isActive }) => (
        <>
          <item.icon size={22} className="shrink-0 group-hover:scale-110 transition-transform" />
          {!isCollapsed && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-bold text-sm tracking-tight transition-colors">
              {item.label}
            </motion.span>
          )}
          {isActive && (
            <motion.div layoutId="activeTab" className="absolute left-0 w-1 h-6 bg-white rounded-r-full" />
          )}
        </>
      )}
    </NavLink>
  );

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 260 }}
      className={cn(
        "fixed left-0 top-0 h-screen bg-card border-r border-card-border z-20 transition-all duration-300",
        "flex flex-col"
      )}
    >
      <div className="p-6 flex items-center justify-between">
        <motion.div
          animate={{ opacity: isCollapsed ? 0 : 1 }}
          className="font-display font-bold text-xl text-primary flex items-center gap-2 overflow-hidden whitespace-nowrap"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Code2 className="w-6 h-6 text-primary" />
          </div>
          CodeFlow
        </motion.div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-8 overflow-y-auto custom-scrollbar">
        {/* Top nav items */}
        {topNavItems.map((item) => (
          <NavItem key={item.path} item={item} />
        ))}

        {/* Learning expandable group */}
        <div>
          <button
            onClick={() => !isCollapsed && setLearningOpen(!learningOpen)}
            className={cn(
              "w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group relative",
              isLearningActive
                ? "text-foreground bg-muted/40"
                : "text-secondary-foreground hover:bg-muted/40 hover:text-foreground"
            )}
          >
            <GraduationCap size={22} className="shrink-0 group-hover:scale-110 transition-transform" />
            {!isCollapsed && (
              <>
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-bold text-sm tracking-tight flex-1 text-left transition-colors">
                  Learning
                </motion.span>
                <motion.div
                  animate={{ rotate: learningOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={16} className="text-muted-foreground" />
                </motion.div>
              </>
            )}
            {isLearningActive && isCollapsed && (
              <motion.div layoutId="activeTab" className="absolute left-0 w-1 h-6 bg-primary rounded-r-full" />
            )}
          </button>

          <AnimatePresence initial={false}>
            {learningOpen && !isCollapsed && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="ml-4 mt-1 space-y-1 border-l border-card-border pl-3">
                  {learningSubItems.map((sub) => (
                    <NavLink
                      key={sub.path}
                      to={sub.path}
                      className={({ isActive }) => cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                        isActive
                          ? "bg-primary text-white"
                          : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                      )}
                    >
                      <sub.icon size={17} className="shrink-0" />
                      <span className="font-semibold text-sm tracking-tight">{sub.label}</span>
                    </NavLink>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collapsed state: show sub items as icons */}
          {isCollapsed && (
            <div className="mt-1 space-y-1">
              {learningSubItems.map((sub) => (
                <NavLink
                  key={sub.path}
                  to={sub.path}
                  className={({ isActive }) => cn(
                    "flex items-center justify-center py-2.5 rounded-xl transition-all duration-200",
                    isActive ? "bg-primary text-white" : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                  )}
                  title={sub.label}
                >
                  <sub.icon size={18} className="shrink-0" />
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Bottom nav items */}
        {bottomNavItems.map((item) => (
          <NavItem key={item.path} item={item} />
        ))}
      </nav>

      <div className="p-4 border-t border-card-border mt-auto">
        <div className={cn(
          "flex items-center gap-4 px-3 py-3 rounded-xl transition-all",
          !isCollapsed && "bg-muted/30"
        )}>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <User size={20} className="text-primary" />
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="font-bold text-sm truncate text-foreground">Felix the Coder</p>
              <p className="text-[10px] text-muted-foreground truncate font-black uppercase tracking-widest">Elite Tier</p>
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center gap-4 px-3 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors w-full mt-2 group",
            isCollapsed && "justify-center"
          )}
        >
          <LogOut size={20} className="shrink-0" />
          {!isCollapsed && <span className="font-bold text-sm tracking-tight">Sign Out</span>}
        </button>
      </div>
    </motion.aside>
  );
};
