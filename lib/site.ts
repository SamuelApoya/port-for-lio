export const SITE = {
  name: "Samuel Apoya",
  email: "samuel14@umbc.edu",
  github: "https://github.com/SamuelApoya",
  linkedin: "https://www.linkedin.com/in/samuel-apoya/",
  resume: "/resume.pdf",
  photo: "/me.jpg",
};

export const ABOUT = [
  "I'm a PhD student in Computer Science at the University of Maryland, Baltimore County, where I work on machine learning systems: making AI models efficient, scalable, and capable across modalities. I'm especially interested in how models run in practice, from inference cost and latency to deployment.",
  "I earned my B.A. in Computer Science at Colby College, where I did applied ML research on coastal infrastructure with Bigelow Laboratory for Ocean Sciences.",
  "I'm also the founder of RiskLens, an AI-powered platform for portfolio risk analysis. Building it taught me how research ideas hold up once real users and real data are involved.",
];

export const STATS = [
  { to: 3, suffix: "", label: "Research groups" },
  { to: 1, suffix: "", label: "Startup founded" },
  { to: 2, suffix: "+", label: "Years building" },
];

// Placeholder entries: edit freely.
export const RESEARCH = [
  {
    title: "ML Systems & Efficient Inference",
    venue: "UMBC",
    summary: "Employing methods such as quantization to improve LLMs inference.",
    tags: ["ML systems", "Inference", "Efficiency"],
  },
  {
    title: "Coastal Infrastructure ML",
    venue: "Bigelow Laboratory for Ocean Sciences",
    summary: "finding a way to make the environment cleaner through promotion of seaweed farming.",
    tags: ["Applied ML", "Environmental data"],
  },
  {
    title: "Countermapping",
    venue: "MISFIT LAB, UMBC",
    summary: "Reimagining place through mapping.",
    tags: ["Multimodal", "Scalable AI"],
  },
];


export const EXPERIENCE = [
  {
    role: "Software Engineering Intern",
    company: "Davis Institute for AI",
    dates: "October 2024 – May 2025",
    location: "Waterville, ME",
    bullets: [
      "Improved the institute's chatbot responses through RAG.",
      "Researched on new AI innovations.",
    ],
    tags: ["Python", "PyTorch"],
  },
  {
    role: "Teaching Assistant",
    company: "University of Maryland, Baltimore County",
    dates: "August 2026 – Present",
    location: "Baltimore, MD",
    bullets: ["Hold office hours to help students debug class projects."],
    tags: ["Programming languages", "Syntax Analysis"],
  },
];