import React from 'react';

// Recommended professional, accessible color map with matching soft background tracks
const COLOR_MAP = {
  rose: { bar: 'bg-rose-500', track: 'bg-rose-100 dark:bg-rose-950/30' },
  green: { bar: 'bg-emerald-500', track: 'bg-emerald-100 dark:bg-emerald-950/30' },
  blue: { bar: 'bg-blue-500', track: 'bg-blue-100 dark:bg-blue-950/30' },
  amber: { bar: 'bg-amber-500', track: 'bg-amber-100 dark:bg-amber-950/30' },
  indigo: { bar: 'bg-indigo-500', track: 'bg-indigo-100 dark:bg-indigo-950/30' },
};

const DEFAULT_COLOR = { bar: 'bg-slate-500', track: 'bg-slate-100 dark:bg-zinc-900' };

export default function DistributionChart({
  stats,
  onManageCategories,
}) {
  const totalTasks = stats?.total ?? 0;
  const categories = stats?.categoryDistribution?.slice(0, 5) ?? [];

  const getPercentage = (count) =>
    totalTasks ? Math.round((count / totalTasks) * 100) : 0;

  return (
    <div className="bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-900 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full transition-all duration-200">
      <div>
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-sm font-bold tracking-tight text-slate-900 dark:text-zinc-50">
            Target Distributions
          </h3>
          <p className="mt-1 text-xs text-slate-400 dark:text-zinc-500 font-medium">
            Goal density maps by workspace category
          </p>
        </div>

        {/* Content */}
        {categories.length === 0 ? (
          <div className="py-8 text-center border border-dashed border-slate-100 dark:border-zinc-900 rounded-xl">
            <p className="text-xs font-medium text-slate-400 dark:text-zinc-500">
              No metrics available to display
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {categories.map((category, index) => {
              const percentage = getPercentage(category.count);
              const scheme = COLOR_MAP[category.color] || DEFAULT_COLOR;

              return (
                <div
                  key={category.name || index}
                  className="space-y-2 group p-2 -mx-2 rounded-xl transition-colors hover:bg-slate-50/50 dark:hover:bg-zinc-900/40"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700 dark:text-zinc-300">
                      {category.name}
                    </span>

                    <span className="tabular-nums font-medium text-slate-400 dark:text-zinc-500">
                      <span className="text-slate-700 dark:text-zinc-300 font-bold">{category.count}</span>
                      {category.count === 1 ? ' task' : ' tasks'}{' '}
                      <span className="text-slate-300 dark:text-zinc-700 mx-1">|</span>{' '}
                      <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{percentage}%</span>
                    </span>
                  </div>

                  {/* Premium Layered Progress Bar Track */}
                  <div className={`h-2.5 w-full overflow-hidden rounded-full ${scheme.track}`}>
                    <div
                      className={`h-full rounded-full transition-all duration-500 ease-out shadow-sm ${scheme.bar}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <button
        onClick={onManageCategories}
        className="mt-6 w-full rounded-xl border border-slate-200 dark:border-zinc-800 px-4 py-2.5 text-xs font-semibold text-slate-600 dark:text-zinc-400 transition-all duration-200 hover:bg-slate-50 dark:hover:bg-zinc-900 hover:text-slate-900 dark:hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 active:scale-[0.98]"
      >
        Configure Categories
      </button>
    </div>
  );
}