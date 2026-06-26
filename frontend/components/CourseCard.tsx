import Link from "next/link";
import { StaticCourse } from "@/lib/staticCourses";

export default function CourseCard({ course }: { course: StaticCourse }) {
  return (
    <Link
      href={`/${course.id}`}
      className="card course-catalog-card-hover"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 0,
        overflow: "hidden",
        borderTop: "4px solid var(--academy-primary)",
      }}
    >
      <div style={{ height: "180px", overflow: "hidden" }}>
        <img
          src={course.image}
          alt={course.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
      <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div
          className="icon-circle"
          style={{ marginBottom: "16px", borderRadius: "12px" }}
        >
          <i className={`fa-solid ${course.icon}`}></i>
        </div>
        <h3 style={{ marginBottom: "8px" }}>{course.name}</h3>
        <p className="muted" style={{ margin: 0, flex: 1 }}>{course.desc}</p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "20px",
            paddingTop: "16px",
            borderTop: "1px solid var(--academy-bg-alt)",
          }}
        >
          <span className="tag">{course.category}</span>
          <span style={{ color: "var(--academy-primary)", fontWeight: 700, fontSize: "0.9rem" }}>
            View Details <i className="fa-solid fa-arrow-right" style={{ fontSize: "0.75rem", marginLeft: "4px" }}></i>
          </span>
        </div>
      </div>
    </Link>
  );
}
