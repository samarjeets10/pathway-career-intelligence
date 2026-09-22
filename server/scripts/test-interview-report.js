require("dotenv").config();

const {
    generateInterviewReport
} = require("../src/services/ai.service");

async function testInterviewReport() {
    const candidate = {
        skills: [
            "JavaScript",
            "React",
            "MongoDB"
        ],
        technologies: [
            "React",
            "Node.js",
            "MongoDB"
        ],
        experience: [],
        projects: []
    };

    const job = {
        requiredSkills: [
            "JavaScript",
            "React",
            "TypeScript",
            "Git"
        ],
        preferredSkills: [],
        responsibilities: [
            "Build frontend applications",
            "Work with React"
        ],
        experienceRequirements: []
    };

    const skillAnalysis = {
        matchScore: 67,

        required: {
            matched: [
                "javascript",
                "react"
            ],
            missing: [
                "typescript",
                "git"
            ]
        },

        preferred: {
            matched: [],
            missing: []
        },

        skillGaps: [
            "typescript",
            "git"
        ]
    };

    console.log(
        "\n========== CALLING AI REPORT SERVICE ==========\n"
    );

    const report =
        await generateInterviewReport({
            candidate,
            job,
            skillAnalysis
        });

    console.log(
        "\n========== GENERATED INTERVIEW REPORT ==========\n"
    );

    console.log(
        JSON.stringify(
            report,
            null,
            2
        )
    );

    console.log(
        "\n================================================\n"
    );
}

testInterviewReport().catch((error) => {
    console.error(
        "\n========== TEST FAILED =========="
    );

    console.error(error);

    process.exit(1);
});