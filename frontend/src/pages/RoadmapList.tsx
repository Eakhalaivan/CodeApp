import { motion } from 'framer-motion';
import { Container } from '../components/layout/BaseLayout';
import { ViperCard } from '../components/ui/ViperCard';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { Layout, Server, Layers, Terminal, BrainCircuit, Database, Smartphone, Shield, Cpu, Code2, Globe } from 'lucide-react';

const roadmapCategories = [
  {
    title: "Role-based Roadmaps",
    description: "Step-by-step guides for specific career paths.",
    items: [
      { id: 'frontend', title: 'Frontend', icon: Layout, theme: 'blue' as const, level: 'Level 1-10', marquee: 'FRONTEND' },
      { id: 'backend', title: 'Backend', icon: Server, theme: 'green' as const, level: 'Level 1-10', marquee: 'BACKEND' },
      { id: 'fullstack', title: 'Full Stack', icon: Layers, theme: 'purple' as const, level: 'Level 1-10', marquee: 'FULLSTACK' },
      { id: 'devops', title: 'DevOps', icon: Terminal, theme: 'orange' as const, level: 'Level 1-10', marquee: 'DEVOPS' },
      { id: 'ai-engineer', title: 'AI Engineer', icon: BrainCircuit, theme: 'purple' as const, level: 'Level 1-10', marquee: 'AI ENGINEER' },
      { id: 'data-analyst', title: 'Data Analyst', icon: Database, theme: 'amber' as const, level: 'Level 1-10', marquee: 'DATA ANALYST' },
      { id: 'mobile', title: 'Mobile Developer', icon: Smartphone, theme: 'red' as const, level: 'Level 1-10', marquee: 'MOBILE' },
      { id: 'cybersecurity', title: 'Cyber Security', icon: Shield, theme: 'blue' as const, level: 'Level 1-10', marquee: 'CYBER' },
      { id: 'system-design', title: 'System Design', icon: Cpu, theme: 'amber' as const, level: 'Level 1-10', marquee: 'SYSTEM' },
    ]
  },
  {
    title: "Language-specific Roadmaps",
    description: "Deep dive into specific programming languages.",
    items: [
      { id: 'java', title: 'Java Mastery', icon: Code2, theme: 'red' as const, level: 'Level 1-10', marquee: 'JAVA' },
      { id: 'python', title: 'Python Expert', icon: Code2, theme: 'amber' as const, level: 'Level 1-10', marquee: 'PYTHON' },
      { id: 'cpp', title: 'C++ Architect', icon: Code2, theme: 'blue' as const, level: 'Level 1-10', marquee: 'C PLUS PLUS' },
      { id: 'javascript', title: 'JavaScript Ninja', icon: Globe, theme: 'amber' as const, level: 'Level 1-10', marquee: 'JS NINJA' },
    ]
  }
];

export const RoadmapList = () => {
  return (
    <Container className="py-16 space-y-16">
      <div className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-1 bg-primary rounded-full" />
            <span className="text-xs font-black uppercase tracking-[0.4em] text-primary">Learning Paths</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-[0.9] tracking-tighter">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Destiny.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
            Role-based and language-specific roadmaps for high-performance engineering.
          </p>
        </motion.div>
      </div>

      <div className="space-y-24">
        {roadmapCategories.map((category) => (
          <section key={category.title} className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
              <div>
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">{category.title}</h2>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1">{category.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {category.items.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link to={`/roadmaps/${item.id}`} className="block">
                    <ViperCard
                      title={item.title}
                      marqueeText={item.marquee}
                      icon={item.icon}
                      theme={item.theme}
                      level={item.level}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="p-12 rounded-[3.5rem] bg-gradient-to-br from-primary/10 via-slate-900/40 to-accent/10 border border-white/5 flex flex-col items-center text-center gap-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.05)_0,transparent_70%)]" />
        <h2 className="text-3xl font-black text-white relative z-10">Can't find what you're looking for?</h2>
        <p className="text-slate-400 max-w-xl relative z-10 font-medium">Build your own custom learning path or request a new roadmap from our engineering community.</p>
        <Button className="rounded-2xl px-12 py-6 text-sm font-black uppercase tracking-widest relative z-10 h-auto">
          Create Custom Roadmap
        </Button>
      </div>
    </Container>
  );
};
