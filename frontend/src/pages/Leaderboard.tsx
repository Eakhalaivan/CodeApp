import { Container } from '../components/layout/BaseLayout';
import { Card } from '../components/ui/Card';
import { Trophy, ChevronRight, Search, LayoutGrid } from 'lucide-react';
import { LeaderboardItem } from '../components/ui/LeaderboardItem';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import girl from '../assets/girl.jpg';
import girl1 from '../assets/girl1.jpg';
import ch from '../assets/ch.jpg';
import ch1 from '../assets/ch1.jpg';

const MOCK_LEADERBOARD = [
  { id: 1, rank: 1, username: 'code_wizard', points: 12500, solvedCount: 432, level: 'Grandmaster', avatar: girl },
  { id: 2, rank: 2, username: 'algo_queen', points: 11200, solvedCount: 389, level: 'Master', avatar: girl1 },
  { id: 3, rank: 3, username: 'binary_beast', points: 9800, solvedCount: 345, level: 'Elite', avatar: ch },
  { id: 4, rank: 4, username: 'syntax_samurai', points: 8500, solvedCount: 312, level: 'Pro', avatar: ch1 },
  { id: 5, rank: 5, username: 'debugger_dave', points: 7900, solvedCount: 289, level: 'Pro', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=debugger_dave' },
  { id: 6, rank: 6, username: 'pixel_perfect', points: 7200, solvedCount: 256, level: 'Expert', avatar: ch1 },
  { id: 7, rank: 7, username: 'null_pointer', points: 6800, solvedCount: 211, level: 'Expert', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=null_pointer' },
  { id: 8, rank: 8, username: 'coffee_coder', points: 5500, solvedCount: 178, level: 'Advanced', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=coffee_coder' },
  { id: 9, rank: 9, username: 'git_god', points: 4200, solvedCount: 145, level: 'intermediate', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=git_god' },
  { id: 10, rank: 10, username: 'react_ranger', points: 3100, solvedCount: 98, level: 'Novice', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=react_ranger' },
];

export const Leaderboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredUsers = MOCK_LEADERBOARD.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const topThree = MOCK_LEADERBOARD.slice(0, 3);
  const others = filteredUsers.slice(3);

  return (
    <Container className="py-12 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-display font-black tracking-tight text-white mb-3 flex items-center gap-4">
            <Trophy className="text-primary animate-pulse" size={48} /> Rankings
          </h1>
          <p className="text-slate-400 text-lg">Top performers in the global coding community.</p>
        </div>
        
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
          <Input 
            type="text" 
            label="Search coder..."
            className="pl-12 bg-slate-900/50 border-white/5 focus:border-primary/50 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {!searchTerm && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-end">
          {/* Second Place */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="order-2 md:order-1"
          >
            <Card className="text-center p-8 border-slate-300/10 h-72 flex flex-col items-center justify-center relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 bg-slate-300/10 rounded-bl-3xl">
                  <span className="text-2xl font-black text-slate-400 font-display">#2</span>
               </div>
               <img src={topThree[1].avatar} className="w-24 h-24 rounded-full border-4 border-slate-300/20 mb-4 shadow-xl shadow-slate-950/50" />
               <h3 className="text-xl font-bold text-white mb-1">{topThree[1].username}</h3>
               <Badge className="bg-slate-300/10 text-slate-300 border-slate-300/20 mb-4">{topThree[1].level}</Badge>
               <p className="text-primary font-mono text-lg">{topThree[1].points.toLocaleString()} pts</p>
            </Card>
          </motion.div>

          {/* First Place */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
            className="order-1 md:order-2"
          >
            <Card className="text-center p-10 border-primary/20 bg-primary/5 h-96 flex flex-col items-center justify-center relative overflow-hidden scale-110 shadow-3xl shadow-primary/20 border-2">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
               <div className="absolute top-0 right-0 p-4 bg-primary/20 rounded-bl-3xl border-b border-l border-primary/30">
                  <Trophy className="text-yellow-400 shrink-0" size={32} />
               </div>
               <div className="relative mb-6">
                 <img src={topThree[0].avatar} className="w-32 h-32 rounded-full border-4 border-primary/40 shadow-2xl shadow-primary/30" />
                 <div className="absolute -bottom-2 -right-2 bg-yellow-400 p-2 rounded-full shadow-lg">
                    <span className="text-sm font-black text-slate-950 font-display">#1</span>
                 </div>
               </div>
               <h3 className="text-2xl font-black text-white mb-1 tracking-tight">{topThree[0].username}</h3>
               <Badge className="bg-primary text-white border-transparent mb-4 px-4 py-1 text-sm font-bold animate-pulse">
                {topThree[0].level}
               </Badge>
               <p className="text-primary font-mono text-2xl font-black">{topThree[0].points.toLocaleString()} pts</p>
            </Card>
          </motion.div>

          {/* Third Place */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="order-3"
          >
             <Card className="text-center p-8 border-amber-600/10 h-64 flex flex-col items-center justify-center relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 bg-amber-600/10 rounded-bl-3xl">
                  <span className="text-2xl font-black text-amber-600 font-display">#3</span>
               </div>
               <img src={topThree[2].avatar} className="w-20 h-20 rounded-full border-4 border-amber-600/20 mb-4" />
               <h3 className="text-xl font-bold text-white mb-1">{topThree[2].username}</h3>
               <Badge className="bg-amber-600/10 text-amber-600 border-amber-600/20 mb-4">{topThree[2].level}</Badge>
               <p className="text-primary font-mono text-lg">{topThree[2].points.toLocaleString()} pts</p>
            </Card>
          </motion.div>
        </div>
      )}

      <Card className="p-2 border-white/5 bg-slate-900/40 backdrop-blur-xl">
        <div className="p-4 flex items-center justify-between border-b border-white/5 mb-4">
           <div className="flex items-center gap-2 text-slate-400 font-bold text-sm uppercase tracking-widest">
              <LayoutGrid size={18} className="text-primary" />
              Community Rankings
           </div>
           <div className="text-xs text-slate-500 font-medium">
             Updated every 15 minutes
           </div>
        </div>
        <div className="flex flex-col gap-1 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence>
          {others.length > 0 ? (
            others.map((user) => (
              <LeaderboardItem 
                key={user.id}
                rank={user.rank}
                username={user.username}
                avatar={user.avatar}
                solvedCount={user.solvedCount}
                points={user.points}
                level={user.level}
                isCurrentUser={user.username === 'pixel_perfect'} // Mock current user
              />
            ))
          ) : (
             <div className="py-20 text-center text-slate-500">
                <div className="w-16 h-16 mx-auto mb-4 overflow-hidden rounded-full">
                  <img 
                    src={ch1} 
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                No coders found matching "{searchTerm}"
             </div>
          )}
          </AnimatePresence>
        </div>
      </Card>
      
      <div className="mt-12 flex justify-center">
         <button className="flex items-center gap-2 text-primary hover:text-white transition-colors group font-bold tracking-tight">
            See entire history <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
         </button>
      </div>
    </Container>
  );
};
