export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface StudentActivity {
  id: string;
  type: 'club' | 'event' | 'achievement';
  title: string;
  roleOrPrize: string;
  yearOrDate: string;
  description: string;
}

export interface StudentProfile {
  id: string;
  rollNumber: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  bloodGroup: string;
  aadhar: string;
  photo: string;
  department?: string;
  permanentAddress: Address;
  currentAddress: Address;
  emergencyContact: EmergencyContact;
  enrollmentDate: string;
  currentSemester: number;
  currentYear?: number;
  academicBatch?: string;
  cgpa: number;
  gpa: number;
  attendance: number;
  activities: StudentActivity[];
}

export interface CourseMark {
  courseCode: string;
  courseName: string;
  creditHours: number;
  midMarks: number;
  midTotal: number;
  finalInternalMarks: number;
  finalInternalTotal: number;
  overallPerformance: number;
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D' | 'F';
  gradePoints?: number;
  status: 'Pass' | 'Fail';
  semester?: number;
}

export interface LeaveRequest {
  leaveId: string;
  type: 'Sick' | 'Casual' | 'Medical' | 'Emergency';
  fromDate: string;
  toDate: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedOn: string;
  attachmentName?: string;
}

export interface CourseEnrollment {
  courseCode: string;
  courseName: string;
  facultyName: string;
  creditHours: number;
  schedule: string;
  status: 'Enrolled' | 'Waitlisted' | 'Completed';
  room?: string;
  department?: string;
  syllabusOverview?: string;
}

export interface ExamScheduleItem {
  courseCode: string;
  courseName: string;
  date: string;
  time: string;
  roomNumber: string;
  seatNumber: string;
  invigilator?: string;
}

export interface FeeBreakdown {
  tuitionFee: number;
  labFee: number;
  sportsFee: number;
  libraryFee: number;
  totalFee: number;
  amountPaid: number;
  pendingAmount: number;
  paymentStatus: 'Paid' | 'Pending' | 'Partial';
}

export interface PaymentTransaction {
  id: string;
  receiptNumber: string;
  date: string;
  amount: number;
  description: string;
  paymentMethod: string;
  status: 'Successful' | 'Pending' | 'Failed';
}

export interface ReimbursementClaim {
  id: string;
  title: string;
  category: 'Conference / Workshop' | 'Research Paper' | 'Project Equipment' | 'Books & Materials' | 'Competition / Hackathon';
  amount: number;
  receiptUrl?: string;
  receiptName?: string;
  appliedDate: string;
  status: 'Submitted' | 'Advisor Approved' | 'Accounts Clearance' | 'Disbursed';
  notes?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  category: 'academic' | 'leave' | 'exam' | 'fee' | 'general';
  linkTarget?: string;
}
