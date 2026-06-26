"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { testimonials } from "@/lib/testimonialsData";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((i: number) => {
    setIndex((i + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  function pause() {
    if (timerRef.current) clearInterval(timerRef.current);
  }

  function resume() {
    pause();
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
  }

  return (
    <section className="section-padding section-alt">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <p className="section-title-sub">Testimonials</p>
          <h2 className="section-title-main">What Our Graduates Say</h2>
        </div>

        <div
          className="testimonial-carousel"
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
          <button
            className="testimonial-arrow testimonial-arrow-left"
            onClick={() => {
              goTo(index - 1);
              resume();
            }}
            aria-label="Previous testimonial"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          <div className="testimonial-track">
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className="testimonial-slide"
                style={{
                  transform: `translateX(${(i - index) * 100}%)`,
                  opacity: i === index ? 1 : 0,
                }}
              >
                <div className="card testimonial-card">
                  <div style={{ marginBottom: "12px", color: "var(--academy-gold)" }}>
                    {Array.from({ length: 5 }).map((_, s) => (
                      <i key={s} className={s < t.stars ? "fa-solid fa-star" : "fa-regular fa-star"} style={{ marginRight: "2px" }}></i>
                    ))}
                  </div>
                  <p className="muted" style={{ lineHeight: 1.7, marginBottom: "20px", fontSize: "1.05rem" }}>&ldquo;{t.content}&rdquo;</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div className="avatar-circle">{initials(t.author)}</div>
                    <div>
                      <div style={{ fontWeight: 700 }}>{t.author}</div>
                      <div className="muted" style={{ fontSize: "0.85rem" }}>{t.position}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="testimonial-arrow testimonial-arrow-right"
            onClick={() => {
              goTo(index + 1);
              resume();
            }}
            aria-label="Next testimonial"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>

        <div className="testimonial-dots">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              className={`testimonial-dot ${i === index ? "testimonial-dot-active" : ""}`}
              onClick={() => {
                goTo(i);
                resume();
              }}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
