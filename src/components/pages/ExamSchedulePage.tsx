import React, { useState } from 'react';
import { useScholar } from '../../context/ScholarContext';
import { Breadcrumb } from '../common/Breadcrumb';
import { 
  CalendarRange, 
  Ticket, 
  Printer, 
  Download, 
  MapPin, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  GraduationCap, 
  ShieldAlert,
  Calendar,
  Sparkles
} from 'lucide-react';
import { formatDate } from '../../utils/printUtils';
import { HallTicketPDF } from '../documents/HallTicketPDF';

export const ExamSchedulePage: React.FC = () => {
  const { examSchedule, student } = useScholar();
  const [showHallTicketModal, setShowHallTicketModal] = useState(false);
  const [selectedExamTab, setSelectedExamTab] = useState<'schedule' | 'admitCard'>('schedule');

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumb />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-primary-100 text-primary-700 dark:bg-primary-950 dark:text-primary-300">
            <CalendarRange className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Exam Schedule & Hall Tickets
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              End-Semester theory & laboratory examination timetable, seating allocation, and admit card
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setShowHallTicketModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white rounded-xl text-xs font-bold shadow-md shadow-primary-600/25 transition-all self-start sm:self-auto"
        >
          <Ticket className="w-4 h-4" />
          <span>Download Official Hall Ticket (PDF)</span>
        </button>
      </div>

      {/* Tab toggle */}
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-slate-700 pb-2 text-xs sm:text-sm font-bold">
        <button
          onClick={() => setSelectedExamTab('schedule')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 ${
            selectedExamTab === 'schedule'
              ? 'bg-primary-600 text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'
          }`}
        >
          <CalendarRange className="w-4 h-4" />
          <span>Timetable & Seating Details</span>
        </button>
        <button
          onClick={() => setSelectedExamTab('admitCard')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 ${
            selectedExamTab === 'admitCard'
              ? 'bg-primary-600 text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'
          }`}
        >
          <Ticket className="w-4 h-4" />
          <span>Digital Hall Ticket Preview</span>
        </button>
      </div>

      {selectedExamTab === 'schedule' ? (
        <>
          {/* Timeline Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {examSchedule.map((exam, index) => (
              <div
                key={exam.courseCode}
                className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-card border border-gray-100 dark:border-slate-700 flex flex-col justify-between hover:shadow-soft transition-all relative overflow-hidden"
              >
                {/* Index tag */}
                <div className="absolute top-0 right-0 bg-primary-50 dark:bg-slate-700 px-3 py-1 rounded-bl-xl text-[10px] font-mono font-bold text-primary-700 dark:text-primary-300">
                  Paper #{index + 1}
                </div>

                <div>
                  <span className="text-xs font-mono font-black text-primary-600 dark:text-primary-400 block mb-1">
                    {exam.courseCode}
                  </span>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug">
                    {exam.courseName}
                  </h3>

                  <div className="mt-4 space-y-2 text-xs text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary-600 shrink-0" />
                      <span className="font-semibold text-gray-900 dark:text-white">{formatDate(exam.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                      <span>{exam.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                      <span>Exam Hall: <strong className="text-gray-800 dark:text-gray-200">{exam.roomNumber}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-gray-400 text-[10px] block font-bold uppercase">Allocated Seat</span>
                    <span className="text-base font-black text-emerald-600 dark:text-emerald-400 font-mono">
                      Desk #{exam.seatNumber}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    Confirmed
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Exam Schedule Table */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-card border border-gray-100 dark:border-slate-700 overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-slate-700 bg-gray-50/70 dark:bg-slate-800/80 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Official Examination Timetable & Seating Matrix
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Venue: KPRIT Academic Block A (Turing Block)
                </p>
              </div>
              <button
                onClick={() => setShowHallTicketModal(true)}
                className="text-xs text-primary-600 dark:text-primary-400 font-bold hover:underline flex items-center gap-1"
              >
                <Printer className="w-4 h-4" />
                <span>Print Schedule</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100/70 dark:bg-slate-900/60 text-gray-600 dark:text-gray-300 uppercase text-[11px] font-bold tracking-wider border-b border-gray-200 dark:border-slate-700">
                    <th className="py-3 px-4">Course</th>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3">Time</th>
                    <th className="py-3 px-3 text-center">Room Number</th>
                    <th className="py-3 px-3 text-center">Seat Number</th>
                    <th className="py-3 px-4">Chief Invigilator</th>
                    <th className="py-3 px-3 text-center">Hall Ticket</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-700 text-xs sm:text-sm">
                  {examSchedule.map((row) => (
                    <tr key={row.courseCode} className="hover:bg-blue-50/40 dark:hover:bg-slate-700/30">
                      <td className="py-3.5 px-4 font-semibold text-gray-900 dark:text-white">
                        <span className="font-mono text-primary-600 dark:text-primary-400 font-bold mr-2">
                          {row.courseCode}
                        </span>
                        {row.courseName}
                      </td>
                      <td className="py-3.5 px-3 font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">
                        {formatDate(row.date)}
                      </td>
                      <td className="py-3.5 px-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        {row.time}
                      </td>
                      <td className="py-3.5 px-3 text-center font-mono font-bold text-primary-600 dark:text-primary-400">
                        {row.roomNumber}
                      </td>
                      <td className="py-3.5 px-3 text-center font-mono font-black text-emerald-600 dark:text-emerald-400">
                        {row.seatNumber}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-gray-500">
                        {row.invigilator || 'Staff On Duty'}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <button
                          onClick={() => setShowHallTicketModal(true)}
                          className="px-2.5 py-1 bg-primary-50 dark:bg-slate-700 text-primary-700 dark:text-primary-300 font-semibold text-xs rounded-lg hover:bg-primary-100 transition-colors"
                        >
                          Admit Card
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* Direct In-Page Hall Ticket Preview */
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-card border border-gray-100 dark:border-slate-700 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Admit Card Live Verification Card
            </h3>
            <button
              onClick={() => setShowHallTicketModal(true)}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Full Print Resolution</span>
            </button>
          </div>

          <div className="border border-gray-200 dark:border-slate-700 rounded-2xl p-6 bg-gray-50/50 dark:bg-slate-900/50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-200 dark:border-slate-700 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center font-bold">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-gray-900 dark:text-white">
                    Kommuri Pratha Reddy Institute of Technology
                  </h4>
                  <p className="text-xs text-gray-500">Hall Ticket for Semester {student.currentSemester} Examination 2024</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-400 block font-mono">STATUS: ADMITTED</span>
                <span className="text-xs font-bold text-emerald-600 font-mono">ALLOTMENT CONFIRMED</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <img
                src={student.photo}
                alt={student.name}
                className="w-24 h-28 object-cover rounded-xl border border-gray-300 dark:border-slate-600 shadow-sm"
              />
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs flex-1">
                <div>
                  <span className="text-gray-400 uppercase text-[10px] block">Student Name</span>
                  <span className="font-bold text-gray-900 dark:text-white">{student.name}</span>
                </div>
                <div>
                  <span className="text-gray-400 uppercase text-[10px] block">Roll Number</span>
                  <span className="font-bold text-primary-600 font-mono">{student.rollNumber}</span>
                </div>
                <div>
                  <span className="text-gray-400 uppercase text-[10px] block">Student ID</span>
                  <span className="font-bold text-gray-700 dark:text-gray-300 font-mono">{student.id}</span>
                </div>
                <div>
                  <span className="text-gray-400 uppercase text-[10px] block">Centre Code</span>
                  <span className="font-bold text-gray-700 dark:text-gray-300">CLD-HYD-01</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hall Ticket PDF Modal */}
      <HallTicketPDF
        isOpen={showHallTicketModal}
        onClose={() => setShowHallTicketModal(false)}
      />

    </div>
  );
};
