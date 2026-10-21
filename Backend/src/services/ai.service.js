const {GoogleGenAI} = require("@google/genai")
const {z, json} = require("zod")
const {zodToJsonSchema} = require("zod-to-json-schema")


const ai = new GoogleGenAI({
    apiKey:process.env.GOOGLE_GENAI_API_KEY
})

// const invokeGeminiAi = async()=>{
//     const response = await ai.models.generateContent({
//         model:"gemini-3.8-flash",
//         contents:"Hello gemini ! Explain what is Ai? "
//     })

//     console.log(response.text)
// }

const interviewReportSchema = z.object({

    matchScore:z.number().describe("A Score between 0 and 100 indicationg how well the candidate's profile matches the job description "),


    technicalQuestions:z.array(z.object({
        question:z.string().describe("The technical question can be asked in the interview"),
        intention:z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover , what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),


    behavioralQuestions: z.array(z.object({
        question:z.string().describe("The technical question can be asked in the interview"),
        intention:z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover , what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),

    skillGaps: z.array(z.object({
        skill:z.string().describe("The skill which the candidate is laking"),
        severity:z.enum(["low" , "medium" , "high"]).describe("The severity of the skill gap: low means the skill is slightly lacking or less important, medium means the candidate needs further improvement, and high means the skill is missing or is a critical requirement for the job.")
    })).describe("List of skill gap in the candidate's profile along with their severity"),

    preprationPlan:z.array(z.object({
        day:z.number().describe("The day number in the prepration plan , starting from 1"),
        focus: z.string().describe("The main topic, skill, or subject the candidate should focus on for the day."),
        tasks:z.array(z.string()).describe("A list of specific and actionable tasks the candidate should complete to improve their skills and prepare for the target job.")
    })).describe("A structured day-by-day preparation plan tailored to the candidate's skill gaps and the requirements of the target job.")
})

const generateInterviewReport = async({resume , selfDescription , jobDescription})=>{

    const prompt = `Generate the interview report for a candidate with the following details:
                   Resume:${resume}
                   self Description: ${selfDescription}
                   job Description: ${jobDescription}
                   `

    const response = await ai.models.generateContent({
        model:"gemini-3.8-flash",
        contents:prompt,
        config:{
            responseMimeType:"application/json",
            responseSchema:zodToJsonSchema(interviewReportSchema)
        }
    })

    console.log(JSON.parse(response.text))


}

module.exports = generateInterviewReport