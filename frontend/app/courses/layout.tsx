import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses | HVAC, Entrepreneurship, Digital Marketing & Sales Training",
  description:
    "Explore career-oriented training programs at Aspiration Cleantech Academy, including HVAC Training, Entrepreneurship, Digital Marketing, and Sales Executive courses designed for hands-on, practical learning.",
};

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
