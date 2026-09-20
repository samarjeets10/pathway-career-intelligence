require("dotenv").config();

const { extractCareerInformation } = require("../src/services/careerExtraction.service");


async function main() {
    const result = await extractCareerInformation({
        resume: `
            Samarjeet Sabale

            Final year Computer Science student.

            Skills:
            JavaScript, React, Node.js, Express, MongoDB,
            Tailwind CSS, Redux Toolkit, Git and GitHub.

            Projects:

            Clime Weather Dashboard
            Built a weather dashboard using React, OpenWeather API,
            Leaflet and Tailwind CSS.

            Pathway Career Intelligence
            Building a full-stack career intelligence platform
            using React, Node.js, Express and MongoDB.
            `,

            selfDescription: `
            I am a final year CSE student focused on frontend and
            full-stack web development.
            `,

            jobDescription: `
            We are looking for a Frontend Developer.

            Required Skills:
            JavaScript
            React
            HTML
            CSS

            Preferred:
            TypeScript
            Docker

            Responsibilities:
            Build responsive web applications.
            Work with REST APIs.
            Collaborate with backend developers.

            Experience:
            0-2 years of development experience.
        `
    });

    console.log(JSON.stringify(result, null, 2));

};


main().catch((error) => {

    console.error("Extraction failed:");

    console.error(error);

    process.exit(1);
});