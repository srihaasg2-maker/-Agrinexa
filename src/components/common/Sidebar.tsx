import React from 'react';
import { useScholar, NavigationPage } from '../../context/ScholarContext';
import { 
  LayoutDashboard, 
  CalendarDays, 
  BookOpenCheck, 
  UserCircle2, 
  ReceiptIndianRupee, 
  CalendarRange, 
  Ticket, 
  BookMarked, 
  Award, 
  Settings, 
  GraduationCap, 
  X, 
  LogOut,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  id: NavigationPage;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const { activePage, setActivePage, logout, leaveRequests, notifications } = useScholar();

  const pendingLeaves = leaveRequests.filter(l => l.status === 'Pending').length;
  const unreadNotifs = notifications.filter(n => !n.read).length;

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      id: 'leaves',
      label: 'Leave Request',
      icon: <CalendarDays className="w-5 h-5" />,
      badge: pendingLeaves > 0 ? `${pendingLeaves}` : undefined
    },
    {
      id: 'enrollment',
      label: 'Enrollment',
      icon: <BookOpenCheck className="w-5 h-5" />
    },
    {
      id: 'info',
      label: 'My Information',
      icon: <UserCircle2 className="w-5 h-5" />
    },
    {
      id: 'fees',
      label: 'Fee & Reimbursement',
      icon: <ReceiptIndianRupee className="w-5 h-5" />
    },
    {
      id: 'exams',
      label: 'Exam Schedule',
      icon: <CalendarRange className="w-5 h-5" />
    },
    {
      id: 'hall-tickets',
      label: 'Hall Tickets',
      icon: <Ticket className="w-5 h-5" />
    },
    {
      id: 'curriculum',
      label: 'Curriculum & Regulations',
      icon: <BookMarked className="w-5 h-5" />
    },
    {
      id: 'marks',
      label: 'Marks & Results',
      icon: <Award className="w-5 h-5" />
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-5 h-5" />
    }
  ];

  const handleNavClick = (pageId: NavigationPage) => {
    setActivePage(pageId);
    onCloseMobile();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800">
      
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-gray-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-700 to-primary-500 flex items-center justify-center text-white shadow-md shadow-primary-500/20">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-lg text-gray-900 dark:text-white tracking-tight leading-none block">
              Scholar
            </span>
            <span className="text-[10px] font-semibold text-primary-600 dark:text-primary-400 tracking-wide uppercase">
              KPRIT Portal
            </span>
          </div>
        </div>

        {/* Close button on mobile */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <p className="px-3 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
          Student Services
        </p>

        {navItems.map(item => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-600/25 dark:bg-primary-600'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800/80 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`shrink-0 transition-colors ${
                  isActive ? 'text-white' : 'text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400'
                }`}>
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </div>

              <div className="flex items-center gap-1.5">
                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white text-primary-600' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {item.id === 'marks' && !isActive && (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    A
                  </span>
                )}
                <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${
                  isActive ? 'opacity-100 text-white' : 'text-gray-400'
                }`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer Info / Logout */}
      <div className="p-3 border-t border-gray-200 dark:border-slate-800 bg-gray-50/70 dark:bg-slate-900/50">
        <div className="px-3 py-2 rounded-xl bg-blue-50/80 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 mb-2">
          <div className="text-[11px] font-semibold text-primary-800 dark:text-primary-300">
            Term Status: Active
          </div>
          <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
            3rd Year I Sem (2024-2028)
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-danger hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out Session</span>
        </button>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0 no-print z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden no-print">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" 
            onClick={onCloseMobile} 
          />
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl animate-fade-in">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
