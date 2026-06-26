"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  { value: "80%", label: "Practical Training", icon: "fa-flask", accent: true },
  { value: "20%", label: "Theory", icon: "fa-book-open", accent: false },
  { value: "100%", label: "Career Ready", icon: "fa-briefcase", accent: true },
  { value: "24h", label: "Response Time", icon: "fa-headset", accent: false },
];

export default function HeroStats() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="section-padding hero-stats-section">
      <div className="container hero-stats-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "48px", alignItems: "center" }}>
        <div className="slideUp" data-delay=".3">
          <p className="section-title-sub">Aspiration Cleantech Academy</p>
          <h2 className="section-title-main">
            Build Real Skills. Launch Your <span style={{ color: "var(--academy-primary)" }}>Career.</span>
          </h2>
          <p className="muted slideUp" data-delay=".5" style={{ fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "520px", marginBottom: "24px" }}>
            Industry-designed programs with 80% hands-on practical training. Join thousands of graduates working at top companies across India.
          </p>
          <a href="/register" className="btn slideUp" data-delay=".6">Register Now</a>
        </div>

        <div ref={ref} className="slideUp hero-stats-cards" data-delay=".5" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {stats.map((stat) => (
            <div key={stat.label} className={`stat-card ${stat.accent ? "stat-card-accent" : ""}`}>
              <i className={`fa-solid ${stat.icon}`}></i>
              <h3>
                {inView ? <CountUp end={parseInt(stat.value)} duration={2.5} /> : 0}
                {stat.value.replace(/[0-9]/g, "")}
              </h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
