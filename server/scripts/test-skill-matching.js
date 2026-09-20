const {
    normalizeSkill,
    normalizeSkillList,
    matchSkills,
    calculateMatchScore,
    analyzeSkillGap
} = require("../src/services/skillMatching.service")


console.log("========== NORMALIZATION ==========");

console.log(
    "React.js →",
    normalizeSkill("React.js")
);

console.log(
    "JS →",
    normalizeSkill("JS")
);

console.log(
    "Postgres →",
    normalizeSkill("Postgres")
);

console.log(
    "Terraform →",
    normalizeSkill("Terraform")
);


console.log("\n========== LIST NORMALIZATION ==========");

console.log(
    normalizeSkillList([
        "JS",
        "javascript",
        "React.js",
        "React",
        "MongoDB",
        "Mongo"
    ])
);


console.log("\n========== MATCHING ==========");

console.log(
    matchSkills(
        [
            "JS",
            "React.js",
            "Node.js",
            "MongoDB",
            "Docker"
        ],
        [
            "JavaScript",
            "React",
            "Express",
            "MongoDB",
            "AWS"
        ]
    )
);


console.log("\n========== SCORE ==========");

console.log(
    calculateMatchScore(
        {
            requiredSkills: [
                "JavaScript",
                "React",
                "Express",
                "MongoDB"
            ],
            preferredSkills: [
                "Docker",
                "AWS"
            ]
        },
        [
            "JS",
            "React.js",
            "Node.js",
            "MongoDB",
            "Docker"
        ]
    )
);


console.log("\n========== FULL ANALYSIS ==========");

const result = analyzeSkillGap({
    resumeSkills: [
        "JS",
        "React.js",
        "Node.js",
        "MongoDB",
        "Docker"
    ],

    requiredSkills: [
        "JavaScript",
        "React",
        "Express",
        "MongoDB"
    ],

    preferredSkills: [
        "Docker",
        "AWS"
    ]
});

console.log(
    JSON.stringify(result, null, 2)
);


