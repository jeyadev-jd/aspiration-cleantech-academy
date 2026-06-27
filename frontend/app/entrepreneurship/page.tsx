import type { Metadata } from "next";
import CourseDetailLayout from "@/components/academy/CourseDetailLayout";
import { courseDetails } from "@/lib/courseDetailData";

export const metadata: Metadata = {
  title: "Entrepreneurship Training Program",
  description: "Learn to build, launch, and scale your own business with practical entrepreneurship training and mentorship.",
};

export default function EntrepreneurshipPage() {
  const detail = courseDetails.find((c) => c.slug === "entrepreneurship")!;
  return <CourseDetailLayout detail={detail} />;
}
