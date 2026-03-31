import { useEffect, useState } from 'react';
import api from '../utils/api';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import { ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '../components/layout/BaseLayout';
import { cn } from '../utils/cn';



export const MaterialList = () => {
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'roadmap'>('grid');

  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    api.get('/materials')
      .then((res: any) => setMaterials(res.data))
      .catch((err: any) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredData = materials.filter(m =>
    (m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (m.language && m.language.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (selectedLanguage === 'All' || m.language === selectedLanguage)
  );

  const languages = Array.from(new Set(materials.map(m => m.language || 'General')));
  
  const languageGroups = languages.reduce((acc: any, lang: string) => {
    acc[lang] = filteredData.filter(m => (m.language || 'General') === lang);
    return acc;
  }, {});

  // Group by level for roadmap view
  const roadmapLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const roadmapGroups = roadmapLevels.reduce((acc: any, level: number) => {
    acc[level] = filteredData.filter(m => m.roadmapLevel === level);
    return acc;
  }, {});

  const CATEGORIES: Record<string, string[]> = {
    'Frontend': ['HTML/CSS', 'JavaScript', 'TypeScript', 'React', 'Angular', 'Vue', 'Svelte'],
    'Backend': ['Node.js', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'Rust', 'Go'],
    'Database': ['SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Oracle', 'SQL Server']
  };

  const currentLanguages = selectedCategory === 'All' 
    ? languages 
    : languages.filter(l => CATEGORIES[selectedCategory]?.includes(l));

  useEffect(() => {
    if (selectedCategory !== 'All' && selectedLanguage !== 'All') {
      if (!CATEGORIES[selectedCategory]?.includes(selectedLanguage)) {
        setSelectedLanguage('All');
      }
    }
  }, [selectedCategory, selectedLanguage]);

  const getCardImg = (lang: string) => {
    if (lang === 'Python') return '/card-art/python.png';
    if (lang === 'Java') return '/card-art/java.png';
    if (lang === 'JavaScript') return '/card-art/javascript.jpg';
    if (lang === 'HTML/CSS') return '/card-art/htmlcss.png';
    if (lang === 'Angular') return '/card-art/angular.png';
    if (lang === 'Node.js') return '/card-art/nodejs.png';
    if (lang === 'React') return '/card-art/react.png';
    if (lang === 'C++') return '/card-art/cpp.png';
    if (lang === 'Ruby') return '/card-art/ruby.png';
    if (lang === 'Rust') return '/card-art/rust.png';
    if (lang === 'Vue') return '/card-art/vue.png';
    if (lang === 'Svelte') return '/card-art/svelte.png';
    if (lang === 'TypeScript') return '/card-art/typescript.png';
    if (lang === 'Go') return '/card-art/go.png';
    if (lang === 'C#') return '/card-art/csharp.png';
    return '/card-art/universal.png';
  };

  const GroupSection = ({ id, title, data, delay, isRoadmap = false }: any) => {
    const isExpanded = expandedGroup === id;
    const itemsToShow = isExpanded ? data : data.slice(0, 6);

    if (data.length === 0) return null;

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
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-all",
              isRoadmap ? "bg-accent/20 text-accent font-black text-xl" : "bg-primary/10"
            )}>
              {isRoadmap ? id : <img src={getCardImg(id)} alt="" className="w-full h-full object-cover rounded-2xl" />}
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">{title}</h2>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                {isRoadmap ? "Mastery Step" : `${data.length} Resources Available`}
              </p>
            </div>
          </div>
          {!isRoadmap && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpandedGroup(isExpanded ? null : id)}
              className="text-slate-500 hover:text-white"
            >
              {isExpanded ? "Back to All" : "View All"}
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {itemsToShow.map((material: any, idx: number) => (
            <Link key={material.id} to={`/materials/${material.id}`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: Math.min(idx * 0.05, 0.3) }}
                whileHover={{ y: -5 }}
                className={cn(
                  "group h-full bg-slate-900/40 hover:bg-slate-800/40 border transition-all duration-300 relative overflow-hidden flex flex-col rounded-3xl",
                  isRoadmap ? "border-accent/10 hover:border-accent/40" : "border-white/5 hover:border-primary/30"
                )}
              >
                <div className="relative w-full h-32 overflow-hidden rounded-t-3xl shrink-0">
                  <img
                    src={material.imageUrl || getCardImg(material.language)}
                    alt=""
                    className="w-full h-full object-cover object-center opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/95" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <Badge className="bg-accent/20 text-accent border-accent/30 text-[10px] font-black uppercase tracking-widest">
                      Level {material.roadmapLevel || "Core"}
                    </Badge>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-slate-200 group-hover:text-white mb-2 line-clamp-1">{material.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">{material.shortDescription}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{material.language} • {material.readTime}</span>
                    <ArrowRight size={16} className="text-slate-600 group-hover:text-primary transition-all group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <Container className="py-16 space-y-16">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-12 h-1 px-1 bg-accent rounded-full" />
            <span className="text-xs font-black uppercase tracking-[0.4em] text-accent">Career Path Tracker</span>
          </motion.div>
          <h1 className="text-7xl font-display font-black mb-6 tracking-tight text-white leading-[0.85]">
            Level Up Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Engineering.</span>
          </h1>
          <p className="text-slate-400 text-xl leading-relaxed font-medium">
            A battle-tested 10-level roadmap to guide you from programming fundamentals to professional, high-performance architecture.
          </p>
        </div>

        <div className="flex flex-col gap-6 flex-shrink-0">
          <div className="flex items-center p-1 bg-slate-900 border border-white/5 rounded-2xl w-fit">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                "px-6 py-2.5 rounded-xl text-xs font-bold transition-all",
                viewMode === 'grid' ? "bg-white/10 text-white shadow-xl" : "text-slate-500 hover:text-slate-300"
              )}
            >
              Browse Library
            </button>
            <button
              onClick={() => setViewMode('roadmap')}
              className={cn(
                "px-6 py-2.5 rounded-xl text-xs font-bold transition-all",
                viewMode === 'roadmap' ? "bg-accent/20 text-accent border border-accent/20" : "text-slate-500 hover:text-slate-300"
              )}
            >
              Mastery Roadmap
            </button>
          </div>
          <div className="relative group self-end">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search concepts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900/60 border border-white/5 rounded-2xl pl-12 pr-6 py-3.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all w-64 lg:w-80"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="flex flex-wrap gap-2 p-1 bg-slate-900/40 rounded-2xl border border-white/5">
          {['Frontend', 'Backend', 'Database', 'DSA'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-5 py-2 rounded-xl text-xs font-bold tracking-wider transition-all uppercase",
                selectedCategory === cat ? "bg-accent/20 text-accent" : "text-slate-500 hover:bg-white/5"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="h-6 w-px bg-white/5" />
        <div className="flex flex-wrap gap-2">
          {['All', ...languages.sort()].map(lang => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={cn(
                "px-5 py-2 rounded-xl text-xs font-bold transition-all uppercase",
                selectedLanguage === lang 
                  ? "bg-white/10 text-white border border-white/20" 
                  : "text-slate-500 hover:text-slate-300"
              )}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-32">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <Card key={i} className="p-8 bg-slate-900/50 border-white/5 space-y-6">
                <Skeleton className="h-6 w-3/4 bg-slate-800" />
                <Skeleton className="h-32 w-full bg-slate-800" />
                <Skeleton className="h-8 w-24 rounded-xl bg-slate-800" />
              </Card>
            ))}
          </div>
        ) : viewMode === 'roadmap' ? (
          <div className="space-y-40 relative">
            <div className="absolute left-6 top-10 bottom-10 w-px bg-gradient-to-b from-primary/30 via-accent/30 to-primary/30 hidden lg:block" />
            {roadmapLevels
              .filter(level => roadmapGroups[level] && roadmapGroups[level].length > 0)
              .map((level, idx) => (
                <GroupSection 
                  key={level}
                  id={level} 
                  title={`Level ${level} Mastery`} 
                  data={roadmapGroups[level]} 
                  delay={idx * 0.15} 
                  isRoadmap={true}
                />
              ))
            }
          </div>
        ) : (
          currentLanguages
            .sort()
            .filter(lang => selectedLanguage === 'All' || selectedLanguage === lang)
            .map((lang, idx) => (
              <GroupSection 
                key={lang}
                id={lang} 
                title={`${lang} Learning Tracks`} 
                data={languageGroups[lang]} 
                delay={idx * 0.1} 
              />
            ))
        )}
      </div>
    </Container>
  );
};
