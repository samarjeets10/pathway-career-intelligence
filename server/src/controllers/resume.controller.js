const apiResponse = require("../utils/apiResponse");
const resumeService = require("../services/resume.service");

async function createResumeController(req, res) {
    const data = await resumeService.createResumeFromPdf({
        userId: req.user._id,
        title: req.body.title,
        file: req.file
    });

    res.status(201).json(
        new apiResponse(201, data, "Resume uploaded successfully.")
    )
}

async function listResumesController(req, res) {
    const resumes = await resumeService.listResumes(req.user._id);
    res.status(200).json(new apiResponse(200, resumes, "Resumes fetched successfully."));
}


async function getResumeController(req, res) {
    const resume = await resumeService.getResume(req.user._id, req.params.id);
    res.status(200).json(new apiResponse(200, resume, "Resume fetched successfully."));
}

async function updateResumeController(req, res) {
    const resume = await resumeService.updateResume(req.user._id, req.params.id, req.body);
    res.status(200).json(new apiResponse(200, resume, "Resume updated successfully."));
}

async function deleteResumeController(req, res) {
    await resumeService.deleteResume(req.user._id, req.params.id);
    res.status(200).json(new apiResponse(200, null, "Resume deleted successfully."));
}

module.exports = {
    createResumeController,
    listResumesController,
    getResumeController,
    updateResumeController,
    deleteResumeController
}