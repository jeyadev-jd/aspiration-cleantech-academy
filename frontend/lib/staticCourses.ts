export interface StaticCourse {
  id: string;
  name: string;
  category: string;
  desc: string;
  icon: string;
  image: string;
}

export const staticCourses: StaticCourse[] = [
  {
    id: "hvac",
    name: "HVAC",
    category: "Technical",
    desc: "Master heating, ventilation, and air conditioning systems with hands-on practical training and industry-ready skills.",
    icon: "fa-fan",
    image: "/img/service/hvac.jpg",
  },
  {
    id: "entrepreneurship",
    name: "Entrepreneurship",
    category: "Business",
    desc: "Learn to build, launch, and scale your own business with practical entrepreneurship training and mentorship.",
    icon: "fa-lightbulb",
    image: "/img/academy/entrepreneur.jpg",
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    category: "Marketing",
    desc: "Master SEO, social media, content marketing, and paid advertising to drive business growth in the digital age.",
    icon: "fa-bullseye",
    image: "/img/academy/digitalmarketing.jpg",
  },
  {
    id: "sales",
    name: "Sales Executive",
    category: "Sales",
    desc: "Develop professional selling skills, customer relationship management, and sales techniques for career success.",
    icon: "fa-chart-line",
    image: "/img/academy/sales-executive.webp",
  },
];
