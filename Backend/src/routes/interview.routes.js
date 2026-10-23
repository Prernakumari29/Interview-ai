const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const generateInterviewReport = require("../services/ai.service");
const upload = require("../middleware/file.middleware");

const interviewRouter = express.Router();

/**
 * @route post/api/interview
 * @description generate new interview report on the basis of user self description, resume pdf and job description.
 * @access private
 */
interviewRouter.post("/",authMiddleware , upload.single("resume") , generateInterviewReport)

module.exports = interviewRouter