import React, { useState, useEffect } from 'react';
import { useScholar } from '../../context/ScholarContext';
import { Breadcrumb } from '../common/Breadcrumb';
import { 
  CalendarDays, 
  Clock, 
  Send, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Clock4, 
  Trash2, 
  Upload, 
  Paperclip,
  XCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { triggerConfetti, formatDate } from '../../utils/printUtils';
import { LeaveRequest } from '../../types/student';

export const LeavePage: React.FC = () => {
  const { leaveRequests, addLeaveRequest, cancelLeaveRequest } = useScholar();

  const [leaveType, setLeaveType] = useState<LeaveRequest['type']>('Sick');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [calculatedDays, setCalculatedDays] = useState(1);
  const [reason, setReason] = useState('');
  const [attachment, setAttachment] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');

  // Auto calculate days when dates change
  useEffect(() => {
    if (fromDate && toDate) {
      const start = new Date(fromDate);
      const end = new Date(toDate);
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setCalculatedDays(diffDays > 0 ? diffDays : 1);
    } else {
      setCalculatedDays(1);
    }
  }, [fromDate, toDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromDate || !toDate || !reason.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      addLeaveRequest({
        type: leaveType,
        fromDate,
        toDate,
        days: calculatedDays,
        reason: reason.trim(),
        attachmentName: attachment || undefined
      });

      triggerConfetti();
      setIsSubmitting(false);
      // Reset form
      setReason('');
      setFromDate('');
      setToDate('');
      setAttachment(null);
    }, 500);
  };

  const filteredRequests = leaveRequests.filter(req => {
    if (filterStatus === 'All') return true;
    return req.status === filterStatus;
  });

  const getStatusBadge = (status: LeaveRequest['status']) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Approved
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-300 dark:border-amber-800 animate-pulse">
            <Clock4 className="w-3.5 h-3.5" />
            Pending Review
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 dark:bg-red-950/70 dark:text-red-300 border border-red-300 dark:border-red-800">
            <XCircle className="w-3.5 h-3.5" />
            Rejected
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumb />

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
          <CalendarDays className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Leave Requests & Absence Tracking
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Apply for academic leave with automated duration calculation and institutional approvals
          </p>
        </div>
      </div>

      {/* Leave Balance Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-card border border-gray-100 dark:border-slate-700 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">Sick Leave Balance</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-gray-900 dark:text-white font-mono">5</span>
              <span className="text-xs text-gray-400">Days Available</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-slate-700 flex items-center justify-center text-primary-600 dark:text-primary-400">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-card border border-gray-100 dark:border-slate-700 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">Casual Leave Balance</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">3</span>
              <span className="text-xs text-gray-400">Days Available</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-slate-700 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <CalendarDays className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-card border border-gray-100 dark:border-slate-700 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">Medical Emergency</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">10</span>
              <span className="text-xs text-gray-400">Days Available</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-slate-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Grid: Apply Form & History Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Form Column */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-card border border-gray-100 dark:border-slate-700 lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <h2 className="text-base font-bold text-gray-900 dark:text-white">
              Apply for Leave
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Leave Type */}
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                Leave Type
              </label>
              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value as LeaveRequest['type'])}
                className="w-full px-3 py-2.5 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
              >
                <option value="Sick">Sick Leave</option>
                <option value="Casual">Casual Leave</option>
                <option value="Medical">Medical Leave (Doctor Attested)</option>
                <option value="Emergency">Emergency Leave</option>
              </select>
            </div>

            {/* Dates row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                  From Date
                </label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                  To Date
                </label>
                <input
                  type="date"
                  value={toDate}
                  min={fromDate}
                  onChange={(e) => setToDate(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Auto Calculated Days Badge */}
            <div className="p-3 rounded-xl bg-blue-50/80 dark:bg-slate-700/60 border border-blue-100 dark:border-slate-600 flex items-center justify-between">
              <span className="font-semibold text-gray-600 dark:text-gray-300">
                Total Days Auto-Calculated:
              </span>
              <span className="font-black text-primary-600 dark:text-primary-400 font-mono text-sm px-2 py-0.5 rounded bg-white dark:bg-slate-800 shadow-2xs">
                {calculatedDays} {calculatedDays === 1 ? 'Day' : 'Days'}
              </span>
            </div>

            {/* Reason */}
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                Reason / Detailed Description
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="State the detailed reason for absence..."
                rows={3}
                required
                className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* File Attachment simulator */}
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                Supporting Certificate (Optional)
              </label>
              <div className="relative">
                <input
                  type="file"
                  onChange={(e) => setAttachment(e.target.files?.[0]?.name || null)}
                  className="text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
                />
              </div>
              {attachment && (
                <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                  <Paperclip className="w-3 h-3" />
                  <span>Attached: {attachment}</span>
                </div>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-bold rounded-xl text-xs shadow-md shadow-primary-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Submitting Request...' : 'Submit Leave Application'}</span>
            </button>
          </form>
        </div>

        {/* History Table Column */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-card border border-gray-100 dark:border-slate-700 lg:col-span-2 overflow-hidden flex flex-col">
          
          {/* Header & Filter */}
          <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50/70 dark:bg-slate-800/80">
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Leave Application History
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Track status across Department Advisors and HOD
              </p>
            </div>

            {/* Status Tabs */}
            <div className="flex items-center gap-1 bg-gray-200/70 dark:bg-slate-700 p-1 rounded-xl text-xs">
              {(['All', 'Pending', 'Approved', 'Rejected'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setFilterStatus(tab)}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                    filterStatus === tab
                      ? 'bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-2xs'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100/70 dark:bg-slate-900/60 text-gray-600 dark:text-gray-300 uppercase text-[11px] font-bold tracking-wider border-b border-gray-200 dark:border-slate-700">
                  <th className="py-3 px-4">Leave ID</th>
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3">Duration (Dates)</th>
                  <th className="py-3 px-2 text-center">Days</th>
                  <th className="py-3 px-4">Reason</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-3">Applied On</th>
                  <th className="py-3 px-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-700 text-xs">
                {filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-gray-400">
                      No leave requests found for this filter.
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((leave) => (
                    <tr key={leave.leaveId} className="hover:bg-blue-50/40 dark:hover:bg-slate-700/30">
                      <td className="py-3.5 px-4 font-mono font-bold text-primary-600 dark:text-primary-400">
                        {leave.leaveId}
                      </td>
                      <td className="py-3.5 px-3 font-semibold text-gray-800 dark:text-gray-200">
                        {leave.type}
                      </td>
                      <td className="py-3.5 px-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">
                        {formatDate(leave.fromDate)} → {formatDate(leave.toDate)}
                      </td>
                      <td className="py-3.5 px-2 text-center font-bold text-gray-900 dark:text-white font-mono">
                        {leave.days}
                      </td>
                      <td className="py-3.5 px-4 text-gray-600 dark:text-gray-400 max-w-xs truncate">
                        {leave.reason}
                        {leave.attachmentName && (
                          <span className="block text-[10px] text-primary-600 dark:text-primary-400 font-mono mt-0.5">
                            📎 {leave.attachmentName}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        {getStatusBadge(leave.status)}
                      </td>
                      <td className="py-3.5 px-3 text-gray-500 whitespace-nowrap font-mono text-[11px]">
                        {formatDate(leave.appliedOn)}
                      </td>
                      <td className="py-3.5 px-2 text-center">
                        {leave.status === 'Pending' ? (
                          <button
                            onClick={() => cancelLeaveRequest(leave.leaveId)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                            title="Cancel / Withdraw Request"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        ) : (
                          <span className="text-gray-300 dark:text-gray-600 text-xs">—</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>

      </div>

    </div>
  );
};
