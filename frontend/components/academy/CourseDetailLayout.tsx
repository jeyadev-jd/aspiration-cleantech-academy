import Link from "next/link";
import CourseSidebar from "@/components/academy/CourseSidebar";
import { programFor, whatYouGet, careerOpportunities, type CourseDetail } from "@/lib/courseDetailData";

export default function CourseDetailLayout({ detail }: { detail: CourseDetail }) {
  return (
    <section className="section-padding">
      <div className="container hero-stats-grid" style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "40px" }}>
        <CourseSidebar currentSlug={detail.slug} />

        <div>
          <div style={{ borderRadius: "16px", overflow: "hidden", marginBottom: "32px", height: "420px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={detail.image}
              alt={detail.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "12px" }}>{detail.title}</h1>
          <p className="muted" style={{ fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "32px" }}>{detail.intro}</p>

          <div className="card" style={{ borderLeft: "4px solid var(--academy-primary)", marginBottom: "32px" }}>
            <h4 style={{ color: "var(--academy-primary)", margin: "0 0 8px" }}>Schedule & Fees</h4>
            <p className="muted" style={{ margin: 0 }}>
              Batch timings and fee details are shared directly by our team after you register.
            </p>
          </div>

          {detail.slug === "hvac" && (
            <p className="muted" style={{ marginBottom: "32px", fontSize: "0.95rem" }}>
              Our HVAC training is shaped by the real industrial heat-pump engineering work of our parent company,
              Aspiration Cleantech Ventures.{" "}
              <a href="https://aspcv.com/heat-pumps/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--academy-primary)", fontWeight: 600 }}>
                See our heat-pump engineering work
              </a>
              .
            </p>
          )}

          <h3 style={{ marginBottom: "16px" }}>Who Is This For?</h3>
          <ul style={{ listStyle: "none", padding: 0, marginBottom: "32px" }}>
            {programFor.map((item) => (
              <li key={item} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <i className="fa-solid fa-circle-check" style={{ color: "var(--academy-primary)" }}></i>
                {item}
              </li>
            ))}
          </ul>

          <h3 style={{ marginBottom: "16px" }}>What You Will Gain</h3>
          <ul style={{ listStyle: "none", padding: 0, marginBottom: "32px" }}>
            {whatYouGet.map((item) => (
              <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "10px" }}>
                <i className="fa-solid fa-star" style={{ color: "var(--academy-gold)", marginTop: "4px" }}></i>
                {item}
              </li>
            ))}
          </ul>

          <div className="card" style={{ background: "var(--academy-dark)", color: "#fff" }}>
            <h3 style={{ color: "#fff", marginTop: 0, marginBottom: "16px" }}>Career Opportunities</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {careerOpportunities.map((opp) => (
                <li key={opp} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "12px", color: "var(--academy-text-muted-on-dark)" }}>
                  <i className="fa-solid fa-briefcase" style={{ color: "var(--academy-gold)", marginTop: "4px" }}></i>
                  {opp}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="card"
            style={{ background: "var(--academy-primary)", color: "#fff", textAlign: "center", padding: "28px 24px", marginTop: "32px" }}
          >
            <h4 style={{ color: "#fff", marginTop: 0, marginBottom: "10px", fontSize: "1.15rem" }}>Need Help?</h4>
            <p style={{ color: "var(--academy-text-muted-on-dark)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "20px" }}>
              Speak with our academy advisors for career counseling.
            </p>
            <a
              href="tel:+919677763170"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                background: "rgba(0,0,0,0.18)",
                borderRadius: "10px",
                padding: "14px 16px",
                color: "#fff",
                textDecoration: "none",
              }}
            >
              <i className="fa-solid fa-phone" style={{ fontSize: "1.1rem" }}></i>
              <strong style={{ fontSize: "1rem" }}>+91 96777 63170</strong>
            </a>
          </div>

          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <Link href={`/register?course=${detail.slug}`} className="btn">
              Apply For Training&nbsp;<i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
