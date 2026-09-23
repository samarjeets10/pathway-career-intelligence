const pdfParse = require("pdf-parse")
const interviewReportModel = require("../models/interviewReport.model");
const { analyzeInterviewData } = require("../services/interview.service");

async function generateInterviewReportController(req, res) {

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();

    const { selfDescription, jobDescription } = req.body;


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

    res.status(201).json({
        message: "Interview Report generated successfully!!",
        interviewReport
    });

}

module.exports = { 
    generateInterviewReportController
}