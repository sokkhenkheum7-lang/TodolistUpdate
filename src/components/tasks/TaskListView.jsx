import React from 'react';
import { Icons } from '../common/Icons';

export default function TaskListView({ tasks, onEditTask, onDeleteTask, onViewTask, toggleTaskStatus, categoryClasses, priorityClasses, statusClasses }) {
  return (
    <div className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-900 rounded-2xl p-6 shadow-sm">
      {tasks.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <Icons.Info className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <p className="font-semibold text-sm">No tasks matched your active filter selections.</p>
          <p className="text-xs text-slate-500 mt-1">Try resetting filters or adding new objectives!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-zinc-900 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pl-2">Task / Title</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Priority</th>
                <th className="pb-3">Due Date</th>
                <th className="pb-3">Stage Status</th>
                <th className="pb-3 pr-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-900 text-sm">
              {tasks.map((task) => (
                <tr 
                  key={task.id}
                  className="hover:bg-slate-50/60 dark:hover:bg-zinc-900/40 cursor-pointer"
                  onClick={() => onViewTask(task)}
                >
                  <td className="py-4 pl-2">
                    <div className="flex items-center gap-3 pr-4">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleTaskStatus(task.id); }}
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                          task.status === 'Done' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-350 dark:border-zinc-850 hover:border-indigo-500'
                        }`}
                      >
                        {task.status === 'Done' && <Icons.Check className="w-3.5 h-3.5" />}
                      </button>
                      <div className="min-w-0">
                        <h4 className={`font-semibold truncate ${task.status === 'Done' ? 'line-through text-slate-450 dark:text-zinc-500' : 'text-slate-900 dark:text-zinc-200'}`}>
                          {task.title}
                        </h4>
                        <p className="text-xs text-slate-400 dark:text-zinc-500 truncate max-w-md">{task.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full ${categoryClasses(task.category)} font-bold`}>
                      {task.category}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${priorityClasses(task.priority)}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="py-4 text-xs font-semibold text-slate-550 dark:text-zinc-400 whitespace-nowrap">
                    {task.dueDate}
                  </td>
                  <td className="py-4">
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${statusClasses(task.status)}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="py-4 pr-2 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-end gap-1.5">
                      <button
                        onClick={() => onEditTask(task)}
                        className="p-1.5 text-slate-400 hover:text-indigo-500 hover:bg-slate-100 dark:hover:bg-zinc-900 rounded-xl transition"
                      >
                        <Icons.Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteTask(task.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-zinc-900 rounded-xl transition"
                      >
                        <Icons.Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}