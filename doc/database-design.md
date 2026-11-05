# Pathway — Database Design

> Updated 2026-11-04. Legend: ✅ implemented · 🚧 in progress · ⏳ planned. See each model file for exact fields.

## Principles
- Every user-owned document has a `user` ref and every query is scoped by it.
- Unauthorized access returns 404, not 403.
- Reference independent entities, embed tightly coupled data.
- DB shapes do not mirror AI response shapes.

## Implemented
| Collection | Notes |
|---|---|
| `users` ✅ | Credentials, refresh token state. Model registered as `"users"` (refs use this name). |
| `blacklistedtokens` ✅ | Revoked access tokens. TTL cleanup still planned (Phase 1). |
| `interviewreports` ✅ | Per-user report: score, matched/missing skills, gaps, questions, plan. |

## Phase 2 — in progress
### `resumes` 🚧
| Field | Type | Notes |
|---|---|---|
| `user` | ObjectId → users | owner, required |
| `title` | String | trimmed, max 80 |
| `isDefault` | Boolean | default false |
| `latestVersion` | ObjectId → ResumeVersion | |
| timestamps | | |

Indexes: `{ user, createdAt: -1 }`; **partial unique** `{ user }` where `isDefault: true` → at most one default per user, enforced by the database.

### `resumeversions` 🚧
| Field | Type | Notes |
|---|---|---|
| `resume` | ObjectId → Resume | required |
| `user` | ObjectId → users | denormalized owner so ownership is one query |
| `versionNumber` | Number | ≥ 1 |
| `source` | `upload` \| `manual_edit` | |
| `rawText` | String | `select: false`; opt in with `.select("+rawText")` |
| `sections` | embedded | summary, experience, education, projects, skills, certifications, achievements, languages, publications (strings) |
| `detectedSections` | [String] | |
| `detectedSkills` | [String] | canonical skill names |
| `stats` | embedded | `wordCount`, `pageCount` |
| `file` | embedded | `originalName`, `sizeBytes` (PDF itself is not stored) |

Indexes: unique `{ resume, versionNumber }`; `{ user }`.

Design notes: versions are immutable snapshots; analyses reference a `ResumeVersion` so scores stay reproducible. A resume save and its version are two writes (no transaction yet); the resume is created in memory first so a failed version insert leaves nothing behind.

## Planned
`jobs` (Phase 3), `jobanalyses` (Phase 4, pins `ResumeVersion` + `Job`), `generatedresumes` (Phase 6), `interviewsessions` / `interviewquestions` (Phase 7), `refreshtokens` with `jti` and TTL (Phase 1).