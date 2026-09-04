# 1. High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT / USER                           │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                │ HTTPS
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      REACT FRONTEND                             │
│                                                                 │
│  UI Layer                                                       │
│  ├── Pages                                                      │
│  ├── Components                                                 │
│  ├── Forms                                                      │
│  └── Layouts                                                    │
│                                                                 │
│  State / Data Layer                                             │
│  ├── TanStack Query → Server State                              │
│  └── Redux Toolkit → Client/UI State                            │
│                                                                 │
│  Application Layer                                              │
│  ├── Auth                                                       │
│  ├── Resume                                                     │
│  ├── Jobs                                                       │
│  ├── Analysis                                                   │
│  ├── Interview                                                  │
│  └── Dashboard                                                  │
│                                                                 │
│  API / Service Layer                                            │
│  └── Axios / API Client                                         │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                │ REST API / JSON
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    NODE.JS + EXPRESS API                        │
│                         MODULAR MONOLITH                        │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    API / MIDDLEWARE                       │  │
│  │                                                           │  │
│  │ CORS │ Security │ Rate Limit │ Auth │ Validation │ Errors │  │
│  └──────────────────────────┬────────────────────────────────┘  │
│                             ▼                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                      ROUTES                               │  │
│  │                                                           │  │
│  │ /auth /users /resumes /jobs /analysis /interviews /pdf    │  │
│  └──────────────────────────┬────────────────────────────────┘  │
│                             ▼                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    CONTROLLERS                            │  │
│  │                                                           │  │
│  │ HTTP request/response handling only                       │  │
│  └──────────────────────────┬────────────────────────────────┘  │
│                             ▼                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                     SERVICES                              │  │
│  │                                                           │  │
│  │ Auth │ Resume │ Job │ Analysis │ Interview │ PDF │ User   │  │
│  └───────────────┬───────────────────────┬───────────────────┘  │
│                  │                       │                      │
│                  ▼                       ▼                      │
│        ┌──────────────────┐     ┌──────────────────────────┐    │
│        │ BUSINESS LOGIC   │     │ EXTERNAL SERVICE LAYER   │    │
│        │                  │     │                          │    │
│        │ Skill Matching   │     │ Gemini AI                │    │ 
│        │ ATS Scoring      │     │ File Storage             │    │
│        │ Resume Logic     │     │ Puppeteer                │    │
│        │ Authorization    │     │ PDF Renderer             │    │
│        └────────┬─────────┘     └──────────────────────────┘    │
│                 │                                               │
│                 ▼                                               │
│        ┌──────────────────┐                                     │
│        │ DATA ACCESS      │                                     │
│        │                  │                                     │
│        │ Mongoose Models  │                                     │
│        └────────┬─────────┘                                     │
└─────────────────┼───────────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                         MONGODB                                 │
│                                                                 │
│ users │ resumes │ resume_versions │ jobs │ job_analyses         │
│ skills │ interview_sessions │ interview_questions               │
│ generated_resumes │ refresh_tokens │ blacklisted_tokens         │
└─────────────────────────────────────────────────────────────────┘
```

That is the main architecture I would lock in.

# 2. The Most Important Architectural Decision

We're building a:

Modular Monolith

Not:

```
React → Microservice 1
      → Microservice 2
      → Microservice 3
      → AI Service
      → PDF Service
      → ...
```

That's unnecessary complexity for this project.

Instead:

```
                Express Application
                       │
        ┌──────────────┼──────────────┐
        │              │              │
      Auth           Resume          Jobs
        │              │              │
        └──────────────┼──────────────┘
                       │
              Shared Infrastructure
