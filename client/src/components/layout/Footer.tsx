import React from 'react';
import { BrainCircuit } from 'lucide-react';
import FooterBrand from '../features/footer/FooterBrand';
import FooterLinks from '../features/footer/FooterLinks';
import FooterSocial from '../features/footer/FooterSocial';
import NewsletterForm from '../features/footer/NewsletterForm';

const productLinks = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Library', href: '/library' },
  { label: 'Notes', href: '/notes' },
  { label: 'Goals', href: '/goals' },
  { label: 'Tasks', href: '/tasks' },
  { label: 'Reading Tracker', href: '/reading' },
];

const resourceLinks = [
  { label: 'Documentation', href: '/docs', external: true },
  { label: 'Roadmap', href: '/roadmap', external: true },
  { label: 'Changelog', href: '/changelog', external: true },
  { label: 'FAQ', href: '/faq', external: true },
];

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Contact', href: '/contact' },
];

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 lg:pt-20 lg:pb-10">
        {/* Main grid — 4-col desktop, 2-col tablet, 1-col mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-14 lg:mb-16">
          {/* Brand — spans 4 cols on desktop */}
          <div className="lg:col-span-4">
            <FooterBrand />
            <div className="mt-6">
              <FooterSocial />
            </div>
          </div>

          {/* Product — spans 2 cols */}
          <div className="lg:col-span-2">
            <FooterLinks title="Product" links={productLinks} index={0} />
          </div>

          {/* Resources — spans 2 cols */}
          <div className="lg:col-span-2">
            <FooterLinks title="Resources" links={resourceLinks} index={1} />
          </div>

          {/* Company — spans 2 cols */}
          <div className="lg:col-span-2">
            <FooterLinks title="Company" links={companyLinks} index={2} />
          </div>

          {/* Newsletter — spans 2 cols */}
          <div className="lg:col-span-2">
            <NewsletterForm />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200/60 dark:border-slate-800/60" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
              <BrainCircuit className="w-4 h-4" />
              <span className="text-sm">
                &copy; {new Date().getFullYear()} KnowledgeOS
              </span>
            </div>
            <span className="hidden sm:inline text-sm text-slate-400 dark:text-slate-500">
              &middot;
            </span>
            <p className="text-sm text-slate-400 dark:text-slate-500">
              Built with React, TypeScript &amp; <span className="text-red-400">&hearts;</span>
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100/80 dark:bg-slate-800/60 text-[11px] font-medium text-slate-500 dark:text-slate-400 tabular-nums">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            v1.0.0 Frontend MVP
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
