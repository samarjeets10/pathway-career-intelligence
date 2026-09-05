const { GoogleGenAI } = require("@google/genai");
const interviewReportSchema = require("../schemas/interview-report.schema");
const { z } = require('zod');

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});


async function generateInterviewReport({resume, selfDescription, jobDescription}) {

    const prompt = `You are an expert technical interviewer and career analyst.

    Analyze the candidate's profile against the target job description and generate
    a structured interview preparation report.

    CANDIDATE RESUME:
    ${resume}

    CANDIDATE SELF DESCRIPTION:
    ${selfDescription}

    JOB DESCRIPTION:
    ${jobDescription}

    Evaluate the candidate strictly based on the information provided.
    Do not invent skills, experience, projects, or achievements.

    Generate:
    - An overall match score
    - Technical interview questions
    - Behavioral interview questions
    - Skill gaps
    - A practical preparation plan`;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: z.toJSONSchema(interviewReportSchema)
        }
    });

    const report = interviewReportSchema.parse(JSON.parse(response.text));

    console.log(report);

    return report;


}


module.exports = generateInterviewReport;