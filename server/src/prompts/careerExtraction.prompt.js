
function careerExtractionPrompt({
    resume,
    selfDescription,
    jobDescription
}) {
    return `
        You are a structured career information extraction system.

        Your task is to extract factual information from the candidate resume,
        candidate self-description, and job description.

        IMPORTANT RULES:

        1. Extract only information supported by the provided text.
        2. Never invent skills, technologies, experience, projects, companies,
        qualifications, or responsibilities.
        3. Do not infer that a candidate knows a technology merely because it is
        related to another technology.
        4. Preserve the actual skill or technology names found in the source text.
        5. If information is not present, return an empty array.
        6. Do not calculate match scores.
        7. Do not determine skill gaps.
        8. Do not rank the candidate.
        9. Do not add explanations outside the requested structured output.

        CANDIDATE RESUME:

        ${resume}

        CANDIDATE SELF-DESCRIPTION:

        ${selfDescription || "Not provided"}

        JOB DESCRIPTION:

        ${jobDescription}

        Extract the information required by the provided schema.
    `;

}

module.exports = {
    careerExtractionPrompt
}