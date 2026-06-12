import React from 'react';
import { useTasks } from '../../context/TaskContext';
import { useTheme } from '../../context/ThemeContext';
import { Icons } from '../common/Icons';
import logo from '../../assets/logo.png';

export default function Sidebar({
  activeTab,
  setActiveTab,
}) {
  const { stats, categories } = useTasks();
  const { darkMode, setDarkMode } = useTheme();

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white dark:bg-zinc-950 border-r border-slate-200 dark:border-zinc-900 transition-all duration-300">

      {/* Header */}
      <div className="flex items-center gap-3 p-6 border-b border-slate-200 dark:border-zinc-900">
        <img
          src={logo}
          alt="Workspace Logo"
          className="w-14 h-14 object-cover rounded-full border border-slate-200 dark:border-zinc-800"
        />

        <div>
          <h2 className="font-bold text-slate-900 dark:text-white leading-tight">
            Find Your Take
          </h2>

          <span className="text-xs text-slate-500 dark:text-zinc-500 font-medium">
            Workspace Active by khen
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        <NavButton
          active={activeTab === 'dashboard'}
          onClick={() => setActiveTab('dashboard')}
          icon={<Icons.Dashboard />}
          label="Dashboard"
        />

        <NavButton
          active={activeTab === 'tasks'}
          onClick={() => setActiveTab('tasks')}
          icon={<Icons.Tasks />}
          label="Workspace Board"
          count={stats.pending}
        />

        <NavButton
          active={activeTab === 'completed'}
          onClick={() => setActiveTab('completed')}
          icon={<Icons.Completed />}
          label="Completed Log"
          count={stats.completed}
          countColor="emerald"
        />

        <NavButton
          active={activeTab === 'categories'}
          onClick={() => setActiveTab('categories')}
          icon={<Icons.Categories />}
          label="Categories"
          count={categories.length}
        />

        <NavButton
          active={activeTab === 'settings'}
          onClick={() => setActiveTab('settings')}
          icon={<Icons.Settings />}
          label="Settings"
        />
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-zinc-900 flex justify-between items-center">

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-900 transition"
        >
          {darkMode ? (
            <Icons.Sun className="text-amber-400" />
          ) : (
            <Icons.Moon className="text-indigo-500" />
          )}
        </button>

       
      </div>
    </aside>
  );
}

function NavButton({
  active,
  onClick,
  icon,
  label,
  count,
  countColor = 'indigo',
}) {
  const activeClasses = active
    ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
    : 'text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900';

  const badgeColors = {
    indigo:
      'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300',
    emerald:
      'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
  };

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${activeClasses}`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span>{label}</span>
      </div>

      {count !== undefined && count > 0 && (
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-bold ${
            badgeColors[countColor]
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}