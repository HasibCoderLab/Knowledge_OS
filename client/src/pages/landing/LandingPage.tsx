import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, LayoutDashboard } from 'lucide-react';
import Button from '../../components/ui/Button';
import Footer from '../../components/layout/Footer';
import Navbar from '../../features/landing/Navbar';
import heroImg from '../../assets/hero.png';
import AboutSection from '../../features/landing/AboutSection';
import PhilosophySection from '../../features/landing/PhilosophySection';
import WhySection from '../../features/landing/WhySection';
import FeaturesSection from '../../features/landing/FeaturesSection';
import BuildersSection from '../../features/landing/BuildersSection';

import PaathAISection from '../../features/landing/PaathAISection';
import FounderSection from '../../features/landing/FounderSection';
import StatsSection from '../../features/landing/StatsSection';
import FAQSection from '../../features/landing/FAQSection';
import CTASection from '../../features/landing/CTASection';
import { useLanguage } from '../../i18n/useLanguage';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 selection:bg-indigo-500/30 overflow-hidden font-sans">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-500/10 blur-[120px] rounded-full" />
      </div>

      <Navbar />

      <main className="relative z-10 flex flex-col items-center pt-16 md:pt-[72px]">
        
        {/* Hero Section */}
        <section className="w-full px-6 py-32 flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-8 border border-indigo-200 dark:border-indigo-500/20"
          >
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse"></span>
            {t('hero.badge')}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' as const }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]"
          >
            {t('hero.title')}<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">
              {t('hero.titleGradient')}
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' as const }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-3xl leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' as const }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
          >
            <Button onClick={() => navigate('/auth/login')} variant="primary" size="lg" className="rounded-full w-full sm:w-auto px-8 group">
              {t('hero.ctaStart')} <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              variant="outline"
              size="lg"
              className="rounded-full w-full sm:w-auto px-8"
            >
              {t('common.exploreFeatures')}
            </Button>
          </motion.div>
        </section>

        {/* About KnowledgeOS */}
        <AboutSection />

        {/* Dashboard Preview Section */}
        <section id="preview" className="w-full px-6 pb-32 max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: 'easeOut' as const }}
            className="relative rounded-2xl md:rounded-3xl border border-slate-200/50 dark:border-slate-800/50 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl shadow-2xl p-2 md:p-4"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-violet-500/5 rounded-2xl md:rounded-3xl pointer-events-none" />
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 flex flex-col h-[400px] md:h-[600px]">
              
              {/* Browser/Window Header */}
              <div className="h-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                </div>
                <div className="mx-auto h-6 w-48 bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center text-[10px] text-slate-400">
                  <LayoutDashboard className="w-3 h-3 mr-1" /> {t('common.brand').toLowerCase().replace(/\s/g, '-')}.app
                </div>
              </div>

              {/* Actual Image */}
              <div className="flex-1 relative overflow-hidden bg-slate-50 dark:bg-[#0A0A0A]">
                <img src={heroImg} alt={`${t('common.brand')} Dashboard Preview`} className="w-full h-full object-cover object-left-top" />
              </div>

            </div>
          </motion.div>
        </section>

        {/* Product Philosophy */}
        <PhilosophySection />

        {/* Why KnowledgeOS */}
        <WhySection />

        {/* KnowledgeOS Features */}
        <FeaturesSection />

        {/* Built for Builders */}
        <BuildersSection />

        {/* About PaathAI */}
        <PaathAISection />

        {/* Founder Note */}
        <FounderSection />

        {/* Product Statistics */}
        <StatsSection />

        {/* FAQ */}
        <FAQSection />

        {/* Final CTA */}
        <CTASection />

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default LandingPage;
