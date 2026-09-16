const { GoogleGenAI } = require("@google/genai");
const interviewReportSchema = require("../schemas/interview-report.schema");
const { z } = require('zod');

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});


function stripConstraints(schema) {
    if (Array.isArray(schema)) return schema.map(stripConstraints);
    if (schema && typeof schema === "object") {
        const clone = {};
        for (const [key, value] of Object.entries(schema)) {
            if (["minLength", "maxLength", "minimum", "maximum", "minItems", "maxItems"].includes(key)) continue;
            clone[key] = stripConstraints(value);
        }
        return clone;
    }
    return schema;
}


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

    console.log("========== AI SERVICE START ==========");

    console.log("About to call Gemini...");

    const response = await callGeminiWithRetry({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: stripConstraints(z.toJSONSchema(interviewReportSchema))
        }
    });

    console.log("Gemini response received");
    console.log(response.text);

    const report = interviewReportSchema.parse(JSON.parse(response.text));

    console.log(report);

    return report;

}

async function callGeminiWithRetry(request, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            return await ai.models.generateContent(request);
        } catch (err) {
            const isOverloaded = err?.status === 503;
            if (!isOverloaded || attempt === retries) throw err;
            const delay = attempt * 2000; // 2s, 4s, 6s
            console.log(`Gemini overloaded, retrying in ${delay}ms...`);
            await new Promise(res => setTimeout(res, delay));
        }
    }
}


module.exports = generateInterviewReport;