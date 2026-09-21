
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

        The deterministic system identified these skill gaps:

        ${JSON.stringify(skillAnalysis.skillGaps, null, 2)}

        Only these skills may appear in the "skillGap" section.

        For each provided gap:

        - explain why the skill matters for the target job
        - explain why it is currently a gap based on the available
        candidate evidence
        - provide a practical recommendation for preparation
        - assign a preparation priority

        Do not introduce unrelated skills.

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

        Generate realistic technical interview questions tailored to
        this candidate and this job.

        Prioritize questions involving:

        - required technologies
        - demonstrated candidate skills
        - candidate projects
        - practical implementation
        - debugging
        - fundamentals
        - architecture and reasoning where appropriate
        - the deterministic skill gaps

        Avoid generic questions when a more relevant candidate-specific
        question can be generated.

        For every technical question provide:

        - question
        - category
        - difficulty
        - intention
        - answer
        - expectedAnswerPoints
        - relatedSkills

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

        Do not invent situations that are not supported by the candidate
        information.

        For every behavioral question provide:

        - question
        - intention
        - answer
        - expectedAnswerPoints
        - recommendedStructure

        Use STAR where it is appropriate.

        ==================================================
        PREPARATION PLAN
        ==================================================

        Create a practical day-by-day preparation roadmap.

        Prioritize:

        1. Important missing required skills
        2. Important technical areas
        3. Candidate project preparation
        4. Technical interview practice
        5. Behavioral preparation
        6. Lower-priority preferred skills

        Every day should contain:

        - day
        - focus
        - objective
        - tasks
        - skillGapsAddressed

        Tasks must be specific and actionable.

        The preparation plan must address the provided skill gaps and
        the actual requirements of the target job.

        ==================================================

        Generate the complete report.

        Return ONLY the JSON object.
    `;
}

module.exports = {
    interviewReportPrompt
};