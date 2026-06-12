import React from 'react';
import { Icons } from './Icons';

export default function Toast({ toasts }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map((t) => (
        <div 
          key={t.id} 
          className={`p-4 rounded-xl shadow-xl flex items-center gap-3 animate-slide-in border text-sm ${
            t.type === 'error' ? 'bg-red-50 text-red-800 border-red-200 dark:bg-red-950/85 dark:text-red-200 dark:border-zinc-800' : 
            t.type === 'info' ? 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/85 dark:text-blue-200 dark:border-zinc-800' : 
            'bg-green-50 text-green-800 border-green-200 dark:bg-green-950/85 dark:text-green-200 dark:border-zinc-800'
          }`}
        >
          <div className="shrink-0">
            {t.type === 'error' ? <Icons.Alert className="w-5 h-5 text-red-500" /> : <Icons.CheckCircle className="w-5 h-5 text-green-500" />}
          </div>
          <span className="flex-1 font-semibold">{t.message}</span>
        </div>
      ))}
    </div>
  );
}