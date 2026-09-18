// const { GoogleGenAI } = require("@google/genai");
const Groq = require("groq-sdk");
const interviewReportSchema = require("../schemas/interview-report.schema");
const { z } = require('zod');

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
    console.error("api key not loaded or found!!");
}

const groq = new Groq({
    apiKey: process.env.apiKey
});

async function callLLmWithRetry({ prompt, schema }) {
    const completion = await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: `You are an expert technical interviewer and career analyst. 
                You MUST output strictly valid JSON following this schema structure:
                ${JSON.stringify(schema)}`
            },
            {
                role: "user",
                content: prompt
            }
        ],
        model: "llama-3.1-8b-instant", 
        response_format: { type: "json_object" },
        temperature: 0.2
    });

    return {
        text: completion.choices[0]?.message?.content
    };
}

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

    console.log("About to call Groq LLM...");


    const cleanSchema = stripConstraints(z.toJSONSchema(interviewReportSchema));

    // Calling the model with your retry wrapper intact
    const response = await callLLmWithRetry({
        prompt: prompt,
        schema: cleanSchema
    });

    console.log("LLM response received");
    console.log(response.text);

    // const response = await callGeminiWithRetry({
    //     model: "gemini-3.7-flash",
    //     contents: prompt,
    //     config: {
    //         responseMimeType: "application/json",
    //         responseSchema: stripConstraints(z.toJSONSchema(interviewReportSchema))
    //     }
    // });

    const report = interviewReportSchema.parse(JSON.parse(response.text));

    console.log(report);

    return report;

}


module.exports = generateInterviewReport;