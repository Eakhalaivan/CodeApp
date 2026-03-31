import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, Cpu, ArrowLeft, ChevronRight, Globe, Share2 } from 'lucide-react';
import { Card } from '../../ui/Card';
import { cn } from '../../../utils/cn';

interface SubmissionResultProps {
  problem: any;
  result: {
    status: string;
    runtime: string;
    runtimeBeats: number;
    memory: string;
    memoryBeats: number;
    code: string;
    language: string;
    timestamp: string;
  };
  onBack: () => void;
}

export const SubmissionResult: React.FC<SubmissionResultProps> = ({ problem, result, onBack }) => {
  // Mock distribution data for the charts
  const runtimeDistribution = [5, 12, 35, 48, 20, 8, 3]; // counts at different ms buckets
  const memoryDistribution = [8, 22, 45, 30, 15, 5, 2];

  const renderDistributionChart = (data: number[], activeIndex: number, color: string) => {
    const max = Math.max(...data);
    return (
      <div className="flex items-end gap-1 h-32 w-full mt-6 px-2">
        {data.map((val, idx) => (
          <div 
            key={idx} 
            className="flex-1 group relative cursor-pointer"
            style={{ height: `${(val / max) * 100}%` }}
          >
            <div className={cn(
               "absolute inset-0 rounded-t-sm transition-all duration-500",
               idx === activeIndex ? color : "bg-white/10 group-hover:bg-white/20"
            )} />
            {idx === activeIndex && (
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border-2 border-slate-950 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            )}
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 border border-white/5">
               {val}% of users
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="flex-1 overflow-y-auto bg-slate-950 text-white scrollbar-thin scrollbar-thumb-slate-800"
    >
      {/* Top Header */}
      <div className="border-b border-white/5 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-20">
         <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
            <button 
              onClick={onBack}
              className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-black uppercase tracking-widest"
            >
               <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
               Back to Problem
            </button>
            <div className="flex items-center gap-4">
               <button className="p-2 text-slate-400 hover:text-white transition-colors">
                  <Globe size={18} />
               </button>
               <button className="p-2 text-slate-400 hover:text-white transition-colors">
                  <Share2 size={18} />
               </button>
            </div>
         </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-12 grid grid-cols-12 gap-12">
         {/* Left Column: Stats */}
         <div className="col-span-12 lg:col-span-7 space-y-12">
            <div className="space-y-2">
               <div className="flex items-center gap-3 text-emerald-500">
                  <CheckCircle2 size={32} />
                  <h1 className="text-4xl font-black italic tracking-tighter uppercase">Accepted</h1>
               </div>
               <p className="text-slate-500 font-mono text-xs">
                  Submitted at {result.timestamp} • {problem?.title}
               </p>
            </div>

            {/* Metric Cards Row */}
            <div className="grid grid-cols-2 gap-6">
               <Card className="bg-slate-900/50 border-white/5 p-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity group-hover:scale-110 transition-transform">
                     <Zap size={80} className="text-yellow-500" />
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest mb-4">
                     <Zap size={14} className="text-yellow-500" /> Runtime
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                     <span className="text-4xl font-black italic">{result.runtime}</span>
                     <span className="text-slate-500 font-bold uppercase text-xs">ms</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/10 rounded-full w-fit">
                     <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest">
                        Beats {result.runtimeBeats}%
                     </span>
                  </div>
                  {renderDistributionChart(runtimeDistribution, 3, "bg-yellow-500")}
                  <div className="flex justify-between mt-4 text-[9px] font-black uppercase tracking-widest text-slate-600">
                     <span>Fasts</span>
                     <span>Distribution</span>
                     <span>Slow</span>
                  </div>
               </Card>

               <Card className="bg-slate-900/50 border-white/5 p-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity group-hover:scale-110 transition-transform">
                     <Cpu size={80} className="text-blue-500" />
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest mb-4">
                     <Cpu size={14} className="text-blue-500" /> Memory
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                     <span className="text-4xl font-black italic">{result.memory}</span>
                     <span className="text-slate-500 font-bold uppercase text-xs">MB</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full w-fit">
                     <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">
                        Beats {result.memoryBeats}%
                     </span>
                  </div>
                  {renderDistributionChart(memoryDistribution, 2, "bg-blue-500")}
                  <div className="flex justify-between mt-4 text-[9px] font-black uppercase tracking-widest text-slate-600">
                     <span>Less</span>
                     <span>Distribution</span>
                     <span>More</span>
                  </div>
               </Card>
            </div>

            {/* Suggestion Section */}
            <div className="pt-8 border-t border-white/5">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-primary" /> More Challenges
                </h4>
                <div className="grid grid-cols-1 gap-4">
                   {[
                     { id: 1, title: 'Smallest Missing Integer', difficulty: 'Easy' },
                     { id: 2, title: 'Find Length of Longest Common Prefix', difficulty: 'Medium' }
                   ].map(challenge => (
                     <button key={challenge.id} className="group flex items-center justify-between p-6 bg-slate-900/30 border border-white/5 rounded-2xl hover:bg-slate-800/50 transition-all hover:-translate-y-1">
                        <div className="flex items-center gap-4">
                           <div className={cn(
                             "w-1 h-8 rounded-full",
                             challenge.difficulty === 'Easy' ? 'bg-emerald-500' : 'bg-yellow-500'
                           )} />
                           <div className="text-left">
                              <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{challenge.title}</p>
                              <p className="text-[10px] uppercase font-black tracking-widest text-slate-500 mt-1">{challenge.difficulty}</p>
                           </div>
                        </div>
                        <ChevronRight size={18} className="text-slate-600 group-hover:text-white transition-colors" />
                     </button>
                   ))}
                </div>
            </div>
         </div>

         {/* Right Column: Code Viewer */}
         <div className="col-span-12 lg:col-span-5">
            <div className="bg-slate-900 border border-white/5 rounded-3xl overflow-hidden flex flex-col h-[700px] shadow-2xl">
               <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-slate-950/50">
                  <div className="flex items-center gap-2">
                     <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-full bg-red-500/20" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20" />
                     </div>
                     <span className="ml-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Submission Code • {result.language}</span>
                  </div>
               </div>
               <div className="flex-1 overflow-hidden">
                  {/* Since Monaco is heavy to import here, we'll use a pre tag with syntax styling */}
                  <pre className="p-8 h-full overflow-auto font-mono text-sm leading-loose text-slate-300 scrollbar-thin scrollbar-thumb-slate-800">
                     <code>{result.code}</code>
                  </pre>
               </div>
            </div>
         </div>
      </div>
    </motion.div>
  );
};
