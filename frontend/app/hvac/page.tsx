import type { Metadata } from "next";
import CourseDetailLayout from "@/components/academy/CourseDetailLayout";
import { courseDetails } from "@/lib/courseDetailData";

export const metadata: Metadata = {
  title: "Best HVAC Course in Chennai & India | Aspiration Cleantech Academy",
  description:
    "Industry-oriented HVAC training in Chennai with hands-on practical exposure and skill development. In partnership with HVACRedu Inc., training students across India for real HVAC careers.",
  keywords: [
    "best HVAC course in Chennai",
    "best HVAC course in India",
    "HVAC training institute Chennai",
    "HVAC certification India",
    "HVACRedu Inc",
  ],
};

export default function HvacPage() {
  const detail = courseDetails.find((c) => c.slug === "hvac")!;
  return <CourseDetailLayout detail={detail} />;
}
