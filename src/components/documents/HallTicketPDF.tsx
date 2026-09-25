import React from 'react';
import { useScholar } from '../../context/ScholarContext';
import { Printer, X, GraduationCap, AlertCircle, ShieldAlert } from 'lucide-react';
import { printDocument, formatDate } from '../../utils/printUtils';

interface HallTicketPDFProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HallTicketPDF: React.FC<HallTicketPDFProps> = ({ isOpen, onClose }) => {
  const { student, examSchedule } = useScholar();

  if (!isOpen) return null;

  const handlePrint = () => {
    printDocument(`Official_Hall_Ticket_${student.rollNumber}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-2 sm:p-4 md:p-8 bg-black/60 backdrop-blur-xs flex items-center justify-center">
      <div className="relative w-full max-w-4xl bg-white text-gray-900 rounded-2xl shadow-2xl overflow-hidden my-6 border border-gray-200">
        
        {/* Modal Toolbar (hidden when printing) */}
        <div className="no-print bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary-400" />
            <h3 className="font-semibold text-sm sm:text-base">
              End-Semester Examination Admit Card / Hall Ticket
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download Admit Card</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Hall Ticket Document */}
        <div className="p-6 sm:p-10 bg-white text-gray-900 print-container">
          
          {/* Header */}
          <div className="border-b-2 border-primary-600 pb-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary-600 text-white flex items-center justify-center font-bold text-xl shadow-sm">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-tight">
                    KOMMURI PRATHA REDDY INSTITUTE OF TECHNOLOGY
                  </h1>
                  <p className="text-xs text-gray-600 font-medium">
                    Office of the Controller of Examinations • Hyderabad, Telangana
                  </p>
                </div>
              </div>
              <div className="hidden sm:block text-right">
                <span className="text-[10px] font-mono text-gray-400 block">EXAM ADMIT CARD</span>
                <span className="text-xs font-bold text-primary-700">WINTER 2024</span>
              </div>
            </div>
            
            <div className="mt-3 text-center">
              <div className="inline-block px-4 py-1 rounded bg-blue-50 border border-blue-200 text-primary-800 text-xs font-bold uppercase tracking-widest">
                OFFICIAL EXAMINATION HALL TICKET / ADMIT CARD
              </div>
            </div>
          </div>

          {/* Student Profile & Photo Section */}
          <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between gap-6 p-4 rounded-xl bg-gray-50 border border-gray-200 mb-6">
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-xs w-full">
              <div>
                <span className="text-gray-500 uppercase text-[10px] font-bold block">Candidate Name</span>
                <span className="text-sm font-bold text-gray-900">{student.name}</span>
              </div>
              <div>
                <span className="text-gray-500 uppercase text-[10px] font-bold block">Roll Number</span>
                <span className="text-sm font-bold text-primary-700 font-mono">{student.rollNumber}</span>
              </div>
              <div>
                <span className="text-gray-500 uppercase text-[10px] font-bold block">Registration Number</span>
                <span className="text-sm font-bold text-gray-900 font-mono">{student.id}</span>
              </div>
              <div>
                <span className="text-gray-500 uppercase text-[10px] font-bold block">Degree / Branch</span>
                <span className="text-sm font-bold text-gray-900">B.Tech - {student.department || 'CSE'}</span>
              </div>
              <div>
                <span className="text-gray-500 uppercase text-[10px] font-bold block">Current Semester</span>
                <span className="text-sm font-bold text-gray-900">3rd Year, Semester {student.currentSemester}</span>
              </div>
              <div>
                <span className="text-gray-500 uppercase text-[10px] font-bold block">Examination Center</span>
                <span className="text-sm font-bold text-gray-900">KPRIT Campus Block A (Hall 101/105)</span>
              </div>
            </div>

            {/* Student Photo with official border */}
            <div className="flex flex-col items-center shrink-0">
              <div className="w-28 h-32 border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-100 p-1 relative shadow-inner">
                {student.photo && student.photo !== 'student_photo_url' ? (
                  <img
                    src={student.photo}
                    alt={student.name}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.parentElement?.querySelector('.photo-fallback');
                      if (fallback) (fallback as HTMLElement).style.display = 'flex';
                    }}
                    className="w-full h-full object-cover rounded"
                  />
                ) : null}
                <div className={`photo-fallback w-full h-full bg-gradient-to-tr from-primary-700 to-blue-600 rounded flex flex-col items-center justify-center text-white ${student.photo && student.photo !== 'student_photo_url' ? 'hidden' : 'flex'}`}>
                  <span className="text-xl font-bold font-mono">GSR</span>
                  <span className="text-[9px] font-mono opacity-80">{student.department || 'CSE'}</span>
                </div>
                <div className="absolute bottom-1 left-1 right-1 bg-black/60 text-white text-[8px] text-center font-mono py-0.5 rounded">
                  {student.rollNumber}
                </div>
              </div>
              <span className="text-[9px] text-gray-400 mt-1 uppercase font-semibold">Attested Photo</span>
            </div>
          </div>

          {/* Exam Timetable Table */}
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
              Approved Examination Schedule
            </h3>
            <table className="w-full text-xs text-left border-collapse border border-gray-300">
              <thead className="bg-gray-100 text-gray-800 uppercase font-bold text-[10px]">
                <tr>
                  <th className="py-2.5 px-3 border border-gray-300">Course Code</th>
                  <th className="py-2.5 px-3 border border-gray-300">Course Title</th>
                  <th className="py-2.5 px-2 border border-gray-300 text-center">Date</th>
                  <th className="py-2.5 px-2 border border-gray-300 text-center">Exam Time</th>
                  <th className="py-2.5 px-2 border border-gray-300 text-center">Room No.</th>
                  <th className="py-2.5 px-2 border border-gray-300 text-center">Seat No.</th>
                  <th className="py-2.5 px-2 border border-gray-300 text-center">Invigilator Sign</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 font-medium">
                {examSchedule.map((exam) => (
                  <tr key={exam.courseCode} className="hover:bg-gray-50">
                    <td className="py-2.5 px-3 border border-gray-300 font-mono font-bold text-primary-700">
                      {exam.courseCode}
                    </td>
                    <td className="py-2.5 px-3 border border-gray-300 font-semibold text-gray-900">
                      {exam.courseName}
                    </td>
                    <td className="py-2.5 px-2 border border-gray-300 text-center font-bold text-gray-800">
                      {formatDate(exam.date)}
                    </td>
                    <td className="py-2.5 px-2 border border-gray-300 text-center">
                      {exam.time}
                    </td>
                    <td className="py-2.5 px-2 border border-gray-300 text-center font-mono font-bold text-blue-700">
                      {exam.roomNumber}
                    </td>
                    <td className="py-2.5 px-2 border border-gray-300 text-center font-mono font-bold text-emerald-700">
                      {exam.seatNumber}
                    </td>
                    <td className="py-2.5 px-2 border border-gray-300 text-center text-gray-300 italic">
                      [Verified]
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mandatory Instructions */}
          <div className="mb-6 p-4 rounded-xl bg-amber-50/50 border border-amber-200 text-[11px] text-gray-700">
            <div className="flex items-center gap-1.5 font-bold text-amber-900 uppercase text-xs mb-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-700" />
              <span>Mandatory Candidate Instructions:</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Candidates must report to the allocated examination hall at least <strong>30 minutes before</strong> the scheduled start time.</li>
              <li>Possession of <strong>electronic gadgets, smartphones, smartwatches, or programmable calculators</strong> inside the exam hall is strictly prohibited and constitutes malpractice.</li>
              <li>Candidates must carry this original Hall Ticket along with their official University Student ID card for physical verification.</li>
              <li>No candidate will be permitted to enter the hall 15 minutes after examination commencement.</li>
            </ul>
          </div>

          {/* Barcode & Signature Blocks */}
          <div className="pt-6 border-t border-gray-300 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-gray-500">
            <div className="text-center sm:text-left">
              <div className="font-mono text-gray-500 text-xs tracking-widest uppercase">
                |||||| | |||||| |||||||| |||||| | |||||||| ||||||
              </div>
              <p className="text-[10px] text-gray-400 font-mono mt-1">
                HALLTICKET-HASH: 8F2A-{student.rollNumber}-2024-WINTER
              </p>
            </div>

            <div className="flex gap-12 text-center">
              <div>
                <div className="h-10 border-b border-gray-400 w-32 flex items-center justify-center italic text-gray-600 font-serif">
                  {student.name}
                </div>
                <span className="text-[10px] font-bold text-gray-700 uppercase mt-1 block">Candidate Signature</span>
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
