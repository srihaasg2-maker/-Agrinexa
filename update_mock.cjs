const fs = require('fs');
const path = require('path');

const mockDataPath = path.join('src', 'data', 'mockData.ts');
let content = fs.readFileSync(mockDataPath, 'utf8');

// Update INITIAL_STUDENT
content = content.replace(/currentSemester:\s*\d+,/, 'currentSemester: 5,\n  currentYear: 3,\n  academicBatch: "2024 - 2028",');

// Define the new marks blocks
const newMarks = `
// Semester 4 Marks (Year 2 Sem 2 - 4 Subjects, 15 Credits)
export const SEMESTER_4_MARKS: CourseMark[] = [
  { courseCode: 'CS401', courseName: 'Design & Analysis of Algorithms', creditHours: 4, midMarks: 35, midTotal: 40, finalInternalMarks: 43, finalInternalTotal: 50, overallPerformance: 83, grade: 'A', gradePoints: 8.0, status: 'Pass', semester: 4 },
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
`;

content = content.replace(/(export const SEMESTER_3_MARKS: CourseMark\[\] = \[[\s\S]*?\];)/, '$1\n' + newMarks);

// Update INITIAL_ENROLLMENTS
const enrollmentsRegex = /export const INITIAL_ENROLLMENTS: CourseEnrollment\[\] = \[[\s\S]*?\];/;
const newEnrollments = `export const INITIAL_ENROLLMENTS: CourseEnrollment[] = [
  { courseCode: "CS501", courseName: "Compiler Design", facultyName: "Dr. Arvind Sharma", creditHours: 4, schedule: "Mon, Wed, Fri 09:00 AM - 10:30 AM", status: "Enrolled", room: "Hall B-201", department: "Computer Science", syllabusOverview: "Lexical analysis, Syntax analysis, Parsing techniques, Code optimization." },
  { courseCode: "CS502", courseName: "Machine Learning", facultyName: "Dr. K. S. Rao", creditHours: 4, schedule: "Tue, Thu 11:00 AM - 12:30 PM", status: "Enrolled", room: "Hall B-202", department: "Computer Science", syllabusOverview: "Supervised learning, Neural networks, SVM, Unsupervised learning." },
  { courseCode: "CS503", courseName: "Cloud Computing", facultyName: "Prof. Neha Gupta", creditHours: 3, schedule: "Mon, Wed 02:00 PM - 03:30 PM", status: "Enrolled", room: "Lab C-1", department: "Computer Science", syllabusOverview: "IaaS, PaaS, SaaS, Virtualization, AWS/GCP architecture." }
];`;
content = content.replace(enrollmentsRegex, newEnrollments);

// Update INITIAL_EXAM_SCHEDULE
const scheduleRegex = /export const INITIAL_EXAM_SCHEDULE: ExamScheduleItem\[\] = \[[\s\S]*?\];/;
const newSchedule = `export const INITIAL_EXAM_SCHEDULE: ExamScheduleItem[] = [
  { courseCode: "CS501", courseName: "Compiler Design", date: "2026-12-10", time: "10:00 AM - 1:00 PM", roomNumber: "B201", seatNumber: "12", invigilator: "Dr. Arvind Sharma" },
  { courseCode: "CS502", courseName: "Machine Learning", date: "2026-12-12", time: "10:00 AM - 1:00 PM", roomNumber: "B202", seatNumber: "45", invigilator: "Dr. K. S. Rao" },
  { courseCode: "CS503", courseName: "Cloud Computing", date: "2026-12-14", time: "2:00 PM - 5:00 PM", roomNumber: "A105", seatNumber: "22", invigilator: "Prof. Neha Gupta" }
];`;
content = content.replace(scheduleRegex, newSchedule);

fs.writeFileSync(mockDataPath, content, 'utf8');
console.log('mockData.ts successfully updated via script.');
