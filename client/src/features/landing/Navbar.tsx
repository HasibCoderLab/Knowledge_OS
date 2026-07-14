import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BrainCircuit, ArrowRight, Menu } from 'lucide-react';
import { navItems } from './navbar/constants';
import type { NavItem } from './navbar/constants';
import DesktopNav from './navbar/DesktopNav';
import MobileMenu from './navbar/MobileMenu';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import { useLanguage } from '../../i18n/useLanguage';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const rafRef = useRef<number>(0);

  // Scroll detection (passive, throttled via rAF)
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        rafRef.current = 0;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // IntersectionObserver for active section
  useEffect(() => {
    const sectionIds = navItems
      .filter((item) => !item.external && item.href.startsWith('#'))
      .map((item) => item.href.slice(1));

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let maxId = '';
        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            maxId = `#${entry.target.id}`;
          }
        });
        if (maxId) setActiveSection(maxId);
      },
      { rootMargin: '-10% 0px -60% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback(
    (item: NavItem) => {
      const id = item.href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        const offset = 80;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    },
    []
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        scrolled
          ? 'bg-white/75 dark:bg-slate-950/75 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          {/* Left: Logo */}
          <motion.a
            href="/"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' as const }}
            className="flex items-center gap-2 shrink-0"
          >
            <BrainCircuit className="w-7 h-7 md:w-8 md:h-8 text-indigo-600 dark:text-indigo-400" />
            <span className="text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t('common.brand')}
            </span>
          </motion.a>

          {/* Center: Desktop Nav */}
          <DesktopNav activeSection={activeSection} onClick={handleNavClick} />

          {/* Right: CTA Buttons + Language + Hamburger */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Language Switcher - Desktop */}
            <div className="hidden md:block">
              <LanguageSwitcher variant="desktop" />
            </div>

            {/* Login */}
            <motion.button
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' as const }}
              onClick={() => navigate('/auth/login')}
              className="hidden md:inline-flex px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 cursor-pointer"
            >
              {t('common.login')}
            </motion.button>

            {/* Get Started */}
            <motion.a
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' as const }}
              href="/auth/login"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm shadow-indigo-500/25 hover:shadow-md hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              {t('common.getStarted')}
              <ArrowRight size={14} />
            </motion.a>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              aria-label={t('mobileMenu.open')}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div id="mobile-menu">
        <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} onNavClick={handleNavClick} />
      </div>
    </header>
  );
};

export default Navbar;
