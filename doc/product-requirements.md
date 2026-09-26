# Pathway — Product Requirements

> Reconciled with `main` on 2026-09-21. Legend: ✅ done · ⚠️ partial/broken · 🔒 decided, not yet built · ⏳ planned

## 1. Purpose
Pathway compares a user's resume against a target job with a **deterministic** score and skill-gap list, then layers AI explanations, interview practice, and tailored PDF generation on top. Portfolio goal: every requirement must be defensible in an interview.

## 2. User
Single role: the job-seeker. No recruiter/admin/org roles (non-goal).

## 3. Product Principles
1. Deterministic first, AI second — scores/matches are computed in code; AI explains, never decides numbers.
2. AI never invents facts (experience, skills, employers, achievements).
3. AI output is untrusted input — schema-validated before storage.
4. Every resource is owner-scoped.
5. Analyses are reproducible (pinned to a specific resume version).

## 4. Scope
**In:** accounts, multi-resume + versions, job tracking, deterministic matching, AI insights, interview prep/practice, ATS analysis, tailored PDF, dashboard.
**Out (non-goals):** recruiter features, RBAC, job-board scraping, payments, microservices, TypeScript, websockets.

## 5. Functional Requirements

### 5.1 Auth
| ID | Requirement | Status |
|---|---|---|
| A1 | Register / login / logout / get-me | ✅ (basic) |
| A2 | Access + rotating refresh tokens, silent refresh | 🔒 Phase 1 |
| A3 | Token revocation by `jti` + TTL cleanup | 🔒 Phase 1 |
| A4 | Input validation (Zod) on register/login | ⏳ Phase 1 |
| A5 | Rate limit `/login`, `/register` | ⏳ Phase 1 |
| A6 | Secure cookie flags (`httpOnly`, `secure`, `sameSite`) | ⏳ Phase 1 |

### 5.2 Resumes
| ID | Requirement | Status |
|---|---|---|
| R1 | Upload PDF, validate type+size | ⚠️ size only (3MB) |
| R2 | Extract text | ✅ (inside interview flow only) |
| R3 | Parse into structured data | ⚠️ partial (skills/experience/projects) |
| R4 | Multiple named resumes per user | ⏳ Phase 2 |
| R5 | Editable versions (`Resume` + `ResumeVersion`) | ⏳ Phase 2 |
| R6 | Default resume flag | ⏳ Phase 2 |
| R7 | List/view/delete, owner-scoped | ⏳ Phase 2 |

### 5.3 Jobs
| ID | Requirement | Status |
|---|---|---|
| J1 | Save job manually (title, company, desc, sourceUrl, status...) | ⏳ Phase 3 |
| J2 | Store extracted required/preferred skills, keywords | ⏳ Phase 3 (extraction logic ✅, not persisted) |
| J3 | CRUD + filter by status, owner-scoped | ⏳ Phase 3 |

### 5.4 Deterministic Matching
| ID | Requirement | Status |
|---|---|---|
| M1 | Alias normalization (`JS`→`javascript`) | ✅ |
| M2 | Matched/missing for required & preferred | ✅ |
| M3 | Weighted score (required ×2, preferred ×1) | ✅ |
| M4 | Partial/implied matching | ⏳ (implication map exists, disabled in code) |
| M5 | Gap severity by rule, not hard-coded | ⏳ (currently always `"medium"`) |
| M6 | `JobAnalysis` pinned to a `ResumeVersion` | 📝 needs confirmation, see Q2 |
| M7 | Many-to-many resume↔job analysis | ⏳ Phase 4 |

### 5.5 AI Insights / ATS
| ID | Requirement | Status |
|---|---|---|
| AI1 | Structured extraction (candidate+job), schema-validated | ✅ |
| AI2 | Skill-gap explanations | ⏳ prompt written, not wired |
| AI3 | Resume improvement suggestions | ⏳ Phase 5 |
| AI4 | ATS suggestions (keywords, sections, bullets, length) | ⏳ Phase 5 |
| AI5 | AI metadata recorded (provider, model, tokens, time) | ⏳ Phase 5 |
| AI6 | Suggestions checked against source data before use | ⏳ Phase 5 |

