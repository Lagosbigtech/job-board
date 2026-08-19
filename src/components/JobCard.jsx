import React from "react";
import { Eyebrow } from "./ui.jsx";
import { refCode, timeAgo } from "../lib/helpers.js";

export default function JobCard({ job, onOpen }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 108px",
        background: "#FBF8F0",
        border: "1px solid #D8CDB0",
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: "0 1px 0 rgba(27,36,48,0.04)",
      }}
    >
      <div style={{ padding: "20px 22px", cursor: "pointer" }} onClick={() => onOpen(job)}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
          <Eyebrow>#{refCode(job.id)}</Eyebrow>
          <span style={{ color: "#D8CDB0" }}>·</span>
          <Eyebrow color="#B8860B">{job.type}</Eyebrow>
        </div>
        <h3
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 600,
            fontSize: 22,
            color: "#1B2430",
            margin: "0 0 4px",
            lineHeight: 1.2,
          }}
        >
          {job.title}
        </h3>
        <div style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 14.5, color: "#4A4130" }}>
          {job.company} &nbsp;·&nbsp; {job.location}
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
