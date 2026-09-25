import React, { useState } from 'react';
import { useScholar } from '../../context/ScholarContext';
import { Breadcrumb } from '../common/Breadcrumb';
import { 
  Award, 
  Printer, 
  Download, 
  Filter, 
  Search, 
  GraduationCap, 
  CheckCircle2, 
  Info, 
  ChevronDown,
  BarChart3,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';
import { MarksSheetPDF } from '../documents/MarksSheetPDF';

export const MarksPage: React.FC = () => {
  const { student, selectedSemester, setSelectedSemester, getMarksForSemester } = useScholar();
  const [showPDF, setShowPDF] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pass' | 'Fail'>('All');

  const currentMarks = getMarksForSemester(selectedSemester);

  const filteredMarks = currentMarks.filter(mark => {
    const matchesSearch = 
      mark.courseCode.toLowerCase().includes(filterQuery.toLowerCase()) ||
      mark.courseName.toLowerCase().includes(filterQuery.toLowerCase()) ||
      mark.grade.toLowerCase().includes(filterQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || mark.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCredits = currentMarks.reduce((sum, item) => sum + item.creditHours, 0);

  // Grade badge styling logic per requirements:
  // A+ = Green (#10B981), B = Yellow/Amber (#F59E0B), C = Amber/Orange, D = Orange, F = Red (#EF4444)
  const getGradeBadge = (grade: string) => {
    switch (grade) {
      case 'A+':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            A+
          </span>
        );
      case 'A':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-black bg-teal-100 text-teal-800 dark:bg-teal-950/70 dark:text-teal-300 border border-teal-300 dark:border-teal-800">
            A
          </span>
        );
      case 'B+':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-black bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
            B+
          </span>
        );
      case 'B':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-black bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            B
          </span>
        );
      case 'C':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-black bg-orange-100 text-orange-800 dark:bg-orange-950/70 dark:text-orange-300 border border-orange-300 dark:border-orange-800">
            C
          </span>
        );
      case 'D':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-black bg-orange-200 text-orange-900 dark:bg-orange-950 dark:text-orange-200 border border-orange-400">
            D
          </span>
        );
      case 'F':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-black bg-red-100 text-red-800 dark:bg-red-950/70 dark:text-red-300 border border-red-300 dark:border-red-800">
            F
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumb />

      {/* Page Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-primary-100 text-primary-700 dark:bg-primary-950 dark:text-primary-300">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Marks & Academic Results
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Official statement of marks, internal evaluations & cumulative credits
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPDF(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white rounded-xl text-xs font-bold shadow-md shadow-primary-600/25 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download Results as PDF</span>
          </button>
        </div>
      </div>

      {/* GPA & CGPA Banner Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-card border border-gray-100 dark:border-slate-700 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider block">
              Semester {selectedSemester} SGPA
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-primary-600 dark:text-primary-400 font-mono">
                {student.gpa.toFixed(2)}
              </span>
              <span className="text-xs text-gray-400">/ 10.00</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-slate-700 flex items-center justify-center text-primary-600 dark:text-primary-400">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-card border border-gray-100 dark:border-slate-700 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider block">
              Cumulative CGPA
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {student.cgpa.toFixed(2)}
              </span>
              <span className="text-xs text-gray-400">/ 10.00</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-slate-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-card border border-gray-100 dark:border-slate-700 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider block">
              Registered Credits
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-gray-900 dark:text-white font-mono">
                {totalCredits}
              </span>
              <span className="text-xs text-gray-400">Credits Earned</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-slate-700 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <BarChart3 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-card border border-gray-100 dark:border-slate-700 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider block">
              Passing Status
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                100% Pass
              </span>
            </div>
            <span className="text-[11px] text-gray-400">No active backlogs</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-slate-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter and Term Selector Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-card border border-gray-100 dark:border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Semester selector */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">
            Select Term:
          </label>
          <div className="relative">
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(Number(e.target.value))}
              className="appearance-none pl-3 pr-8 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-xs font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
            >
              <option value={0}>All Semesters (All 22 Results Published)</option>
              <option value={5}>Semester 5 (Current Term - Enrolled)</option>
              <option value={4}>Semester 4 (II Year II Sem - 4 Results)</option>
              <option value={3}>Semester 3 (II Year I Sem - 5 Results)</option>
              <option value={2}>Semester 2 (I Year II Sem - 8 Results)</option>
              <option value={1}>Semester 1 (I Year I Sem - 5 Results)</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Search inside courses */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search code, subject or grade..."
              className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <button
            onClick={() => setShowPDF(true)}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 transition-colors"
            title="Print Grade Sheet"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Main Results Table (CRITICAL) */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-card border border-gray-100 dark:border-slate-700 overflow-hidden">
        
        {/* Table Top Banner */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-700 bg-gray-50/70 dark:bg-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              {selectedSemester === 0 ? 'All Semesters Academic Results' : `Semester ${selectedSemester} Performance Breakdown`}
            </h3>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            Showing {filteredMarks.length} Course Evaluations
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100/70 dark:bg-slate-900/60 text-gray-600 dark:text-gray-300 uppercase text-[11px] font-bold tracking-wider border-b border-gray-200 dark:border-slate-700">
                <th className="py-3.5 px-4">Course Code</th>
                <th className="py-3.5 px-4">Course Name</th>
                <th className="py-3.5 px-3 text-center">Credit Hours</th>
                <th className="py-3.5 px-3 text-center">Mid Marks</th>
                <th className="py-3.5 px-3 text-center">Final Internal Marks</th>
                <th className="py-3.5 px-4 text-center">Overall Performance</th>
                <th className="py-3.5 px-3 text-center">Grade</th>
                <th className="py-3.5 px-3 text-center">Grade Points</th>
                <th className="py-3.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700 text-xs sm:text-sm">
              {filteredMarks.map((course) => (
                <tr 
                  key={course.courseCode}
                  className="hover:bg-blue-50/50 dark:hover:bg-slate-700/40 transition-colors"
                >
                  {/* Course Code */}
                  <td className="py-4 px-4 font-mono font-bold text-primary-600 dark:text-primary-400">
                    {course.courseCode}
                  </td>

                  {/* Course Name */}
                  <td className="py-4 px-4 font-semibold text-gray-900 dark:text-white">
                    {course.courseName}
                  </td>

                  {/* Credit Hours */}
                  <td className="py-4 px-3 text-center font-bold text-gray-700 dark:text-gray-300">
                    {course.creditHours}
                  </td>

                  {/* Mid Marks */}
                  <td className="py-4 px-3 text-center">
                    <div className="inline-block text-center">
                      <span className="font-bold text-gray-900 dark:text-white font-mono">
                        {course.midMarks}
                      </span>
                      <span className="text-gray-400 text-xs font-mono">/{course.midTotal}</span>
                      <div className="w-16 h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full mt-1 overflow-hidden mx-auto">
                        <div 
                          className="h-full bg-primary-600 rounded-full" 
                          style={{ width: `${(course.midMarks / course.midTotal) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Final Internal Marks */}
                  <td className="py-4 px-3 text-center">
                    <div className="inline-block text-center">
                      <span className="font-bold text-gray-900 dark:text-white font-mono">
                        {course.finalInternalMarks}
                      </span>
                      <span className="text-gray-400 text-xs font-mono">/{course.finalInternalTotal}</span>
                      <div className="w-16 h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full mt-1 overflow-hidden mx-auto">
                        <div 
                          className="h-full bg-accent-500 rounded-full" 
                          style={{ width: `${(course.finalInternalMarks / course.finalInternalTotal) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Overall Performance */}
                  <td className="py-4 px-4 text-center">
                    <div className="inline-flex items-center gap-2">
                      <span className="font-black text-gray-900 dark:text-white font-mono text-sm">
                        {course.overallPerformance}
                      </span>
                      <span className="text-gray-400 text-xs font-mono">/100</span>
                    </div>
                  </td>

                  {/* Grade */}
                  <td className="py-4 px-3 text-center">
                    {getGradeBadge(course.grade)}
                  </td>

                  {/* Grade Points */}
                  <td className="py-4 px-3 text-center font-mono font-bold text-gray-800 dark:text-gray-200">
                    {course.gradePoints !== undefined ? course.gradePoints.toFixed(1) : (course.grade === 'A+' ? '9.0' : '8.0')}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-3 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="w-3 h-3" />
                      {course.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom GPA Calculation Footer */}
        <div className="p-4 sm:p-6 bg-gray-50/80 dark:bg-slate-900/60 border-t border-gray-100 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            <Info className="w-4 h-4 text-primary-600 shrink-0" />
            <span>
              SGPA is calculated as: <strong>Σ (Credit Hours × Grade Points) / Total Credit Hours</strong>. Minimum passing grade is C (50%).
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm font-bold">
            <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-2xs">
              <span className="text-gray-500 dark:text-gray-400 text-xs font-normal">Term GPA: </span>
              <span className="text-primary-600 dark:text-primary-400 font-mono font-bold text-base">{student.gpa.toFixed(2)}</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-2xs">
              <span className="text-gray-500 dark:text-gray-400 text-xs font-normal">Cumulative CGPA: </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold text-base">{student.cgpa.toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Grade Key Legend */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
          Grading Scale Reference
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 text-xs">
          <div className="p-2.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40">
            <div className="font-bold text-emerald-800 dark:text-emerald-300">Grade A+ (80 - 100)</div>
            <p className="text-[11px] text-gray-500">Outstanding (10 Pts)</p>
          </div>
          <div className="p-2.5 rounded-xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/40">
            <div className="font-bold text-teal-800 dark:text-teal-300">Grade A (70 - 79)</div>
            <p className="text-[11px] text-gray-500">Excellent (9 Pts)</p>
          </div>
          <div className="p-2.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40">
            <div className="font-bold text-blue-800 dark:text-blue-300">Grade B+ (65 - 69)</div>
            <p className="text-[11px] text-gray-500">Very Good (8 Pts)</p>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40">
            <div className="font-bold text-amber-800 dark:text-amber-300">Grade B (55 - 64)</div>
            <p className="text-[11px] text-gray-500">Good (7 Pts)</p>
          </div>
          <div className="p-2.5 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/40">
            <div className="font-bold text-orange-800 dark:text-orange-300">Grade C (50 - 54)</div>
            <p className="text-[11px] text-gray-500">Average (6 Pts)</p>
          </div>
          <div className="p-2.5 rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40">
            <div className="font-bold text-red-800 dark:text-red-300">Grade F (&lt;50)</div>
            <p className="text-[11px] text-gray-500">Fail / Reappear (0 Pts)</p>
          </div>
        </div>
      </div>

      {/* PDF Modal */}
      <MarksSheetPDF
        isOpen={showPDF}
        onClose={() => setShowPDF(false)}
        semesterNumber={selectedSemester}
      />

    </div>
  );
};
