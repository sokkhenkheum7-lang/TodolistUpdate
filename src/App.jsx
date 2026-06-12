import React, { useState } from 'react';
import { TaskProvider, useTasks } from './context/TaskContext';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import MobileMenu from './components/layout/MobileMenu';
import Dashboard from './pages/Dashboard';
import WorkspaceBoard from './pages/WorkspaceBoard';
import CompletedLog from './pages/CompletedLog';
import CategoriesPage from './pages/CategoriesPage';
import SettingsPage from './pages/SettingsPage';
import TaskFormModal from './components/tasks/TaskFormModal';
import TaskDetailsModal from './components/tasks/TaskDetailsModal';
import Toast from './components/common/Toast';

function AppGate() {
  const { tasks, setTasks, categories, toggleTaskStatus, stats } = useTasks();
  
  const [user, setUser] = useState({
    name: "sokkhenkeum123",
    email: "sokkhenkeum123@gmail.com",
    avatar: "[https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop&q=80](https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop&q=80)"
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [viewingTask, setViewingTask] = useState(null);
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(p => [...p, { id, message, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 4000);
  };

  const getCategoryColorClass = (catName) => {
    const match = categories.find(c => c.name.toLowerCase() === catName?.toLowerCase());
    const col = match ? match.color : 'indigo';
    const colors = {
      indigo: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-900/55',
      green: 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300 border border-green-200/50 dark:border-green-900/55',
      blue: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200/50 dark:border-blue-900/55',
      rose: 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200/50 dark:border-rose-900/55',
      amber: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200/50 dark:border-amber-900/55',
      purple: 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border border-purple-200/50 dark:border-purple-900/55',
      cyan: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300 border border-cyan-200/50 dark:border-cyan-900/55'
    };
    return colors[col] || colors.indigo;
  };

  const getPriorityBadgeClass = (p) => {
    switch (p) {
      case 'High': return 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300 border border-red-200/30 dark:border-red-900/40';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-350 border border-yellow-200/30 dark:border-yellow-900/40';
      default: return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-350 border border-emerald-200/30 dark:border-emerald-900/40';
    }
  };

  const getStatusColorClass = (s) => {
    switch (s) {
      case 'Todo': return 'bg-slate-100 text-slate-750 dark:bg-zinc-900 dark:text-zinc-300';
      case 'In Progress': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300';
      case 'Review': return 'bg-amber-100 text-amber-750 dark:bg-amber-950/40 dark:text-amber-300';
      default: return 'bg-emerald-100 text-emerald-750 dark:bg-emerald-950/40 dark:text-emerald-300';
    }
  };

  const handleTaskSubmit = (taskData) => {
    if (editingTask) {
      setTasks(p => p.map(t => t.id === editingTask.id ? { ...t, ...taskData } : t));
      showToast("Workspace task updated successfully");
    } else {
      const newTask = {
        ...taskData,
        id: `task-${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      setTasks([newTask, ...tasks]);
      showToast("Added new workspace task goal");
    }
    setFormOpen(false);
  };

  const handleDeleteTask = (id) => {
    setTasks(p => p.filter(t => t.id !== id));
    showToast("Task goal deleted permanently", "info");
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            setActiveTab={setActiveTab} 
            onNewTask={() => { setEditingTask(null); setFormOpen(true); }}
            categoryClasses={getCategoryColorClass}
            priorityClasses={getPriorityBadgeClass}
            statusClasses={getStatusColorClass}
            onViewTask={setViewingTask}
          />
        );
      case 'tasks':
        return (
          <WorkspaceBoard 
            onEditTask={(task) => { setEditingTask(task); setFormOpen(true); }} 
            onDeleteTask={handleDeleteTask}
            onViewTask={setViewingTask}
            categoryClasses={getCategoryColorClass}
            priorityClasses={getPriorityBadgeClass}
            statusClasses={getStatusColorClass}
            showToast={showToast}
          />
        );
      case 'completed':
        return (
          <CompletedLog 
            categoryClasses={getCategoryColorClass}
            showToast={showToast}
            onViewTask={setViewingTask}
          />
        );
      case 'categories':
        return (
          <CategoriesPage 
            categoryClasses={getCategoryColorClass}
            showToast={showToast}
          />
        );
      case 'settings':
        return (
          <SettingsPage 
            user={user} 
            setUser={setUser} 
            showToast={showToast} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-slate-50/50 dark:bg-black text-slate-800 dark:text-zinc-100 transition-colors duration-300">
      <Sidebar
  activeTab={activeTab}
  setActiveTab={setActiveTab}
  onLogout={() => setUser(null)}
/>

<MobileMenu
  isOpen={mobileOpen}
  onClose={() => setMobileOpen(false)}
  activeTab={activeTab}
  setActiveTab={setActiveTab}
  onLogout={() => setUser(null)}
/>
      
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header activeTab={activeTab} onNewTask={() => { setEditingTask(null); setFormOpen(true); }} onOpenMobile={() => setMobileOpen(true)} />
        <main className="flex-1 p-6 z-10 relative">
          {renderActiveView()}
        </main>
      </div>

      <TaskFormModal isOpen={formOpen} onClose={() => setFormOpen(false)} onSubmit={handleTaskSubmit} editingTask={editingTask} categories={categories} />
      <TaskDetailsModal task={viewingTask} onClose={() => setViewingTask(null)} onEdit={(t) => { setEditingTask(t); setFormOpen(true); }} onDelete={handleDeleteTask} toggleStatus={toggleTaskStatus} categoryClasses={getCategoryColorClass} priorityClasses={getPriorityBadgeClass} />
      
      <Toast toasts={toasts} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <AppGate />
      </TaskProvider>
    </ThemeProvider>
  );
}