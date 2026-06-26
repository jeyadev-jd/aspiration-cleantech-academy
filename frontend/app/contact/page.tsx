import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import ContactAddress from "@/components/academy/ContactAddress";

export const metadata: Metadata = {
  title: "Contact Aspiration Cleantech Academy",
  description:
    "Get in touch with Aspiration Cleantech Academy for questions about HVAC, entrepreneurship, digital marketing, or sales training programs.",
};

export default function ContactPage() {
  return (
    <main>
      <section
        className="section-padding on-dark"
        style={{
          position: "relative",
          backgroundImage: "linear-gradient(rgba(26,13,46,0.78), rgba(26,13,46,0.78)), url('/img/academy/students.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "280px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container" style={{ maxWidth: "700px" }}>
          <p style={{ color: "var(--academy-gold)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>
            Contact Us
          </p>
          <h1 style={{ fontSize: "2.2rem", fontWeight: 800, margin: 0 }}>Get In Touch</h1>
          <p style={{ maxWidth: "560px", color: "var(--academy-text-muted-on-dark)", lineHeight: 1.8, marginTop: "16px" }}>
            Have a question before you register? Reach out, we&apos;re happy to help.
          </p>
        </div>
      </section>

      <section className="contact-section fix section-padding">
        <div className="container">
          <div className="contact-wrapper-2">
            <div className="row g-4 align-items-center">
              <div className="col-lg-6">
                <ContactAddress />
              </div>
              <div className="col-lg-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="map-section">
        <div className="map-items">
          <div className="googpemap">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.653051654579!2d80.2121219!3d13.121152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52652acebc6f07%3A0xff898e901cf0413d!2sAspiration%20Cleantech%20Ventures%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1771655946796!5m2!1sen!2sin"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
