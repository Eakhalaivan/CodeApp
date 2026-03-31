import { useEffect, useState } from 'react';
import { useUIStore } from '../../store/uiStore';
import { Modal } from '../ui/Modal';
import { Search, Hash, Star, Layout, Command as CommandIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CommandPalette = () => {
  const { isCommandPaletteOpen, setCommandPaletteOpen } = useUIStore();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setCommandPaletteOpen]);

  const commands = [
    { id: 'dashboard', label: 'Dashboard', icon: Layout, path: '/dashboard' },
    { id: 'problems', label: 'Browse Problems', icon: Hash, path: '/problems' },
    { id: 'contests', label: 'View Contests', icon: Star, path: '/contests' },
    { id: 'settings', label: 'Profile Settings', icon: CommandIcon, path: '/settings' },
  ];

  const filtered = query.length === 0 
    ? commands 
    : commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (path: string) => {
    navigate(path);
    setCommandPaletteOpen(false);
    setQuery('');
  };

  return (
    <Modal 
      isOpen={isCommandPaletteOpen} 
      onClose={() => setCommandPaletteOpen(false)}
      className="max-w-xl p-0"
    >
      <div className="flex flex-col">
        <div className="relative p-6 border-b border-slate-800">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            autoFocus
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent pl-10 text-lg outline-none text-white placeholder-slate-600"
          />
        </div>
        
        <div className="p-4 max-h-[400px] overflow-y-auto">
          {filtered.length > 0 ? (
             <div className="space-y-2">
                {filtered.map(cmd => (
                  <button
                    key={cmd.id}
                    onClick={() => handleSelect(cmd.path)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 group transition-all text-slate-400 hover:text-white"
                  >
                    <div className="flex items-center gap-3">
                       <cmd.icon size={18} className="group-hover:text-primary transition-colors" />
                       <span className="font-bold text-sm tracking-tight">{cmd.label}</span>
                    </div>
                    <div className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[10px] font-black uppercase text-slate-600 group-hover:text-primary group-hover:border-primary/20">
                       Navigate
                    </div>
                  </button>
                ))}
             </div>
          ) : (
            <div className="py-10 text-center">
               <p className="text-slate-500 font-bold italic">No results for "{query}"</p>
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-950/50 border-t border-slate-900 flex items-center justify-between text-[10px] font-black uppercase text-slate-700">
           <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><kbd className="bg-white/5 px-1.5 py-0.5 rounded">↑↓</kbd> Navigate</span>
              <span className="flex items-center gap-1"><kbd className="bg-white/5 px-1.5 py-0.5 rounded">↵</kbd> Select</span>
           </div>
           <span className="flex items-center gap-1">ESC to close</span>
        </div>
      </div>
    </Modal>
  );
};
