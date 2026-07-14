import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Layers,
  Workflow,
  Smartphone,
  ShieldCheck,
  Moon,
  Bot,
  Rocket,
} from 'lucide-react';
import { useLanguage } from '../../i18n/useLanguage';

const icons = [
  <LayoutDashboard className="w-4 h-4 text-indigo-500" />,
  <Layers className="w-4 h-4 text-emerald-500" />,
  <Workflow className="w-4 h-4 text-amber-500" />,
  <Smartphone className="w-4 h-4 text-sky-500" />,
  <ShieldCheck className="w-4 h-4 text-violet-500" />,
  <Moon className="w-4 h-4 text-blue-500" />,
  <Bot className="w-4 h-4 text-rose-500" />,
  <Rocket className="w-4 h-4 text-purple-500" />,
];

const StatsSection: React.FC = () => {
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
          {t('stats.heading')}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">{t('stats.headingGradient')}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' as const }}
          className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed"
        >
          {t('stats.subheading')}
        </motion.p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' as const }}
            className="group p-5 md:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 text-center"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
              {icons[index]}
            </div>
            <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1">{t(`stats.items.${index}.value`)}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t(`stats.items.${index}.label`)}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
