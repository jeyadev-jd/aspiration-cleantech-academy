"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/courses", label: "Courses" },
  { href: "/admin/colors", label: "Color Palette" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  function handleLogout() {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link href="/admin" className="navbar-brand">
          <span className="navbar-brand-icon">
            <img src="/img/academy/logo-cropped.png" alt="Aspiration Cleantech Academy" />
          </span>
          Academy Admin
        </Link>

        {!isLoginPage && (
          <>
            <nav className={`navbar-links ${menuOpen ? "navbar-links-open" : ""}`}>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`navbar-link ${pathname === link.href ? "navbar-link-active" : ""}`}
                >
                  {link.label}
                </Link>
              ))}
              <button onClick={handleLogout} className="navbar-link" style={{ background: "none", border: "none", cursor: "pointer" }}>
                Logout
              </button>
            </nav>

            <button
              className="navbar-burger"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
            </button>
          </>
        )}
      </div>
    </header>
  );
}
