import { Trophy, Medal, Star } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Badge } from './Badge';

interface LeaderboardItemProps {
  rank: number;
  username: string;
  avatar?: string;
  solvedCount: number;
  points: number;
  level: string;
  isCurrentUser?: boolean;
}

export const LeaderboardItem = ({
  rank,
  username,
  avatar,
  solvedCount,
  points,
  level,
  isCurrentUser
}: LeaderboardItemProps) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="text-yellow-400" size={20} />;
      case 2: return <Medal className="text-slate-300" size={20} />;
      case 3: return <Medal className="text-amber-600" size={20} />;
      default: return <span className="text-slate-500 font-mono w-5 text-center">{rank}</span>;
    }
  };

  return (
    <div className={cn(
      "flex items-center gap-4 p-4 rounded-xl transition-all duration-300 border border-transparent",
      isCurrentUser ? "bg-primary/10 border-primary/20" : "hover:bg-white/5"
    )}>
      <div className="flex items-center justify-center w-8">
        {getRankIcon(rank)}
      </div>
      
      <div className="relative h-10 w-10 shrink-0">
        <img 
          src={avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`} 
          alt={username}
          className="h-full w-full rounded-full bg-slate-800 border border-white/10"
        />
        {rank <= 3 && (
          <div className="absolute -top-1 -right-1">
             <Star className="text-yellow-400 fill-yellow-400 animate-pulse" size={12} />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className={cn(
          "font-bold truncate",
          isCurrentUser ? "text-primary" : "text-slate-100"
        )}>
          {username} {isCurrentUser && <span className="ml-1 text-[10px] uppercase tracking-tighter opacity-70">(You)</span>}
        </h3>
        <p className="text-xs text-slate-500 font-medium">{level}</p>
      </div>

      <div className="flex items-center gap-6 text-right">
        <div className="hidden sm:block">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Solved</p>
          <p className="font-mono text-slate-200">{solvedCount}</p>
        </div>
        <div>
          <Badge variant="accent" className="bg-primary/20 text-primary border-primary/30">
            {points.toLocaleString()} pts
          </Badge>
        </div>
      </div>
    </div>
  );
};
