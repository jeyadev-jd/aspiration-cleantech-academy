import Link from "next/link";
import { SuCallMessage, SuEmail, SuLocation } from "@/lib/icons";

const contactInfo = [
  {
    icon: <SuCallMessage />,
    label: "Call Us 7/24",
    value: "+91-96777 63170",
    link: "tel:+919677763170",
  },
  {
    icon: <SuEmail />,
    label: "Make a Quote",
    value: "info@aspcv.com",
    link: "mailto:info@aspcv.com",
  },
  {
    icon: <SuLocation />,
    label: "Location",
    value: "1st Main Rd, Poompuhar Nagar, Kolathur, Chennai, Tamil Nadu 600099",
  },
];

export default function ContactAddress() {
  return (
    <div className="contact-left-items">
      <div className="contact-info-area-2">
        {contactInfo.map((info, i) => (
          <div
            key={info.label}
            className={`contact-info-items mb-4 ${i === contactInfo.length - 1 ? "border-none" : ""}`}
          >
            <div className="icon">{info.icon}</div>
            <div className="content">
              <p>{info.label}</p>
              <h3>{info.link ? <Link href={info.link}>{info.value}</Link> : info.value}</h3>
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderRadius: "16px", overflow: "hidden", marginTop: "20px", height: "260px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/academy/Mentor.webp"
          alt="Aspiration Cleantech Academy mentorship"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
    </div>
  );
}
