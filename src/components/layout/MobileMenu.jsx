import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useTasks } from '../../context/TaskContext';
import { Icons } from '../common/Icons';
import logo from '../../assets/logo.png';

export default function MobileMenu({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
}) {
  const { darkMode, setDarkMode } = useTheme();
  const { stats, categories } = useTasks();

  if (!isOpen) return null;

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Icons.Dashboard className="w-5 h-5" />,
    },
    {
      id: 'tasks',
      label: 'Workspace Board',
      icon: <Icons.Tasks className="w-5 h-5" />,
      count: stats?.pending || 0,
    },
    {
      id: 'completed',
      label: 'Completed Log',
      icon: <Icons.Completed className="w-5 h-5" />,
      count: stats?.completed || 0,
      countColor: 'emerald',
    },
    {
      id: 'categories',
      label: 'Categories',
      icon: <Icons.Categories className="w-5 h-5" />,
      count: categories?.length || 0,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Icons.Settings className="w-5 h-5" />,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Premium Backdrop Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/30 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modern Drawer Container */}
      <div className="relative z-10 flex h-full w-72 max-w-xs flex-col bg-white dark:bg-zinc-950 p-5 shadow-2xl border-r border-slate-100 dark:border-zinc-900 transition-transform duration-300 ease-out">
        
        {/* Header Profile Section */}
        <div className="mb-6 flex items-center justify-between border-b border-slate-100 dark:border-zinc-900 pb-5">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Logo"
              className="w-10 h-10 object-cover rounded-xl border border-slate-200/60 dark:border-zinc-800 shadow-sm"
            />
            <div>
              <h2 className="font-bold text-base text-slate-900 dark:text-zinc-50 tracking-tight leading-none">
                Find Your Take
              </h2>
              <span className="text-xs text-slate-400 dark:text-zinc-500 font-medium mt-1 inline-block">
                Workspace active by Khen
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 dark:border-zinc-800 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 transition hover:bg-slate-50 dark:hover:bg-zinc-900 focus:outline-none"
          >
            <Icons.X className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Navigation Menu */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto px-1 py-2">
          {menuItems.map((item) => {
            const active = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  active
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-600/10'
                    : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900/60 hover:text-slate-900 dark:hover:text-zinc-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={active ? 'text-white' : 'text-slate-400 dark:text-zinc-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.count > 0 && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold tracking-wide transition-colors ${
                      active
                        ? 'bg-white/20 text-white'
                        : item.countColor === 'emerald'
                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
                        : 'bg-slate-100 text-slate-600 dark:bg-zinc-900 dark:text-zinc-400'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Actions (Only Theme Toggle) */}
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-zinc-900 flex items-center justify-between">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center justify-center rounded-xl border border-slate-200 dark:border-zinc-800 p-2.5 text-slate-500 dark:text-zinc-400 transition hover:bg-slate-50 dark:hover:bg-zinc-900 focus:outline-none"
            aria-label="Toggle layout theme"
          >
            {darkMode ? (
              <Icons.Sun className="h-5 w-5 text-amber-500" />
            ) : (
              <Icons.Moon className="h-5 w-5 text-indigo-600" />
            )}
          </button>
        </div>

      </div>
    </div>
  );
}