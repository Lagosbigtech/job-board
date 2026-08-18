import React from "react";
import { primaryBtn } from "./ui.jsx";
import { refCode } from "../lib/helpers.js";

export default function SubmittedView({ job, onBack }) {
  return (
    <div style={{ maxWidth: 480, margin: "80px auto", padding: "0 20px", textAlign: "center" }}>
      <div
        style={{
          display: "inline-block",
          border: "2px solid #2F6E68",
          color: "#2F6E68",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 12,
          letterSpacing: "0.12em",
          padding: "6px 14px",
          borderRadius: 999,
          transform: "rotate(-3deg)",
          marginBottom: 20,
        }}
      >
        APPLICATION RECEIVED
      </div>
      <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, color: "#1B2430", margin: "0 0 10px" }}>
        You're in the running for {job.title}
      </h2>
      <p style={{ fontFamily: "'Work Sans', sans-serif", color: "#7A7259", lineHeight: 1.6 }}>
        Ref #{refCode(job.id)}. The hiring team will reach out by email if you're shortlisted.
      </p>
      <button onClick={onBack} style={{ ...primaryBtn, marginTop: 24 }}>
        Browse more listings
      </button>
    </div>
  );
}
