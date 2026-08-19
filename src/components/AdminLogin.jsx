import React, { useState } from "react";
import { Eyebrow, backLinkStyle, inputStyle, primaryBtn } from "./ui.jsx";
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
    // On success, App.jsx's auth listener flips the view automatically.
  };

  return (
    <div style={{ maxWidth: 360, margin: "100px auto", padding: "0 20px", textAlign: "center" }}>
      <Eyebrow color="#B8860B">Admin access</Eyebrow>
      <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: "#1B2430", margin: "8px 0 20px" }}>
        Sign in
      </h3>
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
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
