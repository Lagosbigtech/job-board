import React from "react";

export function Eyebrow({ children, color = "#2F6E68" }) {
  return (
    <div
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 11,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color,
        fontWeight: 500,
      }}
    >
      {children}
    </div>
  );
}

export function Field({ label, children }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.06em",
          color: "#7A7259",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}

export const inputStyle = {
  fontFamily: "'Work Sans', sans-serif",
  fontSize: 15,
  padding: "10px 12px",
  border: "1px solid #D8CDB0",
  borderRadius: 4,
  background: "#FFFDF8",
  color: "#1B2430",
  outline: "none",
};

export const primaryBtn = {
  background: "#1B2430",
  color: "#F6F1E4",
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: 13,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  border: "none",
  borderRadius: 4,
  padding: "14px 20px",
  cursor: "pointer",
};

export const backLinkStyle = {
  background: "none",
  border: "none",
  color: "#2F6E68",
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: 12,
  letterSpacing: "0.04em",
  cursor: "pointer",
  padding: 0,
  marginBottom: 22,
};
