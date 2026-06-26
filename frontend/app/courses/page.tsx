"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CourseCard from "@/components/CourseCard";
import { staticCourses } from "@/lib/staticCourses";

function CoursesContent() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "";
  const categories = Array.from(new Set(staticCourses.map((c) => c.category)));
  const filtered = activeCategory
    ? staticCourses.filter((c) => c.category === activeCategory)
    : staticCourses;

  return (
    <main className="container section">
      <div style={{ textAlign: "center", marginBottom: "8px" }}>
        <p className="muted" style={{ maxWidth: "640px", margin: "0 auto" }}>
          Four career-focused programs. One practical training philosophy. Explore what fits your goals.
        </p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "20px", marginBottom: "32px" }}>
        <h1 className="section-title-main" style={{ margin: 0 }}>Explore Our Courses</h1>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a href="/courses" className="tag" style={{ opacity: activeCategory ? 0.6 : 1 }}>
            All
          </a>
          {categories.map((category) => (
            <a
              key={category}
              href={`/courses?category=${encodeURIComponent(category)}`}
              className="tag"
              style={{ opacity: activeCategory === category ? 1 : 0.6 }}
            >
              {category}
            </a>
          ))}
        </div>
      </div>

      <div className="grid grid-3">
        {filtered.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </main>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={null}>
      <CoursesContent />
    </Suspense>
  );
}
