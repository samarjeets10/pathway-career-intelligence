const mongoose = require("mongoose");

/**
 * - job description schema : String
 * - resume text : String
 * - self description : String
 * 
 * - matchScore : Number
 * 
 * - technical questions : [{
 *                              question : "",
 *                              category: "",
 *                              difficulty: "",
 *                              intension : "",
 *                              answer : "",
 *                              expectedAnswerPoints: "",
 *                              relatedSkills: ""
 *                          }]
 * - behaviour questions : [{
 *                              question : "",
 *                              intension : "",
 *                              answer : "",
 *                              expectedAnswerPoints: "",
 *                              recommendedStructure: ""
 *                          }]
 * - skill gap : [{
*                   skill : "",
*                   saverity : {
*                                  type: String,
*                                  enum: ["low", "medium", "high"]
*                              },
*                   answer : "",
*                   reason: "",
*                   recommendation: "",
*                   priority: {     
*                               type: Number,
*                               required: true
*                               }
*               }]
 * - preparation plan : [{
 *                          day: Number,
 *                          focus: String,
 *                          Objective: {type: String, required: true}
 *                          tasks: [String],
 *                          skillGapAddressed: {type: String, required: true}
 *                      }] array of objects
 * 
 */


const technicalQuestionSchema = new mongoose.Schema({

    question: {
        type: String,
        required: [true, "Technical question is required"]
    },

    category: {
        type: String,
        enum: [
            "fundamentals",
            "programming",
            "frontend",
            "backend",
            "database",
            "api",
            "system-design",
            "ai-ml",
            "devops",
            "security",
            "project-based"
        ],
        required: [true, "Technical question category is required"]

    },

    difficulty: {
        type: String,
        enum: ["easy", "medium", "hard"],
        required: [true, "Interview is required"]
    },

    intention: {
        type: String,
        required: [true, "Intention is required"]
    },

    answer: {
        type: String,
        required: [true, "Answer is required"]
    },

    expectedAnswerPoints: [{
        type: String,
        required: true
    }],

    relatedSkills: [{
        type: String,
        required: true
    }]


}, {
    _id: false
});


const behavioralQuestionSchema = new mongoose.Schema({

    question: {
        type: String,
        required: [true, "Behavioral question is required"]
    },

    intention: {
        type: String,
        required: [true, "Intention is required"]
    },

    answer: {
        type: String,
        required: [true, "Answer is required"]
    },

    expectedAnswerPoints: [{
        type: String,
        required: true
    }],

    recommendedStructure: {
        type: String,
        enum: [
            "STAR",
            "direct",
            "situation-focused",
            "experience-focused"
        ],
        required: [true, "Recommended structure is required"]
    }

}, {
    _id: false
});


const skillGapSchema = new mongoose.Schema({

    skill: {
        type: String,
        required: [true, "Skill gap is required"]
    },

    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "Severity is required"]
    },

    reason: {
        type: String,
        required: [true, "Skill gap reson is required"]
    },

    recommendation: {
        type: String,
        required: [true, "Skill gap recommendation is required"]
    },

    priority: {
        type: Number,
        min: 1,
        max: 15,
        required: [true, "Skill gap priority is required"]
    }

}, {
    _id: false
});



const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "Day is required"]
    },

    focus: {
        type: String,
        required: [true, "Focus is required"],
    },

    objective: {
        type: String,
        required: [true, "Objective is required"]
    },

    tasks: [{
        type: String,
        required: [true, "Task is required"]
    }],

    skillGapAddressed: [{
        type: String,
        required: true
    }]

}, {
    _id: false
}

);



const interviewReportSchema = new mongoose.Schema({

    jobDescription: {
        type: String,
        required: [true, "Job Description is required"],
    },

    resume: {
        type: String,
    },

    selfDescription: {
        type: String,
    },

    matchScore: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },

    technicalQuestions: [ technicalQuestionSchema ],
    behavioralQuestions: [ behavioralQuestionSchema ],
    skillGaps: [ skillGapSchema ],
    preparationPlan: [ preparationPlanSchema ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
}, {
    timestamps: true,
});


const interviewReportModel = new mongoose.model("InterviewReport", interviewReportSchema);


module.exports = interviewReportModel;




