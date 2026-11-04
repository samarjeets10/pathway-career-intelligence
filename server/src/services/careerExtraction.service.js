const { careerExtractionSchema } = require("../schemas/career-extraction.schema");
const { careerExtractionPrompt } = require("../prompts/careerExtraction.prompt");
const { generateStructured } = require("./structuredAI.service");

async function extractCareerInformation({ resume, selfDescription, jobDescription }) {
    const { data } = await generateStructured({
        system: "You extract structured career information from provided text. Return the result as valid JSON.",
        prompt: careerExtractionPrompt({ resume, selfDescription, jobDescription }),
        zodSchema: careerExtractionSchema,
        maxTokens: 2048,
        purpose: "career-extraction",
        retries: 1
    });

    return data;
}

module.exports = { extractCareerInformation };