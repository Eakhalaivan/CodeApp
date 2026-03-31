import { HeroSection } from '../components/features/landing/HeroSection';
import { FeaturesSection } from '../components/features/landing/FeaturesSection';
import { StatsSection } from '../components/features/landing/StatsSection';
import { CTASection } from '../components/features/landing/CTASection';
import { Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Container } from '../components/layout/BaseLayout';
import { motion } from 'framer-motion';

export const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-950 overflow-x-hidden relative">
      {/* Mesh Gradient Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
            x: [0, 100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [45, 0, 45],
            x: [0, -100, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px]" 
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0)_0%,rgba(15,23,42,1)_100%)]" />
      </div>

      <nav className="fixed top-0 w-full h-20 border-b border-white/5 bg-slate-950/60 backdrop-blur-xl z-50">
        <Container className="h-full flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="font-display font-bold text-2xl text-foreground flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Code2 className="text-primary w-6 h-6" />
              </div>
              CodeFlow
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="nav-link">Features</a>
              <a href="#stats" className="nav-link">Stats</a>
              <a href="#community" className="nav-link">Community</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Sign In</Link>
            <Link to="/login">
              <Button variant="gradient" size="md">Get Started</Button>
            </Link>
          </div>
        </Container>
      </nav>

      <main>
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <CTASection />
      </main>

      <footer className="py-20 border-t border-white/5 bg-slate-950/80 mt-20">
        <Container className="flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-2 font-display font-bold text-xl opacity-80">
              <Code2 size={24} className="text-primary" /> CodeFlow
           </div>
           <p className="text-slate-500 text-sm font-medium">&copy; 2026 CodeFlow. Engineered for performance.</p>
           <div className="flex gap-8 text-slate-500 font-bold text-xs uppercase tracking-widest">
             <a href="#" className="hover:text-primary transition-colors">Privacy</a>
             <a href="#" className="hover:text-primary transition-colors">Terms</a>
             <a href="#" className="hover:text-primary transition-colors">Enterprise</a>
           </div>
        </Container>
      </footer>
    </div>
  );
};
