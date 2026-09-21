require("dotenv").config();

const {
    extractCareerInformation
} = require("../src/services/careerExtraction.service");

const {
    analyzeSkillGap
} = require("../src/services/skillMatching.service");

async function main() {

    const extraction = await extractCareerInformation({
        resume: `
            Samarjeet Sabale is a final year Computer Science student.

            Skills:
            JavaScript, React, Node.js, Express, MongoDB,
            Tailwind CSS, Redux Toolkit, Git and GitHub.

            Projects:
            Clime Weather Dashboard built with React, OpenWeather API,
            Leaflet and Tailwind CSS.

            Pathway Career Intelligence built with React, Node.js,
            Express and MongoDB.
        `,

        selfDescription: `
            I am a final year CSE student focused on frontend and
            full-stack development.
        `,

        jobDescription: `
            Frontend Developer

            Required:
            JavaScript, React, HTML, CSS

            Preferred:
            TypeScript, Docker

            Responsibilities:
            Build responsive web applications.
            Work with REST APIs.
            Collaborate with backend developers.

            Experience:
            0-2 years of development experience.
        `
    });

    const skillAnalysis = analyzeSkillGap({
        resumeSkills: extraction.candidate.skills,
        requiredSkills: extraction.job.requiredSkills,
        preferredSkills: extraction.job.preferredSkills
    });

    console.log("\n========== AI EXTRACTION ==========");
    console.log(JSON.stringify(extraction, null, 2));

    console.log("\n========== DETERMINISTIC SKILL ANALYSIS ==========");
    console.log(JSON.stringify(skillAnalysis, null, 2));
}

main().catch((error) => {
    console.error("Career analysis failed:");
    console.error(error);
});