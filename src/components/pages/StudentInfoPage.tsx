import React, { useState } from 'react';
import { useScholar } from '../../context/ScholarContext';
import { Breadcrumb } from '../common/Breadcrumb';
import { 
  UserCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Award, 
  Users, 
  Trophy, 
  Calendar, 
  Plus, 
  X, 
  HeartHandshake, 
  Fingerprint,
  Edit3
} from 'lucide-react';
import { StudentActivity } from '../../types/student';

export const StudentInfoPage: React.FC = () => {
  const { student, updateStudent, addActivity } = useScholar();
  const [showAadhar, setShowAadhar] = useState(false);
  const [activeTab, setActiveTab] = useState<'personal' | 'address' | 'emergency' | 'activity'>('personal');
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);

  // New activity form
  const [actType, setActType] = useState<StudentActivity['type']>('club');
  const [actTitle, setActTitle] = useState('');
  const [actRole, setActRole] = useState('');
  const [actYear, setActYear] = useState('');
  const [actDesc, setActDesc] = useState('');

  const handleCreateActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actTitle || !actRole) return;

    addActivity({
      type: actType,
      title: actTitle,
      roleOrPrize: actRole,
      yearOrDate: actYear || '2024',
      description: actDesc
    });

    // Reset
    setActTitle('');
    setActRole('');
    setActYear('');
    setActDesc('');
    setShowAddActivityModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumb />

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-2xl bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
          <UserCircle2 className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Student Information
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Official candidate profile, registered residential addresses, and university extracurricular records
          </p>
        </div>
      </div>

      {/* Profile Overview Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-card border border-gray-100 dark:border-slate-700 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative group">
          {student.photo && student.photo !== 'student_photo_url' ? (
            <img
              src={student.photo}
              alt={student.name}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.parentElement?.querySelector('.avatar-fallback');
                if (fallback) (fallback as HTMLElement).style.display = 'flex';
              }}
              className="w-28 h-28 rounded-2xl object-cover ring-4 ring-primary-500/20 shadow-md"
            />
          ) : null}
          <div 
            className={`avatar-fallback w-28 h-28 rounded-2xl bg-gradient-to-tr from-primary-700 via-primary-600 to-blue-500 flex flex-col items-center justify-center text-white ring-4 ring-primary-500/20 shadow-md ${
              student.photo && student.photo !== 'student_photo_url' ? 'hidden' : 'flex'
            }`}
          >
            <span className="text-3xl font-black font-mono tracking-tight">GSR</span>
            <span className="text-[10px] uppercase font-bold tracking-wider mt-1 opacity-80">{student.department || 'CSE'}</span>
          </div>
          <div className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-primary-600 text-white shadow-sm">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                {student.name}
              </h2>
              <p className="text-xs text-primary-600 dark:text-primary-400 font-semibold mt-0.5">
                Roll No: <span className="font-mono">{student.rollNumber}</span> • Student ID: <span className="font-mono">{student.id}</span>
              </p>
            </div>
            <span className="inline-flex self-center sm:self-start items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
              Verified Enrolled Student
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs pt-4 border-t border-gray-100 dark:border-slate-700">
            <div>
              <span className="text-gray-400 text-[10px] uppercase font-bold block">Current Program & Dept</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">B.Tech - {student.department || 'CSE'} (3rd Year, Semester {student.currentSemester})</span>
            </div>
            <div>
              <span className="text-gray-400 text-[10px] uppercase font-bold block">Academic Batch</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200 font-mono">{student.academicBatch || '2024 - 2028'}</span>
            </div>
            <div>
              <span className="text-gray-400 text-[10px] uppercase font-bold block">Blood Group</span>
              <span className="font-semibold text-primary-600 font-mono">{student.bloodGroup}</span>
            </div>
            <div>
              <span className="text-gray-400 text-[10px] uppercase font-bold block">Gender</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">{student.gender}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs for 4 Sections */}
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-slate-700 pb-2 overflow-x-auto text-xs sm:text-sm font-bold">
        <button
          onClick={() => setActiveTab('personal')}
          className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'personal'
              ? 'bg-primary-600 text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'
          }`}
        >
          <UserCircle2 className="w-4 h-4" />
          <span>1. Personal Information</span>
        </button>

        <button
          onClick={() => setActiveTab('address')}
          className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'address'
              ? 'bg-primary-600 text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>2. Address Details</span>
        </button>

        <button
          onClick={() => setActiveTab('emergency')}
          className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'emergency'
              ? 'bg-primary-600 text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'
          }`}
        >
          <HeartHandshake className="w-4 h-4" />
          <span>3. Emergency Contact</span>
        </button>

        <button
          onClick={() => setActiveTab('activity')}
          className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'activity'
              ? 'bg-primary-600 text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>4. Student Activities & Awards</span>
        </button>
      </div>

      {/* SECTION 1: PERSONAL INFORMATION */}
      {activeTab === 'personal' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-card border border-gray-100 dark:border-slate-700 animate-fade-in space-y-6">
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <UserCircle2 className="w-5 h-5 text-primary-600" />
            <span>Personal & Identity Details</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-900/60 border border-gray-100 dark:border-slate-700">
              <span className="text-gray-400 uppercase font-bold text-[10px] block mb-1">Full Legal Name</span>
              <p className="text-sm font-bold text-gray-900 dark:text-white">{student.name}</p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-900/60 border border-gray-100 dark:border-slate-700">
              <span className="text-gray-400 uppercase font-bold text-[10px] block mb-1">Date of Birth</span>
              <p className="text-sm font-bold text-gray-900 dark:text-white font-mono">{student.dob} (19 Years)</p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-900/60 border border-gray-100 dark:border-slate-700">
              <span className="text-gray-400 uppercase font-bold text-[10px] block mb-1">Email Address</span>
              <p className="text-sm font-bold text-primary-600 dark:text-primary-400 font-mono truncate">{student.email}</p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-900/60 border border-gray-100 dark:border-slate-700">
              <span className="text-gray-400 uppercase font-bold text-[10px] block mb-1">Primary Phone Number</span>
              <p className="text-sm font-bold text-gray-900 dark:text-white font-mono">{student.phone}</p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-900/60 border border-gray-100 dark:border-slate-700">
              <span className="text-gray-400 uppercase font-bold text-[10px] block mb-1">Blood Group</span>
              <p className="text-sm font-bold text-danger font-mono">{student.bloodGroup}</p>
            </div>

            {/* Masked Aadhar with Interactive Show / Hide */}
            <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-slate-900/60 border border-blue-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-primary-700 dark:text-primary-400 uppercase font-bold text-[10px] block mb-1 flex items-center gap-1">
                  <Fingerprint className="w-3.5 h-3.5" />
                  National ID / Aadhar
                </span>
                <p className="text-sm font-black text-gray-900 dark:text-white font-mono">
                  {showAadhar ? '4928-8172-5678' : student.aadhar}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAadhar(!showAadhar)}
                className="p-2 rounded-xl bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:text-primary-600 shadow-2xs transition-colors"
                title={showAadhar ? "Mask Aadhar" : "Reveal Aadhar"}
              >
                {showAadhar ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: ADDRESS INFORMATION */}
      {activeTab === 'address' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          {/* Permanent Address */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-card border border-gray-100 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary-600" />
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Permanent Residential Address
              </h3>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-900/60 border border-gray-100 dark:border-slate-700 space-y-2 text-xs">
              <div>
                <span className="text-gray-400 font-bold uppercase text-[10px] block">Street Address</span>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{student.permanentAddress.street}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div>
                  <span className="text-gray-400 font-bold uppercase text-[10px] block">City</span>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{student.permanentAddress.city}</p>
                </div>
                <div>
                  <span className="text-gray-400 font-bold uppercase text-[10px] block">State</span>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{student.permanentAddress.state}</p>
                </div>
              </div>
              <div className="pt-2">
                <span className="text-gray-400 font-bold uppercase text-[10px] block">Postal / PIN Code</span>
                <p className="text-sm font-bold text-primary-600 font-mono">{student.permanentAddress.postalCode}</p>
              </div>
            </div>
          </div>

          {/* Current Address */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-card border border-gray-100 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Current Campus Hostel / Local Address
              </h3>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-900/60 border border-gray-100 dark:border-slate-700 space-y-2 text-xs">
              <div>
                <span className="text-gray-400 font-bold uppercase text-[10px] block">Street Address</span>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{student.currentAddress.street}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div>
                  <span className="text-gray-400 font-bold uppercase text-[10px] block">City</span>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{student.currentAddress.city}</p>
                </div>
                <div>
                  <span className="text-gray-400 font-bold uppercase text-[10px] block">State</span>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{student.currentAddress.state}</p>
                </div>
              </div>
              <div className="pt-2">
                <span className="text-gray-400 font-bold uppercase text-[10px] block">Postal / PIN Code</span>
                <p className="text-sm font-bold text-emerald-600 font-mono">{student.currentAddress.postalCode}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: EMERGENCY CONTACT */}
      {activeTab === 'emergency' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-card border border-gray-100 dark:border-slate-700 animate-fade-in space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-red-500" />
              <span>Registered Guardian & Emergency Contacts</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-5 rounded-2xl bg-red-50/50 dark:bg-slate-900/60 border border-red-100 dark:border-slate-700">
              <span className="text-red-700 dark:text-red-400 font-bold uppercase text-[10px] block mb-2">
                Primary Emergency Contact (Parent / Guardian)
              </span>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400 text-[10px] uppercase font-bold block">Contact Name</span>
                  <p className="text-base font-bold text-gray-900 dark:text-white">{student.emergencyContact.name}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] uppercase font-bold block">Relationship</span>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{student.emergencyContact.relationship}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] uppercase font-bold block">Emergency Phone Number</span>
                  <p className="text-base font-black text-red-600 dark:text-red-400 font-mono flex items-center gap-1.5 mt-0.5">
                    <Phone className="w-4 h-4" />
                    {student.emergencyContact.phone}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-slate-900/60 border border-gray-100 dark:border-slate-700">
              <span className="text-gray-500 font-bold uppercase text-[10px] block mb-2">
                University Campus Health Centre
              </span>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400 text-[10px] uppercase font-bold block">Medical Officer</span>
                  <p className="text-base font-bold text-gray-900 dark:text-white">Campus 24/7 Infirmary</p>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] uppercase font-bold block">Location</span>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Ground Floor, Student Activity Center</p>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] uppercase font-bold block">Campus Helpline</span>
                  <p className="text-base font-bold text-primary-600 font-mono flex items-center gap-1.5 mt-0.5">
                    <Phone className="w-4 h-4" />
                    +91-040-2345-6789
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: STUDENT ACTIVITY */}
      {activeTab === 'activity' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span>Extracurricular Records, Clubs & Honors</span>
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Official co-curricular transcript portfolio
              </p>
            </div>
            <button
              onClick={() => setShowAddActivityModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Record New Activity</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {student.activities.map((act) => (
              <div
                key={act.id}
                className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-card border border-gray-100 dark:border-slate-700 flex items-start gap-4"
              >
                <div className={`p-3 rounded-2xl shrink-0 ${
                  act.type === 'achievement'
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                    : act.type === 'club'
                    ? 'bg-blue-100 text-primary-700 dark:bg-blue-950/60 dark:text-blue-300'
                    : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                }`}>
                  {act.type === 'achievement' ? <Trophy className="w-5 h-5" /> :
                   act.type === 'club' ? <Users className="w-5 h-5" /> :
                   <Calendar className="w-5 h-5" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300">
                      {act.type}
                    </span>
                    <span className="text-[11px] font-mono text-gray-400">{act.yearOrDate}</span>
                  </div>

                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mt-1">
                    {act.title}
                  </h4>
                  <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 mt-0.5">
                    {act.roleOrPrize}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                    {act.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Record Activity Modal */}
      {showAddActivityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-6 border border-gray-100 dark:border-slate-800">
            <button
              onClick={() => setShowAddActivityModal(false)}
              className="absolute top-5 right-5 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">
              Add Student Activity or Award
            </h3>

            <form onSubmit={handleCreateActivity} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Category</label>
                <select
                  value={actType}
                  onChange={(e) => setActType(e.target.value as StudentActivity['type'])}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl"
                >
                  <option value="club">Club / Student Society</option>
                  <option value="achievement">Academic / Competition Achievement</option>
                  <option value="event">Campus Event / Hackathon</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Title / Society Name</label>
                <input
                  type="text"
                  value={actTitle}
                  onChange={(e) => setActTitle(e.target.value)}
                  placeholder="e.g. IEEE Student Branch or CyberSecurity Club"
                  required
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Designation / Rank / Award</label>
                <input
                  type="text"
                  value={actRole}
                  onChange={(e) => setActRole(e.target.value)}
                  placeholder="e.g. Vice President or Winner 1st Prize"
                  required
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Tenure / Year</label>
                <input
                  type="text"
                  value={actYear}
                  onChange={(e) => setActYear(e.target.value)}
                  placeholder="e.g. 2024 or Nov 2023"
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Brief Description</label>
                <textarea
                  value={actDesc}
                  onChange={(e) => setActDesc(e.target.value)}
                  placeholder="Briefly describe contributions or project scope..."
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl"
              >
                Save Extracurricular Record
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
