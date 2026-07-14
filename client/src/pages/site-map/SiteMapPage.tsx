import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronDown, ChevronRight, LayoutDashboard, ArrowRight,
  Target, BookOpen, FileText, CheckSquare, ListChecks, BookMarked,
  BarChart3, Calendar, Search, Bell, Settings, User, Library,
  Globe, Zap, Workflow, GitBranch, Route, Layers, History,
  Star, type LucideIcon,
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import {
  siteHierarchy, featureCards, dependencyLinks, workflowSteps,
  quickStartSteps, versionHistory, whatsNewEntries,
  type SiteNode, type FeatureStatus,
} from '../../data/siteMap';

const statusConfig: Record<FeatureStatus, { variant: 'success' | 'warning' | 'info' | 'default'; label: string; dot: string }> = {
  available: { variant: 'success', label: 'Available', dot: 'bg-emerald-500' },
  beta: { variant: 'warning', label: 'Beta', dot: 'bg-amber-500' },
  upcoming: { variant: 'info', label: 'Upcoming', dot: 'bg-blue-500' },
  planned: { variant: 'default', label: 'Planned', dot: 'bg-slate-400' },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const itemAnim = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
};

/* ── Tree Node ─────────────────────────────────────────── */
const TreeNode: React.FC<{ node: SiteNode; depth?: number }> = ({ node, depth = 0 }) => {
  const [expanded, setExpanded] = useState(depth < 1);
  const hasChildren = node.children && node.children.length > 0;
  const cfg = statusConfig[node.status];
  const Icon = node.icon;

  return (
    <div>
      <div
        className={`flex items-center gap-2 py-2 px-3 rounded-xl transition-all duration-200 cursor-pointer group hover:bg-slate-50 dark:hover:bg-slate-800/60 ${
          depth === 0 ? 'bg-slate-50/50 dark:bg-slate-800/30' : ''
        }`}
        style={{ paddingLeft: `${12 + depth * 20}px` }}
      >
        <button
          onClick={() => hasChildren && setExpanded(!expanded)}
          className={`p-0.5 rounded transition-colors ${hasChildren ? 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer' : 'invisible'}`}
        >
          {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        <div className={`p-1.5 rounded-lg shrink-0 transition-transform duration-200 group-hover:scale-105 ${
          depth === 0 ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' :
          depth === 1 ? 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400' :
          'bg-transparent text-slate-400 dark:text-slate-500'
        }`}>
          <Icon size={depth === 0 ? 16 : 13} strokeWidth={depth === 0 ? 1.75 : 1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-semibold truncate ${
              depth === 0 ? 'text-slate-900 dark:text-slate-100' : 'text-slate-700 dark:text-slate-300'
            }`}>
              {node.label}
            </span>
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
          </div>
          {(depth < 2) && node.description && (
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 truncate max-w-md">{node.description}</p>
          )}
        </div>
        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full border shrink-0 ${
          node.status === 'available' ? 'text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10' :
          node.status === 'beta' ? 'text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/10' :
          node.status === 'upcoming' ? 'text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20 bg-blue-50 dark:bg-blue-500/10' :
          'text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
        }`}>
          {cfg.label}
        </span>
      </div>
      {hasChildren && expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {node.children!.map((child) => (
            <TreeNode key={child.id} node={child} depth={depth + 1} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

/* ── Dependency arrows SVG ────────────────────────────── */
const DependencyArrows: React.FC<{ links: typeof dependencyLinks; cards: typeof featureCards }> = ({ links, cards }) => {
  const cardPositions: Record<string, number> = {};
  cards.forEach((c, i) => { cardPositions[c.id] = i; });

  return (
    <div className="relative overflow-x-auto pb-6">
      <svg width={cards.length * 120 + 40} height="120" className="w-full min-w-[500px]">
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#818cf8" />
          </marker>
        </defs>
        {links.map((link, i) => {
          const fromIdx = cardPositions[link.from];
          const toIdx = cardPositions[link.to];
          if (fromIdx === undefined || toIdx === undefined) return null;
          const x1 = fromIdx * 120 + 60;
          const y1 = 28;
          const x2 = toIdx * 120 + 60;
          const y2 = 28;
          const midY = 60;
          return (
            <g key={i}>
              <path
                d={`M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`}
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                className="dark:stroke-slate-700"
                markerEnd="url(#arrowhead)"
              />
              <text
                x={(x1 + x2) / 2}
                y={midY - 8}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize="9"
                className="dark:fill-slate-500"
              >
                {link.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/* ── Main Page ─────────────────────────────────────────── */
export const SiteMapPage: React.FC = () => {
  const [activeView, setActiveView] = useState('tree');

  const views = [
    { id: 'tree', label: 'Site Tree', icon: GitBranch },
    { id: 'features', label: 'Features', icon: Layers },
    { id: 'start', label: 'Quick Start', icon: Zap },
    { id: 'workflow', label: 'Workflows', icon: Workflow },
    { id: 'dependencies', label: 'Dependencies', icon: Route },
    { id: 'history', label: 'Version History', icon: History },
  ];

  return (
    <div className="space-y-10 md:space-y-14 max-w-6xl">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="flex items-center gap-2 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">
          <LayoutDashboard size={14} />
          Site Map
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
          Explore{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">
            KnowledgeOS
          </span>
        </h1>
        <p className="text-sm md:text-[15px] text-slate-500 dark:text-slate-400 mt-2 max-w-xl leading-relaxed">
          Interactive overview of every page, feature, and workflow in the platform.
        </p>

        {/* View switcher */}
        <div className="flex flex-wrap gap-2 mt-6">
          {views.map((v) => {
            const Icon = v.icon;
            return (
              <button
                key={v.id}
                onClick={() => setActiveView(v.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer border ${
                  activeView === v.id
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <Icon size={12} strokeWidth={2} />
                {v.label}
              </button>
            );
          })}
        </div>
      </motion.section>

      {/* Site Tree */}
      {activeView === 'tree' && (
        <motion.div variants={container} initial="hidden" animate="show">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <GitBranch size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Site Hierarchy</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Interactive tree view of all pages and features</p>
            </div>
          </div>
          <Card className="p-4 md:p-5">
            <div className="space-y-0.5">
              {siteHierarchy.map((node) => (
                <TreeNode key={node.id} node={node} depth={0} />
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Features Grid */}
      {activeView === 'features' && (
        <motion.div variants={container} initial="hidden" animate="show">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-xl bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400">
              <Layers size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">All Features</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">{featureCards.length} features — available, beta, upcoming, and planned</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {featureCards.map((feature) => {
              const cfg = statusConfig[feature.status];
              const colorMap: Record<string, string> = {
                indigo: 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
                emerald: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
                violet: 'bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400',
                orange: 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400',
                blue: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400',
                rose: 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400',
                cyan: 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
                amber: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
                pink: 'bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400',
              };
              return (
                <motion.div key={feature.id} variants={itemAnim}>
                  <Card hoverable className="p-5 group h-full">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-xl ${colorMap[feature.color] || colorMap.indigo} group-hover:scale-105 transition-transform shrink-0`}>
                        <feature.icon size={16} strokeWidth={1.75} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{feature.title}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{feature.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant={cfg.variant}>{cfg.label}</Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Quick Start */}
      {activeView === 'start' && (
        <motion.div variants={container} initial="hidden" animate="show">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Zap size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Quick Start Journey</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">8 steps to get started with KnowledgeOS</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickStartSteps.map((step) => (
              <motion.div key={step.id} variants={itemAnim}>
                <Card hoverable className="p-5 group h-full relative overflow-hidden">
                  <div className="absolute top-3 right-3 text-[10px] font-bold text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-1.5 py-0.5 rounded-full">
                    Step {step.id}
                  </div>
                  <div className="flex flex-col items-center text-center pt-2">
                    <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform mb-3">
                      <step.icon size={22} strokeWidth={1.75} />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">{step.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{step.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Workflows */}
      {activeView === 'workflow' && (
        <motion.div variants={container} initial="hidden" animate="show">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Workflow size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Recommended Workflows</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Daily and weekly routines designed for maximum productivity</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
            <div className="lg:col-span-8">
              <Card className="p-5">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-5">Daily Workflow</h3>
                <div className="relative">
                  <div className="absolute left-[19px] top-2 bottom-2 w-px bg-slate-200 dark:bg-slate-700" />
                  <div className="space-y-6">
                    {workflowSteps.map((step, i) => {
                      const colorMap: Record<string, string> = {
                        indigo: 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800',
                        emerald: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
                        violet: 'bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800',
                        amber: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800',
                        blue: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
                      };
                      return (
                        <div key={step.id} className="relative flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 z-10 ${colorMap[step.color] || colorMap.indigo}`}>
                            <step.icon size={16} strokeWidth={1.75} />
                          </div>
                          <div className="flex-1 min-w-0 pt-1.5">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{step.title}</h4>
                              <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">{step.duration}</span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{step.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </div>
            <div className="lg:col-span-4">
              <Card className="p-5">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Weekly Review</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
                  Every Sunday, review your analytics, adjust goals, and plan the week ahead.
                </p>
                <div className="space-y-3">
                  {[
                    { label: 'Review analytics', detail: 'Check trends and insights' },
                    { label: 'Adjust goals', detail: 'Update milestones as needed' },
                    { label: 'Plan next week', detail: 'Set priorities and tasks' },
                    { label: 'Journal reflection', detail: 'Weekly summary entry' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-slate-700 dark:text-slate-300">{item.label}</p>
                        <p className="text-[10px] text-slate-400">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </motion.div>
      )}

      {/* Dependencies */}
      {activeView === 'dependencies' && (
        <motion.div variants={container} initial="hidden" animate="show">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <Route size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Feature Dependency Map</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">How features connect and depend on each other</p>
            </div>
          </div>
          <Card className="p-5">
            <DependencyArrows links={dependencyLinks} cards={featureCards} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-4">
              {featureCards.map((card) => {
                const cfg = statusConfig[card.status];
                return (
                  <div key={card.id} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <div className="p-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 ring-1 ring-slate-200 dark:ring-slate-700">
                      <card.icon size={13} strokeWidth={1.75} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">{card.title}</p>
                      <span className={`w-1.5 h-1.5 rounded-full inline-block ${cfg.dot}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Version History */}
      {activeView === 'history' && (
        <motion.div variants={container} initial="hidden" animate="show">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              <History size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Version History</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Product evolution from v1.0.0 to present</p>
            </div>
          </div>
          <div className="space-y-4">
            {versionHistory.map((version) => (
              <Card key={version.version} hoverable className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2.5 mb-0.5">
                      <Badge variant="info">{version.version}</Badge>
                      <span className="text-xs text-slate-400 dark:text-slate-500">{version.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {version.features.map((feat) => (
                    <span
                      key={feat}
                      className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800 text-[11px] font-medium text-slate-700 dark:text-slate-300 rounded-lg border border-slate-100 dark:border-slate-700"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* What's New mini-section */}
          <div className="mt-10">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Star size={16} className="text-amber-500" />
              Recent Updates
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {whatsNewEntries.map((entry) => (
                <Card key={entry.date + entry.title} hoverable className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-1.5 rounded-lg shrink-0 ${
                      entry.tag === 'new' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                      entry.tag === 'feature' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' :
                      'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                    }`}>
                      {entry.tag === 'new' ? <Zap size={14} /> : entry.tag === 'feature' ? <Star size={14} /> : <ArrowRight size={14} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{entry.title}</h4>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">{entry.date}</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{entry.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
