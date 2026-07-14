import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Atom, Brackets, SquareStack, Heart } from 'lucide-react';
import FooterBrand from '../../features/footer/FooterBrand';
import FooterLinks from '../../features/footer/FooterLinks';
import FooterSocial from '../../features/footer/FooterSocial';
import NewsletterForm from '../../features/footer/NewsletterForm';
import { useLanguage } from '../../i18n/useLanguage';

const platformHrefs = [
  '/dashboard', '/library', '/notes', '/goals', '/habits', '/tasks', '/reading', '/journal', '/analytics',
];

const resourceHrefs = [
  { href: '/docs', external: true, badge: true },
  { href: '/roadmap' },
  { href: 'https://github.com', external: true },
  { href: '/features' },
  { href: '/faq' },
  { href: '/support' },
];

const companyHrefs = [
  '/about', '/vision', '/contact', '/privacy', '/terms',
];

const paathaiHrefs = [
  { href: 'https://paathai-io.vercel.app', external: true },
  { href: 'https://paathai-io.vercel.app/ai-room', external: true },
  { href: 'https://paathai-io.vercel.app/questions', external: true },
  { href: 'https://paathai-io.vercel.app/practice', external: true },
];

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const techIcons = [
  <Atom size={10} />,
  <Brackets size={10} />,
  <SquareStack size={10} />,
  <span className="text-[9px] font-bold">FM</span>,
  <span className="text-[9px] font-bold">TQ</span>,
  <span className="text-[9px] font-bold">ZS</span>,
];

const techColors = [
  'bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-800',
  'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
  'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800',
  'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800',
  'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800',
  'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800',
];

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const platformLinks = platformHrefs.map((href) => ({ href }));

  return (
    <footer className="relative z-10 border-t border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 lg:pt-20 lg:pb-10">
        {/* Ecosystem Description */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12 md:mb-14"
        >
          <p className="text-xs md:text-sm text-slate-400 dark:text-slate-500 max-w-2xl mx-auto leading-relaxed">
            <span className="font-semibold text-slate-500 dark:text-slate-400">{t('common.brand')}</span> {t('footer.ecosystem')}{' '}
            <a
              href="https://paathai-io.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 underline underline-offset-2 decoration-indigo-500/30 hover:decoration-indigo-500/60 transition-all duration-200"
            >
              PaathAI
            </a>
            . {t('footer.ecosystemSuffix')}
          </p>
        </motion.div>

        <motion.div
          variants={staggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-14 lg:mb-16"
        >
          {/* Brand */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
            className="sm:col-span-2 lg:col-span-3"
          >
            <FooterBrand />
            <div className="mt-4">
              <FooterSocial />
            </div>
          </motion.div>

          {/* Platform */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
            className="lg:col-span-2"
          >
            <FooterLinks
              title={t('footer.columns.platform')}
              links={platformHrefs.map((href, i) => ({ label: t(`footer.links.platform.${i}`), href }))}
              index={0}
            />
          </motion.div>

          {/* Resources */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
            className="lg:col-span-2"
          >
            <FooterLinks
              title={t('footer.columns.resources')}
              links={resourceHrefs.map((item, i) => {
                const ext = (item as { href: string; external?: boolean; badge?: boolean }).external;
                const hasBadge = (item as { href: string; external?: boolean; badge?: boolean }).badge;
                const link: { label: string; href: string; external?: boolean; badge?: string } = {
                  label: t(`footer.links.resources.${i}`),
                  href: item.href,
                };
                if (ext) link.external = true;
                if (hasBadge) link.badge = t('footer.links.badges.soon');
                return link;
              })}
              index={1}
            />
          </motion.div>

          {/* Company */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
            className="lg:col-span-2"
          >
            <FooterLinks
              title={t('footer.columns.company')}
              links={companyHrefs.map((href, i) => ({ label: t(`footer.links.company.${i}`), href }))}
              index={2}
            />
          </motion.div>

          {/* PaathAI + Newsletter */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
            className="sm:col-span-2 lg:col-span-3 space-y-8"
          >
            <FooterLinks
              title={t('footer.columns.paathai')}
              links={paathaiHrefs.map((item, i) => ({
                label: t(`footer.links.paathai.${i}`),
                href: item.href,
                external: true,
              }))}
              index={3}
            />
            <NewsletterForm />
          </motion.div>
        </motion.div>

        {/* Premium Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200/60 dark:border-slate-800/60" />
          </div>
          <div className="relative flex justify-center">
            <div className="px-4 bg-white/50 dark:bg-slate-950/50">
              <BrainCircuit size={16} className="text-slate-300 dark:text-slate-600" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          {/* Left: Copyright + Made in BD */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center md:text-left">
            <p className="text-xs text-slate-400 dark:text-slate-500">
              &copy; {new Date().getFullYear()} {t('footer.copyright')}. {t('common.allRightsReserved')}
            </p>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-600 text-[10px]">|</span>
            <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
              {t('common.madeWith')} <Heart size={10} className="text-red-400 fill-red-400" /> {t('common.in')}
            </p>
          </div>

          {/* Center: Brand + Version */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {t('common.brand')}
            </span>
            <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 tabular-nums px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              {t('footer.version')}
            </span>
          </div>

          {/* Right: Tech Stack */}
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${techColors[i]}`}
              >
                {techIcons[i]} {t(`footer.techBadges.${i}`)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
