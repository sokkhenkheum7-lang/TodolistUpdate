import React from 'react';
import { useTasks } from '../context/TaskContext';
import CategoryCreator from '../components/categories/CategoryCreator';
import CategoryGrid from '../components/categories/CategoryGrid';

export default function CategoriesPage({ categoryClasses, showToast }) {
  const { categories, setCategories } = useTasks();

  const handleAddCategory = (name, color) => {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    if (categories.some(c => c.id === slug || c.name.toLowerCase() === name.toLowerCase())) {
      showToast('Category already exists.', 'error');
      return;
    }
    const newCat = { id: slug, name, color };
    setCategories([...categories, newCat]);
    showToast(`Category "${name}" created successfully.`);
  };

  const handleDeleteCategory = (catName) => {
    setCategories(categories.filter(c => c.name.toLowerCase() !== catName.toLowerCase()));
    showToast(`Removed custom category "${catName}"`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
      <CategoryCreator onAddCategory={handleAddCategory} />
      <div className="lg:col-span-2">
        <CategoryGrid onDeleteCategory={handleDeleteCategory} categoryClasses={categoryClasses} />
      </div>
    </div>
  );
}