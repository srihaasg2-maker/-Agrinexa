import React, { useState } from 'react';
import { useScholar } from '../../context/ScholarContext';
import { 
  Bell, 
  Search, 
  Moon, 
  Sun, 
  LogOut, 
  Menu, 
  GraduationCap, 
  ChevronDown, 
  User, 
  ShieldCheck 
} from 'lucide-react';
import { NotificationDrawer } from './NotificationDrawer';
import { SearchModal } from './SearchModal';

interface HeaderProps {
  onToggleMobileSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileSidebar }) => {
  const { student, logout, darkMode, toggleDarkMode, notifications, setActivePage } = useScholar();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-200/80 dark:border-slate-800 transition-colors no-print">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Left section: Hamburger (Mobile) + Logo & Welcome */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onToggleMobileSidebar}
              className="lg:hidden p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo branding for mobile / top */}
            <div className="flex items-center gap-2.5 lg:hidden">
              <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white shadow-sm">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-gray-900 dark:text-white tracking-tight">
                Scholar
              </span>
            </div>

            {/* Welcome banner on Desktop */}
            <div className="hidden lg:block">
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-gray-900 dark:text-white">
                  Welcome back, <span className="text-primary-600 dark:text-primary-400">{student.name}</span>
                </h1>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  <ShieldCheck className="w-3 h-3" />
                  Sem {student.currentSemester} • B.Tech {student.department || 'CSE'}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Roll No: <span className="font-medium text-gray-700 dark:text-gray-300">{student.rollNumber}</span> | Student ID: {student.id}
              </p>
            </div>
          </div>

          {/* Center: Search Bar Trigger */}
          <div className="flex-1 max-w-md mx-2 hidden md:block">
            <button
              onClick={() => setShowSearch(true)}
              className="w-full flex items-center justify-between px-3.5 py-2 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200/70 dark:hover:bg-slate-700/60 text-gray-500 dark:text-gray-400 rounded-xl text-xs sm:text-sm border border-transparent dark:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-gray-400" />
                <span>Search courses, exams, leaves, rules...</span>
              </div>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-medium rounded bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 shadow-xs">
                Ctrl K
              </kbd>
            </button>
          </div>

          {/* Right section: Search (mobile icon), Dark Mode, Notification, Profile */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search button mobile */}
            <button
              onClick={() => setShowSearch(true)}
              className="md:hidden p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notification Bell */}
            <button
              onClick={() => setShowNotifications(true)}
              className="relative p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-danger text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            <div className="h-6 w-px bg-gray-200 dark:bg-slate-700 mx-1 hidden sm:block" />

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-1.5 sm:px-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-left"
              >
                {student.photo && student.photo !== 'student_photo_url' ? (
                  <img
                    src={student.photo}
                    alt={student.name}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.parentElement?.querySelector('.header-avatar-fallback');
                      if (fallback) (fallback as HTMLElement).style.display = 'flex';
                    }}
                    className="w-8 h-8 rounded-lg object-cover ring-2 ring-primary-500/30"
                  />
                ) : null}
                <div className={`header-avatar-fallback w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-700 to-blue-500 text-white font-bold text-xs flex items-center justify-center font-mono ring-2 ring-primary-500/30 ${student.photo && student.photo !== 'student_photo_url' ? 'hidden' : 'flex'}`}>
                  GSR
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold text-gray-800 dark:text-gray-200 leading-tight">
                    {student.name}
                  </div>
                  <div className="text-[10px] text-gray-400">
                    {student.rollNumber}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
              </button>

              {/* Profile Menu Dropdown */}
              {showProfileMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setShowProfileMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-dropdown border border-gray-100 dark:border-slate-700 py-2 z-40 animate-fade-in">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-slate-700">
                      <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">{student.name}</p>
                      <p className="text-[11px] text-gray-400 truncate">{student.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        setActivePage('info');
                        setShowProfileMenu(false);
                      }}
                      className="w-full px-4 py-2 text-xs text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/60 flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-primary-600" />
                      <span>My Information</span>
                    </button>

                    <button
                      onClick={() => {
                        setActivePage('settings');
                        setShowProfileMenu(false);
                      }}
                      className="w-full px-4 py-2 text-xs text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/60 flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-primary-600" />
                      <span>Security & Preferences</span>
                    </button>

                    <div className="my-1 border-t border-gray-100 dark:border-slate-700" />

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        logout();
                      }}
                      className="w-full px-4 py-2 text-xs text-left text-danger hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2 font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              )}
            </div>

          </div>

        </div>
      </header>

      {/* Popovers */}
      <NotificationDrawer 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
      <SearchModal 
        isOpen={showSearch} 
        onClose={() => setShowSearch(false)} 
      />
    </>
  );
};
