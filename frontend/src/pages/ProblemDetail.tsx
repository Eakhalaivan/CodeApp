import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import api from '../utils/api';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { EditorHeader } from '../components/features/workspace/EditorHeader';
import { OutputPanel } from '../components/features/workspace/OutputPanel';
import { SubmissionResult } from '../components/features/workspace/SubmissionResult';
import { Info, Terminal, History, ArrowRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { cn } from '../utils/cn';

export const ProblemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState<any>(null);
  const [testCases, setTestCases] = useState<any[]>([]);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('java');
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any[]>([{ status: 'Idle', msg: 'Run your code to see results' }]);
  const [activeTab, setActiveTab] = useState<'desc' | 'solutions' | 'submissions'>('desc');
  const [error, setError] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [submissionData, setSubmissionData] = useState<any>(null);
  const [showSolutionForm, setShowSolutionForm] = useState(false);
  const [newSolution, setNewSolution] = useState({ description: '', tags: '' });
  const [solutions, setSolutions] = useState([
    { user: 'AlgorithmMaster', upvotes: 1240, tags: ['Clean Code', 'Optimum'], time: '2 hours ago', text: '"I implemented a highly optimized O(n) approach using a single-pass hash map. This bypasses the nested loop bottleneck and handles all edge cases including negative integers and large arrays efficiently..."' },
    { user: 'CodeWizard', upvotes: 856, tags: ['One-Liner', 'Pythonic'], time: '5 hours ago', text: '"Used built-in language filters to achieve a single-line result! Time complexity is technically O(N log N) due to the sorting overhead under the hood, but very readable."' },
    { user: 'FelixTheCoder', upvotes: 423, tags: ['Recursive', 'Easy Read'], time: '1 day ago', text: '"Here is a clean recursive approach. It uses O(N) auxiliary stack space but the logic is extremely straightforward to follow and explain in an interview."' }
  ]);

  const boilerplates: Record<string, string> = {
    java: 'public class Solution {\n    public void solve() {\n        // Your Java code here\n    }\n}',
    javascript: 'function solve() {\n    // Your JavaScript code here\n}',
    typescript: 'function solve(): void {\n    // Your TypeScript code here\n}'
  };

  useEffect(() => {
    api.get(`/problems/${id}`)
      .then(res => {
        const prob = res.data;
        setProblem(prob);
        
        // Initialize language from problem if it matches our supported list
        const probLang = prob.language?.toLowerCase() || 'java';
        const initialLang = (probLang.includes('angular') || probLang.includes('typescript')) ? 'typescript' : 
                          (probLang.includes('javascript') || probLang.includes('node')) ? 'javascript' : 
                          (probLang.includes('react') || probLang.includes('vue') || probLang.includes('svelte')) ? 'javascript' :
                          (probLang.includes('python')) ? 'python' : 'java';
        
        setLanguage(initialLang);
        
        const savedCode = localStorage.getItem(`code-${id}-${initialLang}`);
        
        // Fix for stale TwoSum code: if saved code is the generic boilerplate but we have a real default, use the default
        const isStaleTwoSum = savedCode?.includes('twoSum(int[] nums, int target)');
        
        if (savedCode && !isStaleTwoSum) {
          setCode(savedCode);
        } else if (res.data.defaultCode) {
          setCode(res.data.defaultCode);
        } else {
          setCode(boilerplates[language] || '// Start coding here...');
        }
        setError(null);
      })
      .catch(() => {
        navigate('/problems', { replace: true });
      });

    // Fetch dynamic test cases
    api.get(`/problems/${id}/test-cases`)
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : [];
        setTestCases(data.filter((tc: any) => !tc.hidden));
      })
      .catch(() => {});
  }, [id]);

  // Load code when language changes
  useEffect(() => {
    if (problem) {
      const savedCode = localStorage.getItem(`code-${id}-${language}`);
      if (savedCode) {
        setCode(savedCode);
      } else {
        setCode(boilerplates[language] || '// Start coding here...');
      }
    }
  }, [language, problem]);

  // Auto-save with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (code && id && language) {
        localStorage.setItem(`code-${id}-${language}`, code);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [code, id, language]);

  const handleLanguageChange = (newLang: string) => {
    // Save current code before switching
    localStorage.setItem(`code-${id}-${language}`, code);
    setLanguage(newLang);
    setResults([{ status: 'Idle', msg: `Environment switched to ${newLang.toUpperCase()}` }]);
  };

  const validateCode = (input: string) => {
    if (!input || input.trim().length < 20) return { status: 'Error', msg: 'Code is too short to be a valid solution.' };
    
    const trimmedInput = input.replace(/\s+/g, '');
    const isBoilerplate = problem?.defaultCode && trimmedInput === problem.defaultCode.replace(/\s+/g, '');
    const isGenericBoilerplate = Object.values(boilerplates).some(b => trimmedInput === b.replace(/\s+/g, ''));

    if (isBoilerplate || isGenericBoilerplate) {
      return { status: 'Error', msg: 'Please implement your own logic instead of using the starter template.' };
    }

    // Language-specific heuristic checks
    const targetLang = language.toLowerCase();
    const isFrontendEnv = targetLang === 'typescript' || targetLang === 'javascript';
    
    if (isFrontendEnv && input.includes('public class')) {
      return { status: 'Compile Error', msg: 'Detected Java code in a Frontend/Web environment. Please use the correct language template.' };
    }

    if (targetLang === 'typescript' && problem?.language?.toLowerCase().includes('angular') && !input.includes('@Component')) {
      return { status: 'Compile Error', msg: 'Missing @Component decorator or Angular imports.' };
    }
    
    if (targetLang === 'java' && !input.includes('public class')) {
      return { status: 'Compile Error', msg: 'Java class definition ("public class Solution") not found.' };
    }

    return null;
  };

  const handleRun = async () => {
    const error = validateCode(code);
    if (error) {
      setResults([error]);
      setIsConsoleOpen(true);
      return;
    }
    
    localStorage.setItem(`code-${id}-${language}`, code);
    setIsRunning(true);
    setIsConsoleOpen(true);
    setResults([{ status: 'Running', msg: 'Executing code through secure sandbox...' }]);
    
    try {
      const resp = await api.post('/execution', {
        code,
        language,
        inputs: testCases.map(tc => tc.inputData)
      });
      
      const { status, results: caseResults, runtimeMs, memoryKb } = resp.data;
      
      const mainStatus = status === 'ACCEPTED' ? 'Accepted' : (status === 'COMPILE_ERROR' ? 'Compile Error' : 'Wrong Answer');
      
      setResults([
        { 
          status: mainStatus, 
          msg: status === 'ACCEPTED' ? 'All test cases passed!' : `Execution failed: ${status}`,
          caseResults: caseResults // New array of results for each test case
        },
        { label: 'Runtime', msg: `${runtimeMs}ms` },
        { label: 'Memory', msg: `${(memoryKb / 1024).toFixed(1)}MB` }
      ]);
    } catch (err) {
      setResults([{ status: 'Error', msg: 'Backend execution service unavailable. Please try again later.' }]);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    const error = validateCode(code);
    if (error) {
      setResults([error]);
      setIsConsoleOpen(true);
      return;
    }

    localStorage.setItem(`code-${id}-${language}`, code);
    setIsRunning(true);
    setIsConsoleOpen(true);
    setResults([{ status: 'Submitting', msg: 'Validating against full hidden suite...' }]);
    
    try {
      const resp = await api.post('/execution', {
        code,
        language,
        isSubmission: true,
        inputs: testCases.map(tc => tc.inputData) // This should ideally include hidden ones too, but backend mock handles both.
      });
      
      const { status, results: caseResults, runtimeMs, memoryKb } = resp.data;
      
      if (status === 'ACCEPTED') {
        const data = {
          status: 'Accepted',
          runtime: runtimeMs.toString(),
          runtimeBeats: 88,
          memory: (memoryKb / 1024).toFixed(1),
          memoryBeats: 92,
          code: code,
          language: language,
          timestamp: new Date().toLocaleString()
        };
        setSubmissionData(data);
        setShowResult(true);
        
        // Trigger confetti wow factor
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f97316', '#fbbf24', '#22d3ee', '#ffffff']
        });
      } else {
        setResults([
          { 
            status: status === 'COMPILE_ERROR' ? 'Compile Error' : 'Wrong Answer', 
            msg: 'Submission failed one or more test cases.',
            caseResults: caseResults
          },
          { label: 'Runtime', msg: `${runtimeMs}ms` },
          { label: 'Memory', msg: `${(memoryKb / 1024).toFixed(1)}MB` }
        ]);
        setIsConsoleOpen(true);
      }
    } catch (err) {
      setResults([{ status: 'Error', msg: 'Submission pipeline failed. Please check your connection.' }]);
    } finally {
      setIsRunning(false);
    }
  };

  if (showResult && submissionData) {
    return (
      <SubmissionResult 
        problem={problem} 
        result={submissionData} 
        onBack={() => {
          setShowResult(false);
          setActiveTab('desc');
        }} 
      />
    );
  }

  if (error) return (
    <div className="h-screen flex items-center justify-center bg-slate-950 px-6">
       <div className="max-w-md w-full text-center space-y-8">
          <div className="relative inline-block">
             <div className="absolute inset-0 bg-red-500/20 blur-3xl animate-pulse rounded-full" />
             <div className="relative text-7xl font-black text-red-500 tracking-tighter mb-4 italic">404</div>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white mb-4 uppercase italic">Data Desync Detected</h2>
          <p className="text-slate-400 text-sm font-mono leading-relaxed">The challenge you're looking for (ID: {id}) has been removed or relocated during the 300-problem library optimization. 🛡️</p>
          <div className="pt-8">
             <button 
               onClick={() => window.location.href = '/problems'}
               className="group relative px-8 py-3 bg-white text-black font-black uppercase text-xs tracking-widest hover:scale-110 active:scale-95 transition-all"
             >
                <div className="absolute inset-0 bg-primary/20 -translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all -z-10" />
                Return to Arena
             </button>
          </div>
       </div>
    </div>
  );

  if (!problem) return (
    <div className="h-screen flex items-center justify-center bg-slate-950">
       <div className="flex flex-col items-center gap-4">
         <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
         <p className="text-primary font-bold tracking-widest text-xs uppercase animate-pulse transition-all duration-1000">Initializing Environment...</p>
       </div>
    </div>
  );

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden flex flex-col bg-slate-950">
      <EditorHeader 
        problem={problem} 
        language={language} 
        onLanguageChange={handleLanguageChange} 
        onRun={handleRun}
        onSubmit={handleSubmit}
        isRunning={isRunning}
      />

      <div className="flex-1 flex min-h-0 relative">
        {/* Left: Info */}
        <div className="w-1/2 flex flex-col border-r border-white/5 bg-slate-900/30">
           <div className="flex items-center gap-8 px-10 border-b border-white/5">
              {[
                { id: 'desc', label: 'Problem', icon: Info },
                { id: 'solutions', label: 'Solutions', icon: Terminal },
                { id: 'submissions', label: 'Submissions', icon: History }
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "py-5 text-px font-black uppercase tracking-[0.2em] flex items-center gap-2 border-b-2 transition-all",
                    activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-300'
                  )}
                >
                  <tab.icon size={14} /> {tab.label}
                </button>
              ))}
           </div>
           
           <div className="flex-1 overflow-y-auto p-12 scrollbar-thin scrollbar-thumb-slate-800">
              {activeTab === 'desc' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <h3 className="text-3xl font-black mb-8 tracking-tight">Introduction</h3>
                  <div className="text-slate-300 leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: problem.description }}></div>
                  
                  {problem.constraints && (
                    <div className="mt-8">
                       <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4 tracking-widest">Constraints</h4>
                       <ul className="list-disc list-inside text-slate-400 font-mono text-xs space-y-2 bg-slate-800/20 p-4 rounded-xl">
                          {problem.constraints.split('\n').map((c: string, i: number) => (
                             <li key={i}>{c}</li>
                          ))}
                       </ul>
                    </div>
                  )}

                  <div className="mt-16 space-y-12">
                     <div className="space-y-6">
                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full bg-primary" /> Dynamic Example Cases
                        </h4>
                        {(Array.isArray(testCases) ? testCases : []).slice(0, 1).map((tc, idx) => (
                           <Card key={idx} className="bg-slate-950 border-white/5 p-8 font-mono text-sm shadow-inner group">
                              <div className="flex flex-col gap-4">
                                 <div>
                                    <p className="text-slate-500 mb-1 uppercase text-[10px] font-bold">Input</p>
                                    <p className="text-slate-200">{tc.inputData}</p>
                                 </div>
                                 <div className="h-px bg-white/5" />
                                 <div>
                                    <p className="text-slate-500 mb-1 uppercase text-[10px] font-bold">Output</p>
                                    <p className="text-success font-bold">{tc.expectedOutput}</p>
                                 </div>
                              </div>
                           </Card>
                        ))}
                     </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'solutions' && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-3xl font-black tracking-tight">Top Solutions</h3>
                    <div className="flex gap-2">
                       {['Java', 'Python', 'C++', 'JavaScript'].map(l => (
                         <span key={l} className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-slate-500 hover:text-primary cursor-pointer transition-colors border border-white/5">{l}</span>
                       ))}
                       <button 
                         onClick={() => setShowSolutionForm(!showSolutionForm)}
                         className="px-4 py-1 ml-2 bg-slate-800 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:border-primary border border-white/10 transition-all"
                       >
                         {showSolutionForm ? 'Cancel' : 'Post Solution'}
                       </button>
                    </div>
                  </div>

                  {showSolutionForm && (
                     <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-8">
                       <Card className="bg-slate-900/40 border-primary/30 p-6 shadow-[0_0_20px_rgba(249,115,22,0.05)]">
                         <h4 className="text-primary font-black uppercase tracking-widest text-xs mb-4">Share Your Approach</h4>
                         <textarea 
                           className="w-full bg-slate-950/50 border border-white/10 rounded-xl p-4 text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-primary/50 min-h-[120px] mb-4 resize-none transition-all"
                           placeholder="Explain your approach, time complexity, and thoughts..."
                           value={newSolution.description}
                           onChange={(e) => setNewSolution({...newSolution, description: e.target.value})}
                         />
                         <input 
                           type="text"
                           className="w-full bg-slate-950/50 border border-white/10 rounded-xl p-3 text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-primary/50 mb-4 transition-all"
                           placeholder="Tags (comma separated, e.g. Fast, Memory Optimized)"
                           value={newSolution.tags}
                           onChange={(e) => setNewSolution({...newSolution, tags: e.target.value})}
                         />
                         <div className="flex justify-end">
                           <button 
                             onClick={() => {
                               if (newSolution.description.trim()) {
                                 setSolutions([{
                                   user: 'You',
                                   upvotes: 0,
                                   tags: newSolution.tags.split(',').map(t => t.trim()).filter(t => t),
                                   time: 'Just now',
                                   text: `"${newSolution.description}"`
                                 }, ...solutions]);
                                 setNewSolution({ description: '', tags: '' });
                                 setShowSolutionForm(false);
                               }
                             }}
                             className="px-6 py-2 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                           >
                             Publish Solution
                           </button>
                         </div>
                       </Card>
                     </motion.div>
                  )}

                  {solutions.map((sol, idx) => (
                    <Card key={idx} className="bg-slate-900/40 border-white/5 p-8 group hover:bg-slate-800/60 hover:border-primary/20 transition-all cursor-pointer relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                        <Terminal size={40} className="text-primary" />
                      </div>
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary/20 to-accent/20 border border-white/5 flex items-center justify-center text-lg font-black uppercase tracking-tighter text-white">
                             {sol.user[0]}
                           </div>
                           <div>
                              <p className="text-lg font-bold text-white group-hover:text-primary transition-colors">{sol.user}</p>
                              <div className="flex gap-2 mt-1">
                                 {sol.tags.map(t => <span key={t} className="text-[9px] font-black uppercase tracking-widest text-slate-500">{t}</span>)}
                              </div>
                           </div>
                        </div>
                        <div className="flex flex-col items-end">
                           <span className="text-2xl font-black italic text-slate-200 group-hover:text-primary transition-all">{sol.upvotes}</span>
                           <span className="text-[9px] font-black uppercase tracking-widest text-primary">Upvotes</span>
                        </div>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed mb-6 pr-12">{sol.text}</p>
                      <div className="flex items-center justify-between">
                        <button className="text-xs font-black uppercase tracking-widest text-primary group-hover:translate-x-3 transition-transform flex items-center gap-2">
                           View Discussion <ArrowRight size={14} />
                        </button>
                        <span className="text-[10px] font-bold text-slate-600 italic">{sol.time}</span>
                      </div>
                    </Card>
                  ))}
                </motion.div>
              )}

              {activeTab === 'submissions' && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h3 className="text-3xl font-black mb-8 tracking-tight">Personal History</h3>
                  <div className="space-y-4">
                    {[
                      { status: 'Accepted', lang: 'Java', time: '2 mins ago', runtime: '4ms' },
                      { status: 'Wrong Answer', lang: 'Java', time: '10 mins ago', runtime: 'N/A' },
                      { status: 'Time Limit Exceeded', lang: 'Python', time: '1 hour ago', runtime: 'N/A' }
                    ].map((sub, idx) => (
                      <div key={idx} className="flex items-center justify-between p-6 bg-slate-900/30 border border-white/5 rounded-2xl group hover:bg-slate-800/20 transition-all">
                        <div className="flex items-center gap-6">
                           <div className={cn(
                             "w-2 h-2 rounded-full",
                             sub.status === 'Accepted' ? 'bg-success shadow-[0_0_12px_rgba(34,197,94,0.4)]' : 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.4)]'
                           )} />
                           <div>
                              <p className={cn("text-lg font-black italic", sub.status === 'Accepted' ? 'text-success' : 'text-red-500')}>{sub.status}</p>
                              <p className="text-[10px] uppercase font-black tracking-widest text-slate-500">{sub.time} • {sub.lang}</p>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className="text-sm font-bold text-slate-300">{sub.runtime}</p>
                           <p className="text-[10px] font-black tracking-widest text-slate-600 uppercase">Runtime</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
           </div>
        </div>

        {/* Right: Editor */}
         <div className="flex-1 flex flex-col bg-[#1e1e1e]">
            <div className={cn(
              "h-10 border-b flex items-center px-6 shrink-0 transition-all duration-500",
              results[0]?.status === 'Accepted' ? "bg-success/10 border-success/30" : "bg-slate-900 border-white/5"
            )}>
              <span className={cn(
                "text-[10px] font-black uppercase tracking-widest transition-colors",
                results[0]?.status === 'Accepted' ? "text-success" : "text-slate-500"
              )}>
                {results[0]?.status === 'Accepted' ? 'Success Verification' : 'Editor Environment'}
              </span>
            </div>
           <div className="flex-1 min-h-0 relative">
              <Editor
                height="100%"
                language={language}
                theme="vs-dark"
                value={code}
                onChange={(v) => setCode(v || '')}
                options={{
                  fontSize: 14,
                  padding: { top: 20 },
                  minimap: { enabled: false },
                  scrollbar: { vertical: 'hidden' },
                  fontFamily: "'JetBrains Mono', monospace",
                  lineNumbers: 'on',
                  renderLineHighlight: 'all',
                }}
              />

              <OutputPanel 
                isOpen={isConsoleOpen} 
                toggle={() => setIsConsoleOpen(!isConsoleOpen)} 
                results={results} 
                testCases={testCases}
              />
           </div>
        </div>
      </div>
    </div>
  );
};
