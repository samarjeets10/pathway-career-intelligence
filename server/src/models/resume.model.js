const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 80
        },

        isDefault: {
            type: Boolean, 
            default: false,
        },

        latestVersion: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ResumeVersion"
        }
    },

    {
        timestamps: true,
    }
);

resumeSchema.index({
    user: 1, createdat: -1
});

resumeSchema.index(
    { user: 1 },
    { unique: true, partialFilterExpression: {
        isDefault: true
    } }
)

const ResumeModel = mongoose.model("Resume", resumeSchema);

module.exports = ResumeModel;