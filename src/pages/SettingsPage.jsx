import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useTasks } from '../context/TaskContext';

const SunIcon = () => (
  <svg
    className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.243 17.657l.707.707M6.343 6.343l.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

const MoonIcon = () => (
  <svg
    className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-12"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);

const TrashIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

export default function SettingsPage({ showToast }) {
  const { darkMode, setDarkMode } = useTheme();
  const { setTasks } = useTasks();

  const handleClearAll = () => {
    const confirmed = window.confirm(
      'Danger: Proceeding will wipe all custom configurations. Are you sure?'
    );

    if (!confirmed) return;

    setTasks([]);
    showToast?.('Workspace database completely purged.', 'info');
  };

  return (
    <div className="max-w-3xl p-1 space-y-8 animate-fade-in transition-colors duration-300">
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl shadow-slate-100/40 transition-all duration-300 dark:border-zinc-900 dark:bg-zinc-950 dark:shadow-none md:p-8">
        <div className="mb-8 border-b border-slate-100 pb-5 dark:border-zinc-900">
          
          <h3 className="text-lg font-black uppercase tracking-tight text-slate-950 dark:text-white">
            System Settings
          </h3>

          <p className="mt-0.5 text-xs font-medium text-slate-400 dark:text-zinc-500">
            Database maintenance controls and workspace operational layout
            settings.
          </p>
        </div>

        <div className="space-y-4">
          {/* Theme */}
          <div className="group flex flex-col justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-5 transition-all duration-200 hover:border-slate-200 dark:border-zinc-900/60 dark:bg-[#090d16]/30 dark:hover:border-zinc-800 sm:flex-row sm:items-center">
            <div>
              <h4 className="flex items-center gap-2.5 text-sm font-bold text-slate-900 dark:text-zinc-100">
                <span
                  className={`rounded-xl border p-2 transition-all ${
                    darkMode
                      ? 'border-zinc-800 bg-zinc-900 text-amber-400'
                      : 'border-slate-200 bg-white text-indigo-600 shadow-sm'
                  }`}
                >
                  {darkMode ? <MoonIcon /> : <SunIcon />}
                </span>

                Dark Theme Workspace
              </h4>

              <p className="pl-10 text-xs font-medium text-slate-400 dark:text-zinc-500">
                Toggle standard high contrast view layout or deep dark obsidian
                canvas themes.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark mode preference"
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out sm:self-center ${
                darkMode
                  ? 'bg-indigo-600 shadow-md shadow-indigo-600/20'
                  : 'bg-slate-200 dark:bg-zinc-800'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm transition duration-300 ease-in-out ${
                  darkMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Danger Zone */}
          <div className="group flex flex-col justify-between gap-4 rounded-2xl border border-rose-100/60 bg-rose-50/20 p-5 transition-all duration-200 hover:border-rose-200 dark:border-rose-950/15 dark:bg-rose-950/5 dark:hover:border-rose-950/30 sm:flex-row sm:items-center">
            <div>
              <h4 className="flex items-center gap-2.5 text-sm font-bold text-rose-600 dark:text-rose-400">
                <span className="rounded-xl border border-rose-100 bg-rose-50 p-2 text-rose-500 shadow-sm dark:border-rose-900/30 dark:bg-rose-950/20 dark:text-rose-400">
                  <TrashIcon />
                </span>

                Purge Complete Workspace
              </h4>

              <p className="pl-10 text-xs font-medium text-slate-400 dark:text-zinc-500">
                Permanently delete all workspace backlog arrays and clear local
                storage logs. This is irreversible.
              </p>
            </div>

            <button
              type="button"
              onClick={handleClearAll}
              className="whitespace-nowrap rounded-xl bg-rose-600 px-5 py-2.5 text-[11px] font-black uppercase tracking-wider text-white shadow-md shadow-rose-600/10 transition duration-150 active:scale-[0.98] hover:bg-rose-500"
            >
              Wipe Database
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}