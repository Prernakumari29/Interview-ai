const {GoogleGenAI} = require("@google/genai")
const {z} = require("zod")
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
        question:z.string().describe("The behavioral or HR question that can be asked in the interview"),
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

    const prompt = `
You are CareerLens AI, an expert interview preparation assistant.

Your task is to generate a personalized interview preparation report
using the candidate's resume, self-description, and job description.

CANDIDATE RESUME:
${resume}

CANDIDATE SELF-DESCRIPTION:
${selfDescription}

TARGET JOB DESCRIPTION:
${jobDescription}

Follow these instructions carefully:

1. MATCH SCORE:
- Generate a score from 0 to 100.
- Compare the candidate's demonstrated skills, projects, and experience
  against the job requirements.
- Do not give a high score without sufficient evidence.

2. TECHNICAL QUESTIONS:
- Generate 10 relevant technical interview questions.
- Prioritize the technologies and skills explicitly mentioned
  in the job description.
- Include questions about the candidate's actual projects and
  the technical decisions described in the resume.
- Include conceptual, practical, and problem-solving questions.
- For every question, explain the interviewer's intention.
- Provide an answer guide with the key points the candidate should cover.
- Never invent project details or claim the candidate used a technology
  that is not mentioned in the input.

3. BEHAVIORAL QUESTIONS:
- Generate 5 behavioral or HR interview questions.
- Cover self-introduction, project challenges, teamwork,
  problem-solving, learning from mistakes, and motivation where relevant.
- Explain what the interviewer wants to evaluate.
- Provide an answer approach tailored to the supplied candidate details.
- Do not invent personal experiences. Use hypothetical examples or
  clearly mark details the candidate needs to fill in.

4. SKILL GAPS:
- Identify missing or insufficiently demonstrated skills by comparing
  the resume with the job description.
- Assign severity as high, medium, or low based on job importance
  and the available evidence.
- Do not label a skill missing merely because the resume does not
  mention it; distinguish "not mentioned" from "confirmed lack of skill"
  in the skill description.

5. PREPARATION PLAN:
- Generate a practical 7-day preparation plan.
- Start from the most important skill gaps and technical topics.
- Include specific daily tasks, practice questions, and revision.
- Make the plan achievable for the candidate's stated experience level.

OUTPUT REQUIREMENTS:

- Return exactly these five top-level fields:
  matchScore, technicalQuestions, behavioralQuestions, skillGaps, preprationPlan.

- Follow the provided JSON schema exactly.
- technicalQuestions must contain exactly 10 objects.
- behavioralQuestions must contain exactly 5 objects.
- Every question object must contain question, intention, and answer.
- Every preparation plan object must contain day, focus, and tasks.
- Generate exactly 7 preparation plan objects, with day values from 1 to 7.
- Do not replace arrays of objects with plain strings or separate arrays.
- Do not omit any required field.
- Do not add unrelated fields.
- Return valid JSON only, without Markdown code fences.
- Do not generate a general candidate evaluation report.
- Base all content on the provided resume, self-description, and job description.
`


    const response = await ai.models.generateContent({
        model:"gemini-3-flash-preview",
        contents:prompt,
        config:{
            responseMimeType:"application/json",
            responseSchema:zodToJsonSchema(interviewReportSchema)
        }
    })

    return JSON.parse(response.text)


}

module.exports = generateInterviewReport