const { z } = require('zod');

const interviewReportSchema = z
  .object({
    summary: z
      .string()
      .min(50)
      .max(1000)
      .describe(
        "Provide a concise assessment of the candidate's readiness for the target job. Summarize their strongest relevant qualifications, major weaknesses, interview risks, and the most important preparation priorities. Base the assessment only on evidence from the candidate's resume and the provided job description."
      ),

    matchScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      "Overall compatibility score between the candidate's demonstrated qualifications and the requirements of the target job, expressed as a percentage from 0 to 100. Base the score only on skills, experience, projects, education, and other evidence present in the candidate profile compared with the job description. Do not treat missing information as proof that the candidate lacks the skill."
    ),

    technicalQuestions: z
      .array(
        z
          .object({
            question: z
              .string()
              .min(10)
              .max(500)
              .describe(
                "Generate a realistic technical interview question that is directly relevant to the target job and the candidate's demonstrated skills, projects, technologies, or experience. Prioritize questions an interviewer would realistically ask rather than generic questions."
              ),

            category: z
              .enum([
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
                "project-based",
              ])
              .describe(
                "Identify the primary technical area being evaluated by this question."
              ),

            difficulty: z
              .enum(["easy", "medium", "hard"])
              .describe(
                "Estimate the difficulty of the question for a candidate applying for the target role."
              ),

            intention: z
              .string()
              .min(20)
              .max(500)
              .describe(
                "Explain what the interviewer is actually trying to evaluate through this question, such as conceptual understanding, practical experience, debugging ability, architectural reasoning, problem solving, or depth of knowledge."
              ),

            answer: z
              .string()
              .min(30)
              .max(1500)
              .describe(
                "Provide a concise answer strategy rather than simply giving a memorized answer. Explain how the candidate should structure the response, what concepts they should explain, what reasoning they should demonstrate, and which relevant experience or project examples they can use. Never invent experience that is not supported by the candidate's resume."
              ),

            expectedAnswerPoints: z
              .array(z.string().min(5).max(300))
              .min(2)
              .max(8)
              .describe(
                "List the essential technical concepts, reasoning steps, examples, trade-offs, or implementation details that a strong candidate should cover when answering the question."
              ),

            relatedSkills: z
              .array(z.string().min(2).max(100))
              .min(1)
              .max(6)
              .describe(
                "List the specific skills or technologies from the job requirements that this question evaluates."
              ),
          })
          .strict()
      )
      .min(3)
      .max(15)
      .describe(
        "Generate a prioritized collection of realistic technical interview questions tailored to the candidate's profile and the target job. Questions should collectively cover the most important technical areas required for the role."
      ),

    behavioralQuestions: z
      .array(
        z
          .object({
            question: z
              .string()
              .min(10)
              .max(500)
              .describe(
                "Generate a realistic behavioral or HR interview question relevant to the candidate's background, projects, education, teamwork, leadership, challenges, failures, achievements, or target role."
              ),

            intention: z
              .string()
              .min(20)
              .max(500)
              .describe(
                "Explain the interviewer's underlying objective, such as evaluating communication, teamwork, ownership, leadership, adaptability, conflict resolution, accountability, motivation, or self-awareness."
              ),

            answer: z
              .string()
              .min(30)
              .max(1200)
              .describe(
                "Provide guidance for constructing an authentic and convincing response. Recommend an appropriate structure such as STAR when applicable, identify what evidence the candidate should use, and explain what the interviewer should hear. Do not fabricate achievements, responsibilities, or experiences."
              ),

            expectedAnswerPoints: z
              .array(z.string().min(5).max(250))
              .min(2)
              .max(6)
              .describe(
                "List the important points the candidate should communicate to make the behavioral answer specific, credible, and relevant to the target role."
              ),

            recommendedStructure: z
              .enum(["STAR", "direct", "situation-focused", "experience-focused"])
              .describe(
                "Recommend the most appropriate structure for answering this behavioral question."
              ),
          })
          .strict()
      )
      .min(3)
      .max(10)
      .describe(
        "Generate a prioritized set of behavioral and HR interview questions tailored to the candidate's actual background and the expectations of the target role."
      ),

    skillGap: z
      .array(
        z
          .object({
            skill: z
              .string()
              .min(2)
              .max(100)
              .describe(
                "Identify a specific technical, domain, or professional skill that is required or strongly preferred for the target role but is missing, weak, or insufficiently demonstrated in the candidate's resume."
              ),

            severity: z
              .enum(["low", "medium", "high"])
              .describe(
                "Rate how important it is for the candidate to close this gap before the interview. High means the skill is a core requirement or significant interview risk. Medium means it is relevant but not critical. Low means it is beneficial but unlikely to significantly affect the outcome."
              ),

            reason: z
              .string()
              .min(20)
              .max(500)
              .describe(
                "Explain specifically why this skill is considered a gap by comparing the candidate's demonstrated experience with the requirements of the target job. Do not identify a gap unless there is evidence for it."
              ),

            recommendation: z
              .string()
              .min(20)
              .max(600)
              .describe(
                "Give a practical and focused recommendation for closing this gap. Specify what the candidate should learn, practice, revise, or build before the interview."
              ),

            priority: z
              .number()
              .int()
              .min(1)
              .max(15)
              .describe(
                "Assign a preparation priority where 1 represents the most important skill gap to address."
              ),
          })
          .strict()
      )
      .max(15)
      .describe(
        "Identify and prioritize the most meaningful skill gaps by comparing the candidate's demonstrated capabilities against the target job requirements. Avoid generic skill recommendations that are not supported by the comparison."
      ),

    preparationPlan: z
      .array(
        z
          .object({
            day: z
              .number()
              .int()
              .min(1)
              .max(30)
              .describe(
                "The sequential preparation day number, starting at 1."
              ),

            focus: z
              .string()
              .min(5)
              .max(150)
              .describe(
                "The primary skill, concept, or interview area the candidate should focus on during this day."
              ),

            objective: z
              .string()
              .min(15)
              .max(300)
              .describe(
                "State the specific outcome the candidate should achieve by the end of this preparation day."
              ),

            tasks: z
              .array(z.string().min(5).max(300))
              .min(2)
              .max(6)
              .describe(
                "Provide specific and actionable preparation activities. Tasks should include practical activities such as revising concepts, solving problems, implementing features, reviewing projects, or practicing interview questions."
              ),

            skillGapsAddressed: z
              .array(z.string().min(2).max(100))
              .min(1)
              .max(5)
              .describe(
                "Identify the skill gaps from the skill-gap analysis that this day's preparation is intended to address."
              ),
          })
          .strict()
      )
      .min(3)
      .max(30)
      .describe(
        "Create a structured day-by-day preparation roadmap based on the candidate's skill gaps, technical requirements, behavioral requirements, and interview priorities. Prioritize high-impact weaknesses first."
      ),
  })
  .strict();


module.exports = interviewReportSchema;