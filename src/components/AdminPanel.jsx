import React, { useCallback, useEffect, useState } from "react";
import { Eyebrow, backLinkStyle, inputStyle, primaryBtn, selectStyle, tokens } from "./ui.jsx";
import { timeAgo } from "../lib/helpers.js";
import { supabase, RESUME_BUCKET } from "../lib/supabaseClient.js";
import PostJobForm from "./PostJobForm.jsx";

export default function AdminPanel({ jobs, onJobsChanged, onExit, onSignOut }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterJob, setFilterJob] = useState("all");

  const loadApplications = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("submitted_at", { ascending: false });
    if (!error) setApplications(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  const deleteJob = async (job) => {
    if (!window.confirm(`Remove "${job.title}"? This can't be undone.`)) return;
    await supabase.from("jobs").delete().eq("id", job.id);
    onJobsChanged();
  };

  const downloadResume = async (app) => {
    const { data, error } = await supabase.storage.from(RESUME_BUCKET).createSignedUrl(app.resume_path, 60);
    if (error || !data) {
      window.alert("Couldn't generate a download link.");
      return;
    }
    window.open(data.signedUrl, "_blank");
  };

  const filtered = filterJob === "all" ? applications : applications.filter((a) => a.job_id === filterJob);

  return (
    <div style={{ maxWidth: 880, margin: "0 auto", padding: "32px 20px 90px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <Eyebrow>Admin</Eyebrow>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 24, color: tokens.ink, margin: "4px 0 0" }}>
            Manage listings &amp; applicants
          </h2>
        </div>
        <div style={{ display: "flex", gap: 18 }}>
          <button onClick={onSignOut} style={backLinkStyle}>
            Sign out
          </button>
          <button onClick={onExit} style={backLinkStyle}>
            ← Exit admin
          </button>
        </div>
      </div>

      <PostJobForm onPosted={onJobsChanged} />

      <div style={{ marginTop: 36 }}>
        <Eyebrow>Live listings ({jobs.length})</Eyebrow>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
          {jobs.length === 0 && (
            <div style={{ fontFamily: "'Inter', sans-serif", color: tokens.muted2, fontSize: 14 }}>No listings yet.</div>
          )}
          {jobs.map((j) => (
            <div
              key={j.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: `1px solid ${tokens.border}`,
                borderRadius: 10,
                padding: "12px 16px",
                background: tokens.card,
              }}
            >
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: tokens.ink }}>
                <strong>{j.title}</strong> · {j.company} · {j.location}
              </div>
              <button
                onClick={() => deleteJob(j)}
                style={{ background: "none", border: "none", color: tokens.error, fontFamily: "'Inter', sans-serif", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 36 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Eyebrow>Applications ({applications.length})</Eyebrow>
          <select style={{ ...selectStyle, padding: "7px 30px 7px 12px", fontSize: 13 }} value={filterJob} onChange={(e) => setFilterJob(e.target.value)}>
            <option value="all">All listings</option>
            {jobs.map((j) => (
              <option key={j.id} value={j.id}>
                {j.title}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div style={{ fontFamily: "'Inter', sans-serif", color: tokens.muted2, marginTop: 14 }}>Loading…</div>
        ) : filtered.length === 0 ? (
          <div style={{ fontFamily: "'Inter', sans-serif", color: tokens.muted2, marginTop: 14 }}>No applications yet.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
            {filtered.map((a) => (
              <div key={a.id} style={{ border: `1px solid ${tokens.border}`, borderRadius: 10, padding: 16, background: tokens.card }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 16, color: tokens.ink }}>{a.name}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, color: tokens.muted }}>
                      {a.email}
                      {a.phone ? ` · ${a.phone}` : ""}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, fontWeight: 600, color: tokens.brand }}>
                      applied for {a.job_title}
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: tokens.muted2 }}>
                      {timeAgo(a.submitted_at)}
                    </div>
                  </div>
                </div>
                {a.note && (
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, color: tokens.ink, marginTop: 10 }}>
                    “{a.note}”
                  </div>
                )}
                <button onClick={() => downloadResume(a)} style={{ ...primaryBtn, marginTop: 12, padding: "9px 16px", fontSize: 13 }}>
                  Download CV ({a.resume_filename})
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
        }    }
    window.open(data.signedUrl, "_blank");
  };

  const filtered = filterJob === "all" ? applications : applications.filter((a) => a.job_id === filterJob);

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 20px 80px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <Eyebrow color="#B8860B">Admin</Eyebrow>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, color: "#1B2430", margin: "4px 0 0" }}>
            Manage listings &amp; applicants
          </h2>
        </div>
        <div style={{ display: "flex", gap: 18 }}>
          <button onClick={onSignOut} style={backLinkStyle}>
            Sign out
          </button>
          <button onClick={onExit} style={backLinkStyle}>
            ← Exit admin
          </button>
        </div>
      </div>

      <PostJobForm onPosted={onJobsChanged} />

      <div style={{ marginTop: 36 }}>
        <Eyebrow>Live listings ({jobs.length})</Eyebrow>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
          {jobs.length === 0 && (
            <div style={{ fontFamily: "'Work Sans', sans-serif", color: "#A69B7C", fontSize: 14 }}>No listings yet.</div>
          )}
          {jobs.map((j) => (
            <div
              key={j.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #D8CDB0",
                borderRadius: 4,
                padding: "10px 14px",
                background: "#FBF8F0",
              }}
            >
              <div style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 14, color: "#1B2430" }}>
                <strong>{j.title}</strong> · {j.company} · {j.location} <span style={{ color: "#A69B7C" }}>#{refCode(j.id)}</span>
              </div>
              <button
                onClick={() => deleteJob(j)}
                style={{ background: "none", border: "none", color: "#A33C2E", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, cursor: "pointer" }}
              >
                REMOVE
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 36 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Eyebrow>Applications ({applications.length})</Eyebrow>
          <select style={{ ...inputStyle, padding: "6px 10px", fontSize: 12.5 }} value={filterJob} onChange={(e) => setFilterJob(e.target.value)}>
            <option value="all">All listings</option>
            {jobs.map((j) => (
              <option key={j.id} value={j.id}>
                {j.title}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div style={{ fontFamily: "'Work Sans', sans-serif", color: "#A69B7C", marginTop: 14 }}>Loading…</div>
        ) : filtered.length === 0 ? (
          <div style={{ fontFamily: "'Work Sans', sans-serif", color: "#A69B7C", marginTop: 14 }}>No applications yet.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
            {filtered.map((a) => (
              <div key={a.id} style={{ border: "1px solid #D8CDB0", borderRadius: 4, padding: 16, background: "#FBF8F0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <div style={{ fontFamily: "'Fraunces', serif", fontSize: 17, color: "#1B2430" }}>{a.name}</div>
                    <div style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 13.5, color: "#7A7259" }}>
                      {a.email}
                      {a.phone ? ` · ${a.phone}` : ""}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#2F6E68" }}>
                      applied for {a.job_title}
                    </div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "#A69B7C" }}>
                      {timeAgo(a.submitted_at)}
                    </div>
                  </div>
                </div>
                {a.note && (
                  <div style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 13.5, color: "#4A4130", marginTop: 10 }}>
                    “{a.note}”
                  </div>
                )}
                <button onClick={() => downloadResume(a)} style={{ ...primaryBtn, marginTop: 12, padding: "8px 14px", fontSize: 11.5 }}>
                  Download CV ({a.resume_filename})
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
