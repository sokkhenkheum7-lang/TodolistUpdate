import React, { useMemo } from 'react';
import { useTasks } from '../context/TaskContext';
import { Icons } from '../components/common/Icons';

export default function CompletedLog({ categoryClasses, showToast, onViewTask }) {
  const { tasks, setTasks, toggleTaskStatus, deleteTask } = useTasks();

  const completedTasks = useMemo(() => {
    return (tasks || []).filter(t => t.status === 'Done');
  }, [tasks]);

  const clearLedger = () => {
    if (window.confirm("Are you sure you want to delete all completed history archives permanently?")) {
      setTasks(tasks.filter(t => t.status !== 'Done'));
      showToast("Historical ledger cleared.", 'info');
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-900 rounded-3xl p-6 md:p-8 shadow-2xl shadow-slate-100/40 dark:shadow-none animate-fade-in transition-all duration-300">
      
      {/* --- ARCHIVE HEADER --- */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-5 mb-8 pb-5 border-b border-slate-100 dark:border-zinc-900">
        <div className="space-y-1">
          
          <h3 className="text-lg font-black tracking-tight text-slate-950 uppercase dark:text-white">
            Goal Completion Archive Ledger
          </h3>
          <p className="text-xs text-slate-400 dark:text-zinc-500 font-medium">
            Permanent history logs of fully successfully evaluated objective milestones.
          </p>
        </div>

        {completedTasks.length > 0 && (
          <button 
            onClick={clearLedger}
            className="self-start sm:self-center group flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-rose-600 bg-rose-50 border border-rose-100 px-4 py-2.5 rounded-xl transition duration-200 hover:bg-rose-100 hover:text-rose-700 dark:bg-rose-950/10 dark:text-rose-400 dark:border-rose-950/30 dark:hover:bg-rose-950/30"
          >
            <Icons.Trash className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            Wipe Ledger History
          </button>
        )}
      </div>

      {/* --- ARCHIVE DATA PORT --- */}
      {completedTasks.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-slate-100 dark:border-zinc-900/60 rounded-2xl bg-slate-50/30 dark:bg-transparent">
          <div className="relative inline-flex items-center justify-center p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 mb-4 shadow-sm">
            <Icons.Check className="w-6 h-6 text-slate-400 dark:text-zinc-500 stroke-[2.5]" />
          </div>
          <p className="font-bold text-sm text-slate-800 dark:text-zinc-300 uppercase tracking-wide">
            Historical ledger is unpopulated
          </p>
          <p className="text-xs text-slate-400 dark:text-zinc-500 max-w-xs mx-auto mt-1.5 font-medium leading-relaxed">
            Finalize ongoing board milestones to securely compile execution histories inside this node.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {completedTasks.map((t) => (
            <div 
              key={t.id} 
              onClick={() => onViewTask(t)}
              className="group p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#090d16]/30 hover:bg-slate-50/70 dark:hover:bg-zinc-900/40 border border-slate-100 dark:border-zinc-900 rounded-2xl cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-slate-100 dark:hover:shadow-none hover:-translate-y-0.5 hover:border-slate-200/80 dark:hover:border-zinc-800"
            >
              {/* Primary Node Context */}
              <div className="flex items-center gap-4 min-w-0">
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleTaskStatus(t.id); }}
                  className="w-5 h-5 rounded-lg bg-emerald-500 dark:bg-emerald-400 border border-transparent text-white dark:text-slate-950 flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20 dark:shadow-emerald-400/10 hover:scale-105 active:scale-95 transition-all"
                >
                  <Icons.Check className="w-3.5 h-3.5 stroke-[3]" />
                </button>
                
                <div className="min-w-0 space-y-0.5">
                  <h4 className="text-sm font-bold tracking-tight text-slate-400 dark:text-zinc-500 line-through truncate group-hover:text-slate-500 dark:group-hover:text-zinc-400 transition-colors">
                    {t.title}
                  </h4>
                  {t.description && (
                    <p className="text-xs text-slate-400/80 dark:text-zinc-600 line-clamp-1 font-medium">
                      {t.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Auxiliary Meta Metrics */}
              <div 
                className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-none border-slate-50 dark:border-zinc-900/40 pt-3 sm:pt-0"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-[9px] px-2.5 py-0.5 rounded-md font-black uppercase tracking-wider bg-slate-100 border border-slate-200 dark:bg-white/5 dark:border-white/5 ${categoryClasses ? categoryClasses(t.category) : ''}`}>
                    {t.category}
                  </span>
                  
                  {t.dueDate && (
                    <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-mono font-medium flex items-center gap-1.5">
                      <Icons.Calendar className="w-3.5 h-3.5 text-slate-400/80 dark:text-zinc-600" />
                      {t.dueDate}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => deleteTask(t.id)}
                  className="p-2 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 border border-transparent hover:border-rose-100 dark:hover:border-rose-950/30 rounded-xl transition duration-150"
                  aria-label="Purge log record"
                >
                  <Icons.Trash className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}