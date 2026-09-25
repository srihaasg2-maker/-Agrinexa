import { 
  StudentProfile, 
  CourseMark, 
  LeaveRequest, 
  CourseEnrollment, 
  ExamScheduleItem, 
  FeeBreakdown, 
  PaymentTransaction, 
  ReimbursementClaim,
  NotificationItem 
} from '../types/student';

export const INITIAL_STUDENT: StudentProfile = {
  id: "STU2024001",
  rollNumber: "24RA1A05U6",
  name: "Gottam Srihaas Reddy",
  email: "gottam.srihaas@studentmail.com",
  phone: "+91-8712787166",
  dob: "2005-03-20",
  gender: "Male",
  bloodGroup: "B+",
  aadhar: "XXXX-XXXX-5678",
  photo: "/images/student-photo.jpeg",
  department: "CSE",
  permanentAddress: {
    street: "456 Hyderabad Road",
    city: "Hyderabad",
    state: "Telangana",
    postalCode: "500001"
  },
  currentAddress: {
    street: "Student Hostel, Block D",
    city: "Hyderabad",
    state: "Telangana",
    postalCode: "500014"
  },
  emergencyContact: {
    name: "Ramesh Reddy",
    relationship: "Father",
    phone: "+91-9876543200"
  },
  enrollmentDate: "2024-07-01",
  currentSemester: 5,
  currentYear: 3,
  academicBatch: "2024 - 2028",
  cgpa: 8.4,
  gpa: 8.0,
  attendance: 59.5,
  activities: [
    {
      id: "act-1",
      type: "club",
      title: "Google Developer Student Clubs (GDSC)",
      roleOrPrize: "Technical Lead (Web & Cloud)",
      yearOrDate: "2024 - Present",
      description: "Leading peer workshops on modern web technologies, React, and cloud architecture."
    },
    {
      id: "act-2",
      type: "club",
      title: "Campus Coding & Algorithms Society",
      roleOrPrize: "Active Core Member",
      yearOrDate: "2024 - Present",
      description: "Competitive programming member focusing on data structures and system design."
    },
    {
      id: "act-3",
      type: "achievement",
      title: "Smart Campus Hackathon 2024",
      roleOrPrize: "First Prize - Best Technical Innovation",
      yearOrDate: "Oct 2024",
      description: "Engineered an AI-driven student attendance and laboratory schedule optimization system."
    },
    {
      id: "act-4",
      type: "achievement",
      title: "Academic Excellence Merit List",
      roleOrPrize: "Semester 1 Top 5% Rank",
      yearOrDate: "2024",
      description: "Awarded Certificate of Academic Distinction for exceptional performance in foundational engineering courses."
    },
    {
      id: "act-5",
      type: "event",
      title: "Annual TechFest - KPRIT 2024",
      roleOrPrize: "Hackathon Organizer & Lead Coordinator",
      yearOrDate: "Sep 2024",
      description: "Organized a 24-hour inter-college hackathon with over 350 active student participants."
    }
  ]
};

