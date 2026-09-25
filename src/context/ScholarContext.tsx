import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  StudentProfile, 
  CourseMark, 
  LeaveRequest, 
  CourseEnrollment, 
  ExamScheduleItem, 
  FeeBreakdown, 
  PaymentTransaction, 
  ReimbursementClaim,
  NotificationItem,
  StudentActivity
} from '../types/student';
import { 
  INITIAL_STUDENT, 
  SEMESTER_1_MARKS, 
  SEMESTER_2_MARKS, 
  SEMESTER_3_MARKS, 
  SEMESTER_4_MARKS,
  ALL_22_MARKS,
  INITIAL_LEAVE_REQUESTS, 
  INITIAL_ENROLLMENTS, 
  INITIAL_EXAM_SCHEDULE, 
  INITIAL_FEES, 
  INITIAL_PAYMENT_HISTORY, 
  INITIAL_REIMBURSEMENTS, 
  INITIAL_NOTIFICATIONS 
} from '../data/mockData';

export type NavigationPage = 
  | 'dashboard'
  | 'leaves'
  | 'enrollment'
  | 'info'
  | 'fees'
  | 'exams'
  | 'hall-tickets'
  | 'curriculum'
  | 'marks'
  | 'settings';

interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'info' | 'error' | 'warning';
}

interface ScholarContextType {
  isAuthenticated: boolean;
  activePage: NavigationPage;
  setActivePage: (page: NavigationPage) => void;
  student: StudentProfile;
  updateStudent: (updated: Partial<StudentProfile>) => void;
  addActivity: (activity: Omit<StudentActivity, 'id'>) => void;
  selectedSemester: number;
  setSelectedSemester: (sem: number) => void;
  getMarksForSemester: (sem: number) => CourseMark[];
  allMarks: CourseMark[];
  leaveRequests: LeaveRequest[];
  addLeaveRequest: (req: Omit<LeaveRequest, 'leaveId' | 'status' | 'appliedOn'>) => boolean;
  cancelLeaveRequest: (leaveId: string) => void;
  enrollments: CourseEnrollment[];
  examSchedule: ExamScheduleItem[];
  fees: FeeBreakdown;
  paymentHistory: PaymentTransaction[];
  reimbursements: ReimbursementClaim[];
  addReimbursement: (claim: Omit<ReimbursementClaim, 'id' | 'appliedDate' | 'status'>) => void;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  login: (idOrRoll: string, pass: string) => { success: boolean; error?: string };
  logout: () => void;
  toast: ToastState;
  showToast: (message: string, type?: 'success' | 'info' | 'error' | 'warning') => void;
  hideToast: () => void;
  resetAllData: () => void;
}

const ScholarContext = createContext<ScholarContextType | undefined>(undefined);

