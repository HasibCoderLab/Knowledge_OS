import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useLanguage } from '../../i18n/useLanguage';

const FounderSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full px-6 py-24 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: 'easeOut' as const }}
        className="max-w-3xl mx-auto relative"
      >
        <div className="absolute -top-6 -left-6 text-indigo-200 dark:text-indigo-800">
          <Quote size={48} className="rotate-180" />
        </div>

        <div className="p-8 md:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <blockquote className="space-y-6">
            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {t('founder.quote1')}
            </p>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('founder.quote2')}
            </p>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('founder.quote3')}
            </p>
          </blockquote>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
              MH
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{t('founder.name')}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('founder.title')}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FounderSection;
