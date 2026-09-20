
function interviewReportPrompt({
    resume, 
    selfDescription,
    jobDescription
}) {

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

}

module.exports = {
    interviewReportPrompt
}