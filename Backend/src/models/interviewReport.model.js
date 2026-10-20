

const mongoose = requiure ("mongoose")

// -----------------------------------------------------------technicalQuestionSchema----------------------
const technicalQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required: [true , "Technical question is required"]
    },
    intensions:{
        type:String,
        required:[true , "Intension is required"]
    },
    answer:{
        type:String,
        required:[true , "Answer is required"]
    }
} , {
    _id:false
})

// ----------------------------------------------------------------------------behavioralQuestionSchema-----------------
const behavioralQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required: [true , "Technical question is required"]
    },
    intensions:{
        type:String,
        required:[true , "Intension is required"]
    },
    answer:{
        type:String,
        required:[true , "Answer is required"]
    }
},{
    _id:false
})

// -----------------------------------------------------------skillGapSchema------------------------------
const skillGapSchema = new mongoose.Schema({
    skill:{
        type:String,
        required:[true , "Skill is required"]
    },
    severity:{
        type:String,
        enum:["low" , "medium" , "high"],
        required:[true , "severity is reuired"]
    }
},{
    _id:false
})

// ----------------------------------------------------------------------preparationPlanSchema-------------------
const preparationPlanSchema = new mongoose.Schema({
    day:{
        type:Number,
        required:[true , "Day is required"]
    },
    focus:{
        type:String,
        reuired:[true , "Focus is required"]
    },
    tasks:[ {
        type:String,
        required:[true , "Task is required"]
    }]
})

// -----------------------------------------------------------------main schema--------------------------------
const interviewReportSchema = new mongoose.Schema({
    jobDescription:{
        type:String,
        required:[true , "Job description is required"],
    },
    resume:{
        type:String,
    },
    selfDescription:{
        type:String,       
    },
    matchScore:{
        type:Number,
        min:0,
        max:100,
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preprationPlan: [preparationPlanSchema]
},{
    timestamps:true
})

const interviewReportModel = mongoose.model("InterviewReport" , interviewReportSchema)
module.exports = interviewReportModel