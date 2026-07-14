import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../i18n/useLanguage';

const RoadmapSection: React.FC = () => {
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
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">{t('roadmap.heading')}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' as const }}
          className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed"
        >
          {t('roadmap.subheading')}
        </motion.p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="relative">
          <div className="absolute left-[19px] top-3 bottom-3 w-px bg-slate-200 dark:bg-slate-800 hidden md:block" />

          <div className="space-y-8 md:space-y-0">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' as const }}
                className="relative md:flex md:items-start md:gap-8 md:pb-8"
              >
                <div className="hidden md:flex md:flex-col md:items-center md:w-10 shrink-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-bold border-2 z-10 transition-all duration-300 ${
                      i === 0
                        ? 'bg-indigo-500 border-indigo-500 text-white shadow-md shadow-indigo-500/30'
                        : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {t(`roadmap.milestones.${i}.version`)}
                  </div>
                </div>

                <div
                  className={`md:flex-1 md:pt-1.5 p-5 rounded-2xl border transition-all duration-300 ${
                    i === 0
                      ? 'bg-indigo-50/50 dark:bg-indigo-500/5 border-indigo-200 dark:border-indigo-800'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-1.5">
                    <span
                      className={`md:hidden text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        i === 0
                          ? 'bg-indigo-500 text-white border-indigo-500'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {t(`roadmap.milestones.${i}.version`)}
                    </span>
                    <h3 className="text-base font-semibold">{t(`roadmap.milestones.${i}.title`)}</h3>
                    {i === 0 && (
                      <span className="text-[10px] font-medium text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-500/10">
                        {t('common.current')}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{t(`roadmap.milestones.${i}.desc`)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
