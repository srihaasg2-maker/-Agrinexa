const fs = require('fs');
const path = require('path');

const contextPath = path.join('src', 'context', 'ScholarContext.tsx');
let content = fs.readFileSync(contextPath, 'utf8');

content = content.replace(/SEMESTER_3_MARKS,/, 'SEMESTER_3_MARKS,\n  SEMESTER_4_MARKS,\n  ALL_22_MARKS,');

content = content.replace(/parsed\.cgpa === 8\.07 && parsed\.attendance === 59\.5/, "parsed.rollNumber === '24RA1A05U6' && parsed.currentSemester === 5 && parsed.cgpa === 8.07");

content = content.replace(/const getMarksForSemester = \(sem: number\): CourseMark\[\] => \{[\s\S]*?case 3:\s*default:\s*return SEMESTER_3_MARKS;\s*\}/, const getMarksForSemester = (sem: number): CourseMark[] => {
    switch (sem) {
      case 0: return ALL_22_MARKS;
      case 1: return SEMESTER_1_MARKS;
      case 2: return SEMESTER_2_MARKS;
      case 3: return SEMESTER_3_MARKS;
      case 4: return SEMESTER_4_MARKS;
      case 5:
      default: return [];
    });

content = content.replace(/allMarks:\s*SEMESTER_2_MARKS,/, 'allMarks: ALL_22_MARKS,');

fs.writeFileSync(contextPath, content, 'utf8');
console.log('ScholarContext.tsx successfully updated via script.');
