
function interviewReportPrompt({
    candidate,
    job,
    skillAnalysis
}) {
    return `
        You are an expert technical interviewer and career preparation
        analyst.

        Your task is to generate a structured interview preparation report
        using ONLY the candidate information, job requirements, and
        deterministic skill analysis provided below.

        IMPORTANT RULES:

        1. Do not invent candidate skills, technologies, experience,
        projects, companies, achievements, responsibilities, or
        qualifications.

        2. The deterministic skill analysis is authoritative.
        
        3. DO NOT calculate the match score.

        4. DO NOT modify the match score.

        5. DO NOT add new skill gaps.

        6. DO NOT remove any skill gaps provided by the deterministic
        analysis.

        7. You may explain and prioritize the provided skill gaps,
        but every skill gap must come from the deterministic analysis.

        8. Technical questions must be relevant to the target job and
        the candidate's demonstrated skills, technologies, projects,
        and experience.

        9. Behavioral questions must be grounded in the candidate's
        actual background.

        10. Answers should provide practical preparation guidance.
            Do not fabricate first-person experiences or achievements.

        11. If the candidate has no evidence of a technology or experience,
            do not claim that they have it.

        12. Return ONLY valid JSON.

        13. Follow the exact structure required by the output schema.

        CANDIDATE INFORMATION:

        ${JSON.stringify(candidate, null, 2)}

        JOB INFORMATION:

        ${JSON.stringify(job, null, 2)}

        DETERMINISTIC SKILL ANALYSIS:

        ${JSON.stringify(skillAnalysis, null, 2)}

        ==================================================
        MATCH SCORE
        ==================================================

        The deterministic skill matching system calculated:

        ${skillAnalysis.matchScore}

        Return this exact value as "matchScore".

        Do not recalculate it.

        ==================================================
        SKILL GAPS
        ==================================================

        The deterministic skill matching system is the ONLY authority
        for determining skill gaps.

        The exact deterministic skill gaps are:

        ${JSON.stringify(skillAnalysis.skillGaps, null, 2)}

        You MUST return exactly one skillGap object for every skill in
        the deterministic skill gap list.

        CRITICAL RULES:

        1. Do NOT create new skill gaps.

        2. Do NOT remove any deterministic skill gaps.

        3. Do NOT rename, normalize, expand, shorten, or rephrase a skill gap.

        4. The "skill" field in every skillGap object MUST exactly match
        one of the strings in the deterministic skillGaps array.

        5. Preserve the exact spelling and capitalization of the
        deterministic skill name.

        6. If the deterministic list contains:
        ["express", "aws"]

        then the only valid skill values are:
        "express"
        and
        "aws".

        7. Do NOT convert:
        "javascript" → "javascript (es6+)"
        "react" → "react.js"
        "aws" → "amazon web services"
        "node.js" → "node"
        or make any similar modification.

        8. The AI is responsible only for enriching each deterministic
        gap with:
        - severity
        - reason
        - recommendation
        - priority

        9. The reason must explain why the exact provided skill matters
        for the target job and why the available candidate evidence
        does not demonstrate that skill.

        10. Do not claim that a skill is missing if the candidate
            information explicitly demonstrates that exact skill.

        11. If a deterministic skill gap appears in the list, it must
            appear in the final skillGap array.

        12. If the deterministic skill gap list is empty, return an
            empty skillGap array.

        The skillGap array must therefore represent the deterministic
        analysis exactly, with AI-generated explanations layered on top.

        ==================================================
        SUMMARY
        ==================================================

        Provide a concise assessment of the candidate's readiness
        for the target role.

        The summary should discuss:

        - strongest relevant qualifications
        - important weaknesses
        - interview risks
        - preparation priorities

        Base this only on the provided candidate and job information.

        ==================================================
        TECHNICAL QUESTIONS
        ==================================================

        For every technical question provide:

        - question
        - category
        - difficulty
        - intention
        - answer
        - expectedAnswerPoints
        - relatedSkills

        IMPORTANT CONSTRAINTS FOR expectedAnswerPoints:

        - expectedAnswerPoints must contain between 2 and 8 items.
        - NEVER provide more than 8 expectedAnswerPoints.
        - Keep each expectedAnswerPoint concise and focused on one important
        concept that a strong candidate should mention.
        - If there are more than 8 possible points, select only the 8 most
        relevant points.

        IMPORTANT CONSTRAINTS FOR relatedSkills:

        - relatedSkills must contain between 1 and 6 items.
        - NEVER provide more than 6 relatedSkills.
        - Only include skills directly relevant to the question.

        The "category" field MUST use exactly one of these values:

        - fundamentals
        - programming
        - frontend
        - backend
        - database
        - api
        - system-design
        - ai-ml
        - devops
        - security
        - project-based

        Do not use any other category value.

        For debugging questions, classify them under the
        most relevant technical area such as frontend, backend,
        database, api, or fundamentals.

        The answer should be an interview answer strategy, not a fabricated
        personal experience.

        ==================================================
        BEHAVIORAL QUESTIONS
        ==================================================

        Generate realistic behavioral and HR questions based on the
        candidate's actual:

        - projects
        - experience
        - education
        - teamwork
        - leadership
        - challenges
        - achievements
        - target role

        Generate AT LEAST 3 behavioral questions.

        Do not return an empty behavioralQuestions array.

        Do not invent situations that are not supported by the candidate
        information.

        For every behavioral question provide:

        - question
        - intention
        - answer
        - expectedAnswerPoints
        - recommendedStructure

        Behavioral expectedAnswerPoints constraints:

        - expectedAnswerPoints must contain between 2 and 6 items.
        - NEVER provide more than 6 items.
        - Keep each point concise and focused.

        Use STAR where it is appropriate.

        ==================================================
        PREPARATION PLAN
        ==================================================

        Create a practical day-by-day preparation roadmap based on:

        1. Deterministic skill gaps
        2. Important technical areas from the target job
        3. Candidate project preparation
        4. Technical interview practice
        5. Behavioral preparation

        The deterministic skill gap list is:

        ${JSON.stringify(skillAnalysis.skillGaps, null, 2)}

        RULES FOR skillGapsAddressed:

        1. skillGapsAddressed MUST contain at least one item.

        2. Every value in skillGapsAddressed MUST exactly match a skill
        from the deterministic skillGaps array.

        3. Do NOT invent, rename, expand, or rephrase skills.

        4. If the deterministic gap list contains only a small number
        of skills, multiple preparation days may address the same gap.

        5. Every preparation day must connect its tasks to at least
        one deterministic skill gap.

        6. Do not put unrelated skills into skillGapsAddressed.

        7. If the deterministic skill gap list is empty, create a
        preparation plan focused on interview preparation and
        candidate projects, but skillGapsAddressed must remain
        empty because there are no deterministic gaps.

        Every day must contain:

        - day
        - focus
        - objective
        - tasks
        - skillGapsAddressed

        Tasks must be specific and actionable.

        ==================================================

        Generate the complete report.

        Return ONLY the JSON object.
    `;
}

module.exports = {
    interviewReportPrompt
};