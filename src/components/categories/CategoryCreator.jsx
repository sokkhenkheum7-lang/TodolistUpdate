import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import { Icons } from '../common/Icons';

export default function CategoryCreator({ onAddCategory }) {
  const { categories, tasks } = useTasks();
  const { addCategory } = useTasks();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('indigo');

  const systemCategoryIds = [
    'work',
    'personal',
    'study',
    'health',
    'shopping',
  ];

  const customCategories = categories.filter(
    (cat) => !systemCategoryIds.includes(cat.id)
  );

  const totalCustomTasks = tasks.filter((task) =>
    customCategories.some(
      (cat) => cat.name.toLowerCase() === task.category.toLowerCase()
    )
  ).length;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return;
      addCategory({
      name: name.trim(),
      description: description.trim(),
      color,
});

    setName('');
    setDescription('');
    setColor('indigo');
  };

  const colors = [
    { id: 'indigo', hex: '#6366f1', name: 'Indigo' },
    { id: 'green', hex: '#22c55e', name: 'Green' },
    { id: 'blue', hex: '#3b82f6', name: 'Blue' },
    { id: 'rose', hex: '#f43f5e', name: 'Rose' },
    { id: 'amber', hex: '#f59e0b', name: 'Amber' },
    { id: 'purple', hex: '#a855f7', name: 'Purple' },
    { id: 'cyan', hex: '#06b6d4', name: 'Cyan' },
  ];

  return (
    <div className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-900 rounded-2xl p-6 shadow-sm h-fit animate-fade-in">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white mb-1">
            Create Custom Category
          </h3>

          <p className="text-xs text-slate-400 dark:text-zinc-500">
            Organize tasks using personalized labels and visual color tags.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 p-3 bg-slate-50 dark:bg-zinc-900">
          <p className="text-xs text-slate-400 mb-1">Active Categories</p>
          <h4 className="text-xl font-bold text-slate-900 dark:text-white">
            {customCategories.length}
          </h4>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-zinc-800 p-3 bg-slate-50 dark:bg-zinc-900">
          <p className="text-xs text-slate-400 mb-1">Assigned Tasks</p>
          <h4 className="text-xl font-bold text-slate-900 dark:text-white">
            {totalCustomTasks}
          </h4>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category Name */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Category Title
          </label>

          <input
            type="text"
            required
            placeholder="e.g. Finances, Design"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition text-slate-900 dark:text-white"
          />
        </div>

        {/* Category Description */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Category Description
          </label>

          <textarea
            rows={3}
            placeholder="Describe the purpose of this category..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition text-slate-900 dark:text-white resize-none"
          />
        </div>

        {/* Colors */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Tag Visual Color Accent
          </label>

          <div className="grid grid-cols-4 gap-2.5">
            {colors.map((col) => (
              <button
                key={col.id}
                type="button"
                onClick={() => setColor(col.id)}
                className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition ${
                  color === col.id
                    ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-50/10'
                    : 'border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900'
                }`}
              >
                <span
                  className="w-5 h-5 rounded-full block"
                  style={{ backgroundColor: col.hex }}
                />

                <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-400">
                  {col.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <button
  type="submit"
  className="w-full py-3 mt-4 bg-black hover:bg-zinc-800 text-white font-semibold rounded-xl shadow-lg shadow-black/20 transition-all duration-300 text-sm flex items-center justify-center gap-2"
>
  <Icons.Plus className="w-4 h-4" />
  Add Custom Category
</button>
      </form>
    </div>
  );
}