// Semester 2 Marks - Current Term Recalibrated Mock Data (8 Subjects, All Pass, SGPA: 8.00)
export const SEMESTER_2_MARKS: CourseMark[] = [
  {
    courseCode: "CS201",
    courseName: "Mathematics",
    creditHours: 4,
    midMarks: 32,
    midTotal: 40,
    finalInternalMarks: 40,
    finalInternalTotal: 50,
    overallPerformance: 80,
    grade: "A",
    gradePoints: 8.0,
    status: "Pass",
    semester: 2
  },
  {
    courseCode: "CS202",
    courseName: "BEFA (Basic Electronics & Fundamentals)",
    creditHours: 3,
    midMarks: 32,
    midTotal: 40,
    finalInternalMarks: 40,
    finalInternalTotal: 50,
    overallPerformance: 80,
    grade: "A",
    gradePoints: 8.0,
    status: "Pass",
    semester: 2
  },
  {
    courseCode: "CS203",
    courseName: "Operating Systems (OS)",
    creditHours: 4,
    midMarks: 33,
    midTotal: 40,
    finalInternalMarks: 41,
    finalInternalTotal: 50,
    overallPerformance: 81,
    grade: "A",
    gradePoints: 8.0,
    status: "Pass",
    semester: 2
  },
  {
    courseCode: "CS204",
    courseName: "Database Management (DBMA)",
    creditHours: 4,
    midMarks: 34,
    midTotal: 40,
    finalInternalMarks: 42,
    finalInternalTotal: 50,
    overallPerformance: 82,
    grade: "A",
    gradePoints: 8.0,
    status: "Pass",
    semester: 2
  },
  {
    courseCode: "CS205",
    courseName: "Software Engineering",
    creditHours: 3,
    midMarks: 32,
    midTotal: 40,
    finalInternalMarks: 40,
    finalInternalTotal: 50,
    overallPerformance: 80,
    grade: "A",
    gradePoints: 8.0,
    status: "Pass",
    semester: 2
  },
  {
    courseCode: "CS206L",
    courseName: "DBMS Lab",
    creditHours: 2,
    midMarks: 35,
    midTotal: 40,
    finalInternalMarks: 45,
    finalInternalTotal: 50,
    overallPerformance: 85,
    grade: "A",
    gradePoints: 8.0,
    status: "Pass",
    semester: 2
  },
  {
    courseCode: "CS207L",
    courseName: "OS Lab",
    creditHours: 2,
    midMarks: 35,
    midTotal: 40,
    finalInternalMarks: 45,
    finalInternalTotal: 50,
    overallPerformance: 85,
    grade: "A",
    gradePoints: 8.0,
    status: "Pass",
    semester: 2
  },
  {
    courseCode: "CS208P",
    courseName: "Real Time Project",
    creditHours: 3,
    midMarks: 33,
    midTotal: 40,
    finalInternalMarks: 41,
    finalInternalTotal: 50,
    overallPerformance: 81,
    grade: "A",
    gradePoints: 8.0,
    status: "Pass",
    semester: 2
  }
];

// Semester 1 Marks (Autumn Term - SGPA: 8.21, Cumulative CGPA: 8.07)
export const SEMESTER_1_MARKS: CourseMark[] = [
  {
    courseCode: "CS101",
    courseName: "Problem Solving & C Programming",
    creditHours: 4,
    midMarks: 34,
    midTotal: 40,
    finalInternalMarks: 41,
    finalInternalTotal: 50,
    overallPerformance: 81,
    grade: "A",
    gradePoints: 8.0,
    status: "Pass",
    semester: 1
  },
  {
    courseCode: "MA101",
    courseName: "Engineering Mathematics I",
    creditHours: 4,
    midMarks: 37,
    midTotal: 40,
    finalInternalMarks: 45,
    finalInternalTotal: 50,
    overallPerformance: 90,
    grade: "A+",
    gradePoints: 9.0,
    status: "Pass",
    semester: 1
  },
  {
    courseCode: "PH101",
    courseName: "Engineering Physics",
    creditHours: 3,
    midMarks: 33,
    midTotal: 40,
    finalInternalMarks: 41,
    finalInternalTotal: 50,
    overallPerformance: 80,
    grade: "A",
    gradePoints: 8.0,
    status: "Pass",
    semester: 1
  },
  {
    courseCode: "EE101",
    courseName: "Basic Electrical Engineering",
    creditHours: 3,
    midMarks: 32,
    midTotal: 40,
    finalInternalMarks: 40,
    finalInternalTotal: 50,
    overallPerformance: 79,
    grade: "B+",
    gradePoints: 7.7,
    status: "Pass",
    semester: 1
  }
];

