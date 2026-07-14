import React from 'react';
import { motion } from 'framer-motion';
import AuthBranding from './AuthBranding';
import { useLanguage } from '../../../i18n/useLanguage';

interface AuthLayoutProps {
  children: React.ReactNode;
  mode: 'login' | 'register';
}

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, mode }) => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
      {/* Left branding panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[48%] relative">
        <AuthBranding mode={mode} />
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-[420px]"
        >
          {/* Mobile logo — visible only on small screens */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/25 text-sm">
              K
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              {t('common.brand')}
            </span>
          </div>

          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
