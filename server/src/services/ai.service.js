const interviewReportSchema = require("../schemas/interview-report.schema");
const { interviewReportPrompt } = require("../prompts/interviewReport.prompt");
const { generateStructured } = require("./structuredAI.service");

async function generateInterviewReport({ candidate, job, skillAnalysis }) {
    const { data } = await generateStructured({
        system: "You are an expert technical interviewer and career analyst.",
        prompt: interviewReportPrompt({ candidate, job, skillAnalysis }),
        zodSchema: interviewReportSchema,
        strict: true,
        schemaName: "interview_report",
        maxTokens: 4000,
        purpose: "interview-report"
    });

    return data;
}

module.exports = { generateInterviewReport };