import React from 'react';
import { useScholar } from '../../context/ScholarContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, hideToast } = useScholar();

  if (!toast.show) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 shrink-0" />
  };

  const borderColors = {
    success: 'border-emerald-500',
    error: 'border-red-500',
    warning: 'border-amber-500',
    info: 'border-blue-500'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in no-print">
      <div className={`flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 rounded-xl shadow-dropdown border-l-4 ${borderColors[toast.type]} border max-w-md`}>
        {icons[toast.type]}
        <p className="text-sm font-medium flex-1">{toast.message}</p>
        <button 
          onClick={hideToast}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
