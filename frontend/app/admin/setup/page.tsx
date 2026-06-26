"use client";

import { useState } from "react";
import Link from "next/link";
import { setupAdmin } from "@/lib/adminApi";

export default function AdminSetupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      await setupAdmin(email, password);
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Setup failed.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <main
        style={{
          minHeight: "calc(100vh - 70px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--academy-bg-alt)",
          padding: "40px 24px",
        }}
      >
        <div className="card" style={{ width: "100%", maxWidth: "420px", textAlign: "center" }}>
          <h2 style={{ marginBottom: "12px" }}>Admin Account Created</h2>
          <p className="muted" style={{ marginBottom: "24px" }}>
            You can now log in with the email and password you just set. This setup page is now
            disabled — running it again will fail since an admin already exists.
          </p>
          <Link href="/admin/login" className="btn">
            Go to Login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "calc(100vh - 70px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--academy-bg-alt)",
        padding: "40px 24px",
      }}
    >
      <div className="card" style={{ width: "100%", maxWidth: "420px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "8px" }}>Create Admin Account</h2>
        <p className="muted" style={{ textAlign: "center", marginBottom: "24px", fontSize: "0.9rem" }}>
          One-time setup. This only works once — if an admin already exists, it will refuse.
        </p>

        {error && <div className="error-box" style={{ marginBottom: "16px" }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn" style={{ width: "100%" }} disabled={loading}>
            {loading ? "Creating..." : "Create Admin Account"}
          </button>
        </form>
      </div>
    </main>
  );
}
