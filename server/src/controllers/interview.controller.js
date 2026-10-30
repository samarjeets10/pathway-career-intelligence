
const mongoose = require('mongoose');
const pdfParse = require("pdf-parse")
const interviewReportModel = require("../models/interviewReport.model");
const { analyzeInterviewData } = require("../services/interview.service");
const apiError = require('../utils/apiError');
const apiResponse = require('../utils/apiResponse');

async function generateInterviewReportController(req, res) {

    if (!req.file) {
        throw new apiError(400, "Resume PDF is required.");
    }

    if (req.file.buffer.subarray(0, 4).toString() !== "%PDF") {
        throw new apiError(400, "Only valid PDF files are allowed.");
    }

    // const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();

    const { selfDescription, jobDescription } = req.body ?? {};

    if (!jobDescription.trim()) {
        throw new apiError(400, "Job description is required.")
    }

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();

    const interviewAnalysis = await analyzeInterviewData({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    });


    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewAnalysis
    });

    res.status(201).json(
        new apiResponse(201, interviewReport, "Interviwe Repost Generated successfully.")
    );

}


async function getInterviewRepostController(req, res) {

    const report = await interviewReportModel
    .find({ user: req.user._id})
    .select("-resume -selfDescription -technicleQuestions -behavioralQuestions -preparationPlan")
    .sort({createdat: -1});

    return res.status(200).json(
        new apiResponse(200, report, "Interview Repost fetched successfully.")
    )
}

async function getInterviewRepostByIdController(req, res) {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new apiError(400, "Invalid repost Id.");
    }

    const report = await interviewReportModel.findOne({ _id: id, user: req.user._id });

    if (!report) {
        throw new apiError(404, "Interview report not found.");
    }

    return res.status(200).json(
        new apiResponse(200, report, "Interview report fetched successfully.")
    )

}

module.exports = { 
    generateInterviewReportController,
    getInterviewRepostController,
    getInterviewRepostByIdController
}