```

Everything is deployed as one backend initially, but internally the modules have clear boundaries.

That gives you the architectural benefits without pretending you're Netflix.

# 3. Backend Architecture

I'd structure the backend approximately like this:

```
server/
│
├── src/
│   │
│   ├── app.js
│   ├── server.js
│   │
│   ├── config/
│   │   ├── db.js
│   │   ├── env.js
│   │   └── ai.js
│   │
│   ├── modules/
│   │
│   │   ├── auth/
│   │   │   ├── auth.routes.js
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   └── auth.validation.js
│   │   │
│   │   ├── users/
│   │   │
│   │   ├── resumes/
│   │   │   ├── resume.routes.js
│   │   │   ├── resume.controller.js
│   │   │   ├── resume.service.js
│   │   │   └── resume.validation.js
│   │   │
│   │   ├── jobs/
│   │   │
│   │   ├── analysis/
│   │   │
│   │   ├── interviews/
│   │   │
│   │   └── generated-resumes/
│   │
│   ├── models/
│   │
│   ├── services/
│   │   ├── ai/
│   │   ├── parser/
│   │   ├── pdf/
│   │   ├── storage/
│   │   └── matching/
│   │
│   ├── middleware/
│   │   ├── authenticate.js
│   │   ├── authorize.js
│   │   ├── validate.js
│   │   ├── upload.js
│   │   ├── rateLimiter.js
│   │   └── errorHandler.js
│   │
│   ├── utils/
│   └── constants/
│
├── tests/
├── package.json
└── .env
```

We can refine the exact structure when we start implementation.

# 4. Request Lifecycle

This is something I specifically want you to understand.

For example:

POST /api/v1/resumes/analyze

The request shouldn't directly hit Gemini.

It should travel through:

```
Client
  ↓
Route
  ↓
Authentication Middleware
  ↓
Request Validation
  ↓
Controller
  ↓
Resume Service
  ↓
Resume Parser
  ↓
Skill Matching Engine
  ↓
AI Service
  ↓
MongoDB
  ↓
Controller
  ↓
Response

```

Each layer has a responsibility.

Route

Defines:

POST /resumes/analyze
Middleware

Checks:

Is the user authenticated?
Is the request valid?
Is the file valid?
Controller

Deals with:

```
req
res
```

and delegates the actual work.

**Service**

Contains:

business logic
Model

Handles:

MongoDB interaction

That's the separation we want.

# 5. Frontend Architecture

The tutor's four-layer concept is good, but we'll adapt it to our stack.

```
React Application
│
├── UI Layer
│   ├── Components
│   ├── Pages
│   ├── Layouts
│   └── Forms
│
├── Feature Layer
│   ├── Auth
│   ├── Resume
│   ├── Jobs
│   ├── Analysis
│   ├── Interviews
│   └── Dashboard
│
├── State/Data Layer
│   ├── TanStack Query
│   └── Redux Toolkit
│
└── Service Layer
    ├── API Client
    ├── Auth API
    ├── Resume API
    ├── Job API
    └── Interview API
```
Important distinction

We'll use:

```
TanStack Query → server state
```

Examples:

resumes
jobs
analysis results
interview sessions

And:

```
Redux Toolkit → client/application state
```

Examples:

UI preferences
temporary client state
global UI state

We shouldn't dump every API response into Redux.

# 6. Authentication Architecture

Our authentication flow should be:

```
Register
   ↓
Hash Password
   ↓
Store User
   ↓
Login
   ↓
Verify Password
   ↓
Issue Access Token
   +
Issue Refresh Token
   ↓
Authenticated Requests
   ↓
Access Token Middleware
```

```
Logout:

Logout
   ↓
Revoke Refresh Token
   ↓
Blacklist Access Token
   ↓
Client clears session
```

And every protected request:

```
Request
 ↓
Extract Token
 ↓
Verify JWT
 ↓
Check Blacklist
 ↓
Identify User
 ↓
Authorization / Ownership Check
 ↓
