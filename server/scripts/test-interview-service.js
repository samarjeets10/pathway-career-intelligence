require("dotenv").config();

const {
    analyzeInterviewData
} = require("../src/services/interview.service");


async function main() {

    const result =
        await analyzeInterviewData({

            resume: `
                Samarjeet Sabale is a final year Computer Science student.

                Skills:
                JavaScript, React, Node.js, Express, MongoDB,
                Tailwind CSS, Redux Toolkit, Git and GitHub.

                Projects:
                Clime Weather Dashboard built with React,
                OpenWeather API, Leaflet and Tailwind CSS.

                Pathway Career Intelligence built with React,
                Node.js, Express and MongoDB.
            `,

            selfDescription: `
                I am a final year CSE student focused on frontend
                and full-stack development.
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


    console.log("\n========== INTERVIEW SERVICE RESULT ==========");

    console.log(
        JSON.stringify(result, null, 2)
    );
}


main().catch((error) => {

    console.error(
        "Interview service test failed:"
    );

    console.error(error);

});