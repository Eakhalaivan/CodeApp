import { useEffect, useState, useMemo } from 'react';
import api from '../utils/api';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import { ArrowRight, Code2, CheckCircle2, LayoutGrid, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../components/layout/BaseLayout';
import { SearchBar } from '../components/features/problems/ProblemFilters';
import { cn } from '../utils/cn';

import imgPython    from '../assets/python.jpg';
import imgJava      from '../assets/java.jpg';
import imgJS        from '../assets/js.jpg';
import imgTS        from '../assets/ts.jpg';
import imgHTMLCSS   from '../assets/htmlcss.jpg';
import imgCSS       from '../assets/css.jpg';
import imgAngular   from '../assets/angular.jpg';
import imgNodejs    from '../assets/nodejs.jpg';
import imgReact     from '../assets/react.jpg';
import imgReactNative from '../assets/reactnative.jpg';
import imgVue       from '../assets/veu.jpg';
import imgSvelte    from '../assets/svelte.jpg';
import imgCpp       from '../assets/cpp.jpg';
import imgCsharp    from '../assets/csharp.jpg';
import imgC         from '../assets/c.jpg';
import imgRuby      from '../assets/ruby.jpg';
import imgRust      from '../assets/rust.jpg';
import imgKotlin    from '../assets/kotlin.jpg';
import imgGo        from '../assets/golang.jpg';
import imgSQL       from '../assets/sql.jpg';
import imgMySQL     from '../assets/mySQL.jpg';
import imgPostgres  from '../assets/postsql.jpg';
import imgMongo     from '../assets/mongodb.jpg';
import imgRedis     from '../assets/redis.jpg';
import imgOracle    from '../assets/oracle.jpg';
import imgSQLSrv    from '../assets/sqlserver.jpg';

type ViewMode = 'card' | 'list';

const CATEGORIES: Record<string, string[]> = {
  'Frontend': ['HTML/CSS', 'CSS', 'JavaScript', 'TypeScript', 'React', 'React Native', 'Angular', 'Vue', 'Svelte'],
  'Backend': ['Node.js', 'Python', 'Java', 'C++', 'C#', 'C', 'Ruby', 'Rust', 'Go', 'Kotlin'],
  'Database': ['SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Oracle', 'SQL Server']
};

const LANG_ASSETS: Record<string, string> = {
  'Python':     imgPython,
  'Java':       imgJava,
  'JavaScript': imgJS,
  'TypeScript': imgTS,
  'HTML/CSS':     imgHTMLCSS,
  'CSS':          imgCSS,
  'Angular':      imgAngular,
  'Node.js':      imgNodejs,
  'React':        imgReact,
  'React Native': imgReactNative,
  'Vue':          imgVue,
  'Svelte':       imgSvelte,
  'C++':          imgCpp,
  'C#':           imgCsharp,
  'C':          imgC,
  'Ruby':       imgRuby,
  'Rust':       imgRust,
  'Kotlin':     imgKotlin,
  'Go':         imgGo,
  'SQL':        imgSQL,
  'MySQL':      imgMySQL,
  'PostgreSQL': imgPostgres,
  'MongoDB':    imgMongo,
  'Redis':      imgRedis,
  'Oracle':     imgOracle,
  'SQL Server': imgSQLSrv,
};

export const ProblemList = () => {
  const [problemData, setProblemData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
 
  useEffect(() => {
    api.get('/problems?size=500')
      .then((res: any) => {
        // Handle both raw array (old) and Page object (new)
        const data = res.data.content !== undefined ? res.data.content : res.data;
        setProblemData(Array.isArray(data) ? data : []);
      })
      .catch((err: any) => {
        console.error(err);
        setProblemData([]);
      })
      .finally(() => setLoading(false));
  }, []);
 
  const filteredData = useMemo(() => 
    (Array.isArray(problemData) ? problemData : []).filter(p =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(p.tags) && p.tags.some((t: any) => t.name.toLowerCase().includes(searchTerm.toLowerCase())))
    ), [problemData, searchTerm]
  );

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Group by Language
  const getProblemLanguage = (p: any) => {
    if (p.language) return p.language;
    if (Array.isArray(p.tags)) {
      const langTag = p.tags.find((t: any) => 
        CATEGORIES['Backend'].includes(t.name) || 
        CATEGORIES['Frontend'].includes(t.name) ||
        CATEGORIES['Database'].includes(t.name)
      );
      if (langTag) return langTag.name;
    }
    return 'General';
  };

  const languages = useMemo(() => {
    const present = (Array.isArray(problemData) ? problemData : []).map(p => getProblemLanguage(p));
    const allKnown = Object.values(CATEGORIES).flat();
    return Array.from(new Set([...present, ...allKnown]));
  }, [problemData]);
  
  const languageGroups = useMemo(() => 
    languages.reduce((acc: any, lang: string) => {
      acc[lang] = filteredData.filter(p => getProblemLanguage(p) === lang);
      return acc;
    }, {}),
    [languages, filteredData]
  );


  const currentLanguages = useMemo(() => 
    selectedCategory === 'All' 
      ? languages 
      : languages.filter(l => CATEGORIES[selectedCategory]?.includes(l)),
    [languages, selectedCategory]
  );

  useEffect(() => {
    if (selectedCategory && selectedCategory !== 'All' && selectedLanguage) {
      if (!CATEGORIES[selectedCategory]?.includes(selectedLanguage)) {
        setSelectedLanguage(null);
      }
    }
  }, [selectedCategory, selectedLanguage]);

  const getCardImg = (lang: string) => LANG_ASSETS[lang] ?? imgPython;

  /* ── List View Row ─────────────────────────────────────────────── */
  const ListRow = ({ problem, idx }: { problem: any; idx: number }) => (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: Math.min(idx * 0.008, 0.15) }}
    >
      <Link to={`/problems/${problem.id}`}>
        <div className={cn(
          "group flex items-center gap-4 px-4 py-3.5 rounded-xl border border-transparent",
          "hover:bg-slate-800/60 hover:border-white/5 transition-all duration-200",
          idx % 2 === 0 ? "bg-slate-900/20" : ""
        )}>
          {/* status dot */}
          <CheckCircle2 size={16} className="text-slate-700 group-hover:text-success/50 transition-colors shrink-0" />

          {/* # */}
          <span className="text-xs font-black text-slate-600 w-8 shrink-0 group-hover:text-primary transition-colors">
            {problem.id}
          </span>

          {/* title */}
          <span className="flex-1 text-sm font-semibold text-slate-300 group-hover:text-white transition-colors truncate">
            {problem.title}
          </span>

          <div className="hidden md:flex gap-1.5 shrink-0">
            {(problem.tags || []).slice(0, 2).map((tag: any) => (
              <span
                key={tag.id}
                className="px-2 py-0.5 rounded-md bg-white/[0.03] text-[9px] font-bold text-slate-500 uppercase tracking-widest border border-white/5"
              >
                {tag.name}
              </span>
            ))}
          </div>

          {/* difficulty */}
          <div className="shrink-0 w-20 text-right">
            <Badge variant={problem.difficulty.toLowerCase() as any} className="text-[10px] font-black px-2 py-0.5">
              {problem.difficulty}
            </Badge>
          </div>

          <ArrowRight size={14} className="text-slate-700 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
        </div>
      </Link>
    </motion.div>
  );


  /* ── Group Section ─────────────────────────────────────────────── */
  const GroupSection = ({ id, title, color, data, delay }: any) => {
    const items = data || [];
    
    const isExpanded = expandedGroup === id;
    const itemsToShow = isExpanded ? items : items.slice(0, 6);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        className={cn("space-y-6", expandedGroup && !isExpanded && "hidden")}
      >
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-4">
            <div className={cn("w-12 h-12 rounded-2xl overflow-hidden shrink-0 shadow-sm", color.replace('text', 'bg'), "bg-opacity-10")}>
              <img src={getCardImg(id)} alt={title} className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">{title}</h2>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{items.length} Challenges Available</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpandedGroup(isExpanded ? null : id)}
            className="text-slate-500 hover:text-white"
            disabled={items.length === 0}
          >
            {isExpanded ? "Back to All Tiers" : "View All"}
          </Button>
        </div>

        {/* ── CARD VIEW ── */}
        {viewMode === 'card' && (
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {loading ? (
                [1, 2, 3].map(i => (
                  <Card key={i} className="p-6 bg-slate-900/50 border-white/5 space-y-4">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <div className="flex gap-2">
                       <Skeleton className="h-6 w-12 rounded-full" />
                       <Skeleton className="h-6 w-12 rounded-full" />
                    </div>
                  </Card>
                ))
              ) : itemsToShow.length === 0 ? (
                <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-500 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
                  <Code2 size={32} className="mb-4 opacity-20" />
                  <p className="text-sm font-bold tracking-widest uppercase">Coming Soon</p>
                  <p className="text-xs mt-2">No active challenges for this track yet.</p>
                </div>
              ) : (
                itemsToShow.map((problem: any, idx: number) => {
                  const cardImg = getCardImg(id);
                  return (
                    <motion.div
                      layout
                      key={problem.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                      transition={{ delay: Math.min(idx * 0.01, 0.2) }}
                      whileHover={{ y: -5 }}
                    >
                      <Link to={`/problems/${problem.id}`}>
                        <div className="group h-full bg-slate-900/40 hover:bg-slate-800/40 border border-white/5 hover:border-primary/30 rounded-3xl transition-all duration-300 relative overflow-hidden flex flex-col">
                          {/* Card art banner */}
                          <div className="relative w-full h-36 overflow-hidden rounded-t-3xl shrink-0">
                            <img
                              src={cardImg}
                              alt=""
                              className="w-full h-full object-cover object-center opacity-50 group-hover:opacity-70 transition-opacity duration-500 scale-105 group-hover:scale-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900/95" />
                            <span className="absolute top-3 left-4 text-xs font-black text-slate-400 tracking-tighter group-hover:text-primary transition-colors">#{problem.id}</span>
                            <CheckCircle2 size={18} className="absolute top-3 right-4 text-slate-700 group-hover:text-success/60 transition-colors" />
                          </div>
                          {/* Card content */}
                          <div className="p-5 flex flex-col flex-1">
                            <h3 className="text-lg font-bold text-slate-200 group-hover:text-white mb-2 line-clamp-1">{problem.title}</h3>
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {(problem.tags || []).slice(0, 2).map((tag: any) => (
                                <span key={tag.id} className="px-2 py-0.5 rounded-md bg-white/[0.03] text-[9px] font-bold text-slate-500 uppercase tracking-widest border border-white/5">{tag.name}</span>
                              ))}
                            </div>
                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                              <Badge variant={problem.difficulty.toLowerCase() as any} className="px-3 py-1 text-[10px] font-black uppercase">
                                {problem.difficulty}
                              </Badge>
                              <ArrowRight size={16} className="text-slate-600 group-hover:text-primary transition-all group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── LIST VIEW ── */}
        {viewMode === 'list' && (
          <div className="rounded-2xl border border-white/5 overflow-hidden">
            {/* Table header */}
            <div className="flex items-center gap-4 px-4 py-2.5 bg-slate-900/80 border-b border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-600">
              <span className="w-4 shrink-0" />
              <span className="w-8 shrink-0">#</span>
              <span className="flex-1">Title</span>
              <span className="hidden md:block w-40">Tags</span>
              <span className="w-20 text-right">Difficulty</span>
              <span className="w-4 shrink-0" />
            </div>
            {loading ? (
              [1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex items-center gap-4 px-4 py-3.5 border-b border-white/[0.03]">
                  <Skeleton className="h-3 w-3/4" />
                </div>
              ))
            ) : itemsToShow.length === 0 ? (
              <div className="py-12 flex justify-center items-center text-slate-500 text-xs font-bold uppercase tracking-widest bg-white/[0.01]">
                Coming Soon
              </div>
            ) : (
              itemsToShow.map((problem: any, idx: number) => (
                <ListRow key={problem.id} problem={problem} idx={idx} />
              ))
            )}
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <Container className="py-16 space-y-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-12 h-1 px-1 bg-primary rounded-full" />
            <span className="text-xs font-black uppercase tracking-[0.4em] text-primary">Academy</span>
          </motion.div>
          <h1 className="text-6xl font-display font-black mb-6 tracking-tight text-white leading-[0.9]">
            The Path To <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Mastery.</span>
          </h1>
          <p className="text-slate-400 text-xl leading-relaxed">
            From foundational logic to advanced architectural pattern recognition.
            Choose your starting point and scale the heights of engineering.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          {/* View toggle */}
          <div className="flex items-center bg-slate-900/70 border border-white/5 rounded-xl p-1 gap-1">
            <button
              onClick={() => setViewMode('card')}
              className={cn(
                "p-2 rounded-lg transition-all duration-200",
                viewMode === 'card'
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-slate-500 hover:text-slate-300"
              )}
              title="Card view"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                "p-2 rounded-lg transition-all duration-200",
                viewMode === 'list'
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-slate-500 hover:text-slate-300"
              )}
              title="List view"
            >
              <List size={16} />
            </button>
          </div>

          <SearchBar onSearch={(v) => setSearchTerm(v)} />
        </div>
      </div>

      {/* Category Navigation */}
      <div className="flex flex-wrap gap-3 mb-4 p-1.5 bg-slate-900/40 border border-white/5 rounded-2xl w-fit backdrop-blur-md">
        {['All', 'Frontend', 'Backend', 'Database'].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "px-6 py-2.5 rounded-xl text-xs font-black tracking-[0.15em] transition-all duration-300 uppercase",
              selectedCategory === cat 
                ? "bg-primary/20 text-primary border border-primary/30 shadow-lg shadow-primary/10" 
                : "text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Language Navigation */}
      <div className="flex flex-wrap gap-2 mb-16 p-1 bg-transparent rounded-2xl w-fit">
        {currentLanguages.sort().map(lang => (
          <button
            key={lang}
            onClick={() => setSelectedLanguage(selectedLanguage === lang ? null : lang)}
            className={cn(
              "flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-2xl text-xs font-bold tracking-wider transition-all duration-300 uppercase shadow-sm",
              selectedLanguage === lang 
                ? "bg-primary/15 text-primary border border-primary/30 shadow-primary/10 shadow-md" 
                : "bg-slate-900/50 text-slate-500 border border-white/5 hover:text-slate-300 hover:bg-white/5"
            )}
          >
            <span className="w-6 h-6 rounded-xl overflow-hidden shrink-0 ring-1 ring-white/10">
              <img
                src={LANG_ASSETS[lang]}
                alt={lang}
                className="w-full h-full object-cover"
              />
            </span>
            {lang}
          </button>
        ))}
      </div>

      {/* Language Tracks */}
      <div className="space-y-48">
        {currentLanguages
          .sort()
          .filter(lang => !selectedLanguage || selectedLanguage === lang)
          .map((lang, idx) => (
            <GroupSection 
              key={lang}
              id={lang} 
              title={`${lang} Mastery Track`} 
              icon={Code2} 
              color={lang === 'General' ? 'text-slate-400' : 'text-primary'} 
              data={languageGroups[lang]} 
              delay={idx * 0.1} 
            />
          ))}
      </div>

      {/* Stats Footer */}
      <Card className="bg-slate-900/50 border-white/5 p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[100px] -z-10" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-center md:text-left">
            <h4 className="text-3xl font-black text-white mb-2 tracking-tight">Ready for a random challenge?</h4>
            <p className="text-slate-400">We'll pick a problem based on your current skill gaps.</p>
          </div>
          <Button size="lg" variant="gradient" className="px-12 h-16 text-lg font-black tracking-widest uppercase gap-3">Start Random <ArrowRight size={20} /></Button>
        </div>
      </Card>
    </Container>
  );
};
