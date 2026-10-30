const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const interviewController = require("../controllers/interview.controller");
const upload = require("../middlewares/file.middleware");

const interviewRouter = express.Router();

/**
 * @route POST .api/interview/
 * @description generate new interview report on the basis of self description, resume pdf and job description
 * @access Private
 */

interviewRouter.post("/", authMiddleware, upload.single("resume"), interviewController.generateInterviewReportController);


interviewRouter.get("/", authMiddleware, interviewController.getInterviewRepostController);
interviewRouter.get("/:id", authMiddleware, interviewController.getInterviewRepostByIdController);


module.exports = interviewRouter;