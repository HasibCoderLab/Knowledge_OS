import React from 'react';
import { motion } from 'framer-motion';
import {
  Atom,
  Brackets,
  SquareStack,
  LayoutDashboard,
  Database,
  GitBranch,
  Server,
  Workflow,
  Blocks,
} from 'lucide-react';
import { useLanguage } from '../../i18n/useLanguage';

const techIcons = [
  <Atom size={12} />, <Brackets size={12} />, <SquareStack size={12} />,
  <LayoutDashboard size={12} />, <GitBranch size={12} />, <Blocks size={12} />,
  <Server size={12} />, <Server size={12} />, <Database size={12} />,
  <Database size={12} />, <Workflow size={12} />,
];

const techColors = [
  'bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-800',
  'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
  'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800',
  'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800',
  'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800',
  'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800',
  'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
  'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700',
  'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800',
  'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800',
  'bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800',
];

const TechStackSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full px-6 py-24 max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
          className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
        >
          {t('techStack.heading')}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">{t('techStack.headingGradient')}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' as const }}
          className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed"
        >
          {t('techStack.subheading')}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, ease: 'easeOut' as const }}
        className="flex flex-wrap justify-center gap-3"
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
          <span
            key={index}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border ${techColors[index]} transition-all duration-200 hover:scale-105`}
          >
            {techIcons[index]}
            {t(`techStack.items.${index}`)}
          </span>
        ))}
      </motion.div>
    </section>
  );
};

export default TechStackSection;
