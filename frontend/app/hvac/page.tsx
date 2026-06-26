import type { Metadata } from "next";
import CourseDetailLayout from "@/components/academy/CourseDetailLayout";
import { courseDetails } from "@/lib/courseDetailData";

export const metadata: Metadata = {
  title: "HVAC Training Program | Aspiration Cleantech Academy",
  description: "Industry-oriented HVAC training with hands-on practical exposure and skill development.",
};

export default function HvacPage() {
  const detail = courseDetails.find((c) => c.slug === "hvac")!;
  return <CourseDetailLayout detail={detail} />;
}
