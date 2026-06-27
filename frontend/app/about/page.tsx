import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Aspiration Cleantech Academy is the training initiative of Aspiration Cleantech Ventures, an industrial cleantech company known for advanced heat-pump and sustainable energy solutions.",
};

export default function AboutPage() {
  return (
    <main>
      <section
        className="section-padding on-dark"
        style={{
          position: "relative",
          backgroundImage: "linear-gradient(rgba(26,13,46,0.78), rgba(26,13,46,0.78)), url('/img/academy/Mentor.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "320px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container" style={{ maxWidth: "760px" }}>
          <p style={{ color: "var(--academy-gold)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>
            About Us
          </p>
          <h1 style={{ fontSize: "2.2rem", fontWeight: 800, margin: 0 }}>
            About Aspiration Cleantech Academy
          </h1>
          <p style={{ maxWidth: "600px", color: "var(--academy-text-muted-on-dark)", lineHeight: 1.8, marginTop: "16px" }}>
            Aspiration Cleantech Academy exists to give students, fresh graduates, diploma holders, and ITI learners
            a practical path into real careers, starting with HVAC and extending into entrepreneurship, digital
            marketing, and sales.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div
          className="container hero-stats-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "48px", alignItems: "center" }}
        >
          <div style={{ borderRadius: "16px", overflow: "hidden", height: "340px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/academy/students.jpeg"
              alt="Aspiration Cleantech Academy students training"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
          <div>
            <h2 className="section-title-main" style={{ fontSize: "1.6rem", marginBottom: "16px" }}>
              Our Mission
            </h2>
            <p className="muted" style={{ fontSize: "1.02rem", lineHeight: 1.8 }}>
              We believe training should prepare people for actual work, not just exams. Every program we run is
              built around hands-on, job-relevant skills.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding section-alt">
        <div
          className="container hero-stats-grid"
          style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "48px", alignItems: "center" }}
        >
          <div>
            <h2 className="section-title-main" style={{ fontSize: "1.6rem", marginBottom: "16px" }}>
              Part of Aspiration Cleantech Ventures
            </h2>
            <p className="muted" style={{ fontSize: "1.02rem", lineHeight: 1.8, marginBottom: "20px" }}>
              Aspiration Cleantech Academy is the training initiative of Aspiration Cleantech Ventures, an industrial
              clean-technology company focused on advanced sustainable solutions and energy efficiency, including
              work in industrial process heating and high-efficiency heat pumps. That real engineering grounding
              directly informs our HVAC training approach.
            </p>
            <a
              href="https://aspcv.com/about-us/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--academy-primary)", fontWeight: 600 }}
            >
              Learn more about Aspiration Cleantech Ventures →
            </a>
          </div>
          <div style={{ borderRadius: "16px", overflow: "hidden", height: "320px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/service/hvac.jpg"
              alt="HVAC industrial training at Aspiration Cleantech Academy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container" style={{ maxWidth: "760px", textAlign: "center" }}>
          <h2 className="section-title-main" style={{ fontSize: "1.6rem", marginBottom: "16px" }}>
            Who We Train
          </h2>
          <p className="muted" style={{ fontSize: "1.02rem", lineHeight: 1.8, marginBottom: "32px" }}>
            Students, fresh graduates, diploma holders, ITI learners, and early-career aspirants looking to build
            real, practical skills for the job market.
          </p>
          <Link href="/courses" className="btn">
            Explore Our Courses
          </Link>
        </div>
      </section>
    </main>
  );
}
