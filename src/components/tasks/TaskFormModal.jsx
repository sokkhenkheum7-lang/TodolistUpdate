import React, { useState, useEffect } from 'react';
import { Icons } from '../common/Icons';

export default function TaskFormModal({ isOpen, onClose, onSubmit, editingTask, categories }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Work',
    priority: 'Medium',
    dueDate: '',
    status: 'Todo'
  });

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title,
        description: editingTask.description,
        category: editingTask.category,
        priority: editingTask.priority,
        dueDate: editingTask.dueDate,
        status: editingTask.status
      });
    } else {
      setForm({
        title: '',
        description: '',
        category: categories[0]?.name || 'Work',
        priority: 'Medium',
        dueDate: new Date().toISOString().split('T')[0],
        status: 'Todo'
      });
    }
  }, [editingTask, categories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      {/* Dark Obsidian Glass Card Container */}
      <div className="bg-zinc-900/70 backdrop-blur-xl rounded-2xl w-full max-w-lg shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7),0_0_40px_0_rgba(255,255,255,0.02)] border border-white/10 overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-white/5">
          <h3 className="font-bold text-zinc-100 tracking-wide">
            {editingTask ? 'Edit Workspace Deliverable' : 'Add New Task Objective'}
          </h3>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg border border-white/10 text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition"
          >
            <Icons.X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Title Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">Task Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Set up API integrations"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500/40 transition text-zinc-100 placeholder-zinc-600 shadow-inner"
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">Detailed Description</label>
            <textarea
              placeholder="Operational milestones, checklist, or technical goals..."
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500/40 transition resize-none text-zinc-100 placeholder-zinc-600 shadow-inner"
            />
          </div>

          {/* Dropdowns Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">Goal Category</label>
              <div className="relative">
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full pl-3.5 pr-8 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500/40 appearance-none cursor-pointer text-zinc-100 shadow-inner"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.name} className="bg-zinc-950 text-zinc-200">
                      {c.name}
                    </option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
                  <Icons.ChevronDown className="w-4 h-4" />
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">Priority Level</label>
              <div className="relative">
                <select
                  value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value })}
                  className="w-full pl-3.5 pr-8 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500/40 appearance-none cursor-pointer text-zinc-100 shadow-inner"
                >
                  <option value="Low" className="bg-zinc-950 text-zinc-200">Low</option>
                  <option value="Medium" className="bg-zinc-950 text-zinc-200">Medium</option>
                  <option value="High" className="bg-zinc-950 text-zinc-200">High</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
                  <Icons.ChevronDown className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>

          {/* Target Due Date & Initial Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">Target Due Date</label>
              <input
                type="date"
                required
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500/40 transition text-zinc-100 shadow-inner [color-scheme:dark]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">Initial Status</label>
              <div className="relative">
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full pl-3.5 pr-8 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500/40 appearance-none cursor-pointer text-zinc-100 shadow-inner"
                >
                  <option value="Todo" className="bg-zinc-950 text-zinc-200">Todo</option>
                  <option value="In Progress" className="bg-zinc-950 text-zinc-200">In Progress</option>
                  <option value="Review" className="bg-zinc-950 text-zinc-200">Review</option>
                  <option value="Done" className="bg-zinc-950 text-zinc-200">Done</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
                  <Icons.ChevronDown className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>

          {/* Form Actions Footer */}
          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border border-white/10 hover:bg-white/5 font-semibold rounded-xl text-xs tracking-wider transition text-zinc-300 backdrop-blur-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-zinc-100 hover:bg-white font-bold text-zinc-950 rounded-xl text-xs tracking-wider transition shadow-lg shadow-white/5 active:scale-[0.98]"
            >
              Save Deliverable
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}