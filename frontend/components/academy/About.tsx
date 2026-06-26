import Reveal from "@/components/Reveal";

const highlights = [
  { icon: "fa-screwdriver-wrench", label: "80% Practical, 20% Theory", desc: "Industry immersion from day one." },
  { icon: "fa-bullseye", label: "Market-Aligned Courses", desc: "Designed around current hiring trends." },
  { icon: "fa-star", label: "Expert Mentors", desc: "Professionals with 10+ years experience." },
];

export default function About() {
  return (
    <section className="section-padding section-alt">
      <div className="container hero-stats-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "48px", alignItems: "end" }}>
        <div style={{ position: "relative" }}>
          <div style={{ height: "380px", borderRadius: "16px", overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/academy/students.jpeg" alt="Aspiration Cleantech Academy students" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "20px",
              background: "#fff",
              borderLeft: "4px solid var(--academy-primary)",
              borderRadius: "8px",
              padding: "12px 16px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <i className="fa-solid fa-users" style={{ color: "var(--academy-primary)" }}></i>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.92rem" }}>Industry Experts</div>
              <div style={{ color: "var(--academy-text-muted)", fontSize: "0.78rem" }}>Designed Curriculum</div>
            </div>
          </div>
        </div>

        <div>
          <p className="section-title-sub">About the Academy</p>
          <h2 className="section-title-main">
            Bridging Education & <span style={{ color: "var(--academy-primary)" }}>Employment</span>
          </h2>
          <p className="muted" style={{ lineHeight: 1.8, fontSize: "1.02rem", marginBottom: "24px" }}>
            Aspiration Cleantech Academy is a skill development institute dedicated to empowering students, freshers, and career switchers with practical, industry-relevant training. We bridge the gap between education and employment, ensuring every graduate is job-ready from day one.
          </p>
          {highlights.map((h, i) => (
            <Reveal key={h.label} delay={i * 0.1}>
              <div className="highlight-row">
                <div className="icon-circle">
                  <i className={`fa-solid ${h.icon}`}></i>
                </div>
                <div>
                  <div style={{ fontWeight: 700 }}>{h.label}</div>
                  <div className="muted" style={{ fontSize: "0.9rem" }}>{h.desc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
