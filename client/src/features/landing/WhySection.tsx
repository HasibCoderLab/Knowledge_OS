import React from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Briefcase,
  Brain,
  Bot,
  BarChart3,
  TrendingUp,
} from 'lucide-react';
import { useLanguage } from '../../i18n/useLanguage';

const icons = [
  <BookOpen className="w-6 h-6 text-indigo-500" />,
  <Briefcase className="w-6 h-6 text-emerald-500" />,
  <Brain className="w-6 h-6 text-violet-500" />,
  <Bot className="w-6 h-6 text-amber-500" />,
  <BarChart3 className="w-6 h-6 text-rose-500" />,
  <TrendingUp className="w-6 h-6 text-sky-500" />,
];

const WhySection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full px-6 py-24 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
          className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
        >
          {t('why.heading')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">{t('why.headingGradient')}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' as const }}
          className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed"
        >
          {t('why.subheading')}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' as const }}
            className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              {icons[index]}
            </div>
            <h3 className="text-lg font-semibold mb-2">{t(`why.pillars.${index}.title`)}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{t(`why.pillars.${index}.desc`)}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhySection;
