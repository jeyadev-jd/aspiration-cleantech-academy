"use client";

import { useState } from "react";

const colors = [
  { name: "Primary", varName: "--academy-primary", hex: "#5118A4" },
  { name: "Primary Light", varName: "--academy-primary-light", hex: "#8231D8" },
  { name: "Dark", varName: "--academy-dark", hex: "#1A0D2E" },
  { name: "Background", varName: "--academy-bg", hex: "#FEFCFF" },
  { name: "Background Alt", varName: "--academy-bg-alt", hex: "#F5F0FE" },
  { name: "Text", varName: "--academy-text", hex: "#28085A" },
  { name: "Text Muted", varName: "--academy-text-muted", hex: "#6B22C8" },
  { name: "Text Muted (on dark)", varName: "--academy-text-muted-on-dark", hex: "#BE9DF3" },
  { name: "Gold", varName: "--academy-gold", hex: "#D4870A" },
  { name: "Green", varName: "--academy-green", hex: "#1A7A4A" },
];

export default function ColorPalettePage() {
  const [copied, setCopied] = useState("");

  function handleCopy(hex: string) {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(""), 1500);
  }

  return (
    <main className="container section">
      <h1 style={{ marginBottom: "8px" }}>Brand Color Palette</h1>
      <p className="muted" style={{ marginBottom: "32px" }}>
        Click any swatch to copy its hex code.
      </p>

      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}>
        {colors.map((c) => (
          <button
            key={c.varName}
            onClick={() => handleCopy(c.hex)}
            className="card"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              padding: 0,
              overflow: "hidden",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <div style={{ height: "90px", background: c.hex }} />
            <div style={{ padding: "16px" }}>
              <div style={{ fontWeight: 700, marginBottom: "4px" }}>{c.name}</div>
              <div className="muted" style={{ fontSize: "0.85rem", marginBottom: "4px" }}>{c.varName}</div>
              <div style={{ fontWeight: 700, color: "var(--academy-primary)" }}>
                {copied === c.hex ? "Copied!" : c.hex}
              </div>
            </div>
          </button>
        ))}
      </div>
    </main>
  );
}
