require("dotenv").config();
const generateInterviewReport = require("../src/services/ai.service");
const { resume, selfDescription, jobDescription } = require("../src/services/temp");

(async () => {

    try {
        const report = await generateInterviewReport({ resume, selfDescription, jobDescription });
        console.log(JSON.stringify(report, null, 2));
    } catch (error) {
        console.error("AI service test failed :");
        console.error(error);
        process.exitCode = 1;
    }
})();