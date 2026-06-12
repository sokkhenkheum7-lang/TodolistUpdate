import React from 'react';
import { Icons } from '../common/Icons';

export default function TaskDetailsModal({ task, onClose, onEdit, onDelete, toggleStatus, categoryClasses, priorityClasses }) {
  if (!task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      {/* Dark Obsidian Glass Card Container */}
      <div className="bg-zinc-900/70 backdrop-blur-xl rounded-2xl w-full max-w-lg shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7),0_0_40px_0_rgba(255,255,255,0.02)] border border-white/10 overflow-hidden">
        
        {/* Status Indicator Bar */}
        <div className={`h-2 w-full opacity-80 ${
          task.status === 'Todo' ? 'bg-zinc-500' :
          task.status === 'In Progress' ? 'bg-blue-500' :
          task.status === 'Review' ? 'bg-amber-500' : 'bg-emerald-500'
        }`}></div>

        <div className="p-6 space-y-5">
          {/* Header Section */}
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-2">
              <span className={`text-[10px] px-2.5 py-0.5 rounded-full ${categoryClasses(task.category)} font-bold tracking-wider uppercase`}>
                {task.category}
              </span>
              <h3 className="text-lg font-bold text-zinc-100 leading-snug">
                {task.title}
              </h3>
            </div>
            <button 
              onClick={onClose} 
              className="p-1.5 rounded-lg border border-white/10 text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition"
            >
              <Icons.X className="w-5 h-5" />
            </button>
          </div>

          {/* Description Glass Block */}
          <div className="p-4 bg-black/30 rounded-xl border border-white/5 shadow-inner">
            <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
              {task.description || 'No additional parameters listed for this specific task.'}
            </p>
          </div>

          {/* Parameters Grid */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            {/* Priority Tier */}
            <div className="space-y-1 bg-white/5 p-3 rounded-xl border border-white/5 shadow-sm">
              <span className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">Priority Tier</span>
              <div className="flex items-center gap-1.5 pt-0.5 text-zinc-200 font-bold">
                <span className={`w-2 h-2 rounded-full shadow-sm ${task.priority === 'High' ? 'bg-rose-500' : task.priority === 'Medium' ? 'bg-amber-400' : 'bg-emerald-500'}`}></span>
                {task.priority}
              </div>
            </div>

            {/* Operational Stage */}
            <div className="space-y-1 bg-white/5 p-3 rounded-xl border border-white/5 shadow-sm">
              <span className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">Operational Stage</span>
              <div className="flex items-center gap-1.5 pt-0.5 text-zinc-200 font-bold">
                <span className={`w-2 h-2 rounded-full shadow-sm ${task.status === 'Todo' ? 'bg-zinc-400' : task.status === 'In Progress' ? 'bg-blue-500' : task.status === 'Review' ? 'bg-amber-400' : 'bg-emerald-500'}`}></span>
                {task.status}
              </div>
            </div>

            {/* Target Deadline */}
            <div className="space-y-1 bg-white/5 p-3 rounded-xl border border-white/5 shadow-sm">
              <span className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">Target Deadline</span>
              <div className="flex items-center gap-1.5 pt-0.5 font-bold text-zinc-300">
                <Icons.Calendar className="w-4 h-4 text-zinc-400" />
                <span>{task.dueDate}</span>
              </div>
            </div>

            {/* Backlog Register */}
            <div className="space-y-1 bg-white/5 p-3 rounded-xl border border-white/5 shadow-sm">
              <span className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">Backlog Register</span>
              <div className="flex items-center gap-1.5 pt-0.5 font-bold text-zinc-400">
                <Icons.Clock className="w-4 h-4 text-zinc-500" />
                <span>{new Date(task.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Action Footer Button Rails */}
          <div className="pt-4 border-t border-white/5 flex justify-between items-center gap-2">
            <button
              onClick={() => { toggleStatus(task.id); onClose(); }}
              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold rounded-xl transition flex items-center gap-1.5 text-zinc-200 tracking-wide shadow-sm"
            >
              {task.status === 'Done' ? (
                <>
                  <Icons.Clock className="w-4 h-4 text-amber-400" />
                  Restore Active
                </>
              ) : (
                <>
                  <Icons.Check className="w-4 h-4 text-emerald-400" />
                  Mark Completed
                </>
              )}
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => { onEdit(task); onClose(); }}
                className="px-3.5 py-2.5 border border-white/10 hover:bg-white/5 text-xs font-bold rounded-xl transition flex items-center gap-1 text-zinc-200 tracking-wide"
              >
                <Icons.Edit className="w-4 h-4 text-zinc-400" />
                Edit
              </button>
              <button
                onClick={() => { onDelete(task.id); onClose(); }}
                className="px-3.5 py-2.5 bg-rose-600/90 hover:bg-rose-600 border border-rose-500/20 text-white text-xs font-bold rounded-xl transition flex items-center gap-1 shadow-lg shadow-rose-950/20"
              >
                <Icons.Trash className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}