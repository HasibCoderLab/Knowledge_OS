import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
  badge?: string;
}

interface FooterLinksProps {
  title: string;
  links: FooterLink[];
  index?: number;
}

const FooterLinks: React.FC<FooterLinksProps> = ({ title, links, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
    >
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5" role="list">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="group relative inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
            >
              <span className="relative">
                {link.label}
                <span className="absolute inset-x-0 -bottom-px h-px bg-slate-900 dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </span>
              {link.badge && (
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 leading-none">
                  {link.badge}
                </span>
              )}
              {link.external && (
                <ArrowUpRight
                  size={12}
                  className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                />
              )}
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default FooterLinks;
