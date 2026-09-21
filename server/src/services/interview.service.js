const { extractCareerInformation } = require("./careerExtraction.service");
const {analyzeSkillGap } = require("./skillMatching.service");

async function analyzeInterviewData({
    resume, 
    selfDescription,
    jobDescription
}) {

    const careerInformation = await extractCareerInformation({
        resume, 
        selfDescription,
        jobDescription
    });


    const skillAnalysis = analyzeSkillGap({
        resumeSkills: careerInformation.candidate.skills,
        requiredSkills: careerInformation.job.requiredSkills,
        preferredSkills: careerInformation.job.preferredSkills
    });

    return {
        matchScore: skillAnalysis.matchScore,
        skillGaps: skillAnalysis.skillGaps.map((skill) => ({
            skill, 
            severity: "medium"
        }))
    };

};


module.exports = {
    analyzeInterviewData
}