// Semester 3 Marks (Upcoming / Registered courses)
export const SEMESTER_3_MARKS: CourseMark[] = [
  {
    courseCode: "CS301",
    courseName: "Data Structures & Algorithms",
    creditHours: 4,
    midMarks: 36,
    midTotal: 40,
    finalInternalMarks: 44,
    finalInternalTotal: 50,
    overallPerformance: 88,
    grade: "A",
    gradePoints: 8.0,
    status: "Pass",
    semester: 3
  },
  {
    courseCode: "CS302",
    courseName: "Computer Organization & Architecture",
    creditHours: 3,
    midMarks: 37,
    midTotal: 40,
    finalInternalMarks: 45,
    finalInternalTotal: 50,
    overallPerformance: 90,
    grade: "A+",
    gradePoints: 9.0,
    status: "Pass",
    semester: 3
  },
  {
    courseCode: "CS303",
    courseName: "Web Technologies & Cloud",
    creditHours: 4,
    midMarks: 38,
    midTotal: 40,
    finalInternalMarks: 47,
    finalInternalTotal: 50,
    overallPerformance: 92,
    grade: "A+",
    gradePoints: 9.0,
    status: "Pass",
    semester: 3
  }
];

// Semester 4 Marks (Year 2 Sem 2 - 4 Subjects, 15 Credits)
export const SEMESTER_4_MARKS: CourseMark[] = [
  { courseCode: 'CS401', courseName: 'Design & Analysis of Algorithms', creditHours: 4, midMarks: 35, midTotal: 40, finalInternalMarks: 48, finalInternalTotal: 50, overallPerformance: 91, grade: 'A+', gradePoints: 9.0, status: 'Pass', semester: 4 },
  { courseCode: 'CS402', courseName: 'Computer Networks', creditHours: 4, midMarks: 36, midTotal: 40, finalInternalMarks: 44, finalInternalTotal: 50, overallPerformance: 85, grade: 'A', gradePoints: 8.0, status: 'Pass', semester: 4 },
  { courseCode: 'CS403', courseName: 'Theory of Computation', creditHours: 4, midMarks: 34, midTotal: 40, finalInternalMarks: 42, finalInternalTotal: 50, overallPerformance: 81, grade: 'A', gradePoints: 8.0, status: 'Pass', semester: 4 },
  { courseCode: 'CS404', courseName: 'Web Application Development', creditHours: 3, midMarks: 38, midTotal: 40, finalInternalMarks: 46, finalInternalTotal: 50, overallPerformance: 91, grade: 'A+', gradePoints: 9.0, status: 'Pass', semester: 4 }
];

// All 22 Results Combined
export const ALL_22_MARKS: CourseMark[] = [
  ...SEMESTER_1_MARKS,
  ...SEMESTER_2_MARKS,
  ...SEMESTER_3_MARKS,
  ...SEMESTER_4_MARKS
];


export const INITIAL_LEAVE_REQUESTS: LeaveRequest[] = [
  {
    leaveId: "LV001",
    type: "Sick",
    fromDate: "2024-09-10",
    toDate: "2024-09-12",
    days: 3,
    reason: "Medical checkup",
    status: "Approved",
    appliedOn: "2024-09-09"
  },
  {
    leaveId: "LV002",
    type: "Casual",
    fromDate: "2024-10-15",
    toDate: "2024-10-16",
    days: 2,
    reason: "Personal work",
    status: "Pending",
    appliedOn: "2024-10-14"
  }
];

export const INITIAL_ENROLLMENTS: CourseEnrollment[] = [
  { courseCode: "CS501", courseName: "Compiler Design", facultyName: "Dr. Arvind Sharma", creditHours: 4, schedule: "Mon, Wed, Fri 09:00 AM - 10:30 AM", status: "Enrolled", room: "Hall B-201", department: "Computer Science", syllabusOverview: "Lexical analysis, Syntax analysis, Parsing techniques, Code optimization." },
  { courseCode: "CS502", courseName: "Machine Learning", facultyName: "Dr. K. S. Rao", creditHours: 4, schedule: "Tue, Thu 11:00 AM - 12:30 PM", status: "Enrolled", room: "Hall B-202", department: "Computer Science", syllabusOverview: "Supervised learning, Neural networks, SVM, Unsupervised learning." },
  { courseCode: "CS503", courseName: "Cloud Computing", facultyName: "Prof. Neha Gupta", creditHours: 3, schedule: "Mon, Wed 02:00 PM - 03:30 PM", status: "Enrolled", room: "Lab C-1", department: "Computer Science", syllabusOverview: "IaaS, PaaS, SaaS, Virtualization, AWS/GCP architecture." }
];

