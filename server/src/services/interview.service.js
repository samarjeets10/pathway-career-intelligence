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