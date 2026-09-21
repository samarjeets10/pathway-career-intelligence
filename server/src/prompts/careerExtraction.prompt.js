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

        1. Extract only information explicitly supported by the provided text.
        2. Never invent skills, technologies, experience, projects, companies,
        qualifications, responsibilities, or achievements.
        3. Do not infer that a candidate knows a technology because it is related
        to another technology.
        4. Preserve the actual skill and technology names found in the source text.
        5. If information is not present, return an empty array.
        6. Do not calculate match scores.
        7. Do not determine skill gaps.
        8. Do not rank the candidate.
        9. Return ONLY the JSON object described below.
        10. Do not add fields that are not defined in the structure below.

        The JSON structure MUST be exactly:

        {
            "candidate": {
                "skills": [],
                "technologies": [],
                "experience": [
                    {
                        "title": "",
                        "company": "",
                        "duration": "",
                        "description": ""
                    }
                ],
                "projects": [
                    {
                        "name": "",
                        "description": "",
                        "technologies": []
                    }
                ]
            },
            "job": {
                "requiredSkills": [],
                "preferredSkills": [],
                "responsibilities": [],
                "experienceRequirements": []
            }
        }

        CANDIDATE RESUME:

        ${resume}

        CANDIDATE SELF-DESCRIPTION:

        ${selfDescription || "Not provided"}

        JOB DESCRIPTION:

        ${jobDescription}

        Extract the information into the exact JSON structure above.
    `;

}

module.exports = {
    careerExtractionPrompt
}