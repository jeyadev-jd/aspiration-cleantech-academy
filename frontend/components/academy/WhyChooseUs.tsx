import Reveal from "@/components/Reveal";

const reasons = [
  { title: "Practical Learning", desc: "Hands-on training with real-world projects, not just theory.", icon: "fa-screwdriver-wrench" },
  { title: "Certified Courses", desc: "Industry-recognized certifications that employers trust.", icon: "fa-certificate" },
  { title: "Placement Support", desc: "Dedicated career assistance and hiring partner network.", icon: "fa-handshake-angle" },
  { title: "Expert Trainers", desc: "Industry professionals with 10+ years of hands-on experience.", icon: "fa-user-tie" },
  { title: "Flexible Batches", desc: "Weekday and weekend batches to suit your schedule.", icon: "fa-calendar-days" },
  { title: "Affordable Fees", desc: "Quality education at student-friendly pricing with instalments.", icon: "fa-piggy-bank" },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <p className="section-title-sub">Why Choose Us</p>
          <h2 className="section-title-main">What Sets Us Apart</h2>
        </div>
        <div className="grid why-choose-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={(i % 3) * 0.1}>
              <div className="feature-card">
                <div className="icon-circle" style={{ borderRadius: "12px" }}>
                  <i className={`fa-solid ${r.icon}`}></i>
                </div>
                <div>
                  <h5 style={{ fontWeight: 700, margin: "0 0 6px" }}>{r.title}</h5>
                  <p className="muted" style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.6 }}>{r.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
