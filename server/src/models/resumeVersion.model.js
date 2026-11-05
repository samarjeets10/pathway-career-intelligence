const mongoose = require("mongoose");

const SECTION_KEYS = [
    "summary", "experience", "education", "projects", "skills",
    "certifications", "achievements", "languages", "publications"
];

const sectionsDefinition = {};
for (const key of SECTION_KEYS) {
    sectionsDefinition[key] = { type: String, default: "" };
}

const resumeVersionSchema = new mongoose.Schema(
    {
        resume: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Resume", 
            required: true 
        },

        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "users", 
            required: true, 
            index: true 
        },

        versionNumber: { 
            type: Number, 
            required: true, 
            min: 1 
        },

        source: { 
            type: String, 
            enum: ["upload", "manual_edit"], 
            default: "upload" 
        },

        rawText: { 
            type: String, 
            required: true, 
            select: false 
        },

        sections: { 
            type: new mongoose.Schema(sectionsDefinition, { _id: false }), 
            default: () => ({}) 
        },

        detectedSections: { 
            type: [String], 
            default: [] 
        },

        detectedSkills: { 
            type: [String], 
            default: [] 
        },

        stats: {
            wordCount: { 
                type: Number, 
                default: 0 
            },

            pageCount: { 
                type: Number, 
                default: null 
            }
        },

        file: {
            originalName: String,
            sizeBytes: Number
        }
    },

    { timestamps: true }
);

resumeVersionSchema.index({ resume: 1, versionNumber: 1 }, { unique: true });

const ResumeVersionModel = mongoose.model("ResumeVersion", resumeVersionSchema);

module.exports = ResumeVersionModel;
module.exports.SECTION_KEYS = SECTION_KEYS;