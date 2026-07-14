import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, LayoutDashboard } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useLanguage } from '../../i18n/useLanguage';

const CTASection: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <section className="w-full px-6 py-24 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: 'easeOut' as const }}
        className="text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' as const }}
          className="text-3xl md:text-5xl font-bold tracking-tight mb-4 leading-tight"
        >
          {t('cta.heading')}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">
            {t('cta.headingGradient')}
          </span>
          ?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' as const }}
          className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed"
        >
          {t('cta.subtitle')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' as const }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            onClick={() => navigate('/auth/login')}
            variant="primary"
            size="lg"
            className="rounded-full px-8 w-full sm:w-auto group"
          >
            <LayoutDashboard className="w-5 h-5 mr-2" />
            {t('cta.ctaDashboard')}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            onClick={() => {
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }}
            variant="outline"
            size="lg"
            className="rounded-full px-8 w-full sm:w-auto"
          >
            {t('common.exploreFeatures')}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTASection;
