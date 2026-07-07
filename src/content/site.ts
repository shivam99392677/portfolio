import type { SiteContent } from "./types";

export const site: SiteContent = {
  name: "Shivam Kumar",
  role: "Software Engineering Intern & AI Developer",
  navLinks: [
    { label: "Work", href: "/#selected-work", matches: "selected-work" },
    { label: "About", href: "/about", matches: "/about" },
    { label: "Contact", href: "/contact", matches: "/contact" },
  ],
  heroHeadline: "I build intelligent products and scalable web experiences.",
  heroSubline:
    "B.Tech student at IIT Patna working across full-stack engineering and applied AI, with a competitive programmer's habit of not shipping until it's actually correct.",
  introParagraph:
    "I'm an Electrical and Electronics Engineering student at IIT Patna focused on software engineering, AI, and full-stack development. I like building products that solve real problems — from AI-powered financial tools to production web apps — and spend the rest of my time on data structures, algorithms, and competitive programming. I care about clean, scalable code and interfaces that feel considered.",
  processStatement:
    "I move from problem to working prototype fast, then spend the real time on the details that make software feel solid.",
  processSteps: [
    { title: "Understand", detail: "Start from the real problem and constraints, not the feature list." },
    { title: "Build", detail: "Ship a working version quickly with the right tools for the job — React, FastAPI, Firebase, whatever fits." },
    { title: "Engineer", detail: "Harden the parts that matter: data models, APIs, edge cases, performance." },
    { title: "Refine", detail: "Polish the interface and interactions until the product feels finished, not just functional." },
  ],
  contactStatement: "Have a project, internship, or idea in mind? Let's talk.",
  aboutBio:
    "I'm Shivam, a B.Tech student in Electrical and Electronics Engineering at IIT Patna (CPI 8.22), currently working as a Software Engineering Intern at NayaTransit. I moved into EEE from Civil Engineering based on academic performance, and somewhere along the way found I cared more about building software than anything else on the syllabus.\n\nMy work spans full-stack web development and applied AI — production frontend work, schema reviews, and the React/Supabase ecosystem at NayaTransit; AI-powered products like Pocket Bot, a financial wellness platform that placed among the Top 30 teams out of 70,000+ participants in Amazon HackOn Season 6.0; and the official Anwesha IIT Patna fest website, built with Next.js and Firebase.\n\nOutside of building products, I compete on LeetCode (1750+ rating, 400+ problems solved, global rank 1650 in Weekly Contest 504) and hold a Marvell Semiconductor MStem Scholarship. I try to bring the same rigor from competitive programming into the software I ship — sound architecture, clean data structures, and no shortcuts on correctness.",
  email: "shivamkumarbaletha@gmail.com",
  phone: "+91-9939267750",
  socialLinks: [
    { label: "GitHub", href: "https://github.com/shivam99392677" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/shivam-kumar03" },
    { label: "LeetCode", href: "https://leetcode.com/u/Sigma_Boy/" },
  ],
  resumeUrl: "/resume/Shivam-Kumar-Resume.pdf",
  footerClosingStatement: "Let's build something worth talking about.",
  copyrightLine: `© ${new Date().getFullYear()} Shivam Kumar`,
  creditLine: "Designed & built by Shivam Kumar",
};
