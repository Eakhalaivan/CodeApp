import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Container } from '../../layout/BaseLayout';
import { Link } from 'react-router-dom';
import { TextReveal } from '../../ui/TextReveal';

export const HeroSection = () => {
  return (
    <section className="pt-48 pb-32 relative text-center">
      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-primary mb-8 animate-bounce-slow">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Platform v2.0 is now live
          </div>
          
          <TextReveal 
            text="Master the Craft of Algorithm Design"
            className="text-5xl md:text-8xl font-display font-extrabold mb-8 leading-[1.1] tracking-tight text-white"
          />
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Join 100,000+ developers sharpening their problem-solving skills with industrial-grade tools and real-time execution.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link to="/login" className="w-full sm:w-auto">
              <Button variant="gradient" size="lg" className="h-16 px-12 text-lg w-full group">
                Start Coding <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="h-16 px-12 text-lg border-white/10 hover:border-white/20 w-full">
              View Problems
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};
