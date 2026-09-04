# Pathway — Development Roadmap

Derived from an audit of the actual repo (`samarjeet10/pathway-career-intelligence`, `main`) on 2026-09-04, cross-referenced against the project context doc. Each phase is meant to be built, tested, and closed out before the next one starts.

---

## Phase 0 — Foundation ✅ Done

- Node/Express server running, `.env` config, MongoDB connected (`server/src/config/database.js`)
- Vite + React client scaffolded, Tailwind wired up, routing skeleton in place
- Basic auth loop working end-to-end (register → login → cookie → protected route → logout)

Nothing to build here — just noting it's the baseline everything else sits on.

---

## Phase 1 — Harden Authentication & Authorization

**Why first:** every other phase adds user-owned resources. If ownership and session handling aren't solid now, every later model inherits the same weaknesses.

**Fix what exists:**
- Remove the redundant `bcrypt`/`bcryptjs` duplication — pick one
- Set `httpOnly`, `secure` (prod), and `sameSite` on the auth cookie
- Clean up `app.routes.jsx` (duplicate `"/"` entries, unused `react-router` vs `react-router-dom` — pick one package)
- Fix the swallowed-error pattern in `auth.api.js` (flagged earlier — makes login/register failures invisible to the UI)

**Architectural decision to resolve before implementing:** password hashing via Mongoose pre-save hook (with `comparePassword` instance method, `select: false`, `toJSON` transform) vs. a service-layer approach. Needs a decision before the `User` model is finalized.

**Build:**
- `User` model hardening: `select: false` on password, `comparePassword` method, `toJSON` transform, proper unique indexes
- Introduce a service layer: `auth.controller.js` → `auth.service.js` → model (business logic currently lives in the controller)
- `RefreshToken` model + `BlacklistedToken` model, both with `jti` claims and TTL indexes (`expireAfterSeconds: 0`)
- Access token (short-lived) + refresh token (long-lived, rotated) flow; logout revokes the refresh token
- Centralized error handler (`asyncHandler` wrapper + Express error middleware) so controllers stop needing try/catch everywhere
- Request validation (Zod) on register/login payloads
- Consistent API response shape (`{ success, message, data }` or similar)
- Basic rate limiting on `/auth/login` and `/auth/register`

**Exit criteria:** a user can register, log in, get silently refreshed, and log out, with tokens properly revoked — and a bad request never crashes the server or hangs the client.

---

## Phase 2 — Resume Core

**Features:**
- Upload a resume (PDF), with file-type and file-size validation
- Extract text from the uploaded PDF
- Parse extracted text into structured resume data (personal info, summary, education, experience, projects, skills, certifications, achievements, languages, publications)
- Store a `Resume` (the container — title, owner, default flag) and `ResumeVersion` (a content snapshot — the parsed/edited data)
- CRUD: list resumes, get one, edit content, delete, mark default
- Ownership checks: every read/write scoped to `req.user.id`

**New models:** `Resume`, `ResumeVersion`

**Exit criteria:** a logged-in user can upload a PDF, see structured data extracted from it, edit it, and manage multiple resumes (e.g. "Frontend Resume", "Backend Resume").

---

## Phase 3 — Job Intelligence

**Features:**
- Save a job description (manual entry — title, company, location, employment type, description, source URL, required/preferred skills, responsibilities, experience/education requirements, keywords, status)
- CRUD: list, get, edit, delete jobs
- Ownership checks

**New model:** `Job`

**Exit criteria:** a user can save and manage job postings they're targeting. No matching logic yet — that's Phase 4.

---

## Phase 4 — Deterministic Skill Matching Engine

**Why this phase matters for the portfolio:** this is the "real backend logic" phase — no AI dependency, pure deterministic business rules. Strong interview material.

**Architectural decision to resolve first:** does `JobAnalysis` reference `Resume` or `ResumeVersion`? Given `ResumeVersion` is the actual content snapshot, analysis almost certainly needs to pin to a specific version (so results stay reproducible even if the resume is edited later) — but this should be confirmed and documented before modeling starts.

**Features:**
- `Skill` model: canonical skill name + known aliases (e.g. "JS" → "JavaScript")
- Skill normalization service (maps raw extracted text to canonical skills)
- Matching logic: matched / missing / partial skills between a resume version and a job
- Match score calculation + keyword coverage
- `JobAnalysis`: stores the result of comparing one resume (version) against one job — supports many-to-many (one job analyzed against multiple resumes, one resume against multiple jobs)

