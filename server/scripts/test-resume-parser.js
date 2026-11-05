const { parseResumeText } = require("../src/services/resumeParser.service");

const text = `Jane Doe
jane@example.com | github.com/jane

SUMMARY
Backend developer. Next steps: learn Kubernetes.

Work Experience
Built REST APIs with Node.js and Express.js, deployed on AWS.

Education
B.Tech CSE, Spring 2024

Technical Skills:
JS, Python, Go, React, MongoDB, C++

Licenses & Certifications
AWS Cloud Practitioner`;

console.log(JSON.stringify(parseResumeText(text), null, 2));