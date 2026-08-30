# Pathway-career-intelligence : AI Career Assistant Platform

> A full-stack, production-ready platform to manage resumes, analyze job descriptions, identify skill gaps, prepare for interviews, and generate ATS-optimized PDFs.

---

## Table of Contents

- [Pathway-career-intelligence : AI Career Assistant Platform](#pathway-career-intelligence--ai-career-assistant-platform)
  - [Table of Contents](#table-of-contents)
  - [Project Vision \& Philosophy](#project-vision--philosophy)
  - [System Architecture](#system-architecture)
    - [Backend Request Flow:](#backend-request-flow)
    - [Folder Structure:](#folder-structure)
    - [Prerequisites :](#prerequisites-)
    - [Environment Setup :](#environment-setup-)

---

## Project Vision & Philosophy

This project transcends the standard "AI wrapper" tutorial. It is designed to be a deeply engineered, defensible portfolio piece.

**The Guiding Principles:**

1. **Real Architecture:** Clean separation between routes, controllers, services, models, middleware, and AI/document-processing services.
2. **Real Backend Engineering:** Comprehensive authentication, authorization, validation, error handling, file uploads, database design, and security.
3. **Real Product Logic:** Deterministic skill matching and gap detection algorithms over relying solely on AI "magic."
4. **AI Used Properly:** Gemini acts as an intelligent service within the system, strictly bound by structured outputs, validation, and sensible failure handling.
5. **Production Readiness:** Environment configuration, API documentation, testing, logging, and a polished frontend UI.

## System Architecture

A robust 4-layer modular architecture separates concerns and ensures scalability.

```text
                         USER
                          │
                          ▼
                    React Frontend
                     (Port 5173)
                          │
                          ▼
                    Express REST API
                     (Port 5000)
                          │
             ┌────────────┼─────────────┐
             │            │             │
             ▼            ▼             ▼
          MongoDB       AI Service    PDF Service
          (Port 27017)  (Gemini API)  (Puppeteer)
             │            │             │
     ┌───────┼────────┬───────────┐
     │       │        │           │
     ▼       ▼        ▼           ▼
   Users   Resumes   Jobs     Interviews
               │       │           │
               └───────┼───────────┘
                       ▼
                Matching Engine
                       │
                       ▼
                 Skill Analysis
```

### Backend Request Flow:

```text
Route → Middleware (Auth/Validate) → Controller → Service → Model/External Provider → Response
```

### Folder Structure:

```text
├── server/
│   ├── src/
│   │   ├── config/           # Environment, DB, AI, logging config
│   │   ├── models/           # Mongoose schemas
│   │   ├── controllers/      # Request handlers
│   │   ├── services/         # Business logic (AI, PDF, Matching)
│   │   ├── routes/           # API route definitions
│   │   ├── middleware/       # Auth, validation, rate limiting
│   │   ├── utils/            # Helpers, constants, validators
│   │   ├── types/            # TypeScript interfaces/types
│   │   └── app.js            # Express app initialization
│   ├── tests/                # Unit & integration tests
│   ├── uploads/              # Temporary file storage
│   ├── .env.example          # Environment template
│   ├── package.json
│   └── server.js             # Entry point
│
├── client/
│   ├── src/
|   |   |--features/          # Feature-based modules (Resume, Job, Interview)
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page-level components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── context/          # React context providers
│   │   ├── services/         # API client
│   │   ├── utils/            # Helpers
│   │   └── App.jsx
│   ├── public/
│   ├── .env.example
│   └── package.json
│
├── docker-compose.yml        # Docker orchestration
├── .gitignore
└── README.md
```
Feature Set
1. Authentication & Security
JWT Strategy: Access and refresh token architecture.

Token Lifecycle: Token revocation and blacklisting for secure logouts.

Hardened Endpoints: Protected routes, resource ownership checks (e.g., users can only access their own resumes), rate limiting for expensive AI calls.

Data Integrity: Password hashing (bcrypt), request body validation (Joi/Zod), strict file-size limits (5MB max), and file-type validation (PDF only).

2. Advanced Resume Management
Multi-Resume Support: Maintain different targeted resumes (e.g., Frontend, Backend, Full-Stack).

Versioning: Generate job-specific variants without destroying the original document (v1, v2, etc.).

Extraction Pipeline: PDF → Text Extraction → Cleaning → Parser → Structured Data (MongoDB).

Extracted Data Points: Personal Info, Education, Skills, Experience, Projects.

3. Job Intelligence & Skill Gap Engine (Deterministic)
Job Description Analyzer: Extracts required skills, preferred skills, experience, education, and keywords.

Deterministic Matching Engine: Compares parsed resume skills directly against the JD (Match Score %, Matched, Missing, Partial).

Deep Gap Detection: Explains why a skill is missing based on the JD, provides learning recommendations, and estimates required proficiency.

Analysis History: Save and revisit previous job match analyses.

4. AI Integration (Google Gemini)
Service Abstraction: AI logic is decoupled from controllers (Controller → AI Service → Prompt Builder → Gemini Provider).

Resume Quality Scoring: Evaluates Experience, Projects, Skills, Summary, and Achievements out of 100.

Section Improvement: AI suggests high-impact, outcome-based bullet points (requires user approval to apply).

ATS Optimization: Keyword coverage analysis, section structure formatting, and missing keyword alerts.

5. Document Generation (Puppeteer)
Pipeline: Resume Data + Target JD + Template → HTML/CSS → Puppeteer → ATS-friendly PDF.

Templates: Classic, Modern, Minimal, Technical, ATS-focused.

Integrity Rule: The system strictly tailors formats and highlights keywords, but never hallucinates or invents non-existent user experience.

6. Interview Preparation System
Context-Aware Questions: Generated based on the combination of Resume + Job Description.

Categorized Generation: Technical, Behavioral, Project-based, Resume-based, and Job-specific questions.

Practice & Evaluation Mode: User answers are evaluated by AI for Technical Accuracy, Clarity, Completeness, Confidence, and Relevance.

Session Tracking: Maintains a history of interview readiness scores to track progress over time.

7. Interactive Career Dashboard
Central hub displaying Resume Scores, Job Match Averages, Skill Progress (e.g., JavaScript 90%, Docker 30%), Interview Readiness %, and recent activity.

| Category | Technology |
|----------|------------|
| Frontend | React, Vite, React Router, Tailwind CSS, Framer Motion |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose (with explicit schema relationships and indexing) |
| AI Provider | Google Gemini API (via abstracted AI Service) |
| PDF Engine | Puppeteer (Headless Chrome for HTML-to-PDF) |
| Security | JWT, bcrypt, helmet, cors, express-rate-limit |
| File Handling | Multer, pdf-parse |
| Validation | Joi / Zod |
| Logging | Winston / Morgan |
| Testing | Jest, Supertest |
| Containerization | Docker, Docker Compose |
| CI/CD | GitHub Actions |
| Cloud | AWS / Azure / GCP (deployment agnostic) |

### Prerequisites :
--- 

* Before you begin, ensure you have the following installed:

* Node.js v18.x or higher

* npm v9.x or higher or yarn v1.22+

* MongoDB v6.x+ (local or Atlas)

* Docker and Docker Compose (optional, for containerized setup)

Google Gemini API Key (get from Google AI Studio)

### Environment Setup :
--- 

Backend .env Configuration
Create a .env file in the backend/ directory using the template below:
