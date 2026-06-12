import React from 'react';
import { Icons } from '../common/Icons';

export default function StatsGrid({ stats }) {
  const cards = [
    {
      title: 'Total Workspace Volume',
      value: stats?.total ?? 0,
      icon: (
        <Icons.Tasks className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
      ),
      iconBg: 'bg-indigo-50 dark:bg-indigo-950/40',
      detail: `${stats?.completionRate ?? 0}% completion rate`,
      badgeColor: 'bg-indigo-500',
    },
    {
      title: 'Goals Completed',
      value: stats?.completed ?? 0,
      icon: <Icons.Completed className="w-5 h-5 text-emerald-500" />,
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/40',
      detail: 'Archived to historical ledger',
      badgeColor: 'bg-emerald-500',
    },
    {
      title: 'Pending Workload',
      value: stats?.pending ?? 0,
      icon: <Icons.Clock className="w-5 h-5 text-amber-500" />,
      iconBg: 'bg-amber-50 dark:bg-amber-950/40',
      detail: 'Requires active management',
      badgeColor: 'bg-amber-500',
    },
    {
      title: 'Critical Focus',
      value: stats?.highPriority ?? 0,
      icon: <Icons.Alert className="w-5 h-5 text-rose-500" />,
      iconBg: 'bg-rose-50 dark:bg-rose-950/40',
      detail: 'Immediate action required',
      badgeColor: 'bg-rose-500',
      pulse: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="group relative overflow-hidden rounded-2xl border border-slate-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-200 dark:hover:border-zinc-800 hover:shadow-md"
        >
          {/* Header */}
          <div className="mb-4 flex items-start justify-between">
            <span className="block pt-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              {card.title}
            </span>

            <div
              className={`rounded-xl p-2 transition-transform duration-300 group-hover:scale-110 ${card.iconBg}`}
            >
              {card.icon}
            </div>
          </div>

          {/* Value */}
          <div className="mb-2 text-3xl font-bold tracking-tight tabular-nums text-slate-900 dark:text-zinc-50">
            {card.value}
          </div>

          {/* Footer */}
          <p className="flex items-center gap-2 text-[11px] font-medium text-slate-500 dark:text-zinc-400">
            <span className="relative flex h-1.5 w-1.5">
              {card.pulse && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
              )}

              <span
                className={`relative inline-flex h-1.5 w-1.5 rounded-full ${card.badgeColor}`}
              />
            </span>

            {card.detail}
          </p>

          {/* Hover Overlay */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 bg-gradient-to-br from-transparent via-transparent to-slate-50/30 dark:to-zinc-900/10" />
        </div>
      ))}
    </div>
  );
}