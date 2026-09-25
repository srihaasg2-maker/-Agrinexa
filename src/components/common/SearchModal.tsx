import React, { useState, useEffect } from 'react';
import { useScholar, NavigationPage } from '../../context/ScholarContext';
import { Search, FileText, Award, Calendar, CreditCard, BookOpen, User, Settings, ArrowRight, X } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: string;
  page: NavigationPage;
  icon: React.ReactNode;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { setActivePage } = useScholar();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or listener
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const searchableItems: SearchItem[] = [
    {
      id: 'marks',
      title: 'Marks & Results',
      description: 'View Semester 3 GPA (3.80), Mid Marks (35/40), Final Internal (38/50) and Grade Sheet',
      category: 'Academics',
      page: 'marks',
      icon: <Award className="w-4 h-4 text-emerald-600" />
    },
    {
      id: 'cs301',
      title: 'CS301 - Data Structures',
      description: 'Dr. Rajesh Singh • Mid: 35/40, Final Internal: 38/50, Grade A',
      category: 'Marks & Results',
      page: 'marks',
      icon: <Award className="w-4 h-4 text-emerald-600" />
    },
    {
      id: 'cs302',
      title: 'CS302 - Database Management',
      description: 'Prof. Anjali Sharma • Mid: 38/40, Final Internal: 42/50, Grade A+',
      category: 'Marks & Results',
      page: 'marks',
      icon: <Award className="w-4 h-4 text-emerald-600" />
    },
    {
      id: 'leaves',
      title: 'Apply for Leave',
      description: 'Submit sick, casual, or medical leave with auto duration calculator',
      category: 'Student Portal',
      page: 'leaves',
      icon: <FileText className="w-4 h-4 text-amber-600" />
    },
    {
      id: 'enrollment',
      title: 'Course Enrollment',
      description: 'View 5 enrolled subjects, faculty instructors, and class schedules',
      category: 'Academics',
      page: 'enrollment',
      icon: <BookOpen className="w-4 h-4 text-blue-600" />
    },
    {
      id: 'exams',
      title: 'Exam Schedule & Dates',
      description: 'Nov 15 (CS301 A101) & Nov 18 (CS302 A105) seating arrangements',
      category: 'Examinations',
      page: 'exams',
      icon: <Calendar className="w-4 h-4 text-primary-600" />
    },
    {
      id: 'hall-ticket',
      title: 'Download Hall Ticket (PDF)',
      description: 'Official university admit card with photo and candidate instructions',
      category: 'Examinations',
      page: 'hall-tickets',
      icon: <Calendar className="w-4 h-4 text-primary-600" />
    },
    {
      id: 'fees',
      title: 'Fee Payment & Reimbursement',
      description: 'Check fee status (₹1,72,000 Paid) & submit research/project claims',
      category: 'Finance',
      page: 'fees',
      icon: <CreditCard className="w-4 h-4 text-purple-600" />
    },
    {
      id: 'student-info',
      title: 'My Information (Profile)',
      description: 'Personal details, masked Aadhar, permanent address, parent contacts',
      category: 'Profile',
      page: 'info',
      icon: <User className="w-4 h-4 text-sky-600" />
    },
    {
      id: 'curriculum',
      title: 'Curriculum & Academic Regulations',
      description: 'Read grading scales, attendance threshold (75%), and graduation rules',
      category: 'Policies',
      page: 'curriculum',
      icon: <BookOpen className="w-4 h-4 text-indigo-600" />
    },
    {
      id: 'settings',
      title: 'Portal Settings & Password',
      description: 'Dark mode toggle, notification preferences, reset demo state',
      category: 'System',
      page: 'settings',
      icon: <Settings className="w-4 h-4 text-gray-600" />
    }
  ];

  const filtered = searchableItems.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (page: NavigationPage) => {
    setActivePage(page);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 no-print">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      <div className="relative max-w-xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-slate-700 animate-fade-in">
        {/* Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-gray-100 dark:border-slate-700">
          <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, exams, marks, leaves, policies... (or press Esc to close)"
            className="w-full bg-transparent text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400 text-sm">
              No matching pages or records found for "{query}"
            </div>
          ) : (
            <div className="space-y-1">
              {filtered.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.page)}
                  className="w-full text-left p-3 rounded-xl hover:bg-blue-50/80 dark:hover:bg-slate-700/60 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-gray-50 dark:bg-slate-700 border border-gray-100 dark:border-slate-600 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {item.title}
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors shrink-0 ml-2" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-gray-50 dark:bg-slate-800/80 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between text-[11px] text-gray-400">
          <span>Navigation Quick Jump</span>
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 font-mono">ESC</kbd>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};
