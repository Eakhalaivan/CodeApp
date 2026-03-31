import { motion } from 'framer-motion';
import { Zap, Cpu, Trophy, Shield, Star, Globe } from 'lucide-react';
import { Card } from '../../ui/Card';
import { Container, Section } from '../../layout/BaseLayout';
import { TextReveal } from '../../ui/TextReveal';

const features = [
  { icon: Zap, title: 'Extreme Performance', description: 'Experience sub-millisecond code execution in our high-performance sandbox.' },
  { icon: Cpu, title: 'Advanced Engine', description: 'Natively supports Java, Python 3.11+, and C++20 with full standard libraries.' },
  { icon: Trophy, title: 'Global Arena', description: 'Compete in weekly rated contests and climb the prestigious leaderboard.' },
  { icon: Shield, title: 'Zero Trust Security', description: 'Every execution is strictly isolated within a secure, resource-limited micro-container.' },
  { icon: Star, title: 'Elite Community', description: 'Network with top-tier engineers from FAANG and cutting-edge startups.' },
  { icon: Globe, title: 'Open Standards', description: 'Compliant with international competitive programming standards and formats.' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  }
};

export const FeaturesSection = () => {
  return (
    <Section id="features">
      <Container>
        <div className="text-center mb-24">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary mb-6">Core Ecosystem</h2>
          <TextReveal 
            text="Built for Competitive Speed"
            className="text-4xl md:text-6xl font-display font-black text-white"
          />
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, idx) => (
            <motion.div key={idx} variants={itemVariants as any}>
              <Card className="h-full flex flex-col items-start p-10 border-white/5 bg-white/[0.02]">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 transition-all duration-300">
                  <feature.icon size={28} />
                </div>
                <h4 className="text-2xl font-bold mb-4">{feature.title}</h4>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
};
