import React, { useState } from 'react';
import TaskCard from './TaskCard';

const STATUSES = [
  { 
    label: 'Todo', 
    color: 'from-pink-500 to-rose-400', 
    glow: 'shadow-pink-500/20',
    border: 'border-pink-500/50',
    bgHover: 'hover:bg-pink-500/5'
  },
  { 
    label: 'In Progress', 
    color: 'from-violet-600 to-indigo-500', 
    glow: 'shadow-indigo-500/20',
    border: 'border-indigo-500/50',
    bgHover: 'hover:bg-indigo-500/5'
  },
  { 
    label: 'Review', 
    color: 'from-amber-400 to-orange-400', 
    glow: 'shadow-amber-500/20',
    border: 'border-amber-500/50',
    bgHover: 'hover:bg-amber-500/5'
  },
  { 
    label: 'Done', 
    color: 'from-emerald-500 to-teal-400', 
    glow: 'shadow-emerald-500/20',
    border: 'border-emerald-500/50',
    bgHover: 'hover:bg-emerald-500/5'
  },
];

export default function KanbanBoard({
  tasks = [],
  onEditTask,
  onDeleteTask,
  onViewTask,
  categoryClasses,
  priorityClasses,
  onUpdateStatus,
}) {
  const [activeOverColumn, setActiveOverColumn] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e, taskId) => {
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', taskId);
    e.dataTransfer.effectAllowed = 'move';
    
    // Optional: Make the dragged ghost image slightly transparent
    setTimeout(() => {
      e.target.style.opacity = '0.5';
    }, 0);
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    setActiveOverColumn(null);
    e.target.style.opacity = '1';
  };

  const handleDragOver = (e, label) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (activeOverColumn !== label) {
      setActiveOverColumn(label);
    }
  };

  const handleDragLeave = () => {
    setActiveOverColumn(null);
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    setIsDragging(false);
    setActiveOverColumn(null);

    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId && onUpdateStatus) onUpdateStatus(taskId, status);
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4 p-2 w-full max-w-screen-2xl mx-auto">
      {STATUSES.map(({ label, color, glow, border, bgHover }) => {
        const columnTasks = tasks.filter((task) => task?.status === label);
        const isOver = activeOverColumn === label;

        return (
          <div
            key={label}
            onDragOver={(e) => handleDragOver(e, label)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, label)}
            className={`
              relative flex min-h-[650px] flex-col rounded-[2rem] border overflow-hidden
              transition-all duration-300 ease-spring backdrop-blur-xl
              ${isOver 
                ? `scale-[1.02] ${border} bg-white/80 shadow-2xl ${glow} dark:bg-zinc-900/80` 
                : `border-slate-200/50 bg-white/40 shadow-sm dark:border-zinc-800/50 dark:bg-zinc-900/30 ${bgHover}`
              }
              ${isDragging && !isOver ? 'opacity-70 scale-[0.98]' : 'opacity-100'}
            `}
          >
            {/* Ambient Background Glow when dragging over */}
            {isOver && (
              <div className={`absolute inset-0 bg-gradient-to-b ${color} opacity-5 dark:opacity-10 pointer-events-none`} />
            )}

            {/* Sticky Glassmorphism Header */}
            <div className="sticky top-0 z-10 mb-4 flex items-center justify-between border-b border-slate-200/50 bg-white/60 p-5 backdrop-blur-md dark:border-zinc-800/50 dark:bg-zinc-900/60">
              <div className="flex items-center gap-3">
                {/* Pulsing Gradient Dot */}
                <div className="relative flex h-3.5 w-3.5 items-center justify-center">
                  <span className={`absolute inline-flex h-full w-full animate-ping rounded-full bg-gradient-to-tr ${color} opacity-40`} />
                  <span className={`relative inline-flex h-3 w-3 rounded-full bg-gradient-to-tr ${color} shadow-sm`} />
                </div>
                <span className="text-sm font-extrabold uppercase tracking-widest text-slate-800 dark:text-zinc-100">
                  {label}
                </span>
              </div>

              {/* Glowing Counter Badge */}
              <span className={`
                flex h-7 w-7 items-center justify-center rounded-full text-xs font-black shadow-sm transition-colors duration-300
                ${isOver ? `bg-gradient-to-tr ${color} text-white` : 'bg-slate-100 text-slate-500 dark:bg-zinc-800 dark:text-zinc-400'}
              `}>
                {columnTasks.length}
              </span>
            </div>

            {/* Task List Container */}
            <div className="flex-1 space-y-4 overflow-y-auto px-5 pb-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-200 dark:scrollbar-thumb-zinc-800 relative z-0">
              {columnTasks.length === 0 ? (
                /* Enhanced Empty Droppable State */
                <div className={`
                  flex h-40 flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all duration-500
                  ${isOver 
                    ? `${border} bg-white/50 text-slate-800 shadow-inner dark:bg-zinc-900/50 dark:text-zinc-200` 
                    : 'border-slate-200/60 text-slate-400 dark:border-zinc-800/60 dark:text-zinc-500'
                  }
                `}>
                  <div className={`mb-3 rounded-full p-3 transition-transform duration-300 ${isOver ? 'scale-110 bg-slate-100 dark:bg-zinc-800' : 'bg-transparent'}`}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                  <p className="text-sm font-bold tracking-tight">
                    {isOver ? "Release to drop!" : "Drop tasks here"}
                  </p>
                </div>
              ) : (
                columnTasks.map((task) => (
                  <div 
                    key={task.id} 
                    draggable="true"
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    onDragEnd={handleDragEnd}
                    className="group relative transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-grab active:cursor-grabbing"
                  >
                    {/* Hover Glow Effect behind the card */}
                    <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-tr from-slate-200 to-slate-100 opacity-0 blur transition duration-300 group-hover:opacity-100 dark:from-zinc-800 dark:to-zinc-700"></div>
                    
                    <div className="relative h-full w-full bg-white dark:bg-zinc-950 rounded-2xl">
                      <TaskCard
                        task={task}
                        onEdit={onEditTask}
                        onDelete={onDeleteTask}
                        onView={onViewTask}
                        categoryClasses={categoryClasses}
                        priorityClasses={priorityClasses}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}