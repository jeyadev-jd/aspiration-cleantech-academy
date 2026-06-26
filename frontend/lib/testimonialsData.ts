export interface Testimonial {
  id: number;
  stars: number;
  content: string;
  author: string;
  position: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    stars: 5,
    content: "The HVAC program gave me real hands-on experience I couldn't get anywhere else. I was placed within a month of finishing.",
    author: "Arun Kumar",
    position: "HVAC Technician",
  },
  {
    id: 2,
    stars: 5,
    content: "Aspiration Cleantech Academy's digital marketing course completely changed my career path. The mentors were always available.",
    author: "Priya Sharma",
    position: "Digital Marketing Executive",
  },
  {
    id: 3,
    stars: 5,
    content: "I started with zero business knowledge. The entrepreneurship program gave me the confidence and plan to launch my own venture.",
    author: "Rahul Verma",
    position: "Startup Founder",
  },
  {
    id: 4,
    stars: 4,
    content: "Practical, no-nonsense sales training. The role-plays prepared me for real client conversations from day one.",
    author: "Sneha Reddy",
    position: "Sales Executive",
  },
  {
    id: 5,
    stars: 5,
    content: "The business development course connected theory with real case studies. I landed a BD role within weeks of graduating.",
    author: "Vikram Singh",
    position: "Business Development Executive",
  },
  {
    id: 6,
    stars: 5,
    content: "Affordable, well-structured, and genuinely focused on getting you job-ready. Highly recommend this academy.",
    author: "Anjali Nair",
    position: "Academy Graduate",
  },
];
