import type { Metadata } from "next";
import CourseDetailLayout from "@/components/academy/CourseDetailLayout";
import { courseDetails } from "@/lib/courseDetailData";

export const metadata: Metadata = {
  title: "Sales Executive Training Program",
  description: "Develop professional selling skills, customer relationship management, and sales techniques.",
};

export default function SalesPage() {
  const detail = courseDetails.find((c) => c.slug === "sales")!;
  return <CourseDetailLayout detail={detail} />;
}
