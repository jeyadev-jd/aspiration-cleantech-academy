"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SuCallMessage, SuEmail, SuLocation } from "@/lib/icons";

const contactInfo = [
    {
        icon: <SuCallMessage />,
        label: "Call Us",
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

const quickLinks = [
    { text: "Home", link: "/" },
    { text: "Courses", link: "/courses" },
    { text: "Register", link: "/register" },
    { text: "About", link: "/about" },
    { text: "Contact Us", link: "/contact" },
];

const services = [
    { text: "HVAC Technician", link: "/hvac" },
    { text: "Entrepreneurship", link: "/entrepreneurship" },
    { text: "Digital Marketing", link: "/digital-marketing" },
    { text: "Sales", link: "/sales" },
];

const Footer = () => {
    const pathname = usePathname();
    if (pathname.startsWith("/admin")) {
        return null;
    }

    return (
        <footer className="footer-section footer-bg">
            <div className="container">
                <div className="contact-info-area">
                    {contactInfo.map((info, index) => (
                        <div
                            key={index}
                            className="contact-info-items slideUp"
                            data-delay={`${0.3 + index * 0.2}`}
                        >
                            <div className="icon">{info.icon}</div>
                            <div className="content">
                                <p>{info.label}</p>
                                <h3>
                                    {info.link ? (
                                        <Link href={info.link}>{info.value}</Link>
                                    ) : (
                                        info.value
                                    )}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="footer-widgets-wrapper">
                <div className="shape-1">
                    <img src="/img/footer-shape-1.png" alt="shape-img" />
                </div>
                <div className="container">
                    <div className="row">
                        <div
                            className="col-xl-4 col-lg-4 col-md-6 slideUp"
                            data-delay=".3"
                        >
                            <div className="single-footer-widget">
                                <div className="widget-head">
                                    <Link href="/" style={{ display: "flex", alignItems: "center", gap: "6px", textDecoration: "none" }}>
                                        <img src="/img/academy/logo-transparent.png" alt="Aspiration Cleantech Academy" style={{ height: "60px", flexShrink: 0 }} />
                                        <span style={{ color: "#fff", fontWeight: 700, fontSize: "1.25rem", lineHeight: 1.2 }}>
                                            Aspiration Cleantech Academy
                                        </span>
                                    </Link>
                                </div>
                                <div className="footer-content">
                                    <p>
                                        Job-oriented technical training programs in HVAC, CleanTech,
                                        Digital Marketing, Sales, and Entrepreneurship. Built to get
                                        you hired, not just certified.
                                    </p>
                                    <p style={{ fontSize: "0.85rem" }}>
                                        Part of{" "}
                                        <a href="https://aspcv.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>
                                            Aspiration Cleantech Ventures
                                        </a>
                                    </p>
                                    <div className="social-icon d-flex align-items-center">
                                        <Link href="#">
                                            <i className="fab fa-facebook-f" />
                                        </Link>
                                        <Link href="#">
                                            <i className="fa-brands fa-linkedin-in" />
                                        </Link>
                                        <Link href="#">
                                            <i className="fa-brands fa-youtube" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="col-xl-4 col-lg-4 col-md-6 slideUp"
                            data-delay=".5"
                        >
                            <div className="single-footer-widget">
                                <div className="widget-head">
                                    <h3>Quick Links</h3>
                                </div>
                                <ul className="list-area">
                                    {quickLinks.map((link, index) => (
                                        <li key={index}>
                                            <Link href={link.link}>
                                                <i className="fa-solid fa-chevron-right" />
                                                {link.text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div
                            className="col-xl-4 col-lg-4 col-md-6 slideUp"
                            data-delay=".5"
                        >
                            <div className="single-footer-widget">
                                <div className="widget-head">
                                    <h3>Courses</h3>
                                </div>
                                <ul className="list-area">
                                    {services.map((service, index) => (
                                        <li key={index}>
                                            <Link href={service.link}>
                                                <i className="fa-solid fa-chevron-right" />
                                                {service.text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom style-2">
                <div className="container">
                    <div className="footer-wrapper d-flex align-items-center justify-content-between">
                        <p className="slideLeft color-2" data-delay=".3">
                            © All Copyright {new Date().getFullYear()} by{" "}
                            <Link href="/">Aspiration Cleantech Academy</Link>
                        </p>
                        <ul className="footer-menu slideRight" data-delay=".5">
                            <li>
                                <Link href="/contact">Terms &amp; Condition</Link>
                            </li>
                            <li>
                                <Link href="/contact">Privacy Policy</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
