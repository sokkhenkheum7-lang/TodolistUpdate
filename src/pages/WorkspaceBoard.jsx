import React, { useState, useMemo } from 'react';
import { useTasks } from '../context/TaskContext';
import KanbanBoard from '../components/tasks/KanbanBoard';
import TaskListView from '../components/tasks/TaskListView';
import { Icons } from '../components/common/Icons';

export default function WorkspaceBoard({ onEditTask, onDeleteTask, onViewTask, categoryClasses, priorityClasses, statusClasses, showToast }) {
  const { tasks, setTasks, categories, toggleTaskStatus } = useTasks();
  const [viewMode, setViewMode] = useState('kanban');

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ category: 'All', priority: 'All', status: 'All' });
  const [sortBy, setSortBy] = useState('dateAsc');

  const onUpdateStatus = (taskId, targetStatus) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        showToast(`Moved to ${targetStatus}`, "info");
        return { ...t, status: targetStatus };
      }
      return t;
    }));
  };

  const processedTasks = useMemo(() => {
    return tasks
      .filter(t => t.status !== 'Done')
      .filter(t => {
        const matchSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || t.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCat = filters.category === 'All' || t.category.toLowerCase() === filters.category.toLowerCase();
        const matchPri = filters.priority === 'All' || t.priority === filters.priority;
        const matchStat = filters.status === 'All' || t.status === filters.status;
        return matchSearch && matchCat && matchPri && matchStat;
      })
      .sort((a, b) => {
        if (sortBy === 'dateAsc') return new Date(a.dueDate) - new Date(b.dueDate);
        if (sortBy === 'dateDesc') return new Date(b.dueDate) - new Date(a.dueDate);
        const weights = { High: 3, Medium: 2, Low: 1 };
        return sortBy === 'priorityHigh' ? weights[b.priority] - weights[a.priority] : weights[a.priority] - weights[b.priority];
      });
  }, [tasks, searchTerm, filters, sortBy]);

  // Helper for consistent select styling
  const SelectInput = ({ value, onChange, options, label }) => (
    <div className="relative group">
      <select
        value={value}
        onChange={onChange}
        className="appearance-none bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 text-[11px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-800"
      >
        <option value="All">{label}: All</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <Icons.ChevronDown className="absolute right-2 top-2.5 w-3 h-3 text-slate-400 pointer-events-none" />
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* PROFESSIONAL TOOLBAR */}
      <header className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-900 rounded-2xl p-3 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        
        <div className="flex items-center gap-3 w-full xl:w-auto">
          <div className="relative flex-1 xl:w-72">
            <Icons.Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search backlog..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-850 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <SelectInput 
            label="Status" value={filters.status} onChange={(e) => setFilters(p => ({...p, status: e.target.value}))}
            options={[{value:'Todo', label:'Todo'}, {value:'In Progress', label:'In Progress'}, {value:'Review', label:'Review'}]} 
          />
          <SelectInput 
            label="Category" value={filters.category} onChange={(e) => setFilters(p => ({...p, category: e.target.value}))}
            options={categories.map(c => ({value: c.name, label: c.name}))} 
          />
          <SelectInput 
            label="Sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            options={[{value:'dateAsc', label:'Soonest'}, {value:'priorityHigh', label:'High Priority'}]} 
          />

          <div className="h-6 w-px bg-slate-200 dark:bg-zinc-800 mx-1" />

          <div className="bg-slate-100 dark:bg-zinc-900 p-1 rounded-lg flex items-center border dark:border-zinc-800">
            {[ { mode: 'kanban', icon: Icons.Kanban }, { mode: 'list', icon: Icons.List } ].map(({ mode, icon: Icon }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`p-1.5 rounded-md transition-all ${viewMode === mode ? 'bg-white dark:bg-zinc-950 text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* VIEWPORT */}
      <section className="min-h-[60vh]">
        {viewMode === 'kanban' ? (
          <KanbanBoard tasks={processedTasks} onEditTask={onEditTask} onDeleteTask={onDeleteTask} onViewTask={onViewTask} categoryClasses={categoryClasses} priorityClasses={priorityClasses} onUpdateStatus={onUpdateStatus} />
        ) : (
          <TaskListView tasks={processedTasks} onEditTask={onEditTask} onDeleteTask={onDeleteTask} onViewTask={onViewTask} toggleTaskStatus={toggleTaskStatus} categoryClasses={categoryClasses} priorityClasses={priorityClasses} statusClasses={statusClasses} />
        )}
      </section>
    </div>
  );
}