export const ScholarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Authentication: default true for easy demo access, but full login flow is available
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('scholar_auth');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [activePage, setActivePage] = useState<NavigationPage>('dashboard');
  const [selectedSemester, setSelectedSemester] = useState<number>(0);

  // Student Profile with cache migration for Gottam Srihaas Reddy
  const [student, setStudent] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('scholar_student');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.rollNumber === '24RA1A05U6' && parsed.cgpa === 8.4 && parsed.attendance === 59.5) {
          return parsed;
        }
      } catch (e) {
        // ignore
      }
    }
    // If outdated student in storage, clear old cached data so new defaults take effect
    localStorage.removeItem('scholar_leaves');
    localStorage.removeItem('scholar_reimbursements');
    localStorage.removeItem('scholar_notifications');
    return INITIAL_STUDENT;
  });

  // Leaves
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(() => {
    const saved = localStorage.getItem('scholar_leaves');
    return saved ? JSON.parse(saved) : INITIAL_LEAVE_REQUESTS;
  });

  // Reimbursements
  const [reimbursements, setReimbursements] = useState<ReimbursementClaim[]>(() => {
    const saved = localStorage.getItem('scholar_reimbursements');
    return saved ? JSON.parse(saved) : INITIAL_REIMBURSEMENTS;
  });

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('scholar_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Theme
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('scholar_theme');
    return saved ? JSON.parse(saved) : false;
  });

  // Toast
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: '',
    type: 'success'
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('scholar_auth', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('scholar_student', JSON.stringify(student));
  }, [student]);

  useEffect(() => {
    localStorage.setItem('scholar_leaves', JSON.stringify(leaveRequests));
  }, [leaveRequests]);

  useEffect(() => {
    localStorage.setItem('scholar_reimbursements', JSON.stringify(reimbursements));
  }, [reimbursements]);

  useEffect(() => {
    localStorage.setItem('scholar_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('scholar_theme', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' | 'warning' = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3500);
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const updateStudent = (updated: Partial<StudentProfile>) => {
    setStudent(prev => ({ ...prev, ...updated }));
    showToast('Profile information updated successfully', 'success');
  };

  const addActivity = (activity: Omit<StudentActivity, 'id'>) => {
    const newAct: StudentActivity = {
      ...activity,
      id: `act-${Date.now()}`
    };
    setStudent(prev => ({
      ...prev,
      activities: [newAct, ...prev.activities]
    }));
    showToast('New achievement/activity recorded!', 'success');
  };

  const getMarksForSemester = (sem: number): CourseMark[] => {
    switch (sem) {
      case 0:
        return ALL_22_MARKS;
      case 1:
        return SEMESTER_1_MARKS;
      case 2:
        return SEMESTER_2_MARKS;
      case 3:
        return SEMESTER_3_MARKS;
      case 4:
        return SEMESTER_4_MARKS;
      case 5:
      default:
        return [];
    }
  };

  const addLeaveRequest = (req: Omit<LeaveRequest, 'leaveId' | 'status' | 'appliedOn'>): boolean => {
    const newId = `LV00${leaveRequests.length + 1}`;
    const today = new Date().toISOString().split('T')[0];
    const newLeave: LeaveRequest = {
      ...req,
      leaveId: newId,
      status: 'Pending',
      appliedOn: today
    };

    setLeaveRequests(prev => [newLeave, ...prev]);

    // Also add to notifications
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Leave Request ${newId} Submitted`,
      message: `${req.type} leave for ${req.days} days applied and queued for Dean's approval.`,
      timestamp: 'Just now',
      read: false,
      category: 'leave',
      linkTarget: 'leaves'
    };
    setNotifications(prev => [newNotif, ...prev]);
    showToast(`Leave request ${newId} submitted successfully!`, 'success');
    return true;
  };

  const cancelLeaveRequest = (leaveId: string) => {
    setLeaveRequests(prev => prev.filter(l => l.leaveId !== leaveId));
    showToast(`Leave request ${leaveId} cancelled.`, 'info');
  };

  const addReimbursement = (claim: Omit<ReimbursementClaim, 'id' | 'appliedDate' | 'status'>) => {
    const newId = `RMB-2024-0${reimbursements.length + 1}`;
    const today = new Date().toISOString().split('T')[0];
    const newClaim: ReimbursementClaim = {
      ...claim,
      id: newId,
      appliedDate: today,
      status: 'Submitted'
    };
    setReimbursements(prev => [newClaim, ...prev]);
    showToast(`Reimbursement claim ${newId} filed successfully!`, 'success');
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const login = (idOrRoll: string, pass: string): { success: boolean; error?: string } => {
    const cleanId = idOrRoll.trim().toUpperCase();
    if (!cleanId || !pass) {
      return { success: false, error: 'Please enter both Student ID and Password.' };
    }

    if (
      (cleanId === '24RA1A05U6' || cleanId === 'STU2024001' || cleanId === 'GOTTAM' || cleanId === 'SRIHAAS' || cleanId === '20CSE001') &&
      (pass === 'password123' || pass === 'scholar123' || pass === 'demo')
    ) {
      setIsAuthenticated(true);
      setActivePage('dashboard');
      showToast('Welcome back, Gottam Srihaas Reddy!', 'success');
      return { success: true };
    }

    // Flexible fallback for demo testing
    if (pass.length >= 4) {
      setIsAuthenticated(true);
      setActivePage('dashboard');
      showToast(`Logged in successfully as ${cleanId}`, 'success');
      return { success: true };
    }

    return { success: false, error: 'Invalid credentials. Use 24RA1A05U6 / password123' };
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast('You have been logged out securely.', 'info');
  };

  const resetAllData = () => {
    setStudent(INITIAL_STUDENT);
    setLeaveRequests(INITIAL_LEAVE_REQUESTS);
    setReimbursements(INITIAL_REIMBURSEMENTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    localStorage.clear();
    showToast('Mock data reset to original defaults', 'info');
  };

  return (
    <ScholarContext.Provider
      value={{
        isAuthenticated,
        activePage,
        setActivePage,
        student,
        updateStudent,
        addActivity,
        selectedSemester,
        setSelectedSemester,
        getMarksForSemester,
        allMarks: ALL_22_MARKS,
        leaveRequests,
        addLeaveRequest,
        cancelLeaveRequest,
        enrollments: INITIAL_ENROLLMENTS,
        examSchedule: INITIAL_EXAM_SCHEDULE,
        fees: INITIAL_FEES,
        paymentHistory: INITIAL_PAYMENT_HISTORY,
        reimbursements,
        addReimbursement,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        darkMode,
        toggleDarkMode,
        login,
        logout,
        toast,
        showToast,
        hideToast,
        resetAllData,
      }}
    >
      {children}
    </ScholarContext.Provider>
  );
};

export const useScholar = (): ScholarContextType => {
  const context = useContext(ScholarContext);
  if (!context) {
    throw new Error('useScholar must be used within a ScholarProvider');
  }
  return context;
};
