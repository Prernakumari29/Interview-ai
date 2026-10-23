const pdfParse = require("pdf-parse")
const generateInterviewReport = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")

const generateInterviewReportController = async(req , res)=>{

    const resumeFile = req.file

    const resumeContent = pdfParse(req.file.buffer)

    const {selfDescription , jobDescription} = req.body

    const interviewReportByAi = await generateInterviewReport({
        resume:resumeContent,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user : req.user.id,
        resume:resumeContent,
        selfDescription,
        jobDescription,
        ...interviewReportByAi               //destrucutre the above code
    })

    return res.status(201).json({
        message:"Interview report generated successfully."
        interviewReport
    })
 
}

module.exports = {
    generateInterviewReportController
}