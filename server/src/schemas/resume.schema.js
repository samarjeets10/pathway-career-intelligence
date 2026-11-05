const { z } = require('zod');

const objectId = z.string().regex(/^[a-f\d]{24}$/i, "Invalid id.");

const idParamSchema = z.object({ id: objectId });

const createResumeSchema = z.object({
    title: z.string().trim().min(1, "Title is required.").max(80, "Title must be 80 characters or less.")
});

const updateResumeSchema = z
    .object({
        title: z.string().trim().min(1).max(80).optional(),
        // Only "make this the default" is allowed. To change the default, set another resume.
        isDefault: z.literal(true).optional()
    }).refine((value) => value.title !== undefined || value.isDefault !== undefined, {
        message: "Nothing to update."
});

module.exports = {
    idParamSchema,
    createResumeSchema,
    updateResumeSchema
}