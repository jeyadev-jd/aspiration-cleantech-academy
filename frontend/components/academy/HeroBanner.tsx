export default function HeroBanner() {
  return (
    <section
      className="section-padding on-dark"
      style={{
        position: "relative",
        backgroundImage: "linear-gradient(rgba(26,13,46,0.75), rgba(26,13,46,0.75)), url('/img/academy/Mentor.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "440px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="container">
        <p style={{ color: "var(--academy-gold)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>
          Welcome to Aspiration Cleantech Academy
        </p>
        <h1 style={{ fontSize: "2.4rem", fontWeight: 800, maxWidth: "640px", margin: "0 0 16px" }}>
          Chennai&apos;s Best HVAC Training, Now Pan India
        </h1>
        <p style={{ maxWidth: "560px", color: "var(--academy-text-muted-on-dark)", lineHeight: 1.7, marginBottom: "28px" }}>
          Aspiration Cleantech Academy trains students, fresh graduates, diploma holders, and ITI learners across
          India for real, in-demand careers, starting with industry-grade HVAC training delivered in partnership
          with HVACRedu Inc. Backed by the engineering experience of Aspiration Cleantech Ventures.
        </p>
        <a href="#courses" className="btn">Explore Courses</a>
      </div>
    </section>
  );
}
