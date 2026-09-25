import React, { useState } from 'react';
import { useScholar } from '../../context/ScholarContext';
import { StatCard } from '../common/StatCard';
import { Breadcrumb } from '../common/Breadcrumb';
import { 
  Award, 
  Clock, 
  CalendarDays, 
  CalendarRange, 
  ChevronRight, 
  FileText, 
  Ticket, 
  ReceiptIndianRupee, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { formatDate } from '../../utils/printUtils';
import { MarksSheetPDF } from '../documents/MarksSheetPDF';
import { HallTicketPDF } from '../documents/HallTicketPDF';

export const DashboardPage: React.FC = () => {
  const { student, allMarks, leaveRequests, examSchedule, setActivePage } = useScholar();
  const [showMarksModal, setShowMarksModal] = useState(false);
  const [showHallTicketModal, setShowHallTicketModal] = useState(false);

  const pendingLeavesCount = leaveRequests.filter(l => l.status === 'Pending').length;
  const nextExam = examSchedule[0];

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumb />

      {/* Hero Welcome Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-700 via-primary-600 to-blue-700 text-white p-6 sm:p-8 shadow-soft">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold mb-3 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>3rd Year • Semester {student.currentSemester} • Academic Year 2026 - 2027 (Batch 2024 - 2028)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {student.name}!
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm mt-2 leading-relaxed">
            You have {allMarks.length} certified course results. Your academic standing is <strong className="text-white">Consistent (CGPA: {student.cgpa.toFixed(2)})</strong> with an attendance rating of <strong className={student.attendance < 75 ? "text-amber-300 font-bold" : "text-emerald-300 font-bold"}>{student.attendance}% ({student.attendance < 65 ? 'Shortage Alert' : student.attendance < 75 ? 'Condonation Required' : 'Good Standing'})</strong>. Upcoming exams start on Dec 10.
          </p>

          {/* Quick Action Buttons */}
          <div className="mt-5 flex flex-wrap gap-2.5">
            <button
              onClick={() => setActivePage('marks')}
              className="px-4 py-2 bg-white text-primary-700 hover:bg-blue-50 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
            >
              <Award className="w-4 h-4 text-primary-600" />
              <span>View Marks & Results</span>
            </button>
            <button
              onClick={() => setShowHallTicketModal(true)}
              className="px-4 py-2 bg-white/15 hover:bg-white/25 text-white font-semibold text-xs rounded-xl border border-white/20 backdrop-blur-md transition-all flex items-center gap-1.5"
            >
              <Ticket className="w-4 h-4" />
              <span>Download Hall Ticket</span>
            </button>
            <button
              onClick={() => setActivePage('leaves')}
              className="px-4 py-2 bg-white/15 hover:bg-white/25 text-white font-semibold text-xs rounded-xl border border-white/20 backdrop-blur-md transition-all flex items-center gap-1.5"
            >
              <CalendarDays className="w-4 h-4" />
              <span>Apply for Leave</span>
            </button>
          </div>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-12 top-6 hidden md:block opacity-20">
          <BookOpen className="w-44 h-44 text-white" />
        </div>
      </div>

      {/* 4 Quick Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* GPA / CGPA */}
        <StatCard
          title="Current SGPA / CGPA"
          value={`${student.gpa.toFixed(2)}`}
          subtitle={`Cumulative CGPA: ${student.cgpa.toFixed(2)}`}
          icon={<Award className="w-5 h-5 text-primary-600 dark:text-primary-400" />}
          badge={{ text: 'Distinction', type: 'success' }}
          accentColor="border-l-primary-600"
          onClick={() => setActivePage('marks')}
        />

        {/* Attendance */}
        <StatCard
          title="Attendance"
          value={`${student.attendance}%`}
          subtitle={student.attendance < 65 ? "Shortage: Condonation Required (<65%)" : student.attendance < 75 ? "Warning: Condonation Eligible (65-74%)" : "Requirement: > 75% (Safe Zone)"}
          icon={<Clock className={`w-5 h-5 ${student.attendance < 65 ? 'text-red-500 dark:text-red-400' : student.attendance < 75 ? 'text-amber-500 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`} />}
          badge={{ 
            text: student.attendance < 65 ? 'Shortage Warning' : student.attendance < 75 ? 'Cond. Eligible' : 'Excellent', 
            type: student.attendance < 65 ? 'danger' : student.attendance < 75 ? 'warning' : 'success' 
          }}
          accentColor={student.attendance < 65 ? 'border-l-danger' : student.attendance < 75 ? 'border-l-warning' : 'border-l-accent'}
          onClick={() => setActivePage('enrollment')}
        />

        {/* Pending Leaves */}
        <StatCard
          title="Pending Leaves"
          value={`${pendingLeavesCount} Request`}
          subtitle="Casual Leave (Oct 15 - 16)"
          icon={<CalendarDays className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
          badge={{ text: pendingLeavesCount > 0 ? 'Pending' : 'None', type: pendingLeavesCount > 0 ? 'warning' : 'info' }}
          accentColor="border-l-warning"
          onClick={() => setActivePage('leaves')}
        />

        {/* Next Exam Date */}
        <StatCard
          title="Next Exam Date"
          value={nextExam ? formatDate(nextExam.date) : 'Nov 15, 2024'}
          subtitle={nextExam ? `${nextExam.courseCode} (${nextExam.roomNumber})` : 'Mathematics'}
          icon={<CalendarRange className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
          badge={{ text: '10:00 AM', type: 'info' }}
          accentColor="border-l-blue-600"
          onClick={() => setActivePage('exams')}
        />
      </div>

      {/* Main Grid: Recent Activity Feed & Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Activity Feed (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Top Courses & Quick Results Glance */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-card border border-gray-100 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Academic Performance Highlights
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Showing top evaluations across 22 certified courses
                </p>
              </div>
              <button
                onClick={() => setActivePage('marks')}
                className="text-xs text-primary-600 dark:text-primary-400 font-bold hover:underline flex items-center gap-1"
              >
                <span>Full Results Table</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-slate-700/60">
              {allMarks.slice(0, 4).map((mark) => (
                <div key={mark.courseCode} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-slate-700 flex items-center justify-center font-bold text-primary-700 dark:text-primary-300 text-xs">
                      {mark.courseCode}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                        {mark.courseName}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        <span>Mid: {mark.midMarks}/{mark.midTotal}</span>
                        <span>•</span>
                        <span>Final Int: {mark.finalInternalMarks}/{mark.finalInternalTotal}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-xs text-gray-400 block font-medium">Overall</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{mark.overallPerformance}/100</span>
                    </div>
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                      mark.grade === 'A+' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                      mark.grade === 'A' ? 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300' :
                      'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {mark.grade}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Timeline */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-card border border-gray-100 dark:border-slate-700">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">
              Recent Campus Activity
            </h3>
            
            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200 dark:before:bg-slate-700">
              
              {/* Event 1 */}
              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-800 ring-2 ring-emerald-100 dark:ring-emerald-900/40" />
                <div>
                  <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Today, 09:30 AM</span>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">
                    Semester 2 Marks Published
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Mid marks and internal evaluations for all 8 Semester 2 courses are now certified.
                  </p>
                </div>
              </div>

              {/* Event 2 */}
              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-amber-500 border-2 border-white dark:border-slate-800 ring-2 ring-amber-100 dark:ring-amber-900/40" />
                <div>
                  <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Yesterday, 04:15 PM</span>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">
                    Casual Leave Request LV002 Submitted
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Applied for 2 days leave (Oct 15 - 16) for personal commitments. Status: Pending HOD review.
                  </p>
                </div>
              </div>

              {/* Event 3 */}
              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-primary-500 border-2 border-white dark:border-slate-800 ring-2 ring-primary-100 dark:ring-primary-900/40" />
                <div>
                  <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Oct 10, 2024</span>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">
                    Examination Hall Tickets Released
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Winter 2024 End-Semester exam seating allotment generated for Hall A101 / A105.
                  </p>
                </div>
              </div>

              {/* Event 4 */}
              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-purple-500 border-2 border-white dark:border-slate-800 ring-2 ring-purple-100 dark:ring-purple-900/40" />
                <div>
                  <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Sep 10, 2024</span>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">
                    Medical Leave LV001 Approved
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Dean of Academic Affairs approved 3 days medical leave without attendance penalty.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Sidebar Column: Upcoming Deadlines & Quick Cards (1 Col) */}
        <div className="space-y-6">
          
          {/* Upcoming Deadlines Widget */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-card border border-gray-100 dark:border-slate-700">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">
              Upcoming Deadlines
            </h3>

            <div className="space-y-3.5">
              <div className="p-3.5 rounded-xl bg-red-50/70 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40">
                <div className="flex items-center justify-between text-xs font-semibold text-red-700 dark:text-red-400">
                  <span>CS301 Lab Project Submission</span>
                  <span className="text-[10px] bg-red-100 dark:bg-red-900/60 px-1.5 py-0.5 rounded font-bold">In 4 Days</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                  AVL Tree & Graph Traversals C++ Implementation repository link.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40">
                <div className="flex items-center justify-between text-xs font-semibold text-amber-700 dark:text-amber-400">
                  <span>Semester Exam Registration Form</span>
                  <span className="text-[10px] bg-amber-100 dark:bg-amber-900/60 px-1.5 py-0.5 rounded font-bold">Oct 30</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                  Final verification of course codes and elective confirmations.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40">
                <div className="flex items-center justify-between text-xs font-semibold text-blue-700 dark:text-blue-400">
                  <span>CS304 Web Portfolio Milestone</span>
                  <span className="text-[10px] bg-blue-100 dark:bg-blue-900/60 px-1.5 py-0.5 rounded font-bold">Nov 05</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                  Responsive Full-Stack React Web application demo.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Documents Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-card">
            <h3 className="text-base font-bold mb-2">Student Documents</h3>
            <p className="text-xs text-gray-300 mb-4">
              Instant access to verified digital university certificates.
            </p>

            <div className="space-y-2">
              <button
                onClick={() => setShowMarksModal(true)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>Sem 3 Grade Memorandum (PDF)</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-400" />
              </button>

              <button
                onClick={() => setShowHallTicketModal(true)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-primary-400" />
                  <span>Exam Hall Ticket (Winter 2024)</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* PDF Modals */}
      <MarksSheetPDF
        isOpen={showMarksModal}
        onClose={() => setShowMarksModal(false)}
        semesterNumber={3}
      />
      <HallTicketPDF
        isOpen={showHallTicketModal}
        onClose={() => setShowHallTicketModal(false)}
      />
    </div>
  );
};
