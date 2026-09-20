const { ALIAS_TO_CANONICAL } = require("../data/skillAliases");

function normalizeSkill(rawSkill) {

    if (typeof rawSkill !== "string") {
        return "";
    };

    const cleaned = rawSkill.trim().toLowerCase();

    if (!cleaned) {
        return "";
    };

    return ALIAS_TO_CANONICAL.get(cleaned) || cleaned;

};

function normalizeSkillList(skills = []) {
    return [
        ...new Set(skills.map(normalizeSkill).filter(Boolean))
    ];
};


function matchSkills(resumeSkills = [], jobSkills = []) {

    const normalizedResume = normalizeSkillList(resumeSkills);
    const normalizedJob = normalizeSkillList(jobSkills);

    const resumeSet = new Set(normalizedResume);

    const matched = [];
    const missing = [];

    for (const jobSkill of normalizedJob) {
        if (resumeSet.has(jobSkill)) {
            matched.push(jobSkill);
        } else {
            missing.push(jobSkill);
        }
    }

    return {
        matched,
        missing,
        normalizedResume,
        normalizedJob
    }
}


module.exports = {
    normalizeSkill,
    normalizeSkillList,
    matchSkills
};