import { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Trophy, Clock, Target, Zap, ChevronRight, Activity } from 'lucide-react';
import { Container } from '../components/layout/BaseLayout';
import { CountUp } from '../components/ui/CountUp';
import { useAuthStore } from '../store/authStore';

const initialData = [
  { name: 'Mon', problems: 2 },
  { name: 'Tue', problems: 3 },
  { name: 'Wed', problems: 2 },
  { name: 'Thu', problems: 4 },
  { name: 'Fri', problems: 3 },
  { name: 'Sat', problems: 1 },
  { name: 'Sun', problems: 2 },
];

export const Dashboard = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [chartData, setChartData] = useState(initialData);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    setIsMounted(true);
    setStreak(14); // Mock data

    const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
    
    // Live Pulse - subtle background activity
    const pulseInterval = setInterval(() => {
      setChartData(prev => prev.map((item, i) => 
        i === todayIndex && Math.random() > 0.8 
          ? { ...item, problems: item.problems + 1 } 
          : item
      ));
    }, 10000);

    // Interaction Pulse - boost when user is actually moving/clicking
    const handleActivity = () => {
      setChartData(prev => prev.map((item, i) => 
        i === todayIndex 
          ? { ...item, problems: item.problems + 0.1 } 
          : item
      ));
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('click', handleActivity);

    return () => {
      clearInterval(pulseInterval);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('click', handleActivity);
    };
  }, []);

  // Extract username or default to Guest
  const username = user?.username || 'Guest';
  
  // Basic boy/girl detection for the demo
  const isGirl = ['sarah', 'anna', 'luna', 'amy', 'nina'].includes(username.toLowerCase()) || 
                 username.toLowerCase().endsWith('a') || 
                 username.toLowerCase().endsWith('i');
  
  // Dynamic Avatar URL based on identity (using custom 3D assets)
  const avatarUrl = isGirl ? '/avatars/girl.png' : '/avatars/boy.png';

  return (
    <Container className="py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full border-4 border-primary/20 p-1">
             <img src={avatarUrl} className="rounded-full bg-slate-800 shadow-xl" alt="Avatar" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-black tracking-tight text-white capitalize">
              Welcome back, {username}
            </h1>
            <p className="text-slate-500 font-bold flex items-center gap-2 mt-1">
              <span className="text-primary tracking-widest text-xs uppercase">Elite Rank</span> • {streak} day streak 🔥
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="text-right">
              <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">Current Points</div>
              <div className="text-3xl font-display font-black text-white">2,840</div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {[
          { icon: Target, label: 'Solved', value: 124, color: 'text-primary' },
          { icon: Activity, label: 'Accuracy', value: 89, suffix: '%', color: 'text-success' },
          { icon: Zap, label: 'Fastest', value: 1.2, suffix: 's', color: 'text-yellow-500' },
          { icon: Trophy, label: 'Ranking', value: 342, prefix: '#', color: 'text-primary' },
        ].map((stat, i) => (
          <Card key={i} className="p-8 border-white/5 bg-slate-900/50 group">
            <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-all ${stat.color}`}>
               <stat.icon size={24} />
            </div>
            <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">{stat.label}</div>
            <div className="text-4xl font-display font-black text-white">
              {stat.prefix}<CountUp end={stat.value} suffix={stat.suffix || ''} />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-10 border-white/5 bg-slate-900/50">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black tracking-tight text-white flex items-center gap-3">
               <Activity className="text-primary" /> Activity Pulse
            </h3>
            <select className="bg-slate-800 border-none rounded-lg text-xs font-bold px-4 py-2 text-slate-400 outline-none">
               <option>Last 7 Days</option>
               <option>Monthly</option>
            </select>
          </div>
          <div className="h-[350px] w-full" style={{ minHeight: '350px' }}>
            {!isMounted ? (
              <div className="h-full w-full bg-slate-800/20 animate-pulse rounded-xl" />
            ) : (
              <ResponsiveContainer width="100%" height={350} minWidth={0} debounce={50}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorProb" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 700}} />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#64748b', fontSize: 12, fontWeight: 700}} 
                    domain={[0, 'auto']}
                    allowDecimals={false}
                    width={40}
                  />
                  <Tooltip 
                    contentStyle={{backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', fontSize: '12px', fontWeight: '800'}}
                    itemStyle={{color: '#8b5cf6'}}
                  />
                  <Area type="monotone" dataKey="problems" stroke="#8b5cf6" strokeWidth={4} fillOpacity={1} fill="url(#colorProb)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>

        <div className="space-y-8">
           <Card className="p-8 border-white/5 bg-slate-900 shadow-2xl">
              <h4 className="font-black text-lg mb-6 flex items-center justify-between text-white">
                 Recent Achievements
                 <ChevronRight size={20} className="text-slate-600" />
              </h4>
              <div className="space-y-6">
                 {[1,2,3].map(i => (
                    <div key={i} className="flex gap-4">
                       <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Trophy size={20} className="text-primary" />
                       </div>
                       <div>
                          <p className="text-sm font-black text-white">Algorithm Prodigy</p>
                          <p className="text-[10px] items-center flex gap-1 font-bold text-slate-500 uppercase tracking-widest mt-1">
                             <Clock size={10} /> 2 hours ago
                          </p>
                       </div>
                    </div>
                 ))}
              </div>
           </Card>
        </div>
      </div>
    </Container>
  );
};
