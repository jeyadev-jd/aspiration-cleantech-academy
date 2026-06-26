"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const bullets = [
  "Industry Certification that employers recognize and trust.",
  "Regular placement drives with hiring partners.",
  "Dedicated career guidance and resume support.",
];

const stats = [
  { value: "90%", label: "Career advancement within 6 months", icon: "fa-rocket" },
  { value: "500+", label: "Students placed since inception", icon: "fa-users" },
  { value: "50+", label: "Hiring partner companies", icon: "fa-building" },
  { value: "10+", label: "Years of training expertise", icon: "fa-book-open" },
];

export default function CareerOpportunities() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="section-padding section-dark">
      <div className="container hero-stats-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "48px", alignItems: "center" }}>
        <div>
          <p className="section-title-sub">Placements</p>
          <h2 className="section-title-main">Career Opportunities</h2>
          <p className="muted" style={{ lineHeight: 1.8, fontSize: "1.02rem", margin: "16px 0 24px" }}>
            Our graduates are working at leading companies across industries. Your career transformation starts here.
          </p>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
            {bullets.map((b) => (
              <li key={b} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <i className="fa-solid fa-circle-check" style={{ color: "var(--academy-gold)" }}></i>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <a href="/register" className="btn" style={{ marginTop: "20px", display: "inline-block" }}>Start Your Journey</a>
        </div>

        <div ref={ref} className="hero-stats-cards" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card stat-card-dark">
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
