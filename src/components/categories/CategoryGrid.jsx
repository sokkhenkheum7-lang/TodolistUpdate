import React from 'react';
import { useTasks } from '../../context/TaskContext';
import { Icons } from '../common/Icons';

const COLOR_MAP = {
  indigo: 'bg-indigo-500',
  blue: 'bg-blue-500',
  green: 'bg-emerald-500',
  amber: 'bg-amber-500',
  rose: 'bg-rose-500',
};

export default function CategoryGrid({
  onDeleteCategory,
  categoryClasses,
}) {
  const { categories, tasks } = useTasks();

  const systemCategoryIds = [
    'work',
    'personal',
    'study',
    'health',
    'shopping',
  ];

  const customCategories = categories.filter(
    (cat) => !systemCategoryIds.includes(cat.id)
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-900 dark:bg-zinc-950">
      <div className="mb-5">
        <h3 className="font-bold text-slate-900 dark:text-white">
          Active Category Backlogs
        </h3>

        <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
          Manage your custom categories and assigned tasks
        </p>
      </div>

      {customCategories.length === 0 ? (
        <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-slate-200 dark:border-zinc-800">
          <p className="text-sm text-slate-400 dark:text-zinc-500">
            No custom categories available
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {customCategories.map((cat) => {
            const totalAssigned = tasks.filter(
              (task) =>
                task.category?.toLowerCase() ===
                cat.name?.toLowerCase()
            ).length;

            const colorClass =
              COLOR_MAP[cat.color] || 'bg-cyan-500';

            return (
              <div
                key={cat.id}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all hover:border-slate-300 dark:border-zinc-900 dark:bg-zinc-900/60 dark:hover:border-zinc-800"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`h-3 w-3 rounded-full ${colorClass}`}
                  />

                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      {cat.name}
                    </h4>

                    {cat.description && (
                      <p className="mt-0.5 text-xs text-slate-500 dark:text-zinc-400">
                        {cat.description}
                      </p>
                    )}

                    <p className="mt-1 text-[11px] text-slate-400 dark:text-zinc-500">
                      {totalAssigned} assigned objective
                      {totalAssigned !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteCategory(cat.name)}
                  className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-red-500 dark:hover:bg-zinc-800 dark:hover:text-red-400"
                  title="Delete Category"
                >
                  <Icons.Trash className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}