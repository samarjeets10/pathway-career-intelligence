const { extractCareerInformation } = require("./careerExtraction.service");
const { analyzeSkillGap } = require("./skillMatching.service");
const { generateInterviewReport } = require("./ai.service")

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


    const aiReport = await generateInterviewReport({
        candidate: careerInformation.candidate,
        job: careerInformation.job,
        skillAnalysis
    });


    const aiGapMap = new Map(aiReport.skillGap.map((gap) => [
        gap.skill.toLowerCase(),
        gap
    ]));


    const skillGaps = skillAnalysis.skillGaps.map((skill, index) => {

        const aiGap = aiGapMap.get(skill.toLowerCase());

        return {
            skill,
            severity: aiGap?.severity || "medium",
            reason: aiGap?.reason || `The candidate does not have explicit evidence of ${skill} in the extracted career information.`,
            recommendation: aiGap?.recommendation || `Review and parctice ${skill} through documentation and a practical implementation.`,
            priority: aiGap?.priority || index + 1
        }
    })


    const finalReport = {
        ...aiReport,
        
        matchScore: skillAnalysis.matchScore,
        skillGaps: aiReport.skillGap.map((gap) => ({
            ...gap
        }))
    };


    delete finalReport.skillGap;

    return finalReport;

};


module.exports = {
    analyzeInterviewData
}