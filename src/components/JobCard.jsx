import React from "react";
import { Badge, tokens } from "./ui.jsx";
import { timeAgo } from "../lib/helpers.js";

export default function JobCard({ job, onOpen }) {
  const initial = (job.company || "?").trim().charAt(0).toUpperCase();

  return (
    <div
      onClick={() => onOpen(job)}
      style={{
        background: tokens.card,
        border: `1px solid ${tokens.border}`,
        borderRadius: 14,
        padding: 22,
        cursor: "pointer",
        transition: "box-shadow 0.15s ease, transform 0.15s ease",
        boxShadow: "0 1px 2px rgba(16,24,40,0.04)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(16,24,40,0.08)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 1px 2px rgba(16,24,40,0.04)")}
    >
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: tokens.brandLight,
            color: tokens.brandDark,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: 18,
            flexShrink: 0,
          }}
        >
          {initial}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: 18,
                color: tokens.ink,
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              {job.title}
            </h3>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12.5,
                color: tokens.muted2,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {timeAgo(job.posted_at)}
            </span>
          </div>

          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14.5, color: tokens.muted, marginTop: 2 }}>
            {job.company} &nbsp;·&nbsp; {job.location}
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
            <Badge tone="brand">{job.type}</Badge>
            {job.salary && <Badge tone="success">{job.salary}</Badge>}
          </div>

          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: tokens.muted,
              marginTop: 12,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: 1.5,
            }}
          >
            {job.description}
          </div>

          <div
            style={{
              marginTop: 14,
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              color: tokens.brand,
            }}
          >
            View details →
          </div>
        </div>
      </div>
    </div>
  );
}          {job.company} &nbsp;·&nbsp; {job.location}
          {job.salary ? <> &nbsp;·&nbsp; {job.salary}</> : null}
        </div>
        <div
          style={{
            fontFamily: "'Work Sans', sans-serif",
            fontSize: 13.5,
            color: "#7A7259",
            marginTop: 10,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {job.description}
        </div>
        <div style={{ marginTop: 12, fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "#A69B7C" }}>
          POSTED {timeAgo(job.posted_at).toUpperCase()}
        </div>
      </div>

      <div style={{ position: "relative", background: "#1B2430", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: -1,
            top: 0,
            bottom: 0,
            width: 1,
            backgroundImage: "repeating-linear-gradient(to bottom, #D8CDB0 0 6px, transparent 6px 12px)",
          }}
        />
        <button
          onClick={() => onOpen(job)}
          style={{
            background: "none",
            border: "none",
            color: "#F6F1E4",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 12,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            writingMode: "vertical-rl",
            cursor: "pointer",
            padding: "18px 0",
          }}
        >
          Apply →
        </button>
      </div>
    </div>
  );
}
