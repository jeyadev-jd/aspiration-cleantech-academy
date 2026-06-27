import type { Metadata } from "next";
import CourseDetailLayout from "@/components/academy/CourseDetailLayout";
import { courseDetails } from "@/lib/courseDetailData";

export const metadata: Metadata = {
  title: "Digital Marketing Training Program",
  description: "Master SEO, social media, content marketing, and paid advertising to drive business growth.",
};

export default function DigitalMarketingPage() {
  const detail = courseDetails.find((c) => c.slug === "digital-marketing")!;
  return <CourseDetailLayout detail={detail} />;
}
