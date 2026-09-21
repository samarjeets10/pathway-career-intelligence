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

    console.log("\n========== INTERVIEW ANALYSIS ==========");
    console.log(
        JSON.stringify(
            {
                extractedSkills: careerInformation.candidate.skills,
                requiredSkills: careerInformation.job.requiredSkills,
                preferredSkills: careerInformation.job.preferredSkills,
                skillAnalysis
            },
            null,
            2
        )
    );
    console.log("========================================\n");

    return {
        careerInformation,
        skillAnalysis
    }

};


module.exports = {
    analyzeInterviewData
}