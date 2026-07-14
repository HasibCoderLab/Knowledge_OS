import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookMarked, GitBranch, GitCommit, Keyboard, Megaphone, Info,
  Globe, Check, Menu, ChevronDown,
} from 'lucide-react';
import { useLanguage } from '../../i18n/useLanguage';
import type { SupportedLocale } from '../../i18n/locales';

interface TopNavbarProps {
  onMenuClick: () => void;
}

const resourceLinks = [
  { labelKey: 'navbar.resources.docs', icon: BookMarked, path: '/docs' },
  { labelKey: 'navbar.resources.siteMap', icon: GitBranch, path: '/site-map' },
  { labelKey: 'navbar.resources.roadmap', icon: GitCommit, path: '#', disabled: true },
  { labelKey: 'navbar.resources.shortcuts', icon: Keyboard, path: '#', disabled: true },
  { labelKey: 'navbar.resources.changelog', icon: Megaphone, path: '#', disabled: true },
  { labelKey: 'navbar.resources.about', icon: Info, path: '#', disabled: true },
];

const languages: { code: SupportedLocale; label: string; flag: string }[] = [
  { code: 'bn', label: 'বাংলা', flag: '🇧🇩' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
];

const ResourcesDropdown: React.FC<{ onItemClick: () => void }> = ({ onItemClick }) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {t('navbar.resourcesLabel')}
        <ChevronDown size={12} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
            className="absolute left-0 top-full mt-1.5 w-56 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/10 dark:shadow-black/30 overflow-hidden z-50"
            role="menu"
          >
            <div className="p-1.5">
              {resourceLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.labelKey}
                    onClick={() => {
                      if (!link.disabled) navigate(link.path);
                      setOpen(false);
                      onItemClick();
                    }}
                    disabled={link.disabled}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      link.disabled
                        ? 'text-slate-400 dark:text-slate-600 cursor-not-allowed'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    }`}
                    role="menuitem"
                  >
                    <Icon size={14} strokeWidth={1.5} />
                    <span className="flex-1 text-left">{t(link.labelKey)}</span>
                    {link.disabled && (
                      <span className="text-[9px] font-medium text-slate-400 dark:text-slate-600 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                        Soon
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LanguageHoverSwitcher: React.FC = () => {
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const current = languages.find((l) => l.code === locale)!;

  const show = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    timerRef.current = setTimeout(() => setOpen(false), 150);
  }, []);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const handleSelect = useCallback((code: SupportedLocale) => {
    setLocale(code);
    setOpen(false);
  }, [setLocale]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <button
        className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
        aria-label={t('language.label')}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <Globe size={18} strokeWidth={1.75} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.1, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-1.5 w-44 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/10 dark:shadow-black/30 overflow-hidden z-50"
            role="menu"
          >
            <div className="p-1.5">
              {languages.map((lang) => {
                const isActive = lang.code === current.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleSelect(lang.code)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    }`}
                    role="menuitem"
                    aria-current={isActive}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-sm">{lang.flag}</span>
                      <span>{lang.label}</span>
                    </span>
                    {isActive && <Check size={14} />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TopNavbar: React.FC<TopNavbarProps> = ({ onMenuClick }) => {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60">
      <div className="flex items-center justify-between px-4 h-12">
        <div className="flex items-center gap-2">
          <button
            onClick={onMenuClick}
            className="p-1.5 -ml-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu size={18} />
          </button>
          <ResourcesDropdown onItemClick={() => {}} />
        </div>

        <div className="flex items-center gap-1">
          <LanguageHoverSwitcher />
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
