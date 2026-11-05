const Resume = require("../models/resume.model");
const ResumeVersion = require("../models/resumeVersion.model");
const apiError = require("../utils/apiError");
const { normalizeText } = require("../utils/text");
const { extractPdfText } = require("../utils/pdfText");
const { parseResumeText } = require("./resumeParser.service");

const MAX_RESUMES_PER_USER = 10;
const MIN_RESUME_CHARS = 100;
const MAX_RESUME_CHARS = 30000;

async function createResumeFromPdf({ userId, title, file }) {
    if (!file) throw new apiError(400, "Resume PDF is required.");

    const existingCount = await Resume.countDocuments({ user: userId });
    if (existingCount >= MAX_RESUMES_PER_USER) {
        throw new apiError(409, `You can store up to ${MAX_RESUMES_PER_USER} resumes. Delete one first.`);
    }

    const { text: rawPdfText, pageCount } = await extractPdfText(file.buffer);
    const text = normalizeText(rawPdfText);

    if (text.length < MIN_RESUME_CHARS) {
        throw new apiError(422, "Could not read text from this PDF. It may be a scanned image.");
    }
    if (text.length > MAX_RESUME_CHARS) {
        throw new apiError(422, "This resume is too long. Please upload a shorter version.");
    }

    const parsed = parseResumeText(text);

    // Built in memory first, so a failed version insert leaves no orphan resume.
    const resume = new Resume({ user: userId, title, isDefault: existingCount === 0 });

    const version = await ResumeVersion.create({
        resume: resume._id,
        user: userId,
        versionNumber: 1,
        source: "upload",
        rawText: text,
        sections: parsed.sections,
        detectedSections: parsed.detectedSections,
        detectedSkills: parsed.detectedSkills,
        stats: { wordCount: parsed.stats.wordCount, pageCount },
        file: { originalName: String(file.originalname || "").slice(0, 200), sizeBytes: file.size }
    });

    try {
        resume.latestVersion = version._id;
        await resume.save();
    } catch (error) {
        await ResumeVersion.deleteOne({ _id: version._id });
        throw error;
    }

    const versionData = version.toObject();
    delete versionData.rawText;

    return { resume, version: versionData };
}

async function listResumes(userId) {
    return Resume.find({ user: userId })
        .sort({ createdAt: -1 })
        .populate({
            path: "latestVersion",
            select: "versionNumber detectedSections detectedSkills stats createdAt"
        })
        .lean();
}

async function getResume(userId, resumeId) {
    const resume = await Resume.findOne({ _id: resumeId, user: userId })
        .populate({ path: "latestVersion", select: "+rawText" })
        .lean();

    if (!resume) throw new apiError(404, "Resume not found.");
    return resume;
}

async function updateResume(userId, resumeId, { title, isDefault }) {
    const resume = await Resume.findOne({ _id: resumeId, user: userId });
    if (!resume) throw new apiError(404, "Resume not found.");

    if (title !== undefined) resume.title = title;

    if (isDefault === true && !resume.isDefault) {
        await Resume.updateMany(
            { user: userId, _id: { $ne: resume._id }, isDefault: true },
            { $set: { isDefault: false } }
        );
        resume.isDefault = true;
    }

    await resume.save();
    return resume;
}

async function deleteResume(userId, resumeId) {
    const resume = await Resume.findOneAndDelete({ _id: resumeId, user: userId });
    if (!resume) throw new apiError(404, "Resume not found.");

    await ResumeVersion.deleteMany({ resume: resume._id, user: userId });

    if (resume.isDefault) {
        await Resume.findOneAndUpdate({ user: userId }, { $set: { isDefault: true } }, { sort: { updatedAt: -1 } });
    }
}

module.exports = { 
    createResumeFromPdf, 
    listResumes, 
    getResume, 
    updateResume, 
    deleteResume 
};