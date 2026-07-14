import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronRight, X } from 'lucide-react';
import { settingsSections } from '../../features/settings/types';
import { useLanguage } from '../../i18n/useLanguage';
import {
  ProfileSection, AccountSection, LanguageSection, AboutSection,
} from '../../features/settings/sections';

const iconMap: Record<string, React.ReactNode> = {
  profile: <UserSvg />, account: <ShieldSvg />,
  language: <GlobeSvg />, about: <InfoSvg />,
};

function UserSvg() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>; }
function ShieldSvg() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>; }
function GlobeSvg() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>; }
function InfoSvg() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>; }

const sectionComponents: Record<string, React.FC> = {
  profile: ProfileSection, account: AccountSection,
  language: LanguageSection, about: AboutSection,
};

/* Highlight matching text */
function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-yellow-200 dark:bg-yellow-700/40 text-inherit rounded px-0.5">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export const SettingsPage: React.FC = () => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('profile');
  const [searchQuery, setSearchQuery] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);

  /* Find best matching section for the current search query */
  const bestMatch = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();

    let best: typeof settingsSections[number] | null = null;
    let bestScore = 0;

    for (const section of settingsSections) {
      const titleMatch = section.title.toLowerCase().includes(q);
      const kwMatch = section.keywords.some((k) => k.includes(q) || q.includes(k));

      if (titleMatch) return section;
      if (kwMatch && !best) best = section;

      /* Score based on keyword prefix match */
      for (const kw of section.keywords) {
        if (kw.startsWith(q)) {
          const score = q.length / kw.length;
          if (score > bestScore) { bestScore = score; best = section; }
        }
      }
    }
    return best;
  }, [searchQuery]);

  /* Auto-navigate to best match */
  useEffect(() => {
    if (bestMatch && bestMatch.id !== activeSection) {
      setActiveSection(bestMatch.id);
    }
  }, [bestMatch, activeSection]);

  /* Scroll active sidebar item into view */
  useEffect(() => {
    if (sidebarRef.current) {
      const active = sidebarRef.current.querySelector(`[data-section="${activeSection}"]`);
      active?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeSection]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const ActiveComponent = sectionComponents[activeSection];

  return (
    <div className="space-y-6 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <header className="mb-5">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t('settings.title')}
          </h1>
          <p className="text-sm md:text-[15px] text-slate-500 dark:text-slate-400 mt-1">
            {t('settings.subtitle')}
          </p>
        </header>

        {/* Search */}
        <div className="relative mb-5">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder={t('settings.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Mobile pills */}
        <div className="flex lg:hidden overflow-x-auto gap-1.5 pb-2 -mx-1 px-1 mb-5">
          {settingsSections.map((section) => {
            const active = section.id === activeSection;
            return (
              <button
                key={section.id}
                onClick={() => { setActiveSection(section.id); clearSearch(); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer border ${
                  active
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                {iconMap[section.id]}
                <span>{section.title}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      <div className="flex gap-8 lg:gap-10">
        {/* Desktop sidebar */}
        <aside ref={sidebarRef} className="hidden lg:block w-48 shrink-0">
          <nav className="sticky top-20 space-y-0.5">
            {(searchQuery
              ? settingsSections.filter((s) => {
                  const q = searchQuery.toLowerCase();
                  return s.title.toLowerCase().includes(q) || s.keywords.some((k) => k.includes(q));
                })
              : settingsSections
            ).map((section) => {
              const active = section.id === activeSection;
              return (
                <button
                  key={section.id}
                  data-section={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer text-left ${
                    active
                      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <span className="shrink-0">{iconMap[section.id]}</span>
                  <span className="flex-1 truncate">
                    {searchQuery ? highlightMatch(section.title, searchQuery) : section.title}
                  </span>
                  {active && <ChevronRight size={12} className="shrink-0 text-indigo-400" />}
                </button>
              );
            })}
            {searchQuery && !settingsSections.some((s) => {
              const q = searchQuery.toLowerCase();
              return s.title.toLowerCase().includes(q) || s.keywords.some((k) => k.includes(q));
            }) && (
              <p className="text-xs text-slate-400 px-3 py-6 text-center">{t('settings.noResults')}</p>
            )}
          </nav>
        </aside>

        {/* Content */}
        <div ref={contentRef} className="flex-1 min-w-0">
          {ActiveComponent && (
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <ActiveComponent />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
