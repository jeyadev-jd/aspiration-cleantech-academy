import type { Metadata } from "next";
import CourseDetailLayout from "@/components/academy/CourseDetailLayout";
import { courseDetails } from "@/lib/courseDetailData";

export const metadata: Metadata = {
  title: "Business Development Training Program",
  description: "Learn strategic business growth, client acquisition, partnership building, and market expansion techniques.",
};

export default function BusinessDevelopmentPage() {
  const detail = courseDetails.find((c) => c.slug === "business-development")!;
  return <CourseDetailLayout detail={detail} />;
}
