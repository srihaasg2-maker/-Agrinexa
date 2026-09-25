import React, { useState } from 'react';
import { useScholar } from '../../context/ScholarContext';
import { 
  GraduationCap, 
  Lock, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  KeyRound, 
  Eye, 
  EyeOff,
  HelpCircle,
  X
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useScholar();
  const [studentId, setStudentId] = useState('24RA1A05U6');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    setTimeout(() => {
      const res = login(studentId, password);
      setLoading(false);
      if (!res.success) {
        setErrorMessage(res.error || 'Invalid credentials. Please verify your student ID and password.');
      }
    }, 700);
  };

  const handleQuickDemoFill = (id: string, pass: string) => {
    setStudentId(id);
    setPassword(pass);
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-100 via-blue-50/40 to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      
      {/* Background visual accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-soft border border-gray-100 dark:border-slate-800 p-6 sm:p-8 overflow-hidden">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary-700 to-primary-500 text-white shadow-lg shadow-primary-600/30 mb-3 transform hover:scale-105 transition-transform duration-300">
            <GraduationCap className="w-9 h-9" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Scholar
          </h1>
          <p className="text-xs sm:text-sm text-primary-600 dark:text-primary-400 font-semibold mt-0.5">
            Your Ultimate Campus Buddy
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Student Management & Academic Examination Portal
          </p>
        </div>

        {/* Demo Credentials Quick-Fill Banner */}
        <div className="mb-6 p-3 rounded-2xl bg-blue-50/80 dark:bg-slate-800/80 border border-blue-100 dark:border-slate-700 text-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-primary-800 dark:text-primary-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary-600" />
              Demo Quick-Access Account:
            </span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400">1-Click Fill</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoFill('24RA1A05U6', 'password123')}
              className="px-2.5 py-1 bg-white dark:bg-slate-700 hover:bg-primary-50 dark:hover:bg-slate-600 text-primary-700 dark:text-primary-300 rounded-lg font-mono text-[11px] font-semibold border border-blue-200 dark:border-slate-600 transition-colors shadow-2xs"
            >
              24RA1A05U6 (Gottam Srihaas Reddy)
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoFill('STU2024001', 'password123')}
              className="px-2.5 py-1 bg-white dark:bg-slate-700 hover:bg-primary-50 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 rounded-lg font-mono text-[11px] font-medium border border-gray-200 dark:border-slate-600 transition-colors shadow-2xs"
            >
              STU2024001
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-5 p-3 rounded-xl bg-danger-50 dark:bg-red-950/40 border border-danger-100 dark:border-red-900 text-danger-700 dark:text-red-400 text-xs flex items-start gap-2.5 animate-fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-danger" />
            <p className="font-medium">{errorMessage}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Student ID / Roll Number */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
              Student ID / Roll Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="e.g. 24RA1A05U6 or STU2024001"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all font-mono"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-xs text-primary-600 dark:text-primary-400 hover:underline font-semibold"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your account password"
                required
                className="w-full pl-10 pr-10 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Remember my login credentials
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-bold rounded-xl text-sm shadow-md shadow-primary-600/25 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 group"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Authenticating student...</span>
              </div>
            ) : (
              <>
                <span>Sign In to Scholar</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-8 pt-4 border-t border-gray-100 dark:border-slate-800 text-center">
          <p className="text-[11px] text-gray-400">
            Kommuri Pratha Reddy Institute of Technology • Hyderabad, Telangana
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-slate-800">
            <button
              onClick={() => {
                setShowForgotModal(false);
                setForgotSent(false);
              }}
              className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-3 text-primary-600 dark:text-primary-400">
              <KeyRound className="w-5 h-5" />
              <h3 className="font-bold text-base text-gray-900 dark:text-white">Reset Account Access</h3>
            </div>

            {forgotSent ? (
              <div className="py-4 text-center">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-gray-800 dark:text-gray-200">Reset Link Dispatched</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  We have forwarded password reset instructions to your student email: <strong>raj.kumar@studentmail.com</strong>
                </p>
                <button
                  onClick={() => {
                    setShowForgotModal(false);
                    setForgotSent(false);
                  }}
                  className="mt-4 w-full py-2 bg-primary-600 text-white text-xs font-semibold rounded-lg"
                >
                  Return to Login
                </button>
              </div>
            ) : (
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                  Enter your registered Student ID or University email to receive an instant verification reset token.
                </p>
                <input
                  type="text"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="e.g. 20CSE001 or raj.kumar@studentmail.com"
                  className="w-full px-3.5 py-2.5 text-xs bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl mb-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="button"
                  onClick={() => setForgotSent(true)}
                  className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Send Recovery Link
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
