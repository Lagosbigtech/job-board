import React from "react";
import { primaryBtn, tokens } from "./ui.jsx";

export default function SubmittedView({ job, onBack }) {
  return (
    <div style={{ maxWidth: 480, margin: "80px auto", padding: "0 20px", textAlign: "center" }}>
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: tokens.successLight,
          color: tokens.success,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 18px",
          fontSize: 26,
          fontWeight: 700,
        }}
      >
        ✓
      </div>
      <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 24, color: tokens.ink, margin: "0 0 10px" }}>
        Application sent
      </h2>
      <p style={{ fontFamily: "'Inter', sans-serif", color: tokens.muted, lineHeight: 1.6, fontSize: 15 }}>
        You applied for <strong style={{ color: tokens.ink }}>{job.title}</strong> at {job.company}. The hiring team
        will reach out by email if you're shortlisted.
      </p>
      <button onClick={onBack} style={{ ...primaryBtn, marginTop: 22 }}>
        Browse more listings
      </button>
    </div>
  );
}
