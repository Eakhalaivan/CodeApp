import { Bell, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export const Navbar = ({ isCollapsed }: { isCollapsed: boolean }) => {
  return (
    <motion.header
      initial={false}
      animate={{ left: isCollapsed ? 80 : 260 }}
      className="fixed top-0 right-0 h-16 bg-background/60 backdrop-blur-xl border-b border-card-border z-10 
                 flex items-center justify-between px-8 transition-all duration-300"
    >
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search problems..."
            className="w-full bg-muted/30 border border-card-border focus:border-primary/50 focus:ring-4 focus:ring-primary/10 text-sm rounded-xl pl-10 pr-4 py-2 
                       transition-all outline-none text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <a href="#" className="nav-link">Forum</a>
          <a href="#" className="nav-link">Contests</a>
        </div>
        <div className="h-8 w-px bg-card-border mx-2" />
        <button className="relative p-2 rounded-xl border border-card-border hover:bg-muted/50 transition-colors group">
          <Bell size={18} className="text-secondary-foreground group-hover:text-foreground transition-colors" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background" />
        </button>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-from to-primary-to shadow-lg shadow-primary/20 flex items-center justify-center text-white text-xs font-bold">
          AS
        </div>
      </div>
    </motion.header>
  );
};