**New models:** `Skill`, `JobAnalysis`

**Exit criteria:** given a resume and a job, the system deterministically produces a match score and a categorized skill list — no Gemini call involved yet.

---

## Phase 5 — AI Service Layer (Gemini Integration)

**Features:**
- AI service abstraction: `Controller → Application Service → AI Service → Prompt Builder → Gemini Provider → Structured Output → Validation → Application Logic`
- Resume analysis and improvement suggestions
- Job description insights / skill-gap explanations (built on top of Phase 4's deterministic output, not replacing it)
- ATS optimization suggestions
- Structured-output validation before anything is stored (AI output is untrusted external data)
- AI metadata tracking on generated content: model, prompt version, generation type, token usage, processing time, timestamp

**Guardrail carried through every AI feature from here on:** the AI must never invent experience, skills, projects, employers, or achievements. Validation layer enforces this by checking AI suggestions against what's actually present in the resume/job data.

**Exit criteria:** Gemini calls are fully isolated behind a service boundary — no controller ever imports the Gemini SDK directly — and AI output is validated before it touches the database.

---

## Phase 6 — PDF Resume Generation

**Features:**
- HTML/CSS resume templates
- Puppeteer-based rendering pipeline
- Tailored resume flow: `Original Resume + Target Job + Template → Tailored Resume (using Phase 4/5 insights) → HTML/CSS → Puppeteer → PDF`
- `GeneratedResume` stores the rendered artifact (distinct from `ResumeVersion`, which is the content snapshot)
- Secure download/serving with ownership checks

**New model:** `GeneratedResume`

**Exit criteria:** a user can generate a job-tailored PDF resume from an existing resume version and download it.

---

## Phase 7 — Interview System

**Features:**
- Interview question generation (technical, behavioral, resume-based, project-based, job-specific, system-design where relevant; difficulty levels) — routed through the Phase 5 AI service
- Practice flow: `Question → User Answer → AI Evaluation → Score → Feedback → Strengths → Improvement Areas`
- Interview history stored for progress tracking

**New models:** `InterviewSession`, `InterviewQuestion`

**Exit criteria:** a user can start a session, answer generated questions, and get scored AI feedback, with history retained.

---

## Phase 8 — Frontend Feature Buildout + Dashboard

By this point the backend has real functionality to expose. This phase is about catching the frontend up to it.

**Features:**
- Resume management UI (upload, list, edit, versions, default)
- Job management UI
- Job-analysis / skill-gap UI
- Interview practice UI
- Career dashboard — aggregated view across resumes, analyses, and interview progress
- Introduce Redux Toolkit / TanStack Query / React Hook Form / Zod where they're actually earning their place (not upfront, only once there's real server state and forms to justify them)

**Exit criteria:** the full user flow (upload resume → analyze against a job → practice interview → download tailored PDF) is usable end-to-end through the UI.

---

## Phase 9 — Security Hardening, Testing, Deployment

**Features:**
- Full security pass: CORS review, input validation coverage, safe error responses (no leaked stack traces in prod), file upload hardening, rate limiting on AI-heavy endpoints
- Logging
- API versioning if the surface area justifies it
- Test coverage (unit + integration) — worth pulling in the testing-strategy approach once there's enough surface area to test meaningfully
- Deployment: environment config, MongoDB Atlas, hosting
- Documentation pass: fill in `doc/api-design.md`, `doc/database-design.md`, `doc/product-requirements.md`, `doc/system-architecture.md` (currently empty placeholders in the repo)

**Exit criteria:** the app is deployed, documented, and the security checklist from the project context doc is fully satisfied.

---

## Dependency notes

- Phase 4 depends on Phase 2 and 3 both being done (needs resumes and jobs to compare).
- Phase 5 can start once Phase 2/3 exist, but is more valuable after Phase 4, since AI explanations layer on top of deterministic results rather than replacing them.
- Phase 6 depends on Phase 2 (needs resume content) and benefits from Phase 4/5 (tailoring).
- Phase 7's question generation depends on Phase 5 (AI service); a stripped-down static-question version could technically start earlier if you want a placeholder.
- Phase 8 can be worked incrementally alongside Phases 2–7 rather than strictly after — one feature's UI can follow right after its backend phase closes, if you'd rather not batch all frontend work at the end.