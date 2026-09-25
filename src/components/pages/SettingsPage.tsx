import React, { useState } from 'react';
import { useScholar } from '../../context/ScholarContext';
import { Breadcrumb } from '../common/Breadcrumb';
import { 
  Settings, 
  Lock, 
  Moon, 
  Sun, 
  Bell, 
  ShieldCheck, 
  RotateCcw, 
  LogOut, 
  Smartphone, 
  Laptop, 
  Check, 
  AlertCircle 
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { darkMode, toggleDarkMode, resetAllData, logout, showToast } = useScholar();

  // Password state
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');

  // Notification toggles
  const [notifMarks, setNotifMarks] = useState(true);
  const [notifExams, setNotifExams] = useState(true);
  const [notifLeaves, setNotifLeaves] = useState(true);
  const [notifFees, setNotifFees] = useState(false);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');

    if (newPass.length < 6) {
      setPassError('New password must contain at least 6 characters.');
      return;
    }

    if (newPass !== confirmPass) {
      setPassError('New passwords do not match. Please re-enter.');
      return;
    }

    setPassSuccess('Account password updated securely.');
    showToast('Password changed successfully!', 'success');
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <Breadcrumb />

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-2xl bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-gray-300">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Settings & Account Security
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Customize portal appearance, update credentials, and manage notification dispatches
          </p>
        </div>
      </div>

      {/* Grid of Settings Cards */}
      <div className="space-y-6">
        
        {/* Appearance & Theme */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-card border border-gray-100 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-slate-700 text-primary-600 dark:text-primary-400">
                {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  Appearance & Dark Theme
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Toggle between high-contrast light mode and eye-care dark mode
                </p>
              </div>
            </div>

            <button
              onClick={toggleDarkMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                darkMode ? 'bg-primary-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Change Password Form */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-card border border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-2.5 mb-4">
            <Lock className="w-5 h-5 text-primary-600" />
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Change Account Password
            </h3>
          </div>

          {passError && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{passError}</span>
            </div>
          )}

          {passSuccess && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>{passSuccess}</span>
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md text-xs">
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                placeholder="Enter current password (default: password123)"
                required
                className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl font-mono text-gray-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="Min 6 characters"
                  required
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl font-mono text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Re-type new password"
                  required
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl font-mono text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="py-2.5 px-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-colors shadow-sm"
            >
              Update Password
            </button>
          </form>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-card border border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-2.5 mb-4">
            <Bell className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Notification Preferences
            </h3>
          </div>

          <div className="space-y-3 divide-y divide-gray-100 dark:divide-slate-700 text-xs">
            <div className="pt-3 flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-800 dark:text-gray-200">Exam Schedules & Hall Ticket Releases</p>
                <p className="text-gray-400 text-[11px]">Instant alerts when seating or timings are scheduled</p>
              </div>
              <input
                type="checkbox"
                checked={notifExams}
                onChange={(e) => setNotifExams(e.target.checked)}
                className="w-4 h-4 rounded text-primary-600"
              />
            </div>

            <div className="pt-3 flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-800 dark:text-gray-200">Internal Marks & Grade Declarations</p>
                <p className="text-gray-400 text-[11px]">Receive push alerts when mid or internal marks are certified</p>
              </div>
              <input
                type="checkbox"
                checked={notifMarks}
                onChange={(e) => setNotifMarks(e.target.checked)}
                className="w-4 h-4 rounded text-primary-600"
              />
            </div>

            <div className="pt-3 flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-800 dark:text-gray-200">Leave Application Approvals</p>
                <p className="text-gray-400 text-[11px]">Status updates from Department Advisors and Head of Dept</p>
              </div>
              <input
                type="checkbox"
                checked={notifLeaves}
                onChange={(e) => setNotifLeaves(e.target.checked)}
                className="w-4 h-4 rounded text-primary-600"
              />
            </div>
          </div>
        </div>

        {/* Active Sessions & Reset Data */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-card border border-gray-100 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
              Reset Application Demo State
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Clear local storage cache and revert marks, leaves, and profiles back to initial mock records.
            </p>
          </div>

          <button
            onClick={resetAllData}
            className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 rounded-xl text-xs font-bold transition-colors whitespace-nowrap"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Mock Data</span>
          </button>
        </div>

      </div>

    </div>
  );
};