export const INITIAL_EXAM_SCHEDULE: ExamScheduleItem[] = [
  { courseCode: "CS501", courseName: "Compiler Design", date: "2026-12-10", time: "10:00 AM - 1:00 PM", roomNumber: "B201", seatNumber: "12", invigilator: "Dr. Arvind Sharma" },
  { courseCode: "CS502", courseName: "Machine Learning", date: "2026-12-12", time: "10:00 AM - 1:00 PM", roomNumber: "B202", seatNumber: "45", invigilator: "Dr. K. S. Rao" },
  { courseCode: "CS503", courseName: "Cloud Computing", date: "2026-12-14", time: "2:00 PM - 5:00 PM", roomNumber: "A105", seatNumber: "22", invigilator: "Prof. Neha Gupta" }
];

export const INITIAL_FEES: FeeBreakdown = {
  tuitionFee: 150000,
  labFee: 20000,
  sportsFee: 5000,
  libraryFee: 2000,
  totalFee: 177000,
  amountPaid: 177000,
  pendingAmount: 0,
  paymentStatus: "Paid"
};

export const INITIAL_PAYMENT_HISTORY: PaymentTransaction[] = [
  {
    id: "TXN-982341",
    receiptNumber: "REC-2024-SEM2-001",
    date: "2024-07-15",
    amount: 177000,
    description: "Semester 2 Complete Academic Fee (Tuition + Lab + Sports + Library)",
    paymentMethod: "HDFC NetBanking (Ref #TX9928174)",
    status: "Successful"
  },
  {
    id: "TXN-764321",
    receiptNumber: "REC-2024-SEM1-012",
    date: "2024-01-10",
    amount: 175000,
    description: "Semester 1 Admission, Security Deposit & Tuition Fee",
    paymentMethod: "UPI (Google Pay / SBI)",
    status: "Successful"
  }
];

export const INITIAL_REIMBURSEMENTS: ReimbursementClaim[] = [
  {
    id: "RMB-2024-01",
    title: "IEEE International Conference on Cloud Computing Registration Fee",
    category: "Conference / Workshop",
    amount: 8500,
    receiptName: "ieee_registration_receipt.pdf",
    appliedDate: "2024-09-02",
    status: "Disbursed",
    notes: "Paper accepted and presented in oral technical session."
  },
  {
    id: "RMB-2024-02",
    title: "Raspberry Pi 5 & Sensor Kit for B.Tech Capstone Project",
    category: "Project Equipment",
    amount: 6200,
    receiptName: "electronics_invoice_882.pdf",
    appliedDate: "2024-10-04",
    status: "Accounts Clearance",
    notes: "Verified by project advisor Dr. Rajesh Singh on Oct 6."
  },
  {
    id: "RMB-2024-03",
    title: "O'Reilly Advanced Database Architecture & Distributed Systems Books",
    category: "Books & Materials",
    amount: 3400,
    receiptName: "amazon_academic_order.pdf",
    appliedDate: "2024-10-18",
    status: "Advisor Approved",
    notes: "Department library verification attached."
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Semester 2 Mid-Term Results Published",
    message: "Your internal marks and performance sheets for all 8 subjects are now accessible.",
    timestamp: "2 hours ago",
    read: false,
    category: "academic",
    linkTarget: "marks"
  },
  {
    id: "notif-2",
    title: "End-Semester Hall Tickets Available",
    message: "Hall tickets for November 2024 examinations have been released. Download and carry printed copy.",
    timestamp: "1 day ago",
    read: false,
    category: "exam",
    linkTarget: "hall-tickets"
  },
  {
    id: "notif-3",
    title: "Leave Request LV001 Approved",
    message: "Your Sick Leave application for 3 days (Sep 10 - Sep 12) was approved by Head of Department.",
    timestamp: "3 days ago",
    read: true,
    category: "leave",
    linkTarget: "leaves"
  },
  {
    id: "notif-4",
    title: "Fee Clearance Verified",
    message: "All Semester 2 fees (₹1,77,000) have been reconciled. Official receipt is ready.",
    timestamp: "1 week ago",
    read: true,
    category: "fee",
    linkTarget: "fees"
  }
];
