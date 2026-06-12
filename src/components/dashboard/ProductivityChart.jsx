import React from 'react';
import { Icons } from '../common/Icons';

export default function ProductivityChart({ stats = {} }) {
  // Ensure we don't divide by zero and safely handle undefined props
  const total = Math.max(stats.total || 0, 0);
  const safeTotal = total || 1;

  const chartData = [
    {
      label: 'Todo',
      value: stats.todo || 0,
      color: 'from-indigo-600 to-indigo-400 dark:from-indigo-500 dark:to-indigo-300',
      bgColor: 'bg-indigo-500/10',
      textColor: 'text-indigo-600 dark:text-indigo-400',
    },
    {
      label: 'Active',
      value: stats.inProgress || 0,
      color: 'from-blue-600 to-cyan-400 dark:from-blue-500 dark:to-cyan-300',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-600 dark:text-blue-400',
      pulse: true,
    },
    {
      label: 'Review',
      value: stats.review || 0,
      color: 'from-amber-500 to-orange-400 dark:from-amber-400 dark:to-orange-300',
      bgColor: 'bg-amber-500/10',
      textColor: 'text-amber-600 dark:text-amber-400',
    },
    {
      label: 'Done',
      value: stats.completed || 0,
      color: 'from-emerald-600 to-teal-400 dark:from-emerald-500 dark:to-teal-300',
      bgColor: 'bg-emerald-500/10',
      textColor: 'text-emerald-600 dark:text-emerald-400',
    },
  ];

  return (
    <div className="
      relative overflow-hidden rounded-3xl p-6
      border border-zinc-200/80 dark:border-zinc-800/50
      bg-gradient-to-b from-white/90 to-white/50 dark:from-zinc-900/90 dark:to-zinc-950/50
      backdrop-blur-2xl shadow-xl shadow-zinc-200/50 dark:shadow-none
      transition-all duration-300
    ">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER */}
      <div className="relative flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Productivity Overview
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Live task distribution across workflow
          </p>
        </div>

        {/* Premium Live Badge */}
        <div className="
          flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium
          rounded-full border border-zinc-200 dark:border-zinc-800
          bg-zinc-50 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 shadow-sm
        ">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          Live Updates
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      {total === 0 ? (
        /* PREMIUM EMPTY STATE */
        <div className="relative flex flex-col items-center justify-center h-56 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/20 text-zinc-400">
          <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm mb-3">
            <Icons.Info className="w-5 h-5 text-zinc-400 dark:text-zinc-500" />
          </div>
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">No data tracked yet</p>
          <span className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
            Create and progress tasks to populate analytics
          </span>
        </div>
      ) : (
        <>
          {/* TOP KPI STRIP */}
          <div className="grid grid-cols-4 gap-2.5 mb-8">
            {chartData.map((item) => {
              const percentage = Math.round((item.value / safeTotal) * 100);
              return (
                <div
                  key={item.label}
                  className="
                    group/kpi text-left rounded-xl p-3
                    bg-zinc-50/50 dark:bg-zinc-900/30
                    border border-zinc-200/60 dark:border-zinc-800/40
                    hover:border-zinc-300 dark:hover:border-zinc-700
                    hover:bg-white dark:hover:bg-zinc-900/60
                    transition-all duration-200
                  "
                >
                  <div className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
                    {item.label}
                  </div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-base font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                      {item.value}
                    </span>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-normal">
                      ({percentage}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CHART */}
          <div className="flex items-end justify-between gap-2 h-40 px-2">
            {chartData.map((item) => {
              const height = (item.value / safeTotal) * 100;

              return (
                <div 
                  key={item.label} 
                  className="group/column flex flex-col items-center w-full h-full justify-end gap-3"
                >
                  {/* FIXED-HEIGHT TRACK BAR CONTAINER */}
                  <div className="relative w-full h-full flex items-end justify-center">
                    {/* Background Track */}
                    <div className="
                      absolute inset-x-0 bottom-0 top-0 max-w-[28px] mx-auto rounded-full
                      bg-zinc-100/70 dark:bg-zinc-900/40 
                      border border-zinc-200/20 dark:border-zinc-800/10
                    " />
                    
                    {/* Filled Bar */}
                    <div
                      className={`
                        relative w-full max-w-[28px] rounded-full bg-gradient-to-t ${item.color}
                        transition-all duration-1000 ease-out origin-bottom
                        group-hover/column:brightness-110 shadow-sm
                        ${item.pulse ? 'animate-[pulse_2.5s_infinite]' : ''}
                      `}
                      style={{ height: `${Math.max(height, height > 0 ? 6 : 0)}%` }} // Gives tiny values a small legible presence
                    >
                      {/* Floating Micro-tooltip on hover */}
                      <div className="
                        absolute -top-7 left-1/2 -translate-x-1/2 
                        opacity-0 group-hover/column:opacity-100 
                        pointer-events-none transition-all duration-200 transform scale-95 group-hover/column:scale-100
                        bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 
                        text-[10px] font-bold px-1.5 py-0.5 rounded shadow-md z-10
                      ">
                        {Math.round(height)}%
                      </div>
                    </div>
                  </div>

                  {/* LABEL */}
                  <div className="
                    text-[11px] font-medium transition-colors duration-200
                    text-zinc-400 dark:text-zinc-500 group-hover/column:text-zinc-800 dark:group-hover/column:text-zinc-200
                  ">
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* FOOTER */}
      <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[11px] text-zinc-400 dark:text-zinc-500">
          <Icons.Info className="w-3.5 h-3.5" />
          Analytics update instantly
        </span>

        <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded-md">
          {total} {total === 1 ? 'task' : 'tasks'} allocated
        </span>
      </div>
    </div>
  );
}