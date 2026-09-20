
const SKILL_ALIASES = {
    javascript: [
        "javascript",
        "js",
        "ecmascript",
        "es6",
        "es2015",
        "es2020",
        "es2021",
        "es2022"
    ],

    typescript: [
        "typescript",
        "ts"
    ],

    "node.js": [
        "node.js",
        "nodejs"
    ],

    react: [
        "react",
        "react.js",
        "reactjs"
    ],

    express: [
        "express",
        "express.js",
        "expressjs"
    ],

    mongodb: [
        "mongodb",
        "mongo db",
        "mongo"
    ],

    postgresql: [
        "postgresql",
        "postgres"
    ],

    python: [
        "python",
        "py"
    ],

    docker: [
        "docker"
    ],

    aws: [
        "aws",
        "amazon web services"
    ],

    "tailwind css": [
        "tailwind css",
        "tailwindcss"
    ],

    redux: [
        "redux"
    ],

    "redux toolkit": [
        "redux toolkit",
        "rtk"
    ],

    jwt: [
        "jwt",
        "json web token",
        "json web tokens"
    ]
};

const ALIAS_TO_CANONICAL = new Map();

for (const [canonicalSkill, aliases] of Object.entries(SKILL_ALIASES)) {
    for (const alias of aliases) {
        ALIAS_TO_CANONICAL.set(alias, canonicalSkill);
    }
}

module.exports = {
    SKILL_ALIASES,
    ALIAS_TO_CANONICAL
};