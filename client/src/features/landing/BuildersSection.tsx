import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Code,
  FlaskConical,
  Bot,
  Rocket,
  Palette,
} from 'lucide-react';
import { useLanguage } from '../../i18n/useLanguage';

const icons = [
  <GraduationCap className="w-5 h-5 text-indigo-500" />,
  <Code className="w-5 h-5 text-emerald-500" />,
  <FlaskConical className="w-5 h-5 text-amber-500" />,
  <Bot className="w-5 h-5 text-violet-500" />,
  <Rocket className="w-5 h-5 text-rose-500" />,
  <Palette className="w-5 h-5 text-sky-500" />,
];

const BuildersSection: React.FC = () => {
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
          {t('builders.heading')}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">{t('builders.headingGradient')}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' as const }}
          className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed"
        >
          {t('builders.subheading')}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' as const }}
            className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {icons[index]}
              </div>
              <h3 className="text-base font-semibold">{t(`builders.groups.${index}.title`)}</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-[52px]">{t(`builders.groups.${index}.desc`)}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BuildersSection;
