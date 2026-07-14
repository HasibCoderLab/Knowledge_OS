import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { navItems } from './constants';
import type { NavItem } from './constants';
import { useLanguage } from '../../../i18n/useLanguage';

interface DesktopNavProps {
  activeSection: string;
  onClick: (item: NavItem) => void;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ activeSection, onClick }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
      {navItems.map((item) => {
        const isActive = !item.external && activeSection === item.href;
        if (item.external) {
          return (
            <a
              key={item.labelKey}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <span className="relative">
                {t(item.labelKey)}
                <ArrowUpRight
                  size={12}
                  className="inline-block ml-0.5 -mt-0.5 opacity-40 group-hover:opacity-70 transition-opacity"
                />
              </span>
            </a>
          );
        }
        return (
          <button
            key={item.labelKey}
            onClick={() => {
              if (item.href.startsWith('/')) {
                navigate(item.href);
              } else {
                onClick(item);
              }
            }}
            className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${
              isActive
                ? 'text-indigo-600 dark:text-indigo-400'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span className="relative">
              {t(item.labelKey)}
              {!item.external && (
                <motion.span
                  className="absolute -bottom-px left-0 right-0 h-px bg-indigo-600 dark:bg-indigo-400"
                  initial={false}
                  animate={isActive ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                  style={{ originX: 'center' }}
                />
              )}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default DesktopNav;
