import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit } from 'lucide-react';
import { useLanguage } from '../../i18n/useLanguage';

const FooterBrand: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-2.5"
      >
        <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/25 shrink-0">
          <BrainCircuit className="w-5 h-5" />
        </div>
        <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
          {t('common.brand')}
        </span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="text-sm font-medium text-slate-900 dark:text-white leading-snug"
      >
        {t('footer.tagline')}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed"
      >
        {t('footer.description')}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="pt-2"
      >
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-500 dark:text-slate-400 tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
          {t('footer.badge')}
        </span>
      </motion.div>
    </div>
  );
};

export default FooterBrand;
