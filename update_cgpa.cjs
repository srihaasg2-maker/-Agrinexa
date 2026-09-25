const fs = require('fs');
const path = require('path');

const mockDataPath = path.join('src', 'data', 'mockData.ts');
let content = fs.readFileSync(mockDataPath, 'utf8');

// Update CGPA to 8.12
content = content.replace(/cgpa:\s*8\.07/, 'cgpa: 8.12');

// Update CS401 grade and points
content = content.replace(/\{ courseCode:\s*'CS401'[\s\S]*?grade:\s*'A'[\s\S]*?gradePoints:\s*8\.0[\s\S]*?\}/, (match) => {
    return match.replace(/overallPerformance:\s*83/, 'overallPerformance: 91')
                .replace(/grade:\s*'A'/, "grade: 'A+'")
                .replace(/gradePoints:\s*8\.0/, 'gradePoints: 9.0')
                .replace(/finalInternalMarks:\s*43/, 'finalInternalMarks: 48');
});

fs.writeFileSync(mockDataPath, content, 'utf8');
console.log('mockData.ts updated with new CGPA and marks');
