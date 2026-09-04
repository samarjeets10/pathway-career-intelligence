
const resume = `ARJUN MEHTA
Full-Stack AI Engineer
Bengaluru, India
+91 63534 47373
arjun.mehta@email.com
GitHub: github.com/arjunmehta
LinkedIn: linkedin.com/in/arjunmehta
Portfolio: arjunmehta.dev

SUMMARY
Full-Stack AI Engineer experienced in building production-oriented web applications
and AI-powered systems using React, Node.js, Python, FastAPI, MongoDB, PostgreSQL,
and LLM APIs. Built document-processing, retrieval, and intelligent automation
pipelines with a focus on scalable backend architecture, API design, data processing,
and reliable AI integration.

TECHNICAL SKILLS
Languages: JavaScript (ES6+), Python, SQL, C++
Frontend: React.js, HTML5, CSS3, Tailwind CSS, Redux Toolkit, TanStack Query
Backend: Node.js, Express.js, FastAPI, REST APIs, JWT, OAuth 2.0
AI/ML: LLM APIs, RAG, Embeddings, Vector Search, Prompt Engineering, NLP, Document Processing, AI Agents
Databases: MongoDB, PostgreSQL, Redis
AI/ML Tools: LangChain, LlamaIndex, Hugging Face, OpenAI API, Gemini API
DevOps & Tools: Git, GitHub, Docker, GitHub Actions, Postman, Linux
Cloud: AWS, Vercel, Render

PROJECTS

AIRecruit — AI-Powered Interview Intelligence Platform
React.js, Node.js, Express.js, MongoDB, Python, FastAPI, Gemini API, Docker
• Built a full-stack AI recruitment platform that analyzes resumes and job
  descriptions to generate personalized technical and behavioral interview questions.
• Designed a document-processing pipeline for extracting structured candidate
  information from PDF resumes and transforming unstructured data into
  machine-readable profiles.
• Implemented semantic matching between candidate skills and job requirements
  using embeddings and vector similarity search.
• Developed an AI evaluation engine that analyzes candidate responses and generates
  structured feedback across technical accuracy, communication, and relevance.
• Designed REST APIs with JWT authentication, role-based authorization, validation,
  centralized error handling, and modular backend architecture.
• Containerized backend services with Docker and implemented automated CI checks
  using GitHub Actions.

KnowledgeHub — Enterprise RAG Knowledge Assistant
React.js, FastAPI, PostgreSQL, pgvector, Python, OpenAI API, Docker
• Developed a retrieval-augmented generation system that enables users to query
  internal documents using natural language.
• Built an ingestion pipeline for PDF and text documents including parsing,
  chunking, metadata extraction, embedding generation, and vector storage.
• Implemented semantic retrieval using pgvector and configurable top-k similarity
  search to provide relevant context to the LLM.
• Added source-aware responses allowing users to trace generated answers back to
  the documents used as context.
• Designed asynchronous document-processing workflows to prevent long-running
  AI operations from blocking API requests.

FleetOps — Multi-Tenant SaaS Management Platform
React.js, Node.js, Express.js, MongoDB, Redux Toolkit, TanStack Query, JWT
• Built a production-oriented multi-tenant SaaS platform for managing organizations,
  projects, tasks, and team collaboration.
• Implemented organization-level data isolation using tenant-aware authorization
  and organization-scoped database queries.
• Designed RBAC with Owner, Admin, and Member roles and enforced permissions at
  the backend API layer.
• Developed RESTful CRUD APIs with Mongoose, request validation, centralized
  error handling, structured logging, rate limiting, and graceful shutdown.
• Used TanStack Query for server-state management and Redux Toolkit for client-side
  UI state.

EXPERIENCE
AI Engineering Intern — NeuralStack Labs
May 2026 - Aug 2026 Remote
• Developed REST APIs and backend services for AI-powered document-processing
  workflows using Python, FastAPI, and PostgreSQL.
• Integrated LLM APIs into production workflows for document summarization,
  classification, and structured information extraction.
• Improved document-processing throughput by optimizing asynchronous processing
  and reducing redundant LLM requests.
• Built React interfaces for reviewing AI-generated outputs and correcting
  extracted information.
• Collaborated with engineers to debug API failures, improve validation, and
  integrate AI services into existing backend systems.

EDUCATION
B.Tech in Computer Science and Engineering
XYZ Institute of Technology, Bengaluru
2022 2026 CGPA: 8.7/10

Relevant Coursework:
Data Structures & Algorithms, Database Management Systems, Operating Systems,
Computer Networks, Machine Learning, Artificial Intelligence

CERTIFICATIONS
• Google Cloud — Generative AI Fundamentals
• DeepLearning.AI — Building Systems with the ChatGPT API
• freeCodeCamp — JavaScript Algorithms and Data Structures

ACHIEVEMENTS
• Developed and deployed 3 full-stack applications integrating production APIs
  and AI services.

• Solved 300+ Data Structures and Algorithms problems across LeetCode and CodeChef.

• Open-source contributor with 10+ merged pull requests across developer tools
  and web applications.


ADDITIONAL

Interests: Generative AI, Backend Architecture, Distributed Systems, Developer Tools
Languages: English, Hindi
`;


const selfDescription = `I am a Computer Science student with hands-on experience building full-stack web applications and integrating AI capabilities into practical projects. I work with React, Node.js, Express, MongoDB, and Python, and have experience developing REST APIs, authentication systems, document-processing workflows, and LLM-based features. I have built projects involving resume analysis, AI-generated interview preparation, and multi-tenant SaaS functionality, while focusing on clean architecture, reliable APIs, and maintainable code.
`;


const jobDescription = `Full-Stack AI Engineer

We are looking for a Full-Stack AI Engineer to build and integrate AI-powered features into modern web applications. The role involves developing frontend interfaces, backend APIs, data-processing pipelines, and LLM-based workflows in collaboration with product and engineering teams.

Responsibilities:
• Develop responsive web applications using React.js and modern JavaScript.
• Build and maintain REST APIs and backend services using Node.js, Express.js, or Python.
• Design and work with MongoDB and PostgreSQL databases.
• Integrate LLM APIs for document analysis, summarization, classification, and content generation.
• Build AI workflows using embeddings, vector databases, and retrieval-augmented generation (RAG).
• Develop document-processing pipelines for extracting and transforming unstructured data.
• Implement authentication, authorization, input validation, and secure API practices.
• Debug, test, and optimize application performance across frontend and backend services.
• Collaborate with engineers and product teams to design, implement, and deploy new features.

Requirements:
• Strong understanding of JavaScript and React.js.
• Experience with Node.js, Express.js, or Python/FastAPI.
• Familiarity with MongoDB or PostgreSQL.
• Practical experience integrating LLM APIs and building AI-powered features.
• Understanding of REST APIs, Git, Docker, and basic cloud deployment.
• Knowledge of RAG, embeddings, or vector search is a plus.
`;


module.exports = { resume, selfDescription, jobDescription };