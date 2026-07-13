import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Target,
  CheckSquare,
  FileText,
  Settings,
  LogOut,
  X
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Library', icon: BookOpen, path: '/library' },
  { label: 'Goals', icon: Target, path: '/goals' },
  { label: 'Habits', icon: CheckSquare, path: '/habits' },
  { label: 'Journal', icon: FileText, path: '/journal' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuthStore();

  return (
    <>
      {/* Overlay backdrop - mobile/tablet only */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50
          w-64 h-screen
          bg-white dark:bg-slate-950
          border-r border-slate-200 dark:border-slate-800
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo + Close */}
        <div className="flex items-center justify-between p-4 md:p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/30 shrink-0">
              K
            </div>
            <h1 className="text-base md:text-lg font-bold text-slate-900 dark:text-white tracking-tight">KnowledgeOS</h1>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 -mr-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors lg:hidden"
            aria-label="Close navigation menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 md:px-4 space-y-0.5 overflow-y-auto">
          <p className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 mb-2">Main Menu</p>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                ${isActive
                  ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400'
                  : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900'}
              `}
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}

          <div className="pt-5 mt-2 border-t border-slate-100 dark:border-slate-800">
            <p className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">System</p>
            <NavLink
              to="/settings"
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                ${isActive
                  ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400'
                  : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900'}
              `}
            >
              <Settings size={18} />
              Settings
            </NavLink>
          </div>
        </nav>

        {/* User Section */}
        <div className="p-3 md:p-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 font-bold text-xs shrink-0">
              {user?.name?.[0] || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="p-1.5 text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors shrink-0"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
