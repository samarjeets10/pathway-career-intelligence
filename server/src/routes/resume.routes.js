const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/file.middleware");
const validate = require("../middlewares/validate.middleware");
const controller = require("../controllers/resume.controller");
const { idParamSchema, createResumeSchema, updateResumeSchema } = require("../schemas/resume.schema");

const resumeRouter = express.Router();

// Auth first, so unauthenticated requests never get to buffer an upload.
resumeRouter.use(authMiddleware);

resumeRouter.post("/", upload.single("resume"), validate(createResumeSchema), controller.createResumeController);
resumeRouter.get("/", controller.listResumesController);
resumeRouter.get("/:id", validate(idParamSchema, "params"), controller.getResumeController);
resumeRouter.patch("/:id", validate(idParamSchema, "params"), validate(updateResumeSchema), controller.updateResumeController);
resumeRouter.delete("/:id", validate(idParamSchema, "params"), controller.deleteResumeController);

module.exports = resumeRouter;