Continue
```

This is more robust than the basic tutorial implementation.

# 7. Resume Processing Architecture

This will be one of our main pipelines.

                 USER
                   │
                   ▼
              Upload PDF
                   │
                   ▼
            File Validation
                   │
                   ▼
             File Storage
                   │
                   ▼
           Text Extraction
                   │
                   ▼
            Text Cleaning
                   │
                   ▼
          Resume Extraction
                   │
                   ▼
       Structured Resume Data
                   │
             ┌─────┴─────┐
             ▼           ▼
         MongoDB      AI Analysis

The key point:

Parsing and AI analysis are separate concerns.

# 8. Job Analysis Architecture

```
Job Description
       │
       ▼
 Text Extraction
       │
       ▼
 Requirement Parser
       │
       ├── Required Skills
       ├── Preferred Skills
       ├── Keywords
       ├── Experience
       └── Responsibilities
```

Then:

```
              Resume
                 │
                 ▼
          Resume Skill Set
                 │
                 │
Job Skill Set ───┼──→ Skill Normalization
                 │
                 ▼
           Matching Engine
                 │
        ┌────────┼─────────┐
        ▼        ▼         ▼
     Matched   Missing   Partial
                 │
                 ▼
            Score Engine
                 │
                 ▼
             AI Insights
```

This is where our project starts becoming more technically interesting than the tutor's version.

# 9. AI Architecture

This deserves its own boundary.

```
Application
     │
     ▼
 AI Service
     │
     ├── Resume Analyzer
     ├── Job Analyzer
     ├── Interview Generator
     ├── Answer Evaluator
     ├── Resume Optimizer
     └── Resume Tailor
             │
             ▼
       Prompt Builder
             │
             ▼
       Gemini Provider
             │
             ▼
       Structured Output
             │
             ▼
      Schema Validation
             │
             ▼
       Application Logic
```

The application shouldn't know Gemini's implementation details.

For example:

```
resumeService
     ↓
aiService.analyzeResume()

rather than:

resumeService
     ↓
GoogleGenerativeAI(...)
```

That separation will pay off later.

# 10. AI + Deterministic Logic

This is one of our core architectural principles.

We don't want:

```
Everything → Gemini
```

Instead:

```
                    Job Analysis
                         │
               ┌─────────┴─────────┐
               │                   │
               ▼                   ▼
        Deterministic          Gemini AI
           Engine                  │
               │                   │
        ┌──────┼──────┐            │
        ▼      ▼      ▼            ▼
      Skill  Score  Keywords    Insights
      Match
               │                   │
               └─────────┬─────────┘
                         ▼
                    Final Result
Deterministic
```

We calculate:

Match score
Skill matching
Keyword coverage
Missing skills
Partial skills
ATS metrics
AI

Gemini handles:

Explanations
Recommendations
Resume improvements
Interview questions
Answer evaluation
Tailoring suggestions

This is much more defensible technically.

# 11. Interview Architecture

```
The tutor's flow:

Resume Analysis
      ↓
Interview Report
      ↓
Questions
      ↓
Roadmap
```

We'll retain that.

But our architecture allows us to expand it:

```
Job
 │
Resume
 │
 ▼
Interview Generator
 │
 ├── Technical
 ├── Behavioral
 ├── Resume Based
 ├── Project Based
 └── Job Specific
 │
 ▼
Interview Session
 │
 ▼
Question
 │
 ▼
User Answer
 │
 ▼
AI Evaluation
 │
 ├── Accuracy
 ├── Relevance
 ├── Clarity
 ├── Completeness
 └── Feedback
 │
 ▼
Interview Score
 │
 ▼
Progress Tracking
```

# 12. Resume Generation Architecture

Our final resume pipeline:

```
Original Resume
      │
      ▼
Resume Version
      │
      +
Target Job
      │
      +
Template
      │
      ▼
Resume Tailoring Service
      │
      ▼
Validated Resume Data
      │
      ▼
HTML Template
      │
      ▼
CSS
      │
      ▼
Puppeteer
      │
      ▼
PDF
      │
      ▼
File Storage
      │
      ▼
GeneratedResume
```

Again, the AI does not directly generate arbitrary HTML and get trusted blindly.

# 13. Database Architecture

Our database sits behind the service layer:

```
Services
   │
   ▼
