import React from 'react';
import { useScholar, NavigationPage } from '../../context/ScholarContext';
import { ChevronRight, Home } from 'lucide-react';

const PAGE_NAMES: Record<NavigationPage, string> = {
  dashboard: 'Dashboard',
  leaves: 'Leave Request',
  enrollment: 'Course Enrollment',
  info: 'My Information',
  fees: 'Fee & Reimbursement',
  exams: 'Exam Schedule',
  'hall-tickets': 'Hall Tickets',
  curriculum: 'Curriculum & Regulations',
  marks: 'Marks & Results',
  settings: 'Settings'
};

export const Breadcrumb: React.FC = () => {
  const { activePage, setActivePage } = useScholar();

  return (
    <nav className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4 no-print">
      <button 
        onClick={() => setActivePage('dashboard')}
        className="flex items-center gap-1 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </button>
      {activePage !== 'dashboard' && (
        <>
          <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-gray-400" />
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            {PAGE_NAMES[activePage]}
          </span>
        </>
      )}
    </nav>
  );
};
