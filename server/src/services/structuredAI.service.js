const { z } = require("zod");
const apiError = require("../utils/apiError");
const { generateJson } = require("../providers/groq.provider");

// Groq strict mode rejects length/range keywords, so we strip them from the JSON schema.
// Zod still enforces them when we validate.
function stripConstraints(schema) {
    if (Array.isArray(schema)) return schema.map(stripConstraints);
    if (schema && typeof schema === "object") {
        const clone = {};
        for (const [key, value] of Object.entries(schema)) {
            if (["minLength", "maxLength", "minimum", "maximum", "minItems", "maxItems"].includes(key)) continue;
            clone[key] = stripConstraints(value);
        }
        return clone;
    }
    return schema;
}

async function generateStructured({
    system,
    prompt,
    zodSchema,
    strict = false,
    schemaName = "response",
    maxTokens = 2048,
    purpose = "unknown",
    retries = 2
}) {
    const jsonSchema = strict ? stripConstraints(z.toJSONSchema(zodSchema)) : undefined;

    for (let attempt = 1; attempt <= retries; attempt++) {
        let ai;

        try {
            ai = await generateJson({ system, prompt, schema: jsonSchema, schemaName, maxTokens, purpose });
        } catch (error) {
            // Only a provider-side schema rejection is worth retrying.
            // Never retry 429/timeouts: that makes rate limits worse.
            if (error.retryable && attempt < retries) {
                console.warn(`[ai] ${purpose} attempt ${attempt}/${retries}: provider rejected structure`);
                continue;
            }
            throw error;
        }

        let parsed;
        try {
            parsed = JSON.parse(ai.text);
        } catch {
            console.warn(`[ai] ${purpose} attempt ${attempt}/${retries}: invalid JSON (finish=${ai.finishReason})`);
            if (attempt === retries) {
                throw new apiError(502, "The AI returned an invalid response. Please try again.");
            }
            continue;
        }

        const result = zodSchema.safeParse(parsed);

        if (result.success) {
            return {
                data: result.data,
                meta: { purpose, model: ai.model, usage: ai.usage, durationMs: ai.durationMs }
            };
        }

        const issues = result.error.issues.slice(0, 3).map((i) => `${i.path.join(".")}: ${i.message}`);
        console.warn(`[ai] ${purpose} attempt ${attempt}/${retries}: schema mismatch -> ${issues.join(" | ")}`);

        if (attempt === retries) {
            throw new apiError(502, "The AI returned an invalid response. Please try again.");
        }
    }
}

module.exports = { generateStructured };