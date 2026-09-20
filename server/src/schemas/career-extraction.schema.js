const { z } = require("zod");


const careerExtractionSchema = z.object({

    candidate: z.object({

        skills: z.array(z.string()),

        technologies: z.array(z.string()),

        experience: z.array(
            z.object({
                title: z.string(),
                company: z.string(),
                duration: z.string(),
                description: z.string()
            })
        ),

        projects: z.array(
            z.object({
                name: z.string(),
                description: z.string(),
                technologies: z.array(z.string())
            })
        )
    }),

    job: z.object({

        requiredSkills: z.array(z.string()),

        preferredSkills: z.array(z.string()),

        responsibilities: z.array(z.string()),

        experienceRequirements: z.array(z.string())
    })
});


module.exports = {
    careerExtractionSchema
};