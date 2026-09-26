# Pathway — API Design

> Reconciled with `main` on 2026-09-21. Base URL: `http://localhost:3000/api` (no versioning yet — 📝 add `/api/v1` before Phase 8 per project-context). Legend: ✅ live · 🔒 decided, not built · ⏳ planned.

## 1. Response Envelope
**Planned (Phase 1), not yet applied to the two live routers:**
```json
// success
{ "success": true, "message": "...", "data": { } }
// error
{ "success": false, "message": "...", "code": "RESOURCE_NOT_FOUND" }
```
Current live responses are inconsistent: `{ message, user }`, `{ message, interviewReport }` — no `success` flag, no error `code`. Bringing existing routes in line with the envelope is part of the Phase 1 error-handling work (`asyncHandler` + central error middleware), not a new endpoint.

## 2. Auth — `/api/auth` ✅ live, hardening pending

| Method | Path | Access | Body | Status |
|---|---|---|---|---|
| POST | `/register` | Public | `{ username, email, password }` | ✅ — no validation |
| POST | `/login` | Public | `{ email, password }` | ✅ — no rate limit |
| GET | `/logout` | Public | – | ✅ — blacklists raw token, should be `POST` (logout is a mutation) |
| GET | `/get-me` | Private | – | ✅ |
| POST | `/refresh` | Public (refresh cookie) | – | 🔒 Phase 1 — issues new access token, rotates refresh token |

**Current auth mechanism:** single JWT (`{id, username}`, 1-day expiry) set via `res.cookie("token", ...)` with no flags — no `httpOnly`/`secure`/`sameSite`, no `maxAge`. `authUser` middleware reads `Authorization: Bearer` header **or** the cookie, checks a blacklist collection, then `jwt.verify`.

**Phase 1 target:** access token (short-lived, ~15 min) + refresh token (long-lived, rotated, `httpOnly` cookie only) as described in `system-architecture.md` §6.

## 3. Interview — `/api/interview` ✅ live, minimal

| Method | Path | Access | Body | Status |
|---|---|---|---|---|
| POST | `/` | Private | `multipart/form-data`: `resume` (PDF file), `selfDescription`, `jobDescription` | ✅ — returns `{ matchScore, skillGaps }` only; questions/plan not generated (see `system-architecture.md` §A) |
| GET | `/` | Private | – | ⏳ list the user's own reports |
| GET | `/:id` | Private, owner-checked | – | ⏳ |

Upload constraint: PDF only by extension expectation, 3 MB max (`multer` memory storage) — **no MIME/magic-byte validation yet** (FR-R1 gap).

## 4. Resumes — `/api/resumes` ⏳ Phase 2 (none of this exists yet)

| Method | Path | Notes |
|---|---|---|
| POST | `/` | Upload PDF → creates `Resume` + first `ResumeVersion` |
| GET | `/` | List the caller's resumes |
| GET | `/:id` | Owner-checked; 404 (not 403) if not owned |
| PATCH | `/:id` | Rename, set `isDefault` |
| DELETE | `/:id` | Cascades to its `ResumeVersion`s |
| GET | `/:id/versions` | Version history |
| POST | `/:id/versions` | Edit content → new immutable version |

## 5. Jobs — `/api/jobs` ⏳ Phase 3

| Method | Path | Notes |
|---|---|---|
| POST | `/` | Manual job entry (title, company, description, sourceUrl, status, ...) |
| GET | `/` | List, filterable by `status` |
| GET | `/:id` | Owner-checked |
| PATCH | `/:id` | Edit fields / update `status` |
| DELETE | `/:id` | |

## 6. Analysis — `/api/analysis` ⏳ Phase 4

| Method | Path | Notes |
|---|---|---|
| POST | `/` | `{ resumeVersionId, jobId }` → runs the deterministic engine (`skillMatching.service.js`, already ✅), persists a `JobAnalysis` |
| GET | `/` | List past analyses, filterable by `jobId` or `resumeVersionId` |
| GET | `/:id` | Full result: matched/missing/preferred + AI insights once Phase 5 lands |

This is a synchronous, cheap request — no AI call, no rate limiting needed beyond the general API limit.

## 7. AI-heavy endpoints ⏳ Phase 5

| Method | Path | Notes |
|---|---|---|
| POST | `/analysis/:id/insights` | Runs Gemini/Groq explanation on top of an existing `JobAnalysis` — **rate-limited** (NFR-S5) |
| POST | `/resumes/:id/ats` | ATS suggestions for a resume version |
| POST | `/resumes/:id/tailor` | `{ jobId, template }` → tailored content, feeding Phase 6's PDF pipeline |

All AI-heavy routes: `authUser` → per-user rate limiter → controller → application service → AI service (never called directly from a controller, per the AI Rule).

## 8. PDF — `/api/generated-resumes` ⏳ Phase 6

| Method | Path | Notes |
|---|---|---|
| POST | `/` | `{ resumeVersionId, jobId, template }` → Puppeteer render, stores `fileUrl` |
| GET | `/:id/download` | Owner-checked; streams the file, never a public URL |

## 9. Interview practice — `/api/interviews` ⏳ Phase 7 (supersedes the current `/api/interview` single-shot flow)

| Method | Path | Notes |
|---|---|---|
| POST | `/sessions` | Generate a session (questions) from a resume version + job |
| GET | `/sessions/:id` | |
| POST | `/sessions/:id/answers` | `{ questionId, answer }` → AI evaluation → score + feedback, persisted |
| GET | `/sessions` | History for progress tracking |

## 10. Dashboard — `/api/dashboard` ⏳ Phase 8
| Method | Path | Notes |
|---|---|---|
| GET | `/` | Aggregated summary — resumes, recent analyses, skill-gap trends, interview progress |

## 11. Cross-Cutting Rules (all future routes)
1. **Auth:** every route except register/login/refresh requires `authUser`.
2. **Ownership:** every `:id` lookup filters by `{ _id, userId: req.user.id }` in the query itself — never fetch-then-check in application code. Not found or not owned → `404`.
3. **Validation:** Zod schema per route, applied in middleware before the controller runs.
4. **Errors:** thrown from services, caught by `asyncHandler`, formatted by the central error middleware into the envelope in §1.
5. **Rate limiting:** general limiter on all routes; a stricter limiter on `/auth/login`, `/auth/register`, and every AI-heavy route.
6. **File responses:** streamed with ownership check first; never a public/guessable URL.

## 12. Known Deviations to Fix (tracked here so they aren't lost)
- `GET /auth/logout` should be `POST` (it mutates state — creates a blacklist entry).
- Cookie has no `httpOnly`/`secure`/`sameSite`/`maxAge`.
- No response envelope or error codes on either live router.
- CORS origin is hard-coded (`http://localhost:5173`) instead of env-driven.