// const { GoogleGenAI } = require("@google/genai");
const Groq = require("groq-sdk");
const interviewReportSchema = require("../schemas/interview-report.schema");
const { interviewReportPrompt } = require("../prompts/interviewReport.prompt");
const { z } = require('zod');


const apiKey = process.env.GROQ_API_KEY;


if (!apiKey) {
    console.error("api key not loaded or found!!");
}

const groq = new Groq({
    apiKey: apiKey
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
};


async function callLLmWithRetry({ prompt, schema, validate, retries = 2 }) {

    for (let attemp = 1; attemp <= retries; attempt++) {
        
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
            max_completion_tokens: 8192
        });

        const responseText = completion.choices[0]?.message?.content;

        const result = validate(responseText);

        if (result.ok) {
            return result.data;
        }

        console.warn(`[ai.service] attempt ${attempt}/${retries} failed: ${result.reason}`);

        if (attempt === retries) {
            throw new Error(result.reason);
        }
    }
}


async function generateInterviewReport({
    candidate, job, skillAnalysis
}) {

    const prompt = interviewReportPrompt({
        candidate,
        job,
        skillAnalysis
    });

    const cleanSchema = stripConstraints(z.toJSONSchema(interviewReportSchema));

    const validate = (responseText) => {

        if (!responseText) {
            return {
                ok: false,
                reason:
                    "AI returned an empty interview report."
            };
        }

        let parsed;

        try {
            parsed = JSON.parse(responseText);
        } catch {
            return {
                ok: false,
                reason:
                    "AI returned invalid JSON during interview report generation."
            };
        }

        const result =
            interviewReportSchema.safeParse(parsed);

        if (!result.success) {
            return {
                ok: false,
                reason:
                    `AI interview report did not match the expected structure: ${result.error.message}`
            };
        }

        return {
            ok: true,
            data: result.data
        };
    };

    try {

        return await callLLmWithRetry({
            prompt,
            schema: cleanSchema,
            validate,
            retries: 2
        });

    } catch (error) {

        console.error(
            "\n========== GROQ REPORT ERROR =========="
        );

        console.error(error);

        console.error(
            "========================================\n"
        );

        throw error;
    }
}


module.exports = {
    generateInterviewReport
}