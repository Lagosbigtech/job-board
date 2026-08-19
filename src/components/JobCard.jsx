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
    }