### 5.6 Tailored Resume / PDF
| ID | Requirement | Status |
|---|---|---|
| P1 | Generate tailored resume: version + job + template | ⏳ Phase 6 |
| P2 | Puppeteer HTML→PDF | ⏳ Phase 6 |
| P3 | Owner-only storage/serving | ⏳ Phase 6 |

### 5.7 Interview
| ID | Requirement | Status |
|---|---|---|
| I1 | Report: score + gaps + questions + plan from resume+job | ⚠️ score/gaps persisted; questions/plan generator exists but is disconnected (see architecture §A) |
| I2 | Question types + difficulty | ⏳ Phase 7 (schema ready) |
| I3 | Practice: answer → AI eval → score/feedback | ⏳ Phase 7 |
| I4 | History for progress tracking | ⏳ Phase 7 |

### 5.8 Dashboard
| ID | Requirement | Status |
|---|---|---|
| D1 | Aggregate resumes/analyses/gaps/progress | ⏳ Phase 8 |

## 6. Non-Functional Requirements

**Security:** passwords hashed & hidden (`select:false`+`toJSON`) 🔒 · every route owner-checked, unauthorized access returns `404` not `403` 📝 · tokens short-lived/revocable in `httpOnly` cookies 🔒 · Zod validation + upload content-type (not just extension) check ⏳ · rate limits on auth + every AI endpoint ⏳ · env vars validated at boot, fail fast ⏳ · no stack traces/secrets in prod error responses ⏳ · CORS restricted to configured origins (currently hard-coded to `localhost:5173`).

**Privacy:** resume text is personal data — never logged (currently the AI service logs full model output; to be removed) · deleting a resume cascades to its versions/derived data · original PDFs retained only if a feature needs them 📝 (Q3).

**Reliability:** bad requests never crash the process ✅ (`server.js` has error/unhandledRejection/uncaughtException handlers) · AI failures (timeout/quota/bad JSON/schema mismatch) return controlled `502`/`429`, never corrupt stored data · DB connection failure must be surfaced, not silently logged (current gap).

**Performance/Cost:** deterministic engine runs in-process, no external calls, ms latency · one AI call per user action, none at boot, bounded `max_completion_tokens`, request timeout · provider/model swappable without touching business logic (free-tier quotas are a real constraint).

**Maintainability:** strict route→middleware→controller→service→model/provider layering, no SDK calls outside the provider module · Mongoose models and Zod schemas kept explicitly in sync (drift has already caused bugs) · unit tests for the deterministic engine first (it's pure) · consistent response envelope (`api-design.md`).

## 7. AI Guardrails
1. Prompts state: use only supplied facts, never invent, never calculate/alter the deterministic score or gaps. ✅ written into both prompts.
2. AI JSON is parsed and Zod-validated; invalid → nothing stored. ✅ extraction / ⚠️ report (validator exists, not called from the controller).
3. AI response shape ≠ DB shape; a mapping step sits between them. 🔒
4. Suggestions naming skills/employers/achievements are checked against source data before use. ⏳
5. Low temperature (0.2) for extraction and evaluation. ✅

## 8. Constraints
Stack fixed: Node/Express 5/Mongoose 9/React 19/Vite/Tailwind/JS-only/Zod. AI provider currently **Groq** (`openai/gpt-oss-20b`) in code, vs. **Gemini** in original planning — unresolved, see Q1. Uploads: PDF only, 3MB. Dev on Windows+nodemon (source of the process-level error-handling rules). Deployment workflow is manual paste-and-commit.

## 9. Success Criteria
**Product:** upload resume → save job → match score + matched/missing skills → AI explanation → interview practice → tailored PDF, end-to-end through the UI.
**Engineering:** developer can defend the auth design, prove ownership is enforced (tests), explain why scoring is deterministic and how AI output is validated, explain the data model's embed-vs-reference choices, and show a deployed, documented instance.

## 10. Open Questions
| # | Question | Blocks |
|---|---|---|
| Q1 | Final AI provider: Groq, Gemini, or both behind the interface? | Wiring report generation |
| Q2 | `JobAnalysis` pins `ResumeVersion` or `Resume`? | Phase 4 modeling |
| Q3 | Keep original PDFs or extracted data only? | Phase 2 |
| Q4 | Rename `InterviewReport.user`→`userId` now (dev data, no migration cost yet)? | Phase 1 model pass |
| Q5 | Approve `helmet` + `express-rate-limit` (README mentions them; not yet agreed)? | Phase 1 |