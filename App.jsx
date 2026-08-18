import React, { useCallback, useEffect, useState } from "react";
import { Eyebrow, backLinkStyle, inputStyle } from "./components/ui.jsx";
import JobCard from "./components/JobCard.jsx";
import ApplyView from "./components/ApplyView.jsx";
import SubmittedView from "./components/SubmittedView.jsx";
import AdminLogin from "./components/AdminLogin.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import { supabase } from "./lib/supabaseClient.js";

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("browse"); // browse | apply | submitted | admin-login | admin
  const [activeJob, setActiveJob] = useState(null);
  const [query, setQuery] = useState("");
  const [session, setSession] = useState(null);

  const loadJobs = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("jobs").select("*").order("posted_at", { ascending: false });
    if (!error) setJobs(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession) setView("admin");
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setView("browse");
  };

  const filteredJobs = jobs.filter((j) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return [j.title, j.company, j.location, j.type].join(" ").toLowerCase().includes(q);
  });

  return (
    <div style={{ minHeight: "100vh", background: "#F6F1E4" }}>
      <header
        style={{
          borderBottom: "1px solid #D8CDB0",
          padding: "22px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: 920,
          margin: "0 auto",
        }}
      >
        <div
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 22, color: "#1B2430", cursor: "pointer" }}
          onClick={() => setView("browse")}
        >
          The Listings
        </div>
        <button
          onClick={() => setView(session ? "admin" : view === "admin-login" ? "browse" : "admin-login")}
          style={{ ...backLinkStyle, marginBottom: 0 }}
        >
          {session ? "Admin →" : view === "admin-login" ? "← Back" : "Admin →"}
        </button>
      </header>

      {view === "browse" && (
        <div style={{ maxWidth: 920, margin: "0 auto", padding: "32px 20px 80px" }}>
          <Eyebrow>United States · updated daily</Eyebrow>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 40, color: "#1B2430", margin: "8px 0 22px", lineHeight: 1.08 }}>
            Open roles, listed like it's still the classifieds.
          </h1>

          <input
            style={{ ...inputStyle, width: "100%", boxSizing: "border-box", marginBottom: 24, maxWidth: 420 }}
            placeholder="Search by title, company, or city…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {loading ? (
            <div style={{ fontFamily: "'Work Sans', sans-serif", color: "#A69B7C" }}>Loading listings…</div>
          ) : filteredJobs.length === 0 ? (
            <div style={{ fontFamily: "'Work Sans', sans-serif", color: "#A69B7C" }}>
              {jobs.length === 0 ? "No listings posted yet — check back soon." : "Nothing matches that search."}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {filteredJobs.map((j) => (
                <JobCard
                  key={j.id}
                  job={j}
                  onOpen={() => {
                    setActiveJob(j);
                    setView("apply");
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {view === "apply" && activeJob && (
        <ApplyView job={activeJob} onBack={() => setView("browse")} onSubmitted={() => setView("submitted")} />
      )}

      {view === "submitted" && activeJob && (
        <SubmittedView
          job={activeJob}
          onBack={() => {
            setActiveJob(null);
            setView("browse");
          }}
        />
      )}

      {view === "admin-login" && !session && <AdminLogin onExit={() => setView("browse")} />}

      {view === "admin" && session && (
        <AdminPanel jobs={jobs} onJobsChanged={loadJobs} onExit={() => setView("browse")} onSignOut={signOut} />
      )}
    </div>
  );
}
