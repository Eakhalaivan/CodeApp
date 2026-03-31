import { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import api from '../utils/api';
import { ChevronLeft, ChevronRight, BookOpen, Clock, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Material {
  id: number;
  title: string;
  language: string;
  category: string;
  difficulty: string;
  readTime: string;
  roadmapLevel?: number;
  shortDescription: string;
  introduction: string;
  coreConcepts: string;
  keyTopics: string[];
  deepExplanation: string;
  codeExample: string;
  realWorldUse: string;
  keyTakeaways: string[];
  practiceQuestions: string[];
}

const difficultyColor: Record<string, string> = {
  Beginner: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  Intermediate: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  Advanced: 'bg-red-500/10 text-red-400 border border-red-500/20',
};

export const MaterialDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [material, setMaterial] = useState<Material | null>(null);
  const [allMaterials, setAllMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get(`/materials/${id}`).catch(() => ({ data: null })),
      api.get('/materials').catch(() => ({ data: [] })),
    ]).then(([res, allRes]) => {
      setMaterial(res.data);
      setAllMaterials(Array.isArray(allRes.data) ? allRes.data : []);
    }).finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen w-full bg-slate-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  if (!material) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-6">
        <h1 className="text-4xl font-black text-white">Material not found</h1>
        <button
          onClick={() => navigate('/materials')}
          className="px-6 py-2.5 bg-accent text-white font-bold rounded-xl hover:bg-accent/80 transition-colors"
        >
          Back to Materials
        </button>
      </div>
    );
  }

  // Group all materials by language for sidebar
  const sameLanguage = allMaterials
    .filter(m => m.language === material.language)
    .sort((a, b) => (a.roadmapLevel || 0) - (b.roadmapLevel || 0));

  const otherLanguages = [...new Map(
    allMaterials.filter(m => m.language !== material.language).map(m => [m.language, m])
  ).values()];

  const currentIdx = sameLanguage.findIndex(m => m.id === material.id);
  const prevMaterial = currentIdx > 0 ? sameLanguage[currentIdx - 1] : null;
  const nextMaterial = currentIdx < sameLanguage.length - 1 ? sameLanguage[currentIdx + 1] : null;

  const Sidebar = () => (
    <div className="h-full overflow-y-auto py-6 px-2">
      {/* Current language group */}
      <div className="mb-6">
        <p className="px-3 mb-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
          {material.language} Mastery Path
        </p>
        <div className="space-y-1">
          {sameLanguage.map(m => (
            <NavLink
              key={m.id}
              to={`/materials/${m.id}`}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `block px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                isActive
                  ? 'bg-accent/20 text-accent border border-accent/20'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                {m.roadmapLevel && (
                  <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-slate-500">L{m.roadmapLevel}</span>
                )}
                <span className="truncate">{m.title.split(' Mastery')[0].split(' - ')[1] || m.title}</span>
              </div>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Other languages */}
      {otherLanguages.length > 0 && (
        <div>
          <p className="px-3 mb-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            Other Languages
          </p>
          {otherLanguages.map(m => (
            <NavLink
              key={m.id}
              to={`/materials/${m.id}`}
              onClick={() => setSidebarOpen(false)}
              className="block px-3 py-2 text-sm text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors mb-0.5 font-medium"
            >
              {m.language}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* ── Left Sidebar Desktop ── */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-white/5 sticky top-0 h-screen">
        <div className="p-4 border-b border-white/5">
          <button
            onClick={() => navigate('/materials')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-semibold"
          >
            <ChevronLeft size={16} /> All Materials
          </button>
        </div>
        <Sidebar />
      </aside>

      {/* ── Mobile Sidebar Drawer ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed left-0 top-0 h-full w-64 bg-slate-900 border-r border-white/5 z-50 lg:hidden flex flex-col"
            >
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <span className="text-sm font-black text-white">Topics</span>
                <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white">
                  <X size={18} />
                </button>
              </div>
              <Sidebar />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Content ── */}
      <main className="flex-1 min-w-0 max-w-3xl mx-auto px-6 py-10">
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden flex items-center gap-2 text-slate-400 hover:text-white mb-6 text-sm font-semibold"
        >
          <Menu size={18} /> Topics
        </button>

        {/* ── W3Schools Progress Bar ── */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <div className="h-2 flex-1 bg-white/5 rounded-full overflow-hidden mr-3">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${((currentIdx + 1) / allMaterials.length) * 100}%` }}
                className="h-full bg-emerald-500"
              />
            </div>
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">🏁</span>
          </div>
          <div className="p-3 bg-white/5 border border-white/5 rounded-lg text-xs text-slate-400">
            <span className="font-bold text-white">Tip:</span> <span className="hover:text-accent cursor-pointer underline underline-offset-2">Sign in</span> to track your progress.
          </div>
        </div>

        <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          {/* ── Breadcrumb ── */}
          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium mb-6">
            <span
              className="hover:text-slate-400 cursor-pointer transition-colors"
              onClick={() => navigate('/materials')}
            >
              Study Material
            </span>
            <ChevronRight size={12} />
            <span className="text-slate-500">{material.language}</span>
            <ChevronRight size={12} />
            <span className="text-accent">{material.title}</span>
          </div>

          {/* ── Header ── */}
          <div className="mb-8">
            <h1 className="text-4xl font-black text-white mb-3 leading-tight">{material.title}</h1>
            <div className="flex flex-wrap items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${difficultyColor[material.difficulty] || difficultyColor.Beginner}`}>
                {material.difficulty}
              </span>
              <span className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold">
                <Clock size={13} /> {material.readTime || '15 min'}
              </span>
              <span className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold">
                <BookOpen size={13} /> {material.language}
              </span>
            </div>
          </div>

          {/* ── Prev / Next Top ── */}
          <div className="flex gap-3 mb-10">
            {prevMaterial && (
              <button
                onClick={() => navigate(`/materials/${prevMaterial.id}`)}
                className="flex items-center gap-2 px-5 py-2 bg-accent text-white text-sm font-bold rounded-lg hover:bg-accent/80 transition-colors"
              >
                <ChevronLeft size={15} /> Previous
              </button>
            )}
            {nextMaterial && (
              <button
                onClick={() => navigate(`/materials/${nextMaterial.id}`)}
                className="flex items-center gap-2 px-5 py-2 bg-accent text-white text-sm font-bold rounded-lg hover:bg-accent/80 transition-colors ml-auto"
              >
                Next <ChevronRight size={15} />
              </button>
            )}
          </div>

          {/* ── Content Sections ── */}
          <div className="space-y-10">

            {/* Introduction box — green like W3Schools */}
            {material.introduction && (
              <section className="p-6 bg-emerald-500/5 border border-emerald-500/15 rounded-2xl">
                <h2 className="text-xl font-black text-emerald-400 mb-3">
                  Learn {material.language}
                </h2>
                <p className="text-slate-300 leading-relaxed">{material.introduction}</p>
              </section>
            )}

            {/* Core Concepts */}
            {material.coreConcepts && (
              <section>
                <h2 className="text-2xl font-black text-white mb-3 pb-2 border-b border-white/5">Core Concepts</h2>
                <p className="text-slate-400 leading-relaxed">{material.coreConcepts}</p>
              </section>
            )}

            {/* Key Topics */}
            {material.keyTopics && material.keyTopics.length > 0 && (
              <section>
                <h2 className="text-2xl font-black text-white mb-4 pb-2 border-b border-white/5">Key Topics</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {material.keyTopics.map((t: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 px-4 py-2.5 bg-white/3 border border-white/5 rounded-xl text-slate-300 text-sm font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Deep Explanation */}
            {material.deepExplanation && (
              <section>
                <h2 className="text-2xl font-black text-white mb-3 pb-2 border-b border-white/5">Detailed Explanation</h2>
                <p className="text-slate-400 leading-relaxed">{material.deepExplanation}</p>
              </section>
            )}

            {/* Code Example */}
            {material.codeExample && (
              <section>
                <h2 className="text-2xl font-black text-white mb-4 pb-2 border-b border-white/5">Code Example</h2>
                <div className="rounded-2xl overflow-hidden border border-white/8">
                  <div className="flex items-center gap-1.5 px-4 py-2.5 bg-white/5 border-b border-white/5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                    <span className="ml-2 text-xs text-slate-600 font-mono">{material.language}</span>
                  </div>
                  <pre className="p-5 bg-[#0d0f1a] overflow-x-auto">
                    <code className="text-sm font-mono text-emerald-300/90 leading-7">{material.codeExample}</code>
                  </pre>
                </div>
              </section>
            )}

            {/* Real World Use */}
            {material.realWorldUse && (
              <section className="p-6 bg-slate-800/40 border border-white/5 rounded-2xl">
                <h2 className="text-lg font-black text-white mb-2">Real World Application</h2>
                <p className="text-slate-400 leading-relaxed text-sm">{material.realWorldUse}</p>
              </section>
            )}

            {/* Takeaways + Questions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5">
              {material.keyTakeaways && material.keyTakeaways.length > 0 && (
                <div>
                  <h3 className="text-lg font-black text-white mb-3 flex items-center gap-2">
                    <span className="text-amber-400">★</span> Key Takeaways
                  </h3>
                  <ul className="space-y-2.5">
                    {material.keyTakeaways.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2.5 text-slate-400 text-sm">
                        <span className="text-accent opacity-60 mt-0.5 shrink-0">▹</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {material.practiceQuestions && material.practiceQuestions.length > 0 && (
                <div>
                  <h3 className="text-lg font-black text-white mb-3 flex items-center gap-2">
                    <span className="text-purple-400">✎</span> Practice
                  </h3>
                  <ul className="space-y-2.5">
                    {material.practiceQuestions.map((q: string, i: number) => (
                      <li key={i} className="flex items-start gap-2.5 p-3 bg-white/3 border border-white/5 rounded-xl">
                        <span className="text-purple-400 text-xs font-black mt-0.5 shrink-0">Q{i + 1}</span>
                        <span className="text-slate-400 text-sm leading-relaxed">{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* ── Prev / Next Bottom ── */}
          <div className="flex gap-3 mt-14 pt-8 border-t border-white/5">
            {prevMaterial && (
              <button
                onClick={() => navigate(`/materials/${prevMaterial.id}`)}
                className="flex items-center gap-2 px-6 py-2.5 bg-accent text-white text-sm font-bold rounded-xl hover:bg-accent/80 transition-colors"
              >
                <ChevronLeft size={15} /> Previous
              </button>
            )}
            {nextMaterial && (
              <button
                onClick={() => navigate(`/materials/${nextMaterial.id}`)}
                className="flex items-center gap-2 px-6 py-2.5 bg-accent text-white text-sm font-bold rounded-xl hover:bg-accent/80 transition-colors ml-auto"
              >
                Next <ChevronRight size={15} />
              </button>
            )}
          </div>
        </motion.article>
      </main>
    </div>
  );
};
