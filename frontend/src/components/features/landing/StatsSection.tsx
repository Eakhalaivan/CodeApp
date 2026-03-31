import { motion } from 'framer-motion';
import { CountUp } from '../../ui/CountUp';
import { Container, Section } from '../../layout/BaseLayout';

const stats = [
  { label: 'Cloud Execution', value: 1240000, suffix: '+' },
  { label: 'Global Ranking', value: 342, suffix: '' },
  { label: 'Active Users', value: 85200, suffix: '+' },
  { label: 'Daily Streaks', value: 12050, suffix: '' },
];

export const StatsSection = () => {
  return (
    <Section id="stats" className="border-y border-white/5">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-display font-black mb-3">
                 <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
