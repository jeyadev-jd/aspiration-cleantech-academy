import Link from "next/link";
import { courseDetails } from "@/lib/courseDetailData";

export default function CourseSidebar({ currentSlug }: { currentSlug: string }) {
  return (
    <div>
      <div className="card" style={{ marginBottom: "20px" }}>
        <h3 style={{ marginTop: 0, marginBottom: "16px", fontSize: "1.1rem" }}>All Programs</h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {courseDetails.filter((c) => c.slug !== "business-development").map((c) => {
            const isActive = c.slug === currentSlug;
            return (
              <li
                key={c.slug}
                style={{
                  borderBottom: "1px solid var(--academy-bg-alt)",
                }}
              >
                <Link
                  href={`/${c.slug}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 0",
                    fontWeight: isActive ? 700 : 500,
                    fontSize: "0.95rem",
                    color: isActive ? "var(--academy-primary)" : "var(--academy-text)",
                  }}
                >
                  <span>{c.title.replace(" Training Program", "")}</span>
                  <i
                    className="fa-solid fa-arrow-right-long"
                    style={{ fontSize: "0.85rem", flexShrink: 0, color: isActive ? "var(--academy-primary)" : "var(--academy-text-muted)" }}
                  ></i>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
