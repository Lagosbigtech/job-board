import React, { useState } from "react";
import { backLinkStyle, inputStyle, primaryBtn, tokens } from "./ui.jsx";
import { supabase } from "../lib/supabaseClient.js";

export default function AdminLogin({ onExit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setErr(error.message);
  };

  return (
    <div style={{ maxWidth: 380, margin: "90px auto", padding: "0 20px" }}>
      <div
        style={{
          background: tokens.card,
          border: `1px solid ${tokens.border}`,
          borderRadius: 16,
          padding: "32px 28px",
          textAlign: "center",
        }}
      >
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
            margin: "0 auto 16px",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
          }}
        >
          🔒
        </div>
        <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 20, color: tokens.ink, margin: "0 0 4px" }}>
          Admin sign in
        </h3>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, color: tokens.muted, margin: "0 0 22px" }}>
          For hiring team access only
        </p>
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 10, textAlign: "left" }}>
          <input
            style={{ ...inputStyle, width: "100%", boxSizing: "border-box" }}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={{ ...inputStyle, width: "100%", boxSizing: "border-box" }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {err && <div style={{ color: tokens.error, fontSize: 13, fontFamily: "'Inter', sans-serif" }}>{err}</div>}
          <button type="submit" disabled={loading} style={{ ...primaryBtn, marginTop: 6, opacity: loading ? 0.6 : 1 }}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
      <div style={{ textAlign: "center", marginTop: 18 }}>
        <button onClick={onExit} style={backLinkStyle}>
          ← Back to listings
        </button>
      </div>
    </div>
  );
}          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {err && <div style={{ color: "#A33C2E", fontSize: 13, fontFamily: "'Work Sans', sans-serif" }}>{err}</div>}
        <button type="submit" disabled={loading} style={{ ...primaryBtn, opacity: loading ? 0.6 : 1 }}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
      <div>
        <button onClick={onExit} style={{ ...backLinkStyle, marginTop: 18 }}>
          ← Back to listings
        </button>
      </div>
    </div>
  );
}
