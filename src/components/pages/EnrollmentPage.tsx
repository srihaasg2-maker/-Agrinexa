import React, { useState } from 'react';
import { useScholar } from '../../context/ScholarContext';
import { Breadcrumb } from '../common/Breadcrumb';
import { 
  BookOpenCheck, 
  LayoutGrid, 
  Table as TableIcon, 
  User, 
  Clock, 
  MapPin, 
  GraduationCap, 
  CheckCircle2, 
  BookOpen, 
  FileText,
  X,
  Sparkles
} from 'lucide-react';
import { CourseEnrollment } from '../../types/student';

export const EnrollmentPage: React.FC = () => {
  const { enrollments, student } = useScholar();
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [selectedCourse, setSelectedCourse] = useState<CourseEnrollment | null>(null);

  const totalCredits = enrollments.reduce((sum, item) => sum + item.creditHours, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumb />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            <BookOpenCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Course Enrollment
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Registered courses, faculty allocations, classroom slots, and syllabi
            </p>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-2">
          <div className="bg-gray-200/80 dark:bg-slate-700 p-1 rounded-xl flex items-center">
            <button
              onClick={() => setViewMode('card')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === 'card'
                  ? 'bg-white dark:bg-slate-800 text-primary-600 dark:text-primary-400 shadow-2xs'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Cards</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-800 text-primary-600 dark:text-primary-400 shadow-2xs'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              <TableIcon className="w-4 h-4" />
              <span>Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary KPI Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              B.Tech {student.department || 'CSE'} • 3rd Year 1st Semester (Semester {student.currentSemester})
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Registration Period: Academic Year 2026-2027 (Batch 2024-2028) • Academic Status: Confirmed
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-right">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold block">Enrolled Courses</span>
            <span className="text-lg font-black text-gray-900 dark:text-white font-mono">{enrollments.length} Subjects</span>
          </div>
          <div className="h-8 w-px bg-gray-200 dark:bg-slate-700" />
          <div>
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold block">Credit Load</span>
            <span className="text-lg font-black text-primary-600 dark:text-primary-400 font-mono">
              {totalCredits} <span className="text-xs text-gray-400 font-normal">Credits</span>
            </span>
          </div>
        </div>
      </div>

      {/* Course Listing */}
      {viewMode === 'card' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {enrollments.map((course) => (
            <div
              key={course.courseCode}
              className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-card border border-gray-100 dark:border-slate-700 flex flex-col justify-between hover:shadow-soft hover:-translate-y-0.5 transition-all group"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-lg bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 font-mono font-bold text-xs border border-primary-100 dark:border-primary-900">
                    {course.courseCode}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 className="w-3 h-3" />
                    {course.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {course.courseName}
                </h3>

                {course.department && (
                  <span className="text-[11px] text-gray-400 font-medium block mt-0.5">
                    Dept: {course.department}
                  </span>
                )}

                {/* Details list */}
                <div className="mt-4 space-y-2 text-xs text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{course.facultyName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>{course.schedule}</span>
                  </div>
                  {course.room && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>{course.room}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-5 pt-3 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                  {course.creditHours} Credit Hours
                </span>
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="text-xs text-primary-600 dark:text-primary-400 hover:underline font-bold flex items-center gap-1"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Syllabus</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-card border border-gray-100 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100/70 dark:bg-slate-900/60 text-gray-600 dark:text-gray-300 uppercase text-[11px] font-bold tracking-wider border-b border-gray-200 dark:border-slate-700">
                  <th className="py-3 px-4">Course Code</th>
                  <th className="py-3 px-4">Course Name</th>
                  <th className="py-3 px-4">Faculty Name</th>
                  <th className="py-3 px-3 text-center">Credit Hours</th>
                  <th className="py-3 px-4">Schedule / Time Slot</th>
                  <th className="py-3 px-3">Room / Venue</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-700 text-xs sm:text-sm">
                {enrollments.map((course) => (
                  <tr key={course.courseCode} className="hover:bg-blue-50/40 dark:hover:bg-slate-700/30">
                    <td className="py-3.5 px-4 font-mono font-bold text-primary-600 dark:text-primary-400">
                      {course.courseCode}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-gray-900 dark:text-white">
                      {course.courseName}
                    </td>
                    <td className="py-3.5 px-4 text-gray-700 dark:text-gray-300">
                      {course.facultyName}
                    </td>
                    <td className="py-3.5 px-3 text-center font-bold font-mono">
                      {course.creditHours}
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 dark:text-gray-400 text-xs">
                      {course.schedule}
                    </td>
                    <td className="py-3.5 px-3 text-gray-600 dark:text-gray-400 text-xs">
                      {course.room || 'TBA'}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                        {course.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <button
                        onClick={() => setSelectedCourse(course)}
                        className="text-xs text-primary-600 dark:text-primary-400 hover:underline font-semibold"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Course Syllabus Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-6 border border-gray-100 dark:border-slate-800">
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-5 right-5 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-lg bg-primary-100 text-primary-700 dark:bg-primary-950 dark:text-primary-300 font-mono font-bold text-xs">
                {selectedCourse.courseCode}
              </span>
              <span className="text-xs font-bold text-gray-400">
                {selectedCourse.creditHours} Credits
              </span>
            </div>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              {selectedCourse.courseName}
            </h3>
            <p className="text-xs text-primary-600 dark:text-primary-400 font-medium mb-4">
              Instructor: {selectedCourse.facultyName} • {selectedCourse.schedule}
            </p>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-xs mb-4">
              <h4 className="font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-primary-600" />
                Syllabus Topics & Key Learning Outcomes
              </h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {selectedCourse.syllabusOverview || "Detailed syllabus modules covering foundational theory, laboratory assignments, and capstone practical demonstrations."}
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-4 py-2 bg-primary-600 text-white rounded-xl text-xs font-semibold hover:bg-primary-700 transition-colors"
              >
                Close Syllabus
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
