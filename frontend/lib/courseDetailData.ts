export interface CourseDetail {
  slug: string;
  title: string;
  image: string;
  intro: string;
  duration: string;
}

export const courseDetails: CourseDetail[] = [
  {
    slug: "hvac",
    title: "HVAC Training Program",
    image: "/img/service/hvac.jpg",
    intro: "Industry Oriented Training with Hands-on Practical Exposure and Skill Development. Build Your Skills & Career in HVAC, Chillers, Refrigeration systems with Us.",
    duration: "3 Months (12 Weeks)",
  },
  {
    slug: "entrepreneurship",
    title: "Entrepreneurship Training Program",
    image: "/img/academy/entrepreneur.jpg",
    intro: "Learn to build, launch, and scale your own business with practical entrepreneurship training and mentorship.",
    duration: "2 Months (8 Weeks)",
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing Training Program",
    image: "/img/academy/digitalmarketing.jpg",
    intro: "Master SEO, social media, content marketing, and paid advertising to drive business growth in the digital age.",
    duration: "2.5 Months (10 Weeks)",
  },
  {
    slug: "sales",
    title: "Sales Executive Training Program",
    image: "/img/academy/sales-executive.webp",
    intro: "Develop professional selling skills, customer relationship management, and sales techniques for career success.",
    duration: "6 Weeks",
  },
  {
    slug: "business-development",
    title: "Business Development Training Program",
    image: "/img/academy/business-development.webp",
    intro: "Learn strategic business growth, client acquisition, partnership building, and market expansion techniques.",
    duration: "2 Months (8 Weeks)",
  },
];

export const programFor: string[] = [
  "Engineering Students & Graduates",
  "Diploma Holders",
  "ITI students",
  "Any interested candidate looking to upskill",
];

export const whatYouGet: string[] = [
  "Expert led practical & hands-on training",
  "Official Course Completion Certificate",
  "Career Guidance & Industry Exposure",
  "Placement Support for top performers",
];

export const careerOpportunities: string[] = [
  "Gain in depth practical knowledge and operational confidence",
  "Get placed as Project Engineer, Service Engineer, or Executive",
  "Work across commercial, industrial, and manufacturing sectors",
  "Start your own service or consultancy startup",
  "Earn continuously through installation, maintenance, and growth contracts",
];
