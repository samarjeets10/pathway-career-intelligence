const Groq = require("groq-sdk");
const { careerExtractionSchema } = require("../schemas/career-extraction.schema");
const { careerExtractionPrompt } = require("../prompts/careerExtraction.prompt");


const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
    console.error("api key not loaded or found!!");
}

const groq = new Groq({
    apiKey: apiKey
});


async function extractCareerInformation({
    resume, 
    selfDescription, 
    jobDescription
}) {

    const prompt = careerExtractionPrompt({
        resume, 
        selfDescription, 
        jobDescription
    });


    const completion = await groq.chat.completions.create({
        model: "openai/gpt-oss-20b",
        messages: [
            {
                role: "system",
                content: "You extract structured career information from provided text."
            },

            {
                role: "user",
                content: prompt
            },
        ],

        response_format: {
                type: "json_object"
        },
    });

    const rawContent =  completion.choices[0].message.content;

    let parsedContent;

    try {
        parsedContent = JSON.parse(rawContent);
    } catch (error) {
        throw new Error("AI returned invalid JSON during career information extraction.");
    };

    const validationResult = careerExtractionSchema.safeParse(parsedContent);


    if (!validationResult.success) {
        console.error(
            "Career extraction schema validation failed:",
            validationResult.error
        );

        throw new Error(
            "AI response did not match the expected career extraction structure."
        );
    }

    return validationResult.data;
    
}

module.exports = {
    extractCareerInformation
}