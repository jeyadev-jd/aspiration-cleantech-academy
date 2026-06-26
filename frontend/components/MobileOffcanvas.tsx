"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/register", label: "Register" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function MobileOffcanvas({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      <div className="fix-area">
        <div className={`offcanvas__info ${isOpen ? "info-open" : ""}`}>
          <div className="offcanvas__wrapper">
            <div className="offcanvas__content">
              <div className="offcanvas__top mb-5 d-flex justify-content-between align-items-center">
                <div className="offcanvas__logo">
                  <Link href="/" className="d-flex align-items-center gap-2" onClick={onClose}>
                    <span className="navbar-brand-icon">
                      <img src="/img/academy/logo-cropped.png" alt="Aspiration Cleantech Academy" />
                    </span>
                    <h4 className="mb-0" style={{ fontWeight: 700, fontSize: "16px", lineHeight: 1.2 }}>
                      Aspiration Cleantech
                      <br />
                      Academy
                    </h4>
                  </Link>
                </div>
                <div className="offcanvas__close">
                  <button onClick={onClose} aria-label="Close menu">
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>

              <ul className="mobile-menu-list" style={{ listStyle: "none", padding: 0, marginBottom: "32px" }}>
                {links.map((link) => (
                  <li key={link.href} style={{ borderBottom: "1px solid var(--academy-bg-alt)" }}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      style={{
                        display: "block",
                        padding: "14px 0",
                        fontWeight: pathname === link.href ? 700 : 500,
                        color: pathname === link.href ? "var(--academy-primary)" : "var(--academy-text)",
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="text">
                Job-oriented technical training programs in HVAC, CleanTech, Digital Marketing, Sales, and
                Entrepreneurship. Built to get you hired, not just certified.
              </p>

              <div className="offcanvas__contact">
                <h4>Contact Info</h4>
                <ul>
                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon">
                      <i className="fa-solid fa-map-marker-alt" />
                    </div>
                    <div className="offcanvas__contact-text">
                      1st Main Rd, Poompuhar Nagar, Kolathur, Chennai, Tamil Nadu 600099
                    </div>
                  </li>
                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon mr-15">
                      <i className="fa-solid fa-envelope" />
                    </div>
                    <div className="offcanvas__contact-text">
                      <Link href="mailto:info@aspcv.com">info@aspcv.com</Link>
                    </div>
                  </li>
                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon mr-15">
                      <i className="fa-solid fa-phone" />
                    </div>
                    <div className="offcanvas__contact-text">
                      <Link href="tel:+919677763170">+91 96777 63170</Link>
                    </div>
                  </li>
                </ul>
                <div className="header-button mt-4">
                  <Link href="/register" className="theme-btn text-center" onClick={onClose}>
                    <span>
                      Apply Now <i className="fa-solid fa-arrow-right-long" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`offcanvas__overlay ${isOpen ? "overlay-open" : ""}`} onClick={onClose} />
    </>
  );
}
