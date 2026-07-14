import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, BrainCircuit } from 'lucide-react';
import { navItems } from './constants';
import type { NavItem } from './constants';
import LanguageSwitcher from '../../../components/LanguageSwitcher';
import { useLanguage } from '../../../i18n/useLanguage';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavClick: (item: NavItem) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onNavClick }) => {
  const { t } = useLanguage();
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 shadow-2xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={t('mobileMenu.label')}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-base font-bold text-slate-900 dark:text-white">{t('common.brand')}</span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  aria-label={t('mobileMenu.close')}
                  autoFocus
                >
                  <X size={20} />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 overflow-y-auto px-3 py-5" aria-label={t('mobileMenu.label')}>
                <ul className="space-y-1" role="list">
                  {navItems.map((item, i) => (
                    <motion.li
                      key={item.labelKey}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 + i * 0.04, ease: 'easeOut' as const }}
                    >
                      <a
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                        onClick={(e) => {
                          if (!item.external) {
                            e.preventDefault();
                            onNavClick(item);
                          }
                          onClose();
                        }}
                        className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-200"
                      >
                        {t(item.labelKey)}
                        {item.external && <ArrowUpRight size={14} className="text-slate-400 shrink-0" />}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Language Switcher - Mobile */}
              <LanguageSwitcher variant="mobile" onClose={onClose} />

              {/* Footer */}
              <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-800">
                <a
                  href="/auth/login"
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm shadow-indigo-500/25 transition-all duration-200 cursor-pointer"
                >
                  {t('common.getStarted')}
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
