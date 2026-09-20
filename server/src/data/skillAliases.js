
const SKILL_ALIASES = {
    javascript: [
    "javascript",
    "js",
    "ecmascript",
    "es6",
    "es2015",
    "es2020",
    "es2021",
    "es2022",
    "vanillajs",
    "vanilla js"
  ],

  typescript: ["typescript", "ts"],
  python: ["python", "py", "python3"],
  cpp: ["c++", "cpp", "c plus plus"],
  csharp: ["c#", "csharp", "c sharp", "dotnet", ".net"],
  java: ["java", "jdk", "jre"],
  golang: ["golang", "go"],
  rust: ["rust", "rustlang"],
  php: ["php"],
  ruby: ["ruby"],
  html: ["html", "html5"],
  css: ["css", "css3"],

  // Frontend Libraries & Frameworks
  react: ["react", "react.js", "reactjs"],
  nextjs: ["next.js", "nextjs", "next"],
  vue: ["vue", "vue.js", "vuejs", "vue3"],
  nuxt: ["nuxt", "nuxt.js", "nuxtjs"],
  angular: ["angular", "angularjs", "angular2+"],
  svelte: ["svelte", "sveltekit"],
  "react native": ["react native", "react-native", "rn"],
  flutter: ["flutter"],

  // CSS & UI Frameworks
  "tailwind css": ["tailwind css", "tailwindcss", "tailwind"],
  bootstrap: ["bootstrap", "bootstrap4", "bootstrap5"],
  mui: ["mui", "material ui", "material-ui", "materialui"],
  "framer motion": ["framer motion", "framermotion", "framer"],
  shadcn: ["shadcn", "shadcn/ui", "shadcn ui"],
  "styled components": ["styled components", "styled-components"],
  sass: ["sass", "scss"],

  // State Management
  redux: ["redux"],
  "redux toolkit": ["redux toolkit", "redux-toolkit", "rtk"],
  zustand: ["zustand"],
  recoil: ["recoil"],
  "context api": ["context api", "react context", "react context api"],

  // Backend Frameworks
  "node.js": ["node.js", "nodejs", "node"],
  express: ["express", "express.js", "expressjs"],
  nestjs: ["nest.js", "nestjs", "nest"],
  fastapi: ["fastapi", "fast api"],
  django: ["django", "django rest framework", "drf"],
  flask: ["flask"],
  "spring boot": ["spring boot", "springboot", "spring"],

  // Databases & ORMs
  mongodb: ["mongodb", "mongo db", "mongo"],
  postgresql: ["postgresql", "postgres", "pg"],
  mysql: ["mysql"],
  sqlite: ["sqlite", "sqlite3"],
  redis: ["redis", "redis cache"],
  firebase: ["firebase", "firestore"],
  supabase: ["supabase"],
  prisma: ["prisma", "prisma orm"],
  mongoose: ["mongoose"],
  drizzle: ["drizzle", "drizzle orm"],

  // DevOps & Infrastructure
  docker: ["docker", "docker container", "dockerize", "docker-compose"],
  kubernetes: ["kubernetes", "k8s"],
  aws: ["aws", "amazon web services", "aws cloud"],
  gcp: ["gcp", "google cloud", "google cloud platform"],
  azure: ["azure", "microsoft azure"],
  "ci/cd": [
    "ci/cd",
    "cicd",
    "continuous integration",
    "github actions",
    "gitlab ci"
  ],
  terraform: ["terraform"],
  nginx: ["nginx"],
  linux: ["linux", "ubuntu", "bash", "shell scripting"],

  // APIs & Protocols
  "rest api": [
    "rest",
    "rest api",
    "restful",
    "restful api",
    "restful apis"
  ],
  graphql: ["graphql", "gql", "apollo graphql"],
  grpc: ["grpc"],
  websocket: ["websocket", "websockets", "ws", "socket.io"],
  jwt: ["jwt", "json web token", "json web tokens"],

  // Developer Tools & Testing
  git: ["git", "version control"],
  github: ["github"],
  jest: ["jest"],
  cypress: ["cypress"],
  playwright: ["playwright"],
  vite: ["vite", "vitejs"],
  webpack: ["webpack"],

  // Design
  "ui/ux": [
    "ui/ux",
    "ui ux",
    "user interface",
    "user experience",
    "product design"
  ],
  figma: ["figma", "figma design"],

  // AI & Data Science
  tensorflow: ["tensorflow", "tf"],
  pytorch: ["pytorch"],
  "scikit-learn": ["scikit-learn", "sklearn"],
  pandas: ["pandas"],
  numpy: ["numpy"],
  langchain: ["langchain"],
  llm: ["llm", "large language models", "openai", "rag"]

};


const SKILL_IMPLICATIONS = {
  nextjs: ["react", "javascript"],
  react: ["javascript"],
  typescript: ["javascript"],
  "redux toolkit": ["redux", "javascript"],
  express: ["node.js", "javascript"],
  nestjs: ["node.js", "typescript", "javascript"],
  "react native": ["react", "javascript"],
  fastapi: ["python"],
  django: ["python"],
  flask: ["python"],
  "spring boot": ["java"],
  prisma: ["postgresql"],
  mongoose: ["mongodb"],
  kubernetes: ["docker", "linux"],
  figma: ["ui/ux"]
};


const ALIAS_TO_CANONICAL = new Map();

for (const [canonicalSkill, aliases] of Object.entries(SKILL_ALIASES)) {
    for (const alias of aliases) {
        ALIAS_TO_CANONICAL.set(alias.trim().toLowerCase(), canonicalSkill);
    }
}

module.exports = {
    SKILL_ALIASES,
    ALIAS_TO_CANONICAL,
    SKILL_IMPLICATIONS
};