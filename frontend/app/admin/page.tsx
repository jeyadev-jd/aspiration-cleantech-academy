"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchRegistrations, fetchLeads, clearAllRegistrations, clearAllLeads, type Registration, type Lead } from "@/lib/adminApi";
import { downloadExcel } from "@/lib/excel";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"registrations" | "leads">("registrations");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.replace("/admin/login");
      return;
    }
    setReady(true);
  }, [router]);

  async function loadData() {
    setLoading(true);
    setError("");
    try {
      const [regs, ldz] = await Promise.all([fetchRegistrations(), fetchLeads()]);
      setRegistrations(regs);
      setLeads(ldz);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load admin data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (ready) loadData();
  }, [ready]);

  function handleExportExcel() {
    if (tab === "registrations") {
      downloadExcel(
        "registrations.xlsx",
        ["Date", "Name", "Email", "Phone", "Course", "Message", "Status"],
        registrations.map((r) => [new Date(r.createdAt).toLocaleString(), r.name, r.email, r.phone, r.courseName, r.message || "", r.status])
      );
    } else {
      downloadExcel(
        "contact-leads.xlsx",
        ["Date", "Name", "Email", "Source Page", "Message"],
        leads.map((l) => [new Date(l.createdAt).toLocaleString(), l.name, l.email, l.sourcePage || "", l.message || ""])
      );
    }
  }

  async function handleClearData() {
    const label = tab === "registrations" ? "registrations" : "contact leads";
    if (!confirm(`Delete ALL ${label}? This cannot be undone.`)) return;
    setClearing(true);
    setError("");
    try {
      if (tab === "registrations") {
        await clearAllRegistrations();
      } else {
        await clearAllLeads();
      }
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to clear data.");
    } finally {
      setClearing(false);
    }
  }

  if (!ready) return null;

  return (
    <main className="container section">
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px", marginBottom: "24px" }}>
        <h1 style={{ margin: 0 }}>Admin Dashboard</h1>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button
            className="btn"
            onClick={handleExportExcel}
            disabled={loading || (tab === "registrations" ? registrations.length === 0 : leads.length === 0)}
          >
            <i className="fa-solid fa-file-excel" style={{ marginRight: "8px" }}></i>
            Export Excel
          </button>
          <button className="btn" onClick={loadData} disabled={loading}>
            <i className="fa-solid fa-rotate-right" style={{ marginRight: "8px" }}></i>
            Refresh
          </button>
          <button
            onClick={handleClearData}
            disabled={clearing || loading || (tab === "registrations" ? registrations.length === 0 : leads.length === 0)}
            style={{ background: "crimson", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 20px", fontWeight: 700, cursor: "pointer" }}
          >
            <i className="fa-solid fa-trash" style={{ marginRight: "8px" }}></i>
            {clearing ? "Clearing..." : "Clear Data"}
          </button>
        </div>
      </div>

      <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
        <button
          className="tag"
          style={{ opacity: tab === "registrations" ? 1 : 0.6, cursor: "pointer", border: "none" }}
          onClick={() => setTab("registrations")}
        >
          Registrations ({registrations.length})
        </button>
        <button
          className="tag"
          style={{ opacity: tab === "leads" ? 1 : 0.6, cursor: "pointer", border: "none" }}
          onClick={() => setTab("leads")}
        >
          Contact Leads ({leads.length})
        </button>
      </div>

      {error && <div className="error-box" style={{ marginBottom: "16px" }}>{error}</div>}

      {loading ? (
        <p className="muted">Loading...</p>
      ) : tab === "registrations" ? (
        <RegistrationsTable registrations={registrations} />
      ) : (
        <LeadsTable leads={leads} />
      )}
    </main>
  );
}

function RegistrationsTable({ registrations }: { registrations: Registration[] }) {
  if (registrations.length === 0) {
    return <p className="muted">No registrations yet.</p>;
  }

  return (
    <div className="card" style={{ padding: 0, overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "var(--academy-bg-alt)", textAlign: "left" }}>
            <Th>Date</Th>
            <Th>Student</Th>
            <Th>Course Interest</Th>
            <Th>Status</Th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((reg) => (
            <tr key={reg._id} style={{ borderTop: "1px solid var(--academy-bg-alt)" }}>
              <Td style={{ whiteSpace: "nowrap" }}>{new Date(reg.createdAt).toLocaleString()}</Td>
              <Td>
                <strong>{reg.name}</strong>
                <br />
                <a href={`mailto:${reg.email}`} className="muted" style={{ fontSize: "0.85rem" }}>{reg.email}</a>
                <br />
                <span className="muted" style={{ fontSize: "0.85rem" }}>{reg.phone}</span>
              </Td>
              <Td>
                {reg.courseName ? (
                  <span style={{ fontWeight: 700, color: "var(--academy-primary)" }}>{reg.courseName}</span>
                ) : (
                  <span style={{ color: "crimson" }}>Course Unknown</span>
                )}
                {reg.message && (
                  <p className="muted" style={{ margin: "8px 0 0", fontSize: "0.85rem", borderLeft: "3px solid var(--academy-bg-alt)", paddingLeft: "8px" }}>
                    &quot;{reg.message}&quot;
                  </p>
                )}
              </Td>
              <Td>
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 10px",
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    background: reg.status === "pending" ? "rgba(212, 135, 10, 0.15)" : "rgba(26, 122, 74, 0.15)",
                    color: reg.status === "pending" ? "var(--academy-gold)" : "var(--academy-green)",
                  }}
                >
                  {reg.status.toUpperCase()}
                </span>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LeadsTable({ leads }: { leads: Lead[] }) {
  if (leads.length === 0) {
    return <p className="muted">No contact leads yet.</p>;
  }

  return (
    <div className="card" style={{ padding: 0, overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "var(--academy-bg-alt)", textAlign: "left" }}>
            <Th>Date</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Source</Th>
            <Th>Message</Th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id} style={{ borderTop: "1px solid var(--academy-bg-alt)" }}>
              <Td style={{ whiteSpace: "nowrap" }}>{new Date(lead.createdAt).toLocaleString()}</Td>
              <Td style={{ fontWeight: 700 }}>{lead.name}</Td>
              <Td>
                <a href={`mailto:${lead.email}`} className="muted">{lead.email}</a>
              </Td>
              <Td>
                <span className="tag">{lead.sourcePage}</span>
              </Td>
              <Td style={{ maxWidth: "320px", whiteSpace: "pre-wrap" }}>{lead.message}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th style={{ padding: "14px 16px", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--academy-text-muted)" }}>{children}</th>;
}

function Td({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <td style={{ padding: "14px 16px", verticalAlign: "top", ...style }}>{children}</td>;
}
