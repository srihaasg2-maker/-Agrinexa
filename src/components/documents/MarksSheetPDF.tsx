import React from 'react';
import { useScholar } from '../../context/ScholarContext';
import { Printer, Download, X, GraduationCap, Award, ShieldCheck } from 'lucide-react';
import { printDocument } from '../../utils/printUtils';

interface MarksSheetPDFProps {
  isOpen: boolean;
  onClose: () => void;
  semesterNumber: number;
}

export const MarksSheetPDF: React.FC<MarksSheetPDFProps> = ({ isOpen, onClose, semesterNumber }) => {
  const { student, getMarksForSemester } = useScholar();

  if (!isOpen) return null;

  const marks = getMarksForSemester(semesterNumber);
  const totalCredits = marks.reduce((acc, curr) => acc + curr.creditHours, 0);

  const handlePrint = () => {
    printDocument(`Official_Marks_Sheet_Sem${semesterNumber}_${student.rollNumber}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-2 sm:p-4 md:p-8 bg-black/60 backdrop-blur-xs flex items-center justify-center">
      <div className="relative w-full max-w-4xl bg-white text-gray-900 rounded-2xl shadow-2xl overflow-hidden my-6 border border-gray-200">
        
        {/* Modal Toolbar (hidden when printing) */}
        <div className="no-print bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary-400" />
            <h3 className="font-semibold text-sm sm:text-base">
              Official University Grade Card • Semester {semesterNumber}
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Grade Sheet Document Container */}
        <div className="p-6 sm:p-10 bg-white text-gray-900 print-container">
          
          {/* Institution Header */}
          <div className="border-b-2 border-primary-600 pb-5 mb-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-primary-600 text-white flex items-center justify-center font-bold text-xl shadow-sm">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div className="text-left">
                <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-tight">
                  KOMMURI PRATHA REDDY INSTITUTE OF TECHNOLOGY
                </h1>
                <p className="text-xs text-gray-600 font-medium">
                  Accredited by NAAC • Approved by AICTE & Affiliated to JNTUH • Hyderabad, Telangana
                </p>
              </div>
            </div>
            <div className="inline-block px-4 py-1 mt-2 rounded bg-blue-50 border border-blue-200 text-primary-800 text-xs font-bold uppercase tracking-widest">
              OFFICIAL GRADE MEMORANDUM & STATEMENT OF MARKS
            </div>
          </div>

          {/* Student & Term Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs mb-6">
            <div>
              <span className="text-gray-500 block uppercase text-[10px] font-bold">Student Name</span>
              <span className="font-bold text-gray-900 text-sm">{student.name}</span>
            </div>
            <div>
              <span className="text-gray-500 block uppercase text-[10px] font-bold">Roll Number</span>
              <span className="font-bold text-gray-900 text-sm font-mono">{student.rollNumber}</span>
            </div>
            <div>
              <span className="text-gray-500 block uppercase text-[10px] font-bold">Registration ID</span>
              <span className="font-bold text-gray-900 text-sm font-mono">{student.id}</span>
            </div>
            <div>
              <span className="text-gray-500 block uppercase text-[10px] font-bold">Academic Term</span>
              <span className="font-bold text-gray-900 text-sm">{semesterNumber === 0 ? 'All Semesters Cumulative Results' : `Semester ${semesterNumber} (B.Tech - ${student.department || 'CSE'})`}</span>
            </div>
          </div>

          {/* Marks Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-xs text-left border-collapse border border-gray-300">
              <thead className="bg-gray-100 text-gray-800 uppercase font-bold text-[11px] border-b border-gray-300">
                <tr>
                  <th className="py-2.5 px-3 border border-gray-300">Course Code</th>
                  <th className="py-2.5 px-3 border border-gray-300">Course Name</th>
                  <th className="py-2.5 px-2 border border-gray-300 text-center">Credit Hours</th>
                  <th className="py-2.5 px-2 border border-gray-300 text-center">Mid Marks (40)</th>
                  <th className="py-2.5 px-2 border border-gray-300 text-center">Final Internal (50)</th>
                  <th className="py-2.5 px-2 border border-gray-300 text-center">Overall (100)</th>
                  <th className="py-2.5 px-2 border border-gray-300 text-center">Grade</th>
                  <th className="py-2.5 px-2 border border-gray-300 text-center">Grade Points</th>
                  <th className="py-2.5 px-2 border border-gray-300 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 font-medium">
                {marks.map((row) => (
                  <tr key={row.courseCode} className="hover:bg-gray-50">
                    <td className="py-2 px-3 border border-gray-300 font-mono font-bold text-primary-700">
                      {row.courseCode}
                    </td>
                    <td className="py-2 px-3 border border-gray-300 font-medium text-gray-900">
                      {row.courseName}
                    </td>
                    <td className="py-2 px-2 border border-gray-300 text-center font-bold">
                      {row.creditHours}
                    </td>
                    <td className="py-2 px-2 border border-gray-300 text-center">
                      {row.midMarks}/{row.midTotal}
                    </td>
                    <td className="py-2 px-2 border border-gray-300 text-center">
                      {row.finalInternalMarks}/{row.finalInternalTotal}
                    </td>
                    <td className="py-2 px-2 border border-gray-300 text-center font-bold text-gray-900">
                      {row.overallPerformance}/100
                    </td>
                    <td className="py-2 px-2 border border-gray-300 text-center font-bold">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        row.grade === 'A+' ? 'bg-emerald-100 text-emerald-800' :
                        row.grade === 'A' ? 'bg-teal-100 text-teal-800' :
                        row.grade === 'B+' ? 'bg-blue-100 text-blue-800' :
                        row.grade === 'B' ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {row.grade}
                      </span>
                    </td>
                    <td className="py-2 px-2 border border-gray-300 text-center font-mono font-bold text-gray-900">
                      {row.gradePoints !== undefined ? row.gradePoints.toFixed(1) : (row.grade === 'A+' ? '9.0' : '8.0')}
                    </td>
                    <td className="py-2 px-2 border border-gray-300 text-center">
                      <span className="text-emerald-700 font-bold uppercase text-[10px]">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Performance Summary Footnotes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-blue-50/50 border border-blue-100 text-center mb-8">
            <div>
              <span className="text-xs text-gray-500 font-semibold uppercase">Total Credits</span>
              <p className="text-lg font-bold text-gray-900">{totalCredits}</p>
            </div>
            <div>
              <span className="text-xs text-gray-500 font-semibold uppercase">Semester GPA</span>
              <p className="text-lg font-bold text-primary-600">{student.gpa.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-xs text-gray-500 font-semibold uppercase">Cumulative CGPA</span>
              <p className="text-lg font-bold text-emerald-600">{student.cgpa.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-xs text-gray-500 font-semibold uppercase">Result Standing</span>
              <p className="text-sm font-bold text-emerald-700 uppercase mt-0.5">First Class Distinction</p>
            </div>
          </div>

          {/* Grading Key Table */}
          <div className="mb-8 text-[11px] text-gray-600 border border-gray-200 rounded-lg p-3 bg-gray-50/60">
            <span className="font-bold text-gray-800 uppercase block mb-1">Grading Scale Reference:</span>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-[10px]">
              <div><strong className="text-emerald-700">A+</strong> (80-100): Outstanding (10 pts)</div>
              <div><strong className="text-teal-700">A</strong> (70-79): Excellent (9 pts)</div>
              <div><strong className="text-blue-700">B+</strong> (65-69): Very Good (8 pts)</div>
              <div><strong className="text-amber-700">B</strong> (55-64): Good (7 pts)</div>
              <div><strong className="text-orange-700">C</strong> (50-54): Average (6 pts)</div>
              <div><strong className="text-red-700">F</strong> (&lt;50): Fail (0 pts)</div>
            </div>
          </div>

          {/* Verification Barcode & Signatures */}
          <div className="pt-6 border-t border-gray-300 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-gray-500">
            <div className="text-center sm:text-left">
              <div className="font-mono text-gray-400 text-[10px] tracking-widest uppercase">
                ||||| | |||| ||| ||||||| |||| | |||||||| ||||
              </div>
              <p className="text-[10px] text-gray-400 mt-1 font-mono">
                MEMO-REF: KPRIT-2024-SEM{semesterNumber}-{student.rollNumber}-VERIFIED
              </p>
              <p className="text-[10px] text-gray-400">Date of Issue: November 2024</p>
            </div>

            <div className="flex gap-10 text-center">
              <div>
                <div className="h-10 border-b border-gray-400 w-32 flex items-center justify-center italic text-gray-400 font-serif">
                  Dr. Rajesh Singh
                </div>
                <span className="text-[10px] font-bold text-gray-700 uppercase mt-1 block">Head of Department</span>
              </div>
              <div>
                <div className="h-10 border-b border-gray-400 w-36 flex items-center justify-center italic text-primary-700 font-serif font-bold">
                  K. S. Sundaram, Ph.D.
                </div>
                <span className="text-[10px] font-bold text-gray-700 uppercase mt-1 block">Controller of Examinations</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
