import React from 'react';
import { Icons } from '../common/Icons';

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onView,
  categoryClasses,
  priorityClasses,
}) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', task.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div
      draggable
      onClick={() => onView(task)}
      onDragStart={handleDragStart}
      className="group relative cursor-grab select-none overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-lg active:cursor-grabbing"
    >
      {/* Hover Glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Badges */}
      <div className="relative z-10 mb-3 flex items-center justify-between gap-2">
        <span
          className={`rounded-lg border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${categoryClasses(
            task.category
          )}`}
        >
          {task.category}
        </span>

        <span
          className={`rounded-lg border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest ${priorityClasses(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h4 className="line-clamp-2 text-sm font-extrabold tracking-tight text-white transition-colors group-hover:text-indigo-200">
          {task.title}
        </h4>

        <p className="mt-1.5 line-clamp-2 text-xs font-medium leading-relaxed text-slate-400">
          {task.description}
        </p>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-4 flex items-center justify-between border-t border-white/10 pt-3.5">
        
        {/* Due Date */}
        <div className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-bold text-slate-400">
          <Icons.Calendar className="h-3.5 w-3.5 text-indigo-400" />
          <span>{task.dueDate}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1" onClick={stopPropagation}>
          <button
            onClick={() => onEdit(task)}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white"
            title="Edit task"
          >
            <Icons.Edit className="h-4 w-4" />
          </button>

          <button
            onClick={() => onDelete(task.id)}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-rose-500/10 hover:text-rose-400"
            title="Delete task"
          >
            <Icons.Trash className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}