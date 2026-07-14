import React, { useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  BookMarked,
  FileText,
  Target,
  CheckSquare,
  ListChecks,
  BarChart3,
  Calendar,
  Settings,
  Search,
  Bell,
  GitBranch,
  X,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useLanguage } from '../../i18n/useLanguage';
import Avatar from '../ui/Avatar';

const mainNav = [
  { labelKey: 'sidebar.items.dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { labelKey: 'sidebar.items.library', icon: BookOpen, path: '/library' },
  { labelKey: 'sidebar.items.notes', icon: FileText, path: '/notes' },
  { labelKey: 'sidebar.items.goals', icon: Target, path: '/goals' },
  { labelKey: 'sidebar.items.habits', icon: CheckSquare, path: '/habits' },
  { labelKey: 'sidebar.items.tasks', icon: ListChecks, path: '/tasks' },
  { labelKey: 'sidebar.items.journal', icon: BookMarked, path: '/journal' },
];

const secondaryNav = [
  { labelKey: 'sidebar.items.docs', icon: BookMarked, path: '/docs' },
  { labelKey: 'sidebar.items.siteMap', icon: GitBranch, path: '/site-map' },
  { labelKey: 'sidebar.items.readingTracker', icon: BookOpen, path: '/reading' },
  { labelKey: 'sidebar.items.analytics', icon: BarChart3, path: '/analytics' },
  { labelKey: 'sidebar.items.calendar', icon: Calendar, path: '/calendar' },
];

const systemNav = [
  { labelKey: 'sidebar.items.search', icon: Search, path: '/search' },
  { labelKey: 'sidebar.items.notifications', icon: Bell, path: '/notifications' },
  { labelKey: 'sidebar.items.settings', icon: Settings, path: '/settings' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { user } = useAuthStore();
  const location = useLocation();
  const activeRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [location.pathname]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
      isActive
        ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 shadow-sm shadow-indigo-500/5 ring-1 ring-indigo-500/10 dark:ring-indigo-400/10'
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200'
    }`;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50
          w-56 h-screen
          bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl
          border-r border-slate-200/60 dark:border-slate-800/60
          flex flex-col
          transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/25 shrink-0 text-xs">
              K
            </div>
            <h1 className="text-[13px] font-bold text-slate-900 dark:text-white tracking-tight">{t('common.brand')}</h1>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 -mr-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer lg:hidden"
            aria-label="Close navigation menu"
          >
            <X size={16} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2.5 space-y-0.5 overflow-y-auto">
          <p className="px-2.5 text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1 mb-1.5">
            {t('sidebar.main')}
          </p>
          {mainNav.map((item) => (
            <NavLink
              key={item.path}
              ref={(el) => { if (location.pathname === item.path) activeRef.current = el; }}
              to={item.path}
              onClick={onClose}
              className={navLinkClass}
            >
              <item.icon size={16} strokeWidth={1.75} />
              {t(item.labelKey)}
            </NavLink>
          ))}

          <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800/80">
            <p className="px-2.5 text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
              {t('sidebar.insights')}
            </p>
            {secondaryNav.map((item) => (
              <NavLink
                key={item.path}
                ref={(el) => { if (location.pathname === item.path) activeRef.current = el; }}
                to={item.path}
                onClick={onClose}
                className={navLinkClass}
              >
                <item.icon size={16} strokeWidth={1.75} />
                {t(item.labelKey)}
              </NavLink>
            ))}
          </div>

          <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800/80">
            <p className="px-2.5 text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
              {t('sidebar.system')}
            </p>
            {systemNav.map((item) => (
              <NavLink
                key={item.path}
                ref={(el) => { if (location.pathname === item.path) activeRef.current = el; }}
                to={item.path}
                onClick={onClose}
                className={navLinkClass}
              >
                <item.icon size={16} strokeWidth={1.75} />
                {t(item.labelKey)}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* User profile */}
        <div className="p-2.5 border-t border-slate-100 dark:border-slate-800/80">
          <NavLink
            to="/profile"
            onClick={onClose}
            className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
          >
            <Avatar src={user?.avatar} name={user?.name} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                {user?.name ?? 'User'}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
            </div>
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
