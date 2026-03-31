import { Play, CloudUpload, Split, Code2 } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';

interface EditorHeaderProps {
  problem: any;
  language: string;
  onLanguageChange: (lang: string) => void;
  onRun: () => void;
  onSubmit: () => void;
  isRunning?: boolean;
}

export const EditorHeader = ({ 
  problem, 
  language, 
  onLanguageChange, 
  onRun, 
  onSubmit,
  isRunning 
}: EditorHeaderProps) => {
  const languages = [
    { id: 'java', label: 'Java 17' },
    { id: 'python', label: 'Python 3' },
    { id: 'cpp', label: 'C++ 20' },
    { id: 'javascript', label: 'JavaScript' },
    { id: 'typescript', label: 'TypeScript' },
    { id: 'c', label: 'C (C11)' },
    { id: 'csharp', label: 'C# 11' },
    { id: 'go', label: 'Go 1.21' },
    { id: 'rust', label: 'Rust 1.73' },
    { id: 'kotlin', label: 'Kotlin' },
    { id: 'swift', label: 'Swift' },
    { id: 'php', label: 'PHP' },
    { id: 'ruby', label: 'Ruby' },
    { id: 'scala', label: 'Scala' },
  ];

  return (
    <div className="h-14 border-b border-white/5 bg-slate-900/50 flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-6">
         <div className="flex items-center gap-3">
            <Badge variant={problem.difficulty.toLowerCase() as any} className="font-black px-4">{problem.difficulty}</Badge>
            <h2 className="font-bold text-lg truncate max-w-[300px]">{problem.id}. {problem.title}</h2>
         </div>
         
         <div className="h-6 w-px bg-white/10" />

         {/* Language Selector */}
         <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-3 py-1.5 border border-white/5 hover:border-primary/30 transition-all">
            <Code2 size={14} className="text-primary" />
            <select 
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="bg-transparent border-none text-xs font-black uppercase tracking-widest text-slate-300 outline-none cursor-pointer pr-4"
            >
              {languages.map(lang => (
                <option key={lang.id} value={lang.id} className="bg-slate-900 text-slate-300">
                  {lang.label}
                </option>
              ))}
            </select>
         </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="font-bold border border-white/5 bg-white/5">
          <Split size={16} /> Beta Split
        </Button>
        <div className="h-6 w-px bg-white/10 mx-2" />
        <Button 
          variant="outline" 
          size="sm" 
          className="font-bold border-white/10"
          onClick={onRun}
          disabled={isRunning}
        >
          <Play size={16} className={isRunning ? "text-slate-500" : "text-success"} fill="currentColor" /> 
          {isRunning ? 'Running...' : 'Run'}
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="font-bold px-6 bg-white/5 border-white/5 text-success hover:bg-white/10 hover:text-success/80 transition-all group"
          onClick={onSubmit}
          disabled={isRunning}
        >
          <CloudUpload size={18} className="text-success group-hover:scale-110 transition-transform" /> 
          Submit
        </Button>
      </div>
    </div>
  );
};
