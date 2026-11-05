const { ALIAS_TO_CANONICAL } = require("../data/skillAliases");
const { SECTION_KEYS } = require("../models/resumeVersion.model");

const SECTION_HEADINGS = {
    summary: ["summary", "professional summary", "profile", "objective", "career objective", "about me"],
    experience: ["experience", "work experience", "professional experience", "employment", "employment history", "internships", "internship experience"],
    education: ["education", "academic background", "academics", "qualifications"],
    projects: ["projects", "personal projects", "academic projects", "key projects"],
    skills: ["skills", "technical skills", "core competencies", "technologies", "tech stack"],
    certifications: ["certifications", "certification", "licenses", "courses", "licenses and certifications"],
    achievements: ["achievements", "awards", "honors", "accomplishments", "awards and achievements"],
    languages: ["languages"],
    publications: ["publications"]
};

const HEADING_LOOKUP = new Map();
for (const [section, headings] of Object.entries(SECTION_HEADINGS)) {
    for (const heading of headings) HEADING_LOOKUP.set(heading, section);
}

function detectHeading(line) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.length > 40) return null;

    const normalized = trimmed
        .toLowerCase()
        .replace(/&/g, " and ")
        .replace(/[^a-z ]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    return HEADING_LOOKUP.get(normalized) || null;
}

function splitSections(text) {
    const buffers = { header: [] };
    let current = "header";

    for (const line of text.split("\n")) {
        const heading = detectHeading(line);
        if (heading) {
            current = heading;
            buffers[current] ??= [];
            continue;
        }
        (buffers[current] ??= []).push(line);
    }

    const sections = {};
    for (const key of SECTION_KEYS) {
        sections[key] = (buffers[key] || []).join("\n").trim();
    }

    const detectedSections = SECTION_KEYS.filter((key) => sections[key]);
    return { sections, detectedSections };
}

// Aliases that are also normal English words. Only trusted inside the Skills section.
const AMBIGUOUS_ALIASES = new Set(["go", "next", "spring", "rest", "ws", "rn", "pg", "tf", "rag", "nest", "express"]);

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// URLs and emails are contact info, not skill evidence (e.g. github.com/jane).
const CONTACT_NOISE = /\b(?:https?:\/\/|www\.)\S+|\b[\w-]+\.(?:com|io|dev|org|net|in)\/\S*|\S+@\S+\.\S+/gi;

// Acronyms that are safe anywhere when written in capitals ("REST APIs"), but not as the plain word "rest".
const CAPS_ONLY_ALIASES = ["rest", "rag"];
const CAPS_MATCHERS = CAPS_ONLY_ALIASES
    .filter((alias) => ALIAS_TO_CANONICAL.has(alias))
    .map((alias) => ({
        canonical: ALIAS_TO_CANONICAL.get(alias),
        regex: new RegExp(`(?<![A-Za-z0-9+#.])${alias.toUpperCase()}(?![A-Za-z0-9+#])`)
    }));

function buildMatchers(aliasFilter) {
    return [...ALIAS_TO_CANONICAL.entries()]
        .filter(([alias]) => aliasFilter(alias))
        .map(([alias, canonical]) => ({
            canonical,
            regex: new RegExp(`(?<![a-z0-9+#.])${escapeRegex(alias)}(?![a-z0-9+#])`, "i")
        }));
}

const SAFE_MATCHERS = buildMatchers((alias) => !AMBIGUOUS_ALIASES.has(alias));
const ALL_MATCHERS = buildMatchers(() => true);

function scan(text, matchers, found) {
    const flat = text.replace(CONTACT_NOISE, " ").replace(/\s+/g, " ");
    for (const { canonical, regex } of matchers) {
        if (regex.test(flat)) found.add(canonical);
    }
}

function detectSkills(fullText, skillsSectionText) {
    const found = new Set();
    scan(fullText, SAFE_MATCHERS, found);
    scan(fullText, CAPS_MATCHERS, found);
    if (skillsSectionText) scan(skillsSectionText, ALL_MATCHERS, found);
    return [...found].sort();
}

function parseResumeText(rawText) {
    const text = String(rawText || "").replace(/\r/g, "");
    const { sections, detectedSections } = splitSections(text);

    return {
        sections,
        detectedSections,
        detectedSkills: detectSkills(text, sections.skills),
        stats: { wordCount: text.split(/\s+/).filter(Boolean).length }
    };
}

module.exports = { parseResumeText };