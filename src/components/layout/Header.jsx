import React from 'react';
import { Icons } from '../common/Icons';

export default function Header({
  activeTab,
  onNewTask,
  onOpenMobile,
}) {
  const pageTitle =
    activeTab === 'completed'
      ? 'Completed Tasks Log'
      : activeTab === 'tasks'
      ? 'Workspace Task Board'
      : activeTab;

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 dark:border-zinc-900 bg-white/80 dark:bg-black/85 backdrop-blur-md px-6 py-4">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenMobile}
          className="lg:hidden -ml-2 rounded-xl border border-slate-200 dark:border-zinc-800 p-2 transition hover:bg-slate-100 dark:hover:bg-zinc-900"
        >
          <Icons.Menu />
        </button>

        <div>
          <h1 className="flex items-center gap-2 text-xl font-bold capitalize tracking-tight text-slate-900 dark:text-white">
            {pageTitle}
          </h1>

          <p className="hidden md:block text-xs text-slate-400 dark:text-zinc-500">
            workspace-prod-flow-2026
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <button
          onClick={onNewTask}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/10 transition active:scale-95 hover:bg-indigo-500 dark:bg-indigo-600 dark:hover:bg-indigo-500"
        >
          <Icons.Plus className="h-4 w-4" />

          <span className="hidden sm:inline">
            New Task
          </span>
        </button>
      </div>
    </header>
  );
}