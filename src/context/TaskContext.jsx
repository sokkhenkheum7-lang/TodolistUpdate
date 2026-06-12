import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

const TaskContext = createContext();

const DEFAULT_CATEGORIES = [
  {
    id: 'work',
    name: 'Work',
    description: 'Professional projects and business tasks.',
    color: 'indigo'
  },
  {
    id: 'personal',
    name: 'Personal',
    description: 'Personal goals and daily activities.',
    color: 'green'
  },
  {
    id: 'study',
    name: 'Study',
    description: 'Learning materials and courses.',
    color: 'blue'
  },
  {
    id: 'health',
    name: 'Health',
    description: 'Fitness, wellness and medical activities.',
    color: 'rose'
  },
  {
    id: 'shopping',
    name: 'Shopping',
    description: 'Purchases and shopping lists.',
    color: 'amber'
  }
];
const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'Deploy Production Build to Vercel',
    description: 'Ensure environment variables are configured correctly and perform final end-to-end integration checklist tests.',
    category: 'Work',
    priority: 'High',
    dueDate: '2026-06-15',
    status: 'In Progress',
    createdAt: '2026-06-10T10:00:00.000Z'
  },
  {
    id: 'task-2',
    title: 'Weekly Yoga & Core Health Session',
    description: 'Attend the 60-minute recovery stretching session at local fitness center.',
    category: 'Health',
    priority: 'Medium',
    dueDate: '2026-06-12',
    status: 'Todo',
    createdAt: '2026-06-09T08:30:00.000Z'
  },
  {
    id: 'task-3',
    title: 'Acquire Grocery Items',
    description: 'Stock up on oats, fresh almonds, protein powders, organic broccoli, and light almond milk.',
    category: 'Shopping',
    priority: 'Low',
    dueDate: '2026-06-11',
    status: 'Done',
    createdAt: '2026-06-08T15:45:00.000Z'
  },
  {
    id: 'task-4',
    title: 'Read System Design Chapter 5',
    description: 'Deep dive on vertical/horizontal scaling, database replication, and load balancing mechanics.',
    category: 'Study',
    priority: 'High',
    dueDate: '2026-06-18',
    status: 'Review',
    createdAt: '2026-06-07T11:20:00.000Z'
  },
  {
    id: 'task-5',
    title: 'Draft Marketing Newsletter Copy',
    description: 'Outline release highlights for TaskFlow Pro Beta release and gather social media graphics assets.',
    category: 'Work',
    priority: 'Medium',
    dueDate: '2026-06-14',
    status: 'Todo',
    createdAt: '2026-06-05T09:00:00.000Z'
  },

];

export function TaskProvider({ children }) {
  // Safe state initializer for local storage checks
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('taskflow_tasks');
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });

  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('taskflow_categories');
      return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
    } catch {
      return DEFAULT_CATEGORIES;
    }
  });

  // Background Data Synchronization Hooks
  useEffect(() => {
    localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('taskflow_categories', JSON.stringify(categories));
  }, [categories]);

  // Real-time Analytic Calculations
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'Done').length;
    
    const distributionMap = tasks.reduce((acc, currentTask) => {
      acc[currentTask.status] = (acc[currentTask.status] || 0) + 1;
      return acc;
    }, { Todo: 0, 'In Progress': 0, Review: 0, Done: 0 });

    const highPriority = tasks.filter(t => t.priority === 'High' && t.status !== 'Done').length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    const categoryDistribution = categories.map(cat => ({
      ...cat,
      count: tasks.filter(t => t.category.toLowerCase() === cat.name.toLowerCase()).length
    }));

    return { 
      total, 
      completed, 
      pending: total - completed, 
      highPriority, 
      todo: distributionMap.Todo,
      inProgress: distributionMap['In Progress'], 
      review: distributionMap.Review, 
      completionRate, 
      categoryDistribution 
    };
  }, [tasks, categories]);

  // --- COMPACT OPERATIONS ENGINE (useCallback cached) ---

  const createTask = useCallback((newTaskData) => {
    setTasks(prev => [
      {
        ...newTaskData,
        id: `task-${crypto.randomUUID ? crypto.randomUUID().slice(0, 8) : Date.now()}`,
        createdAt: new Date().toISOString()
      },
      ...prev
    ]);
  }, []);

  const updateTask = useCallback((taskId, updatedFields) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, ...updatedFields } : t));
  }, []);

  const toggleTaskStatus = useCallback((taskId) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, status: t.status === 'Done' ? 'Todo' : 'Done' };
      }
      return t;
    }));
  }, []);

  const deleteTask = useCallback((taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  }, []);
  const addCategory = useCallback((categoryData) => {
  setCategories(prev => [
    ...prev,
    {
      id: crypto.randomUUID
        ? crypto.randomUUID()
        : Date.now().toString(),
      name: categoryData.name,
      description: categoryData.description || '',
      color: categoryData.color || 'indigo'
    }
  ]);
}, []);

const deleteCategory = useCallback((categoryName) => {
  setCategories(prev =>
    prev.filter(cat => cat.name !== categoryName)
  );
}, []);

  // Expose memorized values to prevent unnecessary consumer rerenders
  const contextPayload = useMemo(() => ({
  tasks,
  setTasks,
  categories,
  setCategories,
  stats,
  createTask,
  updateTask,
  toggleTaskStatus,
  deleteTask,
  addCategory,
  deleteCategory
}), [
  tasks,
  categories,
  stats,
  createTask,
  updateTask,
  toggleTaskStatus,
  deleteTask,
  addCategory,
  deleteCategory
]);

  return (
    <TaskContext.Provider value={contextPayload}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used inside a structured TaskProvider component structure.');
  }
  return context;
};