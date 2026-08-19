import React from "react";

export const tokens = {
  bg: "#F7F9FC",
  card: "#FFFFFF",
  border: "#E4E7EC",
  ink: "#101828",
  muted: "#667085",
  muted2: "#98A2B3",
  brand: "#1755D6",
  brandDark: "#123F9E",
  brandLight: "#EFF4FF",
  success: "#16A34A",
  successLight: "#ECFDF3",
  error: "#DC2626",
};

export function Eyebrow({ children, color = tokens.brand }) {
  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 12,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color,
        fontWeight: 700,
      }}
    >
      {children}
    </div>
  );
}

export function Badge({ children, tone = "brand" }) {
  const tones = {
    brand: { bg: tokens.brandLight, fg: tokens.brandDark },
    success: { bg: tokens.successLight, fg: tokens.success },
    neutral: { bg: "#F2F4F7", fg: tokens.muted },
  };
  const t = tones[tone] || tones.brand;
  return (
    <span
      style={{
        display: "inline-block",
        background: t.bg,
        color: t.fg,
        fontFamily: "'Inter', sans-serif",
        fontSize: 12.5,
        fontWeight: 600,
        padding: "4px 10px",
        borderRadius: 999,
      }}
    >
      {children}
    </span>
  );
}

export function Field({ label, children }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 12.5,
          fontWeight: 600,
          color: tokens.muted,
        }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}

export const inputStyle = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 15,
  padding: "11px 14px",
  border: `1px solid ${tokens.border}`,
  borderRadius: 8,
  background: "#FFFFFF",
  color: tokens.ink,
  outline: "none",
};

export const selectStyle = {
  ...inputStyle,
  appearance: "none",
  WebkitAppearance: "none",
  MozAppearance: "none",
  backgroundImage:
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6'><path d='M0 0l5 6 5-6z' fill='%23667085'/></svg>\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 14px center",
  paddingRight: 32,
};

export const primaryBtn = {
  background: tokens.brand,
  color: "#FFFFFF",
  fontFamily: "'Inter', sans-serif",
  fontSize: 14.5,
  fontWeight: 600,
  border: "none",
  borderRadius: 8,
  padding: "12px 20px",
  cursor: "pointer",
};

export const secondaryBtn = {
  background: "#FFFFFF",
  color: tokens.ink,
  fontFamily: "'Inter', sans-serif",
  fontSize: 14.5,
  fontWeight: 600,
  border: `1px solid ${tokens.border}`,
  borderRadius: 8,
  padding: "12px 20px",
  cursor: "pointer",
};

export const backLinkStyle = {
  background: "none",
  border: "none",
  color: tokens.brand,
  fontFamily: "'Inter', sans-serif",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  padding: 0,
  marginBottom: 22,
};}

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
