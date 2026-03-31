import { motion } from 'framer-motion';
import { Terminal, ChevronUp, CheckSquare, Plus, Maximize2, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../../../utils/cn';

interface TestCase {
  input?: string;
  inputData?: string;
  expectedOutput: string;
}

interface OutputPanelProps {
  isOpen: boolean;
  toggle: () => void;
  results: any;
  testCases: TestCase[];
}

export const OutputPanel = ({ isOpen, toggle, results, testCases = [] }: OutputPanelProps) => {
  const [activeTab, setActiveTab] = useState<'testcase' | 'result'>('testcase');
  const [selectedCase, setSelectedCase] = useState(0);

  const hasResult = results && results.length > 0 && !['Idle', 'Running', 'Submitting'].includes(results[0]?.status);
  const isRunning = results && results.length > 0 && (results[0]?.status === 'Running' || results[0]?.status === 'Submitting');

  // Auto-switch to result tab when done
  useEffect(() => {
    if (hasResult) {
      setActiveTab('result');
    }
    if (isRunning) {
      setActiveTab('testcase');
    }
  }, [results, hasResult, isRunning]);

  // Ensure selectedCase is valid if testCases change
  useEffect(() => {
    if (selectedCase >= testCases.length && testCases.length > 0) {
      setSelectedCase(0);
    }
  }, [testCases]);

  return (
    <div className={cn(
      "absolute bottom-0 left-0 w-full bg-slate-900 border-t border-white/5 transition-all duration-300 z-20 flex flex-col",
      isOpen ? "h-[450px]" : "h-11",
      hasResult && results[0]?.status === 'Accepted' && "border-success/50 shadow-[0_-4px_20px_rgba(34,197,94,0.1)]"
    )}>
      {/* Header Tabs */}
      <div className={cn(
        "h-11 flex items-center justify-between px-4 shrink-0 transition-colors duration-500",
        hasResult && results[0]?.status === 'Accepted' ? "bg-success/5" : "bg-slate-900/50"
      )}>
        <div className="flex items-center gap-1">
          <button 
            type="button"
            onClick={() => setActiveTab('testcase')}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
              activeTab === 'testcase' ? "text-white bg-white/5" : "text-slate-500 hover:text-slate-300"
            )}
          >
            <CheckSquare size={14} className={activeTab === 'testcase' ? "text-success" : ""} /> Testcase
          </button>
          <div className="w-px h-4 bg-white/5 mx-1" />
          <button 
            type="button"
            onClick={() => { if (hasResult) setActiveTab('result'); }}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
              activeTab === 'result' ? "text-white bg-white/5" : "text-slate-500 hover:text-slate-300",
              !hasResult && "opacity-50 cursor-not-allowed"
            )}
          >
            <Terminal size={14} className={activeTab === 'result' ? "text-primary" : ""} /> Test Result
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-slate-500 hover:text-slate-300 transition-colors">
            <Maximize2 size={14} />
          </button>
          <button 
            onClick={toggle}
            className="text-slate-500 hover:text-slate-300 transition-colors"
          >
            <motion.div animate={{ rotate: isOpen ? 0 : 180 }}>
              <ChevronUp size={18} />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Content Area */}
      {isOpen && (
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-800">
          {isRunning ? (
             <div className="h-full flex flex-col items-center justify-center gap-4">
                <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                <p className="text-xs font-black uppercase tracking-widest text-slate-500 animate-pulse">
                  {results[0]?.status === 'Submitting' ? 'Submitting Code...' : 'Running Code...'}
                </p>
             </div>
          ) : activeTab === 'testcase' || !hasResult ? (
            <div className="space-y-6">
              {/* Case Selection */}
              <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none">
                {testCases.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedCase(i)}
                    className={cn(
                      "px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap",
                      selectedCase === i ? "bg-white/10 text-white" : "text-slate-500 hover:bg-white/5"
                    )}
                  >
                    Case {i + 1}
                  </button>
                ))}
                {testCases.length === 0 && <p className="text-xs text-slate-500 italic">No public test cases available</p>}
                <button className="text-slate-500 hover:text-slate-300 transition-colors ml-2 shrink-0">
                  <Plus size={16} />
                </button>
              </div>

              {/* Input Fields */}
              {testCases[selectedCase] && (
                <div className="space-y-6">
                   <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Input</p>
                      <pre className="p-4 bg-slate-800/50 rounded-xl border border-white/5 font-mono text-sm text-slate-200 overflow-x-auto">
                        {testCases[selectedCase].input}
                      </pre>
                   </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
              {/* Result Status */}
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-4">
                  <h3 className={cn(
                    "text-2xl font-black tracking-tight transition-colors",
                    results[0]?.status === 'Accepted' ? "text-success" : "text-red-500"
                  )}>
                    {results[0]?.status || 'Unknown'}
                  </h3>
                  <span className="text-xs font-bold text-slate-500">Runtime: {results[1]?.msg || '0 ms'}</span>
                </div>
                {results[0]?.status !== 'Accepted' && results[0]?.status !== 'Submitting' && (
                  <p className="text-red-400 font-mono text-[10px] animate-pulse">
                    {results[0]?.caseResults?.length > 0 ? 'Some test cases failed.' : results[0]?.msg}
                  </p>
                )}
              </div>

              {/* Case Selection with Cross/Check Indicators */}
              <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none">
                {testCases.map((_, i) => {
                  const caseResult = results[0]?.caseResults?.[i];
                  const hasPassed = caseResult?.passed;
                  const isWrongAnswer = results[0]?.status === 'Wrong Answer';
                  
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedCase(i)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap",
                        selectedCase === i ? "bg-white/10 text-white shadow-lg" : "text-slate-500 hover:bg-white/5"
                      )}
                    >
                      <div className={cn(
                        "w-4 h-4 rounded-sm flex items-center justify-center transition-colors",
                        hasPassed ? "bg-success/20" : (isWrongAnswer ? "bg-red-500/20" : "bg-slate-800")
                      )}>
                        {hasPassed ? (
                          <Check size={10} className="text-success" strokeWidth={4} />
                        ) : (
                          isWrongAnswer ? <div className="w-1.5 h-1.5 bg-red-500 rounded-full" /> : <div className="w-1 h-1 bg-slate-600 rounded-full" />
                        )}
                      </div>
                      <span className={cn(
                        "transition-colors",
                        selectedCase === i ? "text-white" : (hasPassed ? "text-success/70" : (isWrongAnswer ? "text-red-500/70" : "text-slate-500"))
                      )}>
                        Case {i + 1}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Multi-case details */}
              {testCases[selectedCase] && (
                <div className="space-y-6">
                   <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Input</p>
                      <pre className="p-4 bg-slate-800/50 rounded-xl font-mono text-sm text-slate-200 overflow-x-auto">
                        {testCases[selectedCase].input || testCases[selectedCase].inputData}
                      </pre>
                   </div>
 
                   <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Output</p>
                      <pre className={cn(
                        "p-4 bg-slate-800/50 rounded-xl font-mono text-sm overflow-x-auto",
                        results[0]?.caseResults?.[selectedCase]?.passed ? "text-slate-200" : "text-red-400"
                      )}>
                        {results[0]?.caseResults?.[selectedCase]?.actualOutput || "No output generated"}
                      </pre>
                   </div>
 
                   <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Expected</p>
                      <pre className="p-4 bg-success/5 rounded-xl font-mono text-sm text-success border border-success/10 overflow-x-auto">
                        {testCases[selectedCase].expectedOutput}
                      </pre>
                   </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