Mongoose
   │
   ▼
MongoDB

Core relationships:
```

```
User
 │
 ├──── Resumes
 │       │
 │       └──── Resume Versions
 │
 ├──── Jobs
 │       │
 │       └──── Job Analyses
 │
 ├──── Interview Sessions
 │       │
 │       └──── Interview Questions
 │
 ├──── Generated Resumes
 │
 ├──── Refresh Tokens
 │
 └──── Blacklisted Tokens
```

And:

```
Skills
  ↑
  │
Resumes
  │
  │
Jobs
  │
  ↓
Job Analyses
```

We'll use references where entities are independent and embedded documents where the data is tightly coupled.

# 14. Storage Architecture

We have two kinds of data:

Structured application data
MongoDB
Files
Resume PDFs
Generated PDFs

We'll keep files outside normal MongoDB documents:

```
              Application
                   │
        ┌──────────┴──────────┐
        ▼                     ▼
     MongoDB              File Storage
        │                     │
   Metadata/URLs          PDF/Binaries

```

For local development, we can initially use local storage.

For production, we'll use proper object storage.

# 15. Security Boundary

I'd visualize security like this:
```
                 Internet
                    │
                    ▼
              Express API
                    │
           ┌────────┴────────┐
           │ Security Layer  │
           │                 │
           │ CORS            │
           │ Rate Limit      │
           │ Headers         │
           │ Authentication  │
           │ Validation      │
           │ Authorization   │
           │ File Validation │
           └────────┬────────┘
                    │
                    ▼
               Application
```

Security shouldn't be something we bolt on at the end.

# 16. Error Handling Architecture

Every layer should have predictable behavior.

```
Controller
    ↓
Service
    ↓
External Service / DB
    ↓
Error
    ↓
Central Error Handler
    ↓
Consistent API Response
```

For example:

```javascript
{
  "success": false,
  "message": "Resume analysis failed",
  "code": "RESUME_ANALYSIS_FAILED"
}
```

while internal logs can contain the actual technical details.

# 17. The Complete System Flow

This is probably the most useful diagram to put into our SYSTEM_ARCHITECTURE.md.

```
                         ┌──────────────┐
                         │     USER     │
                         └──────┬───────┘
                                │
                                ▼
                     ┌────────────────────┐
                     │   React Frontend   │
                     │                    │
                     │ UI / Features      │
                     │ TanStack Query     │
                     │ Redux Toolkit      │
                     └─────────┬──────────┘
                               │
                         HTTPS / REST
                               │
                               ▼
                ┌─────────────────────────────┐
                │       Express API           │
                │                             │
                │ Security                    │
                │ Authentication              │
                │ Validation                  │
                │ Authorization               │
                └──────────────┬──────────────┘
                               │
                               ▼
                ┌─────────────────────────────┐
                │        Controllers          │
                └──────────────┬──────────────┘
                               │
                               ▼
                ┌─────────────────────────────┐
                │          Services           │
                │                             │
                │ Auth                        │
                │ Resume                      │
                │ Job                         │
                │ Analysis                    │
                │ Interview                   │
                │ Generated Resume             │
                └───────┬───────────┬─────────┘
                        │           │
             ┌──────────┘           └───────────┐
             ▼                                  ▼
    ┌─────────────────┐                ┌──────────────────┐
    │ Business Logic  │                │ External Services│
    │                 │                │                  │
    │ Skill Matching  │                │ Gemini           │
    │ ATS Scoring     │                │ File Storage     │
    │ Skill Gaps      │                │ Puppeteer        │
    └────────┬────────┘                └──────────────────┘
             │
             ▼
    ┌─────────────────┐
    │    Mongoose     │
    └────────┬────────┘
             │
             ▼
    ┌─────────────────┐
    │    MongoDB      │
    │                 │
    │ Users           │
    │ Resumes         │
    │ Jobs            │
    │ Analyses        │
    │ Interviews      │
    │ Skills          │
    │ Generated PDFs  │
    │ Tokens          │
    └─────────────────┘
