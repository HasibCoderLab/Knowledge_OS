import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, GraduationCap, Sparkles } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useLanguage } from '../../i18n/useLanguage';

const PaathAISection: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <section className="w-full px-6 py-24 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: 'easeOut' as const }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 p-8 md:p-12 lg:p-16"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-300/10 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold mb-5 border border-white/10">
              <Sparkles size={12} />
              {t('paathai.badge')}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              {t('paathai.heading')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-200">
                {t('paathai.headingGradient')}
              </span>
            </h2>
            <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl mb-6">
              {t('paathai.paragraph1')}
            </p>
            <p className="text-white/60 text-sm leading-relaxed max-w-xl mb-8">
              {t('paathai.paragraph2')}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Button
                onClick={() => window.open('https://paathai-io.vercel.app', '_blank')}
                variant="secondary"
                size="lg"
                className="!bg-white !text-indigo-700 hover:!bg-white/90 !shadow-xl !shadow-indigo-900/20 rounded-full px-6 group"
              >
                {t('paathai.ctaLearn')} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => navigate('/auth/login')}
                variant="ghost"
                size="lg"
                className="!text-white/80 hover:!text-white !bg-transparent hover:!bg-white/10 rounded-full"
              >
                <GraduationCap className="w-4 h-4 mr-2" />
                {t('paathai.ctaExplore')}
              </Button>
            </div>
          </div>

          <div className="hidden lg:flex flex-col items-center gap-3 shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
              <GraduationCap size={36} className="text-white/80" />
            </div>
            <span className="text-white/50 text-[10px] font-semibold uppercase tracking-wider text-center leading-tight">
              {t('paathai.sideLabel').split('\n').map((line, i) => (
                <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>
              ))}
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PaathAISection;
