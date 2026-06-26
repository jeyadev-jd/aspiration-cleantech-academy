"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileOffcanvas from "./MobileOffcanvas";

const links = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/register", label: "Register" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 250);
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <header className={`navbar ${scrolled ? "navbar-scrolled sticky" : ""}`}>
        <div className="container navbar-inner">
          <Link href="/" className="navbar-brand">
            <span className="navbar-brand-icon">
              <img src="/img/academy/logo-cropped.png" alt="Aspiration Cleantech Academy" />
            </span>
            Aspiration Cleantech Academy
          </Link>

          <nav className="navbar-links">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`navbar-link ${pathname === link.href ? "navbar-link-active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/register" className="navbar-cta">
              Apply Now
            </Link>
          </nav>

          <button
            className="navbar-burger"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(true)}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </header>

      <MobileOffcanvas isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
