"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api/v1";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ loading: false, success: false, error: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: "" });

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, sourcePage: "academy-microsite-contact" }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || body.errors?.[0]?.msg || "Failed to send message.");
      }

      setStatus({ loading: false, success: true, error: "" });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        error: err instanceof Error ? err.message : "Failed to send message.",
      });
    }
  };

  return (
    <div className="contact-content">
      <h2>Have a Question About Our Programs?</h2>
      <p>
        Tell us what you&apos;re looking for and our team will get back to you with the details you need.
      </p>
      <form onSubmit={handleSubmit} className="contact-form-items">
        {status.success && <div className="alert alert-success">Message sent successfully!</div>}
        {status.error && <div className="alert alert-danger">{status.error}</div>}
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="form-clt">
              <span>Your name*</span>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-clt">
              <span>Your Email*</span>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-clt">
              <span>Write Message*</span>
              <textarea
                name="message"
                id="message"
                placeholder="Write Message"
                required
                value={formData.message}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-lg-7">
            <button type="submit" className="theme-btn" disabled={status.loading}>
              {status.loading ? "Sending..." : "Send Message"} <i className="fa-solid fa-arrow-right-long" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