```

# 18. What We're Taking From the Tutor vs Adding

This distinction should actually go into our documentation.

| Area                        | Tutor            | Our Version                   |
| --------------------------- | ---------------- | ----------------------------- |
| MERN                        | Yes              | Yes                           |
| JWT                         | Yes              | Yes                           |
| Token blacklist             | Yes              | Improved                      |
| Resume upload               | Yes              | Yes                           |
| Resume parsing              | Yes              | More structured               |
| Gemini                      | Yes              | AI service abstraction        |
| Skill gaps                  | Yes              | Deterministic matching engine |
| Match score                 | Yes              | Own scoring engine            |
| Interview questions         | Yes              | Expanded practice system      |
| Interview report            | Yes              | Persistent sessions/history   |
| Preparation roadmap         | Yes              | Retained + improved           |
| ATS optimization            | Yes              | Expanded                      |
| Puppeteer PDF               | Yes              | Template-based pipeline       |
| Multiple resumes            | No/limited       | **Yes**                       |
| Resume versions             | No               | **Yes**                       |
| Job history                 | No/limited       | **Yes**                       |
| Skill dictionary            | No/limited       | **Yes**                       |
| Interview answer evaluation | No/limited       | **Yes**                       |
| Interview progress          | No               | **Yes**                       |
| Resource ownership          | Basic            | **Explicit**                  |
| Validation                  | Basic            | **Systematic**                |
| Error handling              | Basic            | **Centralized**               |
| Rate limiting               | Limited          | **Yes**                       |
| AI response validation      | Limited          | **Yes**                       |
| AI provider abstraction     | No/limited       | **Yes**                       |
| Database indexes            | Basic            | **Planned**                   |
| TTL token cleanup           | No/limited       | **Yes**                       |
| Testing                     | Limited          | **Yes**                       |
| Deployment                  | Basic            | **Production deployment**     |
| Documentation               | Tutorial-focused | **Engineering documentation** |



# 19. The Architecture Principle I Want Us to Follow

There is one sentence that summarizes the whole system:

React handles presentation and client state; Express handles API orchestration; services contain business logic; specialized services handle AI, parsing, matching and PDF generation; MongoDB persists application state; external providers remain behind abstractions.

That is the architecture I would put into the project documentation.

One correction from the tutor's architecture

The tutor describes:

```
UI → Hooks → State Management → Service → Database/Backend
```

That's perfectly reasonable from a frontend perspective.

But we shouldn't carry the phrase "Service → Database" into the overall system architecture.

The frontend service layer talks to the API, not directly to the database.

The correct boundary is:

```
React
  ↓
Frontend API Service
  ↓
HTTP
  ↓
Express Backend
  ↓
Backend Services
  ↓
Mongoose
  ↓
MongoDB
```

That separation is important and worth understanding.

What I would do next

Now that we have the architecture direction, don't start coding the models yet.

We should turn this into our actual docs/SYSTEM_ARCHITECTURE.md, then create the next foundation documents around it:


```
docs/
│
├── PROJECT_CONTEXT.md
├── PRODUCT_REQUIREMENTS.md
├── SYSTEM_ARCHITECTURE.md     ← NOW
├── DATABASE_DESIGN.md
├── API_DESIGN.md
├── AUTHENTICATION.md
├── AUTHORIZATION.md
├── AI_ARCHITECTURE.md
├── RESUME_PROCESSING.md
├── SKILL_MATCHING.md
├── PDF_GENERATION.md
├── SECURITY.md
├── ERROR_HANDLING.md
├── TESTING_STRATEGY.md
├── DEPLOYMENT.md
├── DECISIONS.md
└── DEVELOPMENT_ROADMAP.md
```

The next logical document after this is API_DESIGN.md, because once we know the architecture and database entities, we can define exactly how the frontend will communicate with the backend—endpoints, request bodies, responses, authentication requirements, validation, and ownership rules—before we start implementing controllers and routes.