import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search, ChevronRight, Clock, BookOpen, Zap, Layers, Cpu, Network, Code, Globe,
  ArrowUpRight, Lightbulb, Keyboard, HelpCircle, ChevronDown,
  type LucideIcon,
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import {
  docs, docCategories, whatsNew, faqItems, keyboardShortcuts,
  type DocItem,
} from '../../data/docs';

const categoryIcons: Record<string, LucideIcon> = {
  'getting-started': Zap,
  'core-features': Layers,
  'advanced': Cpu,
  'architecture': Network,
  'api': Code,
  'ecosystem': Globe,
};

const categoryColors: Record<string, string> = {
  'getting-started': 'indigo',
  'core-features': 'emerald',
  'advanced': 'violet',
  'architecture': 'amber',
  'api': 'blue',
  'ecosystem': 'rose',
};

const statusBadgeVariant: Record<DocItem['status'], 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
  stable: 'success',
  beta: 'warning',
  new: 'info',
  updated: 'info',
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
};

export const DocsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('docs');

  const filteredDocs = useMemo(() => {
    return docs.filter((doc) => {
      const matchesSearch =
        !searchQuery ||
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = activeCategory === 'all' || doc.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const popularDocs = docs.filter((d) => d.popular);
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: docs.length };
    docCategories.forEach((c) => {
      counts[c.id] = docs.filter((d) => d.category === c.id).length;
    });
    return counts;
  }, []);

  return (
    <div className="space-y-10 md:space-y-14 lg:space-y-16 max-w-6xl">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">
              <BookOpen size={14} />
              Documentation Center
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
              How can we{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">
                help you?
              </span>
            </h1>
            <p className="text-sm md:text-[15px] text-slate-500 dark:text-slate-400 mt-2 max-w-xl leading-relaxed">
              Search documentation, explore guides, and learn how KnowledgeOS works.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
              {docs.length} articles
            </span>
            <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
            <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
              {docCategories.length} categories
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="relative group">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search documentation, features, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-12 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm text-slate-900 dark:text-slate-100 outline-none transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-500 shadow-sm"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-400 dark:text-slate-500 rounded border border-slate-200 dark:border-slate-700">
              <span>⌘</span>K
            </kbd>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mt-5">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer border ${
              activeCategory === 'all'
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            All ({categoryCounts.all})
          </button>
          {docCategories.map((cat) => {
            const Icon = categoryIcons[cat.id] || BookOpen;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer border ${
                  activeCategory === cat.id
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Icon size={12} strokeWidth={2} />
                {cat.title} ({categoryCounts[cat.id]})
              </button>
            );
          })}
        </div>
      </motion.section>

      {/* Tab bar: Docs | Quick Links | What's New | FAQ | Shortcuts */}
      <div>
        <div className="flex gap-0.5 border-b border-slate-200 dark:border-slate-800 overflow-x-auto mb-8">
          {[
            { id: 'docs', label: 'All Articles' },
            { id: 'quick-links', label: 'Quick Links' },
            { id: 'whats-new', label: "What's New" },
            { id: 'faq', label: 'FAQ' },
            { id: 'shortcuts', label: 'Shortcuts' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setActiveCategory('all'); setSearchQuery(''); }}
              className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* All Articles */}
        {activeTab === 'docs' && (
          <motion.div variants={container} initial="hidden" animate="show">
            {filteredDocs.length === 0 ? (
              <div className="text-center py-16">
                <Search size={40} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">No results found</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Try different keywords or browse all categories.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {filteredDocs.map((doc) => (
                  <motion.div key={doc.id} variants={item}>
                    <Card hoverable className="p-5 group h-full">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:scale-105 transition-transform shrink-0 ring-1 ring-slate-200 dark:ring-slate-700">
                          <doc.icon size={16} strokeWidth={1.75} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              {doc.title}
                            </h3>
                            <ArrowUpRight
                              size={12}
                              className="text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 transition-colors shrink-0 opacity-0 group-hover:opacity-100"
                            />
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-2.5">
                            {doc.description}
                          </p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant={statusBadgeVariant[doc.status]}>{doc.status}</Badge>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
                              <Clock size={10} /> {doc.readTime} min
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Quick Links */}
        {activeTab === 'quick-links' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="space-y-8"
          >
            {/* Popular / Getting Started */}
            <section>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Lightbulb size={16} className="text-amber-500" />
                Popular Articles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {popularDocs.map((doc) => (
                  <Card key={doc.id} hoverable className="p-4 group">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform shrink-0">
                        <doc.icon size={14} strokeWidth={2} />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {doc.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{doc.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Categories overview */}
            <section>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">Browse by Category</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {docCategories.map((cat) => {
                  const Icon = categoryIcons[cat.id] || BookOpen;
                  const catDocs = docs.filter((d) => d.category === cat.id);
                  return (
                    <div key={cat.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer p-4 group" onClick={() => { setActiveTab('docs'); setActiveCategory(cat.id); }}>
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-xl bg-${cat.color}-50 dark:bg-${cat.color}-500/10 text-${cat.color}-600 dark:text-${cat.color}-400 group-hover:scale-105 transition-transform shrink-0 ring-1 ring-${cat.color}-200 dark:ring-${cat.color}-800`}>
                          <Icon size={16} strokeWidth={1.75} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{cat.title}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{cat.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[10px] font-medium text-indigo-600 dark:text-indigo-400">{catDocs.length} articles</span>
                            <ChevronRight size={12} className="text-slate-300 dark:text-slate-600 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </motion.div>
        )}

        {/* What's New */}
        {activeTab === 'whats-new' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="space-y-6"
          >
            {whatsNew.map((release) => (
              <Card key={release.version} className="p-5 md:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1">
                      <Badge variant="info">{release.version}</Badge>
                      <span className="text-xs text-slate-400 dark:text-slate-500">{release.date}</span>
                    </div>
                  </div>
                </div>
                <ul className="space-y-2">
                  {release.changes.map((change, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-[7px] shrink-0" />
                      {change}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </motion.div>
        )}

        {/* FAQ */}
        {activeTab === 'faq' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="space-y-4 max-w-3xl"
          >
            {faqItems.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} index={i} />
            ))}
          </motion.div>
        )}

        {/* Shortcuts */}
        {activeTab === 'shortcuts' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="space-y-8 max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <Keyboard size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Keyboard Shortcuts</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Navigate faster without touching the mouse.</p>
              </div>
            </div>
            {keyboardShortcuts.map((group) => (
              <div key={group.group}>
                <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                  {group.group}
                </h4>
                <div className="space-y-1.5">
                  {group.shortcuts.map((shortcut) => (
                    <div
                      key={shortcut.keys}
                      className="flex items-center justify-between py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800"
                    >
                      <span className="text-sm text-slate-700 dark:text-slate-300">{shortcut.description}</span>
                      <kbd className="px-2 py-0.5 bg-white dark:bg-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 rounded-md border border-slate-200 dark:border-slate-700 shadow-sm">
                        {shortcut.keys}
                      </kbd>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

/* ── FAQ Accordion ─────────────────────────────────────── */
const FAQItem: React.FC<{ question: string; answer: string; index: number }> = ({ question, answer, index }) => {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
      >
        <span className="text-sm font-medium text-slate-900 dark:text-slate-100 pr-4">{question}</span>
        <ChevronDown
          size={16}
          className={`text-slate-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 pb-4">
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
};
