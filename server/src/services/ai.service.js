// const { GoogleGenAI } = require("@google/genai");
const Groq = require("groq-sdk");
const interviewReportSchema = require("../schemas/interview-report.schema");
const interviewReportPrompt = require("../prompts/interviewReport.prompt");
const { z } = require('zod');


const apiKey = process.env.GROQ_API_KEY;


if (!apiKey) {
    console.error("api key not loaded or found!!");
}

const groq = new Groq({
    apiKey: apiKey
});

async function callLLmWithRetry({ prompt, schema }) {
    const completion = await groq.chat.completions.create({
        messages: [
            { 
                role: "system", 
                content: "You are an expert technical interviewer and career analyst." 
            },

            { 
                role: "user", 
                content: prompt 
            }
        ],

        model: "openai/gpt-oss-20b",
        response_format: {
            type: "json_schema",
            json_schema: {
                name: "interview_report",
                strict: true,
                schema
            }
        },
        
        temperature: 0.2,
        max_completion_tokens: 4096
    });

    return { text: completion.choices[0]?.message?.content };
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
};


async function generateInterviewReport({resume, selfDescription, jobDescription}) {

    const prompt = interviewReportPrompt({
        resume: resume || "Not provided", 
        selfDescription: selfDescription || "Not provided", 
        jobDescription
    });

    console.log("========== AI SERVICE START ==========");

    console.log("About to call Groq LLM...");


    const cleanSchema = stripConstraints(z.toJSONSchema(interviewReportSchema));
    const response = await callLLmWithRetry({
        prompt: prompt,
        schema: cleanSchema
    });

    console.log("LLM response received");
    console.log(response.text);

    const report = interviewReportSchema.parse(JSON.parse(response.text));

    console.log(report);

    return report;
    
}


module.exports = generateInterviewReport;