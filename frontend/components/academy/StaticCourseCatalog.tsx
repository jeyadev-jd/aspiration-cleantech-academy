import Link from "next/link";
import Reveal from "@/components/Reveal";
import { staticCourses } from "@/lib/staticCourses";

export default function StaticCourseCatalog() {
  return (
    <section id="courses" className="section-padding section-alt">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <p className="section-title-sub">Course Catalog</p>
          <h2 className="section-title-main">Explore Our Programs</h2>
          <p className="muted" style={{ maxWidth: "600px", margin: "0 auto" }}>
            Industry-designed programs that give you practical skills and real career opportunities.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {staticCourses.map((course, i) => (
            <Reveal key={course.id} delay={(i % 4) * 0.08}>
              <div
                className="card course-catalog-card course-catalog-card-hover"
                style={{
                  display: "grid",
                  gridTemplateColumns: "260px 1fr",
                  gap: 0,
                  overflow: "hidden",
                  padding: 0,
                  border: course.id === "hvac" ? "2px solid var(--academy-primary)" : "2px solid transparent",
                  boxShadow: "0 4px 20px rgba(81, 24, 164, 0.08)",
                }}
              >
                <div style={{ position: "relative", minHeight: "220px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={course.image} alt={course.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  {course.id === "hvac" && (
                    <span
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        background: "var(--academy-gold)",
                        color: "#1a0d2e",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        padding: "6px 12px",
                        borderRadius: "999px",
                      }}
                    >
                      Flagship Program
                    </span>
                  )}
                </div>
                <div style={{ padding: "28px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <span
                      className="tag"
                      style={{
                        marginBottom: "10px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        background: "rgba(81, 24, 164, 0.1)",
                        color: "var(--academy-primary)",
                        fontWeight: 600,
                      }}
                    >
                      <i className={`fa-solid ${course.icon}`}></i>
                      {course.name}
                    </span>
                    <h3 style={{ margin: "0 0 8px", fontSize: "1.3rem" }}>{course.name} Training Program</h3>
                    <p className="muted" style={{ margin: 0, lineHeight: 1.6 }}>{course.desc}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "20px", flexWrap: "wrap", gap: "12px" }}>
                    <span style={{ color: "var(--academy-text-muted)", fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                      {course.category}
                    </span>
                    <Link href={`/${course.id}`} className="btn">
                      More Details <i className="fa-solid fa-arrow-right" style={{ fontSize: "0.8rem", marginLeft: "6px" }}></i>
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
