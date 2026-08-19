import React from "react";
import { Badge, backLinkStyle, primaryBtn, tokens } from "./ui.jsx";
import { timeAgo } from "../lib/helpers.js";

export default function JobDetail({ job, onBack, onApply }) {
  const initial = (job.company || "?").trim().charAt(0).toUpperCase();
  const paragraphs = job.description.split(/\n+/).filter(Boolean);

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px 90px" }}>
      <button onClick={onBack} style={backLinkStyle}>
        ← All listings
      </button>

      <div
        style={{
          background: tokens.card,
          border: `1px solid ${tokens.border}`,
          borderRadius: 16,
          padding: "28px 26px",
        }}
      >
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: tokens.brandLight,
              color: tokens.brandDark,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: 22,
              flexShrink: 0,
            }}
          >
            {initial}
          </div>
          <div style={{ flex: 1 }}>
            <h1
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: 26,
                color: tokens.ink,
                margin: "0 0 4px",
                lineHeight: 1.25,
              }}
            >
              {job.title}
            </h1>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: tokens.muted }}>
              {job.company} · {job.location} · Posted {timeAgo(job.posted_at)}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 18 }}>
          <Badge tone="brand">{job.type}</Badge>
          {job.salary && <Badge tone="success">{job.salary}</Badge>}
          <Badge tone="neutral">{job.location}</Badge>
        </div>

        <div style={{ height: 1, background: tokens.border, margin: "24px 0" }} />

        <Eyebrow>Job description</Eyebrow>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 15.5,
            color: tokens.ink,
            lineHeight: 1.7,
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {paragraphs.map((p, i) => (
            <p key={i} style={{ margin: 0 }}>
              {p}
            </p>
          ))}
        </div>

        <button onClick={onApply} style={{ ...primaryBtn, marginTop: 28, width: "100%", fontSize: 15.5, padding: "14px 20px" }}>
          Apply for this job
        </button>
      </div>
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 12,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: tokens.muted,
        fontWeight: 700,
      }}
    >
      {children}
    </div>
  );
              }
