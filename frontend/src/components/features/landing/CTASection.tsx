import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Container, Section } from '../../layout/BaseLayout';
import { Link } from 'react-router-dom';
import { TextReveal } from '../../ui/TextReveal';

export const CTASection = () => {
  return (
    <Section id="community">
      <Container>
        <Card className="relative overflow-hidden p-24 text-center border-white/5 bg-slate-900 shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full opacity-40 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.3),transparent_70%)]" />
          <TextReveal 
            text="Ready to Level Up Your Game?"
            className="text-5xl md:text-7xl font-display font-black mb-10 text-white"
          />
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12">
            Join the fastest growing community of engineers and start mastering the world's most complex algorithms today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/login" className="w-full sm:w-auto">
              <Button variant="gradient" size="lg" className="h-16 px-12">Join CodeFlow Now</Button>
            </Link>
          </div>
        </Card>
      </Container>
    </Section>
  );
};
