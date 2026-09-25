import React, { useState } from 'react';
import { Breadcrumb } from '../common/Breadcrumb';
import { 
  BookMarked, 
  BookOpen, 
  Search, 
  Download, 
  Printer, 
  FileText, 
  ShieldCheck, 
  Scale, 
  GraduationCap, 
  Clock, 
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { printDocument } from '../../utils/printUtils';

interface PolicySection {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export const CurriculumPage: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState('grading');
  const [searchQuery, setSearchQuery] = useState('');

  const sections: PolicySection[] = [
    {
      id: 'grading',
      title: 'Grading Systems & GPA Formula',
      icon: <Scale className="w-4 h-4 text-emerald-600" />,
      content: (
        <div className="space-y-4 text-xs leading-relaxed text-gray-700 dark:text-gray-300">
          <p>
            The university follows a 10-point absolute grading scale in compliance with UGC/AICTE CBCS (Choice Based Credit System) directives.
          </p>
          <div className="overflow-x-auto my-3">
            <table className="w-full text-left border border-gray-200 dark:border-slate-700">
              <thead className="bg-gray-100 dark:bg-slate-800 text-[11px] font-bold uppercase">
                <tr>
                  <th className="p-2 border">Marks Range</th>
                  <th className="p-2 border">Letter Grade</th>
                  <th className="p-2 border">Grade Points</th>
                  <th className="p-2 border">Qualitative Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                <tr><td className="p-2 border font-mono">90 - 100</td><td className="p-2 border font-bold text-emerald-600">A+</td><td className="p-2 border font-mono">10</td><td className="p-2 border">Outstanding</td></tr>
                <tr><td className="p-2 border font-mono">80 - 89</td><td className="p-2 border font-bold text-teal-600">A</td><td className="p-2 border font-mono">9</td><td className="p-2 border">Excellent</td></tr>
                <tr><td className="p-2 border font-mono">70 - 79</td><td className="p-2 border font-bold text-blue-600">B+</td><td className="p-2 border font-mono">8</td><td className="p-2 border">Very Good</td></tr>
                <tr><td className="p-2 border font-mono">60 - 69</td><td className="p-2 border font-bold text-amber-600">B</td><td className="p-2 border font-mono">7</td><td className="p-2 border">Good</td></tr>
                <tr><td className="p-2 border font-mono">50 - 59</td><td className="p-2 border font-bold text-orange-600">C</td><td className="p-2 border font-mono">6</td><td className="p-2 border">Average / Passing Minimum</td></tr>
                <tr><td className="p-2 border font-mono">&lt; 50</td><td className="p-2 border font-bold text-red-600">F</td><td className="p-2 border font-mono">0</td><td className="p-2 border">Fail / Requires Reappearance</td></tr>
              </tbody>
            </table>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-slate-800/80 rounded-xl border border-blue-100 dark:border-slate-700 font-mono text-[11px]">
            <strong>SGPA Calculation:</strong> SGPA = Σ (Course Credits × Grade Point) / Σ (Course Credits)<br />
            <strong>CGPA Calculation:</strong> CGPA = Σ (All Term Credits × Grade Point) / Total Degree Credits Earned
          </div>
        </div>
      )
    },
    {
      id: 'attendance',
      title: 'Attendance Rules & Condonation',
      icon: <Clock className="w-4 h-4 text-primary-600" />,
      content: (
        <div className="space-y-4 text-xs leading-relaxed text-gray-700 dark:text-gray-300">
          <p>
            Regular physical attendance in all lectures, practical laboratory sessions, and assigned tutorials is mandatory for every enrolled undergraduate candidate.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Mandatory 75% Requirement:</strong> A student must secure a minimum aggregate attendance of 75% across all enrolled subjects to be deemed eligible for End-Semester examinations.</li>
            <li><strong>Condonation Clause (65% - 74%):</strong> Shortage of attendance between 65% and 74% may be condoned by the Academic Council solely on genuine medical grounds upon submission of valid hospital discharge certificates within 3 days of resuming classes.</li>
            <li><strong>Detention:</strong> Students with attendance strictly below 65% are categorically detained and must repeat the semester in the succeeding academic cycle.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'credits',
      title: 'Degree Credit Requirements',
      icon: <GraduationCap className="w-4 h-4 text-purple-600" />,
      content: (
        <div className="space-y-4 text-xs leading-relaxed text-gray-700 dark:text-gray-300">
          <p>
            The B.Tech in Computer Science and Engineering is structured over 8 semesters with a mandatory minimum graduation threshold.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
              <span className="font-bold text-gray-900 dark:text-white block mb-1">Total Graduation Requirement</span>
              <p className="text-xl font-black text-primary-600 font-mono">160 Credits</p>
              <p className="text-[11px] text-gray-500 mt-1">Spanning Core, Professional Electives, and Open Electives.</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
              <span className="font-bold text-gray-900 dark:text-white block mb-1">Max Semester Load</span>
              <p className="text-xl font-black text-emerald-600 font-mono">24 Credits</p>
              <p className="text-[11px] text-gray-500 mt-1">Normal prescribed load is 18 - 22 credits per semester.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'exams',
      title: 'Examination Regulations & Code of Conduct',
      icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
      content: (
        <div className="space-y-4 text-xs leading-relaxed text-gray-700 dark:text-gray-300">
          <p>
            The Examination Disciplinary Committee enforces zero tolerance towards academic dishonesty or examination hall malpractice.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Entry & Admit Cards:</strong> Candidates must carry their valid Hall Ticket and University RFID ID Card. Admission into the examination hall is closed 15 minutes post bell.</li>
            <li><strong>Prohibited Devices:</strong> Cellular phones, programmable calculators, smart fitness bands, and electronic storage devices are strictly prohibited.</li>
            <li><strong>Malpractice Penalty:</strong> Possession of prohibited notes or electronic cheating apparatus results in immediate paper cancellation, semester expulsion, or disciplinary committee hearing.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'structure',
      title: 'Course Structure & 4-Year Roadmap',
      icon: <BookOpen className="w-4 h-4 text-blue-600" />,
      content: (
        <div className="space-y-4 text-xs leading-relaxed text-gray-700 dark:text-gray-300">
          <p>
            Progressive curriculum layout designed in accordance with National Education Policy (NEP 2020) and ABET engineering criteria.
          </p>
          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
              <span className="font-bold text-gray-900 dark:text-white">Year 1 (Sem 1 & 2): Foundation Sciences & Basic Engineering</span>
              <p className="text-gray-500 text-[11px] mt-0.5">Calculus, Physics, Basic Electrical, Programming in C & Python.</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
              <span className="font-bold text-primary-700 dark:text-primary-300">Year 2 (Sem 3 & 4) [Current]: Core Computer Science Fundamentals</span>
              <p className="text-gray-600 dark:text-gray-300 text-[11px] mt-0.5">Data Structures, DBMS, OOP, Computer Architecture, Web Tech, OS, Theory of Computation.</p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
              <span className="font-bold text-gray-900 dark:text-white">Year 3 (Sem 5 & 6): Advanced Systems & Specialized Electives</span>
              <p className="text-gray-500 text-[11px] mt-0.5">AI/ML, Cloud Computing, Distributed Systems, Cryptography, Compiler Design.</p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
              <span className="font-bold text-gray-900 dark:text-white">Year 4 (Sem 7 & 8): Industry Internship & Capstone Project</span>
              <p className="text-gray-500 text-[11px] mt-0.5">6-Month Industry Internship, Grand Capstone Defense, Open Elective minors.</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  const filteredSections = sections.filter(sec => 
    sec.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeSection = sections.find(s => s.id === activeSectionId) || sections[0];

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumb />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
            <BookMarked className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Curriculum & Academic Regulations
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Official University Regulation Manual (R22/R24 CBCS) • Grading scales, attendance clauses, and syllabi
            </p>
          </div>
        </div>

        <button
          onClick={() => printDocument("Academic_Regulations_Handbook")}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold shadow-md shadow-primary-600/25 transition-all self-start sm:self-auto"
        >
          <Printer className="w-4 h-4" />
          <span>Print Regulation Handbook</span>
        </button>
      </div>

      {/* Search Filter */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-card border border-gray-100 dark:border-slate-700">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search regulations (e.g. grading scale, attendance condonation, 160 credits, malpractice)..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Two column Reader layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Navigation Table of Contents */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-card border border-gray-100 dark:border-slate-700 space-y-1.5 h-fit">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-3 block mb-2">
            Regulation Handbook Sections
          </span>
          {filteredSections.map(sec => (
            <button
              key={sec.id}
              onClick={() => setActiveSectionId(sec.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeSectionId === sec.id
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-600/25'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={activeSectionId === sec.id ? 'text-white' : 'text-gray-400'}>
                  {sec.icon}
                </span>
                <span className="truncate text-left">{sec.title}</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 ${activeSectionId === sec.id ? 'text-white' : 'text-gray-400'}`} />
            </button>
          ))}
        </div>

        {/* Reader Document Viewer Pane */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-card border border-gray-100 dark:border-slate-700 md:col-span-2">
          <div className="border-b border-gray-100 dark:border-slate-700 pb-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-slate-700">
                {activeSection.icon}
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {activeSection.title}
              </h2>
            </div>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-gray-100 dark:bg-slate-700 text-gray-500">
              Section Code: REG-0{sections.findIndex(s => s.id === activeSection.id) + 1}
            </span>
          </div>

          {activeSection.content}

          {/* Reader Footer Stamp */}
          <div className="mt-8 pt-4 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between text-[11px] text-gray-400">
            <span>Approved by Academic Senate Resolution #44/2022</span>
            <span>Version: R22.3</span>
          </div>
        </div>

      </div>

    </div>
  );
};
