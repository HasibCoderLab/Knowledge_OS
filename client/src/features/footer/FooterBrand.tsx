import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit } from 'lucide-react';

const FooterBrand: React.FC = () => {
  return (
    <div className="space-y-5">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-2.5"
      >
        <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/25 text-sm">
          <BrainCircuit className="w-5 h-5" />
        </div>
        <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
          KnowledgeOS
        </span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="text-sm font-medium text-slate-900 dark:text-white leading-snug"
      >
        Your AI-Powered Personal Knowledge Operating System.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs"
      >
        Organize your books, notes, habits, goals, and learning journey in one beautiful workspace.
      </motion.p>
    </div>
  );
};

export default FooterBrand;
