const Groq = require('groq-sdk');
const apiError = require('../utils/apiError');

const MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-20b";
const TPM_LIMIT = Number(process.env.GROQ_TPM_LIMIT) || 8000;
const SAFETY_MARGIN = 300;

// ~3 chars per token is a deliberately conservative estimate.
const estimateTokens = (text) => Math.ceil(String(text || "").length / 3);


let client;

function getClient() {

    if (!client) {
        if (!process.env.GROQ_API_KEY) {
            throw new apiError(500, "AI provider is not configured.");
        }

        client = new Groq({
            apiKey: process.env.GROQ_API_KEY,
            timeout: 60_000,
            maxRetries: 1
        });
    }

    return client;
}

function toApiError(error) {
    const message = String(error.message || "");

    if (message.includes("json_validate_failed")) {
        const err = new apiError(502, "The AI service returned an invalid structure.");
        err.retryable = true;
        return err;
    }

    if (error?.status === 413 || error?.status === 429) {
        return new apiError(429, "The AIservice is busy righ now. Please retry after a minute.");
    }

    if (error?.name === "APIConnectionTimeoutError") {
        return new apiError(504, "The AI service timed out. Please try again.");
    }

    return new apiError(502, "The AI provider request failed.");
}

async function generateJson ({
    system,
    prompt,
    schema,
    schemaName = "response",
    maxTokens = 2048,
    reasoningEffort = "low",
    temperature = 0.2,
    purpose = "unknown"
}) {
    const startedAt = Date.now();
    let completion;

    const allowedOutput = TPM_LIMIT - SAFETY_MARGIN - estimateTokens(system) - estimateTokens(prompt);

    if (allowedOutput < 800) {
        throw new apiError(413, "The input is too large for the current AI plan. Please shorten the resume or job description.");
    }

const effectiveMaxTokens = Math.min(maxTokens, allowedOutput);

    try {
        completion = await getClient().chat.completions.create({
            model: MODEL,
            temperature,
            reasoning_effort: reasoningEffort,
            max_completion_tokens: effectiveMaxTokens,
            messages: [
                { role: "system", content: system },
                { role: "user", content: prompt }
            ],
            response_format: schema
                ? { type: "json_schema", json_schema: { name: schemaName, strict: true, schema } }
                : { type: "json_object" }
        });
    } catch (error) {
        console.info(`[groq.provider] ${purpose} ${meta.durationMs}ms finish=${meta.finishReason} in=${meta.usage?.prompt_tokens} out=${meta.usage?.completion_tokens} cap=${effectiveMaxTokens}`);
    }

    const choice = completion.choices?.[0];
    const meta = {
        model: completion.model || MODEL,
        finishReason: choice?.finish_reason,
        usage: completion.usage,
        durationMs: Date.now() - startedAt
    };

    console.info(`[groq.provider] ${purpose} ${meta.durationMs}ms finish=${meta.finishReason} tokens=${meta.usage?.total_tokens}`);

    return { text: choice?.message?.content || "", ...meta };

}


module.exports = { generateJson }