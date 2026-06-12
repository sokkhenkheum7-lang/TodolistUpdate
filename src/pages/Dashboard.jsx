import React from 'react';
import { useTasks } from '../context/TaskContext';
import StatsGrid from '../components/dashboard/StatsGrid';
import ProductivityChart from '../components/dashboard/ProductivityChart';
import DistributionChart from '../components/dashboard/DistributionChart';
import { Icons } from '../components/common/Icons';

export default function Dashboard({ 
  setActiveTab, 
  onNewTask, 
  categoryClasses, 
  priorityClasses, 
  statusClasses, 
  onViewTask 
}) {
  const { stats, tasks, toggleTaskStatus } = useTasks();

  // Safeguard against missing state and sort tasks by latest creation date
  const recentTasks = React.useMemo(() => {
    if (!tasks) return [];
    return [...tasks]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 4);
  }, [tasks]);

  const pendingCount = stats?.pending ?? 0;

  return (
    <div className="space-y-6 p-1 animate-fade-in transition-colors duration-300">
      
      {/* --- HERO GLASS BANNER --- */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/70 p-6 md:p-8 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#0e1322]/60 dark:shadow-2xl">
        {/* Ambient Gradient Backdrops */}
        <div className="absolute top-[-20%] right-[-10%] h-[300px] w-[300px] rounded-full bg-indigo-500/5 blur-[80px] pointer-events-none dark:bg-indigo-500/10" />
        <div className="absolute bottom-[-30%] left-[10%] h-[200px] w-[250px] rounded-full bg-purple-500/5 blur-[60px] pointer-events-none" />
        
        {/* Decorative Vector Ribbon */}
        <div className="absolute top-0 right-0 w-1/4 h-full pointer-events-none opacity-5 dark:opacity-10 hidden md:block">
          <svg className="w-full h-full text-indigo-600 dark:text-indigo-400" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,100 C30,40 70,60 100,0 L100,100 Z" fill="currentColor" />
          </svg>
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-wide dark:text-white">
            Make Todo Make your Future !
          </h2>
          
          <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium dark:text-slate-400">
            Central command nexus initialized. Your pipeline is handling operational metrics. 
            There are currently <span className="text-indigo-600 font-bold dark:text-indigo-400">{pendingCount} metrics on hold</span> inside your master queue.
          </p>
          
          <div className="pt-2 flex flex-wrap gap-3">
            <button 
              onClick={() => setActiveTab('tasks')}
              className="bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition duration-200 shadow-md dark:bg-white dark:hover:bg-slate-200 dark:text-slate-950"
            >
              Browse Task Matrix
            </button>
            <button 
              onClick={onNewTask}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition duration-200 shadow-[0_4px_14px_rgba(99,102,241,0.2)] border border-indigo-500/20 dark:shadow-[0_4px_15px_rgba(99,102,241,0.4)]"
            >
              Quick Add Goal
            </button>
          </div>
        </div>
      </div>

      {/* --- ANALYTICS CARDS GRID --- */}
      <StatsGrid stats={stats} />

      {/* --- ANALYTICS SPLIT CHARTS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white dark:bg-slate-900/40 rounded-3xl p-1 border border-slate-200/60 dark:border-white/5">
          <ProductivityChart stats={stats} />
        </div>
        <div className="lg:col-span-4 bg-white dark:bg-slate-900/40 rounded-3xl p-1 border border-slate-200/60 dark:border-white/5">
          <DistributionChart stats={stats} onManageCategories={() => setActiveTab('categories')} />
        </div>
      </div>

      {/* --- RECENT ACTIVITY LOG --- */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.01] dark:shadow-2xl dark:backdrop-blur-2xl">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 pb-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 shadow-[0_0_8px_rgba(99,102,241,0.5)] dark:bg-indigo-500 dark:shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider dark:text-white">Recent Activity Ledger</h3>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5 dark:text-slate-400">Real-time status tracking for recently modified items.</p>
          </div>
          
          <button 
            onClick={() => setActiveTab('tasks')} 
            className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
          >
            Open Complete Backlog Matrix →
          </button>
        </div>

        {/* Activity List Output */}
        <div className="divide-y divide-slate-100 dark:divide-white/[0.04]">
          {recentTasks.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs font-bold uppercase tracking-wider dark:text-slate-500">
              No active data targets identified inside the current log frame.
            </div>
          ) : (
            recentTasks.map((t) => {
              const isDone = t.status === 'Done';
              
              return (
                <div 
                  key={t.id} 
                  className="group py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80 px-3 rounded-xl transition-all duration-150 dark:hover:bg-white/[0.02]"
                  onClick={() => onViewTask(t)}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Micro Checkbox Switch */}
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleTaskStatus(t.id); }}
                      className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all duration-200 shrink-0 ${
                        isDone 
                          ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 border-transparent text-white dark:text-slate-950 shadow-[0_2px_8px_rgba(16,185,129,0.2)]' 
                          : 'border-slate-300 bg-slate-50 hover:border-indigo-500 dark:border-white/20 dark:bg-white/5 dark:hover:border-indigo-400 dark:group-hover:bg-white/10'
                      }`}
                    >
                      {isDone && <Icons.Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>

                    <div className="min-w-0">
                      <h4 className={`text-sm font-bold tracking-tight transition-colors duration-150 ${
                        isDone 
                          ? 'line-through text-slate-400 font-medium dark:text-slate-600' 
                          : 'text-slate-800 group-hover:text-slate-950 dark:text-slate-200 dark:group-hover:text-white'
                      }`}>
                        {t.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className={`text-[9px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider bg-slate-100 border border-slate-200/60 dark:bg-white/5 dark:border-white/5 ${categoryClasses ? categoryClasses(t.category) : ''}`}>
                          {t.category}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono font-medium flex items-center gap-1.5 dark:text-slate-400">
                          <Icons.Calendar className="w-3.5 h-3.5 text-indigo-500/70 dark:text-indigo-400/60" />
                          {t.dueDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Operational Badges */}
                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <span className={`text-[9px] px-2 py-0.5 rounded-md font-bold uppercase tracking-widest bg-slate-100 border border-slate-200/60 dark:bg-white/5 dark:border-white/5 ${priorityClasses ? priorityClasses(t.priority) : ''}`}>
                      {t.priority}
                    </span>
                    <span className={`text-[9px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider bg-slate-100 border border-slate-200/60 dark:bg-white/5 dark:border-white/5 ${statusClasses ? statusClasses(t.status) : ''}`}>
                      {t.status}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}