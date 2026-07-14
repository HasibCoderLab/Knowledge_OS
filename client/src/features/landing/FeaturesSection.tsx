import React from 'react';
import { motion } from 'framer-motion';
import {
  Library,
  PenTool,
  Target,
  CheckCircle2,
  BookOpen,
  Bookmark,
  Calendar,
  BarChart3,
  Search,
  Bell,
  UserCircle,
  Settings,
} from 'lucide-react';
import { useLanguage } from '../../i18n/useLanguage';

const icons = [
  <Library className="w-5 h-5 text-indigo-500" />,
  <PenTool className="w-5 h-5 text-emerald-500" />,
  <Target className="w-5 h-5 text-rose-500" />,
  <CheckCircle2 className="w-5 h-5 text-amber-500" />,
  <BookOpen className="w-5 h-5 text-blue-500" />,
  <Bookmark className="w-5 h-5 text-violet-500" />,
  <Calendar className="w-5 h-5 text-cyan-500" />,
  <BarChart3 className="w-5 h-5 text-orange-500" />,
  <Search className="w-5 h-5 text-pink-500" />,
  <Bell className="w-5 h-5 text-purple-500" />,
  <UserCircle className="w-5 h-5 text-teal-500" />,
  <Settings className="w-5 h-5 text-slate-500" />,
];

const FeaturesSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="features" className="w-full px-6 py-24 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
          className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
        >
          {t('features.heading')}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">{t('features.headingGradient')}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' as const }}
          className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed"
        >
          {t('features.subheading')}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: index * 0.04, ease: 'easeOut' as const }}
            className="group p-4 md:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform duration-300">
              {icons[index]}
            </div>
            <h3 className="text-sm font-semibold mb-1">{t(`features.items.${index}.title`)}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t(`features.items.${index}.desc`)}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
