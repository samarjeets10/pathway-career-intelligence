# Pathway — AI Career Intelligence Platform

> Compare a resume against a job, see exactly which skills match and which are missing, then prepare with AI-generated, resume-specific interview material. Scores are **deterministic and reproducible**; AI explains and suggests, it never decides the numbers.

![License](https://img.shields.io/badge/license-MIT-blue) ![Node](https://img.shields.io/badge/node-%E2%89%A518-green) ![Stack](https://img.shields.io/badge/stack-MERN-informational)

---

## Table of Contents
- [Pathway — AI Career Intelligence Platform](#pathway--ai-career-intelligence-platform)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Design Principles](#design-principles)
  - [Feature Status](#feature-status)
  - [Architecture](#architecture)
    - [Interview report pipeline](#interview-report-pipeline)
    - [Deterministic engine](#deterministic-engine)
    - [AI layer](#ai-layer)
  - [Tech Stack](#tech-stack)
  - [Repository Structure](#repository-structure)
  - [Getting Started](#getting-started)
  - [Configuration](#configuration)
    - [Server (`server/.env`)](#server-serverenv)
    - [Client (`client/.env`)](#client-clientenv)
  - [API Overview](#api-overview)
  - [Security Model](#security-model)
  - [Data Model](#data-model)
  - [Testing \& Verification](#testing--verification)
  - [Roadmap](#roadmap)
  - [Documentation](#documentation)
  - [Known Issues](#known-issues)
  - [License](#license)

---

## Overview

Job seekers rewrite resumes by hand, guess at fit, and prepare for interviews with generic question lists. Pathway answers four questions with evidence:

1. **How well do I match this job?** A weighted match score from a deterministic skill engine.
2. **What exactly am I missing?** Matched, missing and preferred skills after alias normalization (`JS` → `javascript`).
3. **What should I prepare?** Technical and behavioral questions plus a day-by-day plan, generated from *your* resume and *that* job.
4. **How do I present myself?** *(planned)* Tailored, ATS-friendly PDF resumes.

It is built as a production-minded modular monolith and as a portfolio project: every architectural decision is documented and defensible.

## Design Principles

- **Deterministic first, AI second.** Matching, scoring and gap detection are plain code. The model extracts facts and writes explanations on top.
- **AI output is untrusted input.** Every response is parsed, validated against a Zod schema, and retried on failure before anything is stored.
- **AI never invents facts.** Prompts forbid fabricating experience, skills, employers or achievements.
- **Provider isolation.** The AI provider (Groq) sits behind a service boundary; no controller talks to an SDK.
- **Ownership everywhere.** User-owned data is always queried by owner.
- **Simple over impressive.** A feature ships only if it adds real engineering value.

## Feature Status

| Area | Capability | Status |
|---|---|---|
| Auth | Register, login, logout, current user | ✅ |
| Auth | Access + rotating refresh tokens, `httpOnly` cookies | ✅ |
| Auth | Input validation, rate limiting, blacklist TTL | ⏳ in progress |
| Resume intake | PDF upload (3 MB), text extraction | ✅ |
| Matching | Alias normalization, weighted score, matched/missing skills | ✅ |
| Matching | Partial matching, rule-based gap severity | ⏳ |
| AI | Structured candidate/job extraction (validated) | ✅ |
| AI | Interview report: technical + behavioral questions, prep plan (validated, retried) | ✅ |
| Interview | Create report, list own reports, fetch one (owner-scoped) | ✅ |
| Frontend | Landing page, login/register, protected dashboard shell | ✅ |
| Resumes | Multiple resumes, versions, default resume | ⏳ Phase 2 |
| Jobs | Saved job descriptions | ⏳ Phase 3 |
| Analysis | Persisted `JobAnalysis`, AI insights, ATS suggestions | ⏳ Phases 4–5 |
| PDF | Tailored resume → Puppeteer PDF | ⏳ Phase 6 |
| Practice | Answer → AI evaluation → score → history | ⏳ Phase 7 |
| Dashboard | Progress and skill-gap overview | ⏳ Phase 8 |

## Architecture

```text
                    React (Vite, :5173)
                            │  axios + cookies
                            ▼
                 Express 5 REST API (:8000)
   Route → Middleware (auth / upload) → Controller → Service → Model / Provider
                            │
          ┌─────────────────┼──────────────────┐
          ▼                 ▼                  ▼
       MongoDB        Skill Matching        AI Service
     (Mongoose)     (deterministic)   (Prompt → Groq → Zod)
```

### Interview report pipeline

```text
PDF upload (multer, memory, 3 MB)
  → text extraction (pdf-parse)
  → AI extraction of candidate + job facts   (Groq, Zod-validated)
  → skill normalization via alias map
  → deterministic match score + skill gaps   (no AI involved)
  → AI report: questions + preparation plan  (Groq, Zod-validated, retried)
  → persist InterviewReport (owner = authenticated user)
```

### Deterministic engine
`skillMatching.service.js` normalizes skills through `data/skillAliases.js`, splits required vs preferred, and computes a weighted score (required ×2, preferred ×1). Same input always yields the same output. Prompts explicitly tell the model not to recompute or alter these results.

### AI layer
`Controller → interview.service → ai.service → prompt builder → Groq (openai/gpt-oss-20b) → JSON → Zod → application logic`. Low temperature, bounded output tokens, schema constraints, and retry on invalid structure.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 8, React Router 7, Tailwind CSS 4, shadcn/ui, TanStack Query, Axios |
| Backend | Node.js, Express 5, Mongoose 9, JWT, bcrypt, cookie-parser, cors |
| Database | MongoDB (local or Atlas) |
| AI | Groq API via `groq-sdk` (`openai/gpt-oss-20b`) |
| Files | multer, pdf-parse |
| Validation | Zod |
| Planned | Puppeteer, helmet, express-rate-limit, React Hook Form, Redux Toolkit (only if needed), Jest + Supertest, Docker, GitHub Actions |

Language: JavaScript throughout (no TypeScript).

## Repository Structure

```text
.
├── client/                      # React app
│   └── src/
│       ├── app/                 # App, router, providers
│       ├── components/          # Landing sections, layout, ui (shadcn)
│       ├── features/
│       │   ├── auth/            # components, hooks, pages, services
│       │   └── interview/       # hooks, services
│       ├── lib/                 # axios instance, utils
│       └── pages/
├── server/
│   ├── server.js                # entry point, process-level error handlers
│   ├── scripts/                 # manual test scripts (AI, matching, report)
│   └── src/
│       ├── app.js               # middleware, routes, error handler
│       ├── config/              # database connection
│       ├── controllers/         # auth, interview
│       ├── data/                # skill alias map
│       ├── middlewares/         # auth (JWT), file upload
│       ├── models/              # user, blacklist, interviewReport
│       ├── prompts/             # extraction + report prompts
│       ├── routes/              # auth, interview
│       ├── schemas/             # Zod schemas for AI output
│       ├── services/            # ai, careerExtraction, interview, skillMatching
│       └── utils/               # apiError, apiResponse
├── doc/                         # architecture, requirements, API, DB, roadmap
└── README.md
```

## Getting Started

**Prerequisites:** Node.js 18+, npm 9+, a MongoDB instance (local or Atlas), a [Groq API key](https://console.groq.com).

```bash
git clone https://github.com/samarjeets10/pathway-career-intelligence.git
cd pathway-career-intelligence

# backend
cd server
npm install
cp .example.env .env      # fill in the values (see Configuration)
npm run dev               # nodemon on http://localhost:8000

# frontend (new terminal)
cd client
npm install
echo "VITE_API_URL=http://localhost:8000" > .env
npm run dev               # http://localhost:5173
```

## Configuration

### Server (`server/.env`)
| Variable | Purpose | Example |
|---|---|---|
| `NODE_ENV` | `production` enables `secure` cookies | `development` |
| `SERVER_PORT` | API port (default 8000) | `8000` |
| `CLIENT_ORIGIN` | Allowed CORS origin (credentials enabled) | `http://localhost:5173` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/pathway` |
| `ACCESS_TOKEN_SECRET` | Signs access tokens | long random string |
| `ACCESS_TOKEN_EXPIRY` | Access token lifetime | `15m` |
| `REFRESH_TOKEN_SECRET` | Signs refresh tokens (different from access) | long random string |
| `REFRESH_TOKEN_EXPIRY` | Refresh token lifetime | `7d` |
| `GROQ_API_KEY` | Groq credentials | `gsk_...` |

### Client (`client/.env`)
| Variable | Purpose |
|---|---|
| `VITE_API_URL` | API base URL, e.g. `http://localhost:8000` |

Never commit `.env` files. Generate secrets with `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`.

## API Overview

Base path `/api`. Full detail in [`doc/api-design.md`](doc/api-design.md).

| Method | Path | Access | Description |
|---|---|---|---|
| POST | `/auth/register` | Public | Create account |
| POST | `/auth/login` | Public | Log in; sets `accessToken` + `refreshToken` cookies |
| POST | `/auth/refresh-token` | Refresh token | Rotate both tokens |
| POST | `/auth/logout` | Private | Clear cookies, revoke stored refresh token |
| GET | `/auth/get-me` | Private | Current user |
| POST | `/interview` | Private | `multipart/form-data` (`resume` PDF, `jobDescription`, `selfDescription`) → generate report |
| GET | `/interview` | Private | List your reports |
| GET | `/interview/:id` | Private | One of your reports |

Auth responses use the envelope `{ statusCode, data, message, success }`; errors flow through `apiError` and the central error handler.

## Security Model

- **Passwords:** bcrypt, hashed in a model `pre("save")` hook; never returned (explicitly excluded in queries).
- **Tokens:** short-lived access token and rotating refresh token with separate secrets; refresh tokens are compared against the stored value, so reused or stale tokens are rejected.
- **Cookies:** `httpOnly`, `sameSite: lax`, `secure` in production.
- **Authorization:** every interview query filters by the authenticated owner; another user's id yields no result.
- **Uploads:** memory storage, 3 MB limit, PDF text extraction only.
- **CORS:** locked to `CLIENT_ORIGIN` with credentials.
- **AI safety:** validated structured output, retries, no fabricated resume facts, resume text kept out of long-term logs *(logging cleanup pending)*.
- **Planned hardening:** Zod request validation, rate limiting (auth + AI endpoints), `helmet`, MIME/magic-byte upload checks, blacklist TTL, env validation at boot.

## Data Model

Currently: `users`, `blacklistToken`, `InterviewReport`. Planned per the original design: `resumes`, `resume_versions`, `jobs`, `job_analyses`, `skills`, `refresh_tokens`, `blacklisted_tokens`, `generated_resumes`, `interview_sessions`, `interview_questions`. See [`doc/database-design.md`](doc/database-design.md).

## Testing & Verification

Automated tests (Jest + Supertest) are planned for Phase 9. Until then, manual scripts in `server/scripts/` exercise each layer:

```bash
cd server
node scripts/test-skill-matching.js     # deterministic engine
node scripts/test-career-extraction.js  # AI extraction + validation
node scripts/test-career-analysis.js    # extraction + matching
node scripts/test-interview-report.js   # full AI report
```

Run them with plain `node` (not nodemon). AI scripts require a valid `GROQ_API_KEY`.

## Roadmap

| Phase | Focus | State |
|---|---|---|
| 0 | Foundation (server, DB, basic auth, client shell) | ✅ |
| 1 | Auth & authorization hardening | 🚧 tokens, cookies, error handling done; validation + rate limiting pending |
| 2 | Resume core (multi-resume, versions) | ⏳ |
| 3 | Job intelligence | ⏳ |
| 4 | Persisted deterministic matching (`JobAnalysis`) | ⏳ engine exists |
| 5 | AI insights + ATS | ⏳ |
| 6 | Puppeteer PDF generation | ⏳ |
| 7 | Interview practice + evaluation | ⏳ |
| 8 | Frontend buildout + dashboard | ⏳ |
| 9 | Security hardening, tests, deployment | ⏳ |

Details: [`doc/project-roadmap.md`](doc/project-roadmap.md).

## Documentation

| Doc | Contents |
|---|---|
| [`doc/system-architecture.md`](doc/system-architecture.md) | Layering, AI + deterministic logic, auth design, decisions |
| [`doc/product-requirements.md`](doc/product-requirements.md) | Requirements with live status |
| [`doc/api-design.md`](doc/api-design.md) | Endpoints, envelope, cross-cutting rules |
| [`doc/database-design.md`](doc/database-design.md) | Collections, relationships, indexes |
| [`doc/project-roadmap.md`](doc/project-roadmap.md) | Phased plan and exit criteria |

## Known Issues

- Client `src/lib/axios.js` reads `import.meta.VITE_API_URL` (should be `import.meta.env.VITE_API_URL`); the auth API module has a `localhost:3000` fallback while the server defaults to `8000` — set `VITE_API_URL`.
- `app.js` error handler: the 413 branch writes `message: "..."` (a label), so the custom upload-size message is never applied.
- No request validation, rate limiting or `helmet` yet.
- `blacklistToken` has no TTL and is no longer written on logout.
- Server depends on both `bcrypt` and `bcryptjs`, and an unused `@google/genai`; clean up with `npm uninstall`.
- `get-me`, auth-middleware 401s and interview endpoints skip the response envelope.

## License

MIT — see [`LICENSE`](LICENSE).