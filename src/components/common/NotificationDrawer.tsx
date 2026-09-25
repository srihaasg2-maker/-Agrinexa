import React from 'react';
import { useScholar } from '../../context/ScholarContext';
import { X, Check, Bell, Award, Calendar, FileText, CreditCard, Sparkles } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, markAllNotificationsRead, setActivePage } = useScholar();

  if (!isOpen) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic':
        return <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'exam':
        return <Calendar className="w-4 h-4 text-primary-600 dark:text-primary-400" />;
      case 'leave':
        return <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case 'fee':
        return <CreditCard className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
    }
  };

  const handleNotificationClick = (notif: typeof notifications[0]) => {
    markNotificationRead(notif.id);
    if (notif.linkTarget) {
      setActivePage(notif.linkTarget as any);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden no-print">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-slate-700 flex items-center justify-between bg-gray-50/70 dark:bg-slate-800/80">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Campus Alerts</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Stay updated with academic notices</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={markAllNotificationsRead}
                className="text-xs text-primary-600 dark:text-primary-400 hover:underline font-semibold px-2 py-1"
                title="Mark all as read"
              >
                Mark all read
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 divide-y divide-gray-100 dark:divide-slate-700/60 space-y-2">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <Bell className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No new notifications</p>
              </div>
            ) : (
              notifications.map(item => (
                <div
                  key={item.id}
                  onClick={() => handleNotificationClick(item)}
                  className={`pt-3 pb-3 px-3 rounded-xl cursor-pointer transition-colors ${
                    item.read 
                      ? 'bg-transparent hover:bg-gray-50 dark:hover:bg-slate-700/30' 
                      : 'bg-blue-50/60 dark:bg-blue-950/20 hover:bg-blue-50 dark:hover:bg-blue-950/30'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 p-2 rounded-lg bg-white dark:bg-slate-700 shadow-sm border border-gray-100 dark:border-slate-600 shrink-0">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className={`text-xs sm:text-sm font-semibold truncate ${item.read ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white font-bold'}`}>
                          {item.title}
                        </h4>
                        {!item.read && (
                          <span className="w-2 h-2 rounded-full bg-primary-600 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                        {item.message}
                      </p>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1.5 inline-block">
                        {item.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/80 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              KPRIT Scholar Notification Dispatch v2.4
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
