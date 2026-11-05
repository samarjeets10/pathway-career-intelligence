# Pathway — Decision Log

Format: decision · why · consequence.

**D1 — AI behind two layers (2026-11-04).** `groq.provider` (transport) + `structuredAi.service` (parse/validate/retry). Why: three more AI features are coming and each needs the same loop; one provider today means no factory or class hierarchy. Consequence: switching provider = reimplement `generateJson()`.

**D2 — Token-budget guard (2026-11-04).** The provider estimates input tokens and caps output to `GROQ_TPM_LIMIT − margin − input`. Why: Groq counts input + max output against the per-request limit; the report hit 413 with a 4000-token cap. Consequence: higher tier = change one env var. Output size is also bounded in the prompt (fixed question/day counts).

**D3 — Clamp harmless overflow, reject structural errors (2026-11-04).** Extra `skillGapsAddressed` items are sliced to 5 in code and the schema allows up to 15. Why: strict JSON mode strips `maxItems`, so the model can't see the cap, and rejecting a 13-second generation over a sixth array item wastes tokens.

**D4 — Retry policy (2026-11-04).** Retry only provider-side structure rejection, bad JSON or Zod failure; never 429 or timeouts. Extraction retries 1, report retries 1 on the free tier (a second 8k-token attempt cannot fit); raise to 2 after upgrading.

**D5 — Analyses pin `ResumeVersion` (Q2, 2026-11-04).** Why: reproducible scores after later edits.

**D6 — Don't store original PDFs (Q3, 2026-11-04).** Why: less sensitive data, simpler storage. Consequence: we keep extracted text only; re-parsing means re-uploading.

**D7 — Deterministic resume parsing at upload (2026-11-04).** Section/skill detection in code, no AI call. Why: zero token cost, instant, unit-testable, avoids the free-tier limit. Consequence: unusual headings fall back to the previous section; AI enrichment can be added later.

**D8 — Ambiguous skill aliases only count in the Skills section (2026-11-04).** `go`, `next`, `spring`, `rest`, `express` etc. are ordinary words ("next steps", "Spring 2024").

**D9 — One default resume enforced by a partial unique index (2026-11-04).** Why: application-level checks can race; the database cannot.