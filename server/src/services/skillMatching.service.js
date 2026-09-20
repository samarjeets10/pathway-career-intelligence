const { ALIAS_TO_CANONICAL } = require("../data/skillAliases");


// normalizing skills logic block :
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


// skills Matching logic block :
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
};


// deterministic calculating of matched score logic block :
function calculateMatchScore({
    requiredSkills = [],
    preferredSkills = []
},
    resumeSkills = []
) {

    const requiredMatch = matchSkills(
        resumeSkills,
        requiredSkills
    );

    const preferredMatch = matchSkills(
        resumeSkills,
        preferredSkills
    );

    const REQUIRED_WEIGHT = 2;
    const PREFERRED_WEIGHT = 1;

    const requiredPossible = requiredMatch.normalizedJob.length * REQUIRED_WEIGHT;

    const preferredPossible = preferredMatch.normalizedJob.length * PREFERRED_WEIGHT;

    const earned = requiredMatch.matched.length * REQUIRED_WEIGHT + preferredMatch.matched.length * PREFERRED_WEIGHT;

    const possible = requiredPossible + preferredPossible;


    if (possible === 0) {
        return 0;
    }

    return Math.round((earned / possible) * 100);

};


// skill gap analysing block :
function analyzeSkillGap({
    resumeSkills = [],
    requiredSkills = [],
    preferredSkills = []
}) {

    const requiredMatch = matchSkills(
        resumeSkills,
        requiredSkills
    );

    const preferredMatch = matchSkills(
        resumeSkills,
        preferredSkills
    );

    const matchScore = calculateMatchScore(
        {
            requiredSkills,
            preferredSkills
        },

        resumeSkills
    );

    return {
        matchScore,

        required: {
            matched: requiredMatch.matched,
            missing: requiredMatch.missing
        },

        preferred: {
            matched: preferredMatch.matched,
            missing: preferredMatch.missing
        },

        skillGaps: [
            ...requiredMatch.missing,
            ...preferredMatch.missing
        ]
    }

};


module.exports = {
    normalizeSkill,
    normalizeSkillList,
    matchSkills,
    calculateMatchScore,
    analyzeSkillGap
};