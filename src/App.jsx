import React, { useCallback, useEffect, useState } from "react";
import { inputStyle, tokens } from "./components/ui.jsx";
import JobCard from "./components/JobCard.jsx";
import JobDetail from "./components/JobDetail.jsx";
import ApplyView from "./components/ApplyView.jsx";
import SubmittedView from "./components/SubmittedView.jsx";
import AdminLogin from "./components/AdminLogin.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import { supabase } from "./lib/supabaseClient.js";

// Admin is reachable only by going directly to yoursite.com/admin — there is
// no visible link to it anywhere in the public site. Signing in still
// requires the real Supabase login you set up, so this is a convenience
// (visitors won't stumble on it), not the only layer of protection.
function isAdminRoute() {
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  return path.includes("admin") || hash.includes("admin");
}

const SEED_JOBS = [
  {
    title: "Customer Service Representative",
    company: "BrightPath Support",
    location: "Remote (US)",
    type: "Full-time",
    salary: "$18–22/hr",
    description:
      "Handle inbound calls, chats, and emails for a growing consumer brand, resolving order and account questions with a friendly, professional tone.\nWe're looking for someone with at least 6 months of customer service experience, clear written and verbal communication, and a quiet home workspace with reliable internet.\nPaid training provided. Schedules include some evenings and one weekend day per week.",
  },
  {
    title: "Data Entry Clerk",
    company: "Meridian Records Group",
    location: "Remote (US)",
    type: "Part-time",
    salary: "$16–19/hr",
    description:
      "Enter and verify information from scanned documents into our internal database, flagging discrepancies for review.\nStrong attention to detail and typing speed of 45+ WPM required. No prior data entry experience necessary — we'll train you on our systems.\nFlexible 20–25 hours per week, Monday through Friday.",
  },
  {
    title: "Administrative Assistant",
    company: "Harborview Consulting",
    location: "Remote (US)",
    type: "Full-time",
    salary: "$19–24/hr",
    description:
      "Support a small consulting team with scheduling, inbox management, travel booking, and document preparation.\nYou're organized, proactive, and comfortable with Google Workspace and video conferencing tools. Prior admin or executive assistant experience preferred but not required.\nThis is a fully remote role with standard business hours (9am–5pm in your local time zone).",
  },
  {
    title: "Administrative Assistant",
    company: "Lonestar Property Group",
    location: "Dallas, TX",
    type: "Full-time",
    salary: "$40,000–46,000/yr",
    description:
      "Join our front office team supporting property managers with lease paperwork, tenant communication, and vendor coordination.\nWe need someone dependable with solid Excel skills and a professional phone manner. This is an in-office role at our Dallas headquarters.\nBenefits include health insurance, paid time off, and a 401(k) match after 90 days.",
  },
  {
    title: "Virtual Assistant",
    company: "Northline Ventures",
    location: "Remote (US)",
    type: "Contract",
    salary: "$17–21/hr",
    description:
      "Provide general administrative support to a busy small-business owner: inbox triage, calendar management, light research, and social media scheduling.\nIdeal for a self-starter who can work independently with minimal oversight and communicate clearly over Slack and email.\nStarts at 15–20 hours per week with room to grow.",
  },
  {
    title: "Call Center Agent",
    company: "ClearLine Communications",
    location: "Remote (US)",
    type: "Full-time",
    salary: "$16–20/hr",
    description:
      "Answer incoming customer calls for a telecom client, troubleshoot basic account issues, and escalate complex cases to specialists.\nWe provide full paid training and equipment. You'll need a wired internet connection and a distraction-free space to take calls.\nMultiple shifts available including nights and weekends with a shift differential.",
  },
  {
    title: "Warehouse Associate",
    company: "Coreline Logistics",
    location: "Columbus, OH",
    type: "Full-time",
    salary: "$17–19/hr",
    description:
      "Pick, pack, and stage orders in a fast-paced distribution center, using a handheld scanner to track inventory accuracy.\nAbility to lift up to 40 lbs and stand for a full shift required. Forklift certification is a plus but not required — we'll certify you on-site.\nMorning and evening shifts available; overtime during peak season.",
  },
  {
    title: "Delivery Driver",
    company: "SwiftRoute Courier",
    location: "Atlanta, GA",
    type: "Full-time",
    salary: "$18–23/hr",
    description:
      "Deliver packages on an assigned local route using a company vehicle, scanning each stop and providing friendly customer service at the door.\nValid driver's license with a clean record required. Routes typically run 8–10 hours with paid breaks.\nWeekly pay, plus mileage reimbursement for any personal vehicle use.",
  },
  {
    title: "Receptionist",
    company: "Desert Sky Medical Group",
    location: "Phoenix, AZ",
    type: "Full-time",
    salary: "$16–18/hr",
    description:
      "Greet patients, manage check-in, answer multi-line phones, and schedule appointments at a busy family medicine clinic.\nPrior front-desk or customer-facing experience preferred. Comfortable learning electronic health record software.\nMonday–Friday, daytime hours, no weekends.",
  },
  {
    title: "Bookkeeper",
    company: "Cedarline Accounting",
    location: "Remote (US)",
    type: "Part-time",
    salary: "$22–28/hr",
    description:
      "Reconcile accounts, categorize transactions, and prepare monthly financial reports for a handful of small-business clients using QuickBooks Online.\n1+ years of bookkeeping experience required; QuickBooks certification a plus.\nApproximately 15 hours per week with flexible scheduling around client deadlines.",
  },
  {
    title: "HR Assistant",
    company: "Willowbrook Staffing",
    location: "Remote (US)",
    type: "Full-time",
    salary: "$20–25/hr",
    description:
      "Support the HR team with onboarding paperwork, benefits enrollment questions, and maintaining accurate employee records.\nStrong organizational skills and discretion with confidential information are essential. Familiarity with HRIS platforms is a plus.\nFully remote with occasional travel (under 5%) for team meetings.",
  },
  {
    title: "Inside Sales Representative",
    company: "Peak Performance Solutions",
    location: "Remote (US)",
    type: "Full-time",
    salary: "$40,000–55,000/yr + commission",
    description:
      "Reach out to warm leads by phone and email to schedule product demos for our sales team, tracking every touchpoint in our CRM.\nWe're looking for a confident communicator who's coachable and motivated by commission. No cold calling — all leads are pre-qualified.\nUncapped commission on top of base salary, with top reps earning $70k+ in year one.",
  },
  {
    title: "IT Help Desk Support",
    company: "Nexbridge Technologies",
    location: "Remote (US)",
    type: "Full-time",
    salary: "$21–26/hr",
    description:
      "Provide first-line technical support to employees at client companies, troubleshooting hardware, software, and network issues over phone and chat.\nCompTIA A+ or equivalent experience preferred. Strong problem-solving skills and patience with non-technical users required.\nRotating on-call schedule with extra pay for after-hours coverage.",
  },
  {
    title: "Medical Billing Specialist",
    company: "Summit Health Partners",
    location: "Remote (US)",
    type: "Full-time",
    salary: "$19–24/hr",
    description:
      "Submit and follow up on insurance claims, resolve denials, and post payments for a multi-location outpatient clinic group.\nExperience with medical billing software and knowledge of CPT/ICD-10 coding required. Certification (CPB or similar) is a plus.\nFully remote, Monday–Friday, standard business hours.",
  },
  {
    title: "Social Media Coordinator",
    company: "Brightleaf Marketing",
    location: "Remote (US)",
    type: "Part-time",
    salary: "$18–22/hr",
    description:
      "Draft and schedule content across Instagram, TikTok, and Facebook for several small-business clients, and track engagement metrics weekly.\nA sharp eye for trends and basic photo/video editing skills (CapCut, Canva, or similar) are a must. Marketing degree not required — we care about your portfolio.\nApproximately 20 hours per week, flexible timing.",
  },
];

async function seedIfEmpty(currentJobCount) {
  if (currentJobCount > 0) return false;
  const { error } = await supabase.from("jobs").insert(SEED_JOBS);
  return !error;
}

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <circle cx="13" cy="13" r="9.5" fill={tokens.brandLight} stroke={tokens.brand} strokeWidth="2.2" />
        <circle cx="13" cy="13" r="5.5" fill={tokens.brand} opacity="0.14" />
        <circle cx="11.6" cy="9.8" r="2.1" fill={tokens.brand} />
        <path d="M7 17.2c0-2.6 2-4 4.6-4s4.6 1.4 4.6 4" stroke={tokens.brand} strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <line x1="20" y1="20" x2="26.5" y2="26.5" stroke={tokens.brand} strokeWidth="2.6" strokeLinecap="round" />
      </svg>
      <div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 18, color: tokens.ink, lineHeight: 1 }}>
          TheListing
        </div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 9.5, letterSpacing: "0.14em", color: tokens.muted, marginTop: 2 }}>
          JOB SEEKER
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("browse"); // browse | details | apply | submitted | admin-login | admin
  const [activeJob, setActiveJob] = useState(null);
  const [query, setQuery] = useState("");
  const [session, setSession] = useState(null);

  const loadJobs = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("jobs").select("*").order("posted_at", { ascending: false });
    if (!error) {
      if ((data || []).length === 0) {
        const seeded = await seedIfEmpty(0);
        if (seeded) {
          const { data: reloaded } = await supabase.from("jobs").select("*").order("posted_at", { ascending: false });
          setJobs(reloaded || []);
          setLoading(false);
          return;
        }
      }
      setJobs(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  useEffect(() => {
    if (isAdminRoute()) setView((v) => (v === "browse" ? "admin-login" : v));
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
    <div style={{ minHeight: "100vh", background: tokens.bg }}>
      <header
        style={{
          borderBottom: `1px solid ${tokens.border}`,
          padding: "18px 20px",
          maxWidth: 960,
          margin: "0 auto",
        }}
      >
        <div onClick={() => setView("browse")}>
          <Logo />
        </div>
      </header>

      {view === "browse" && (
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "36px 20px 90px" }}>
          <div
            style={{
              background: `linear-gradient(135deg, ${tokens.brand} 0%, ${tokens.brandDark} 100%)`,
              borderRadius: 20,
              padding: "40px 30px",
              marginBottom: 28,
            }}
          >
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", color: "#CBDBFF", textTransform: "uppercase" }}>
              United States · Remote &amp; local roles
            </div>
            <h1
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: 34,
                color: "#FFFFFF",
                margin: "10px 0 20px",
                lineHeight: 1.15,
              }}
            >
              Find your next job, faster.
            </h1>
            <input
              style={{ ...inputStyle, width: "100%", boxSizing: "border-box", maxWidth: 460, border: "none" }}
              placeholder="Search by title, company, or city…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {loading ? (
            <div style={{ fontFamily: "'Inter', sans-serif", color: tokens.muted2 }}>Loading listings…</div>
          ) : filteredJobs.length === 0 ? (
            <div style={{ fontFamily: "'Inter', sans-serif", color: tokens.muted2 }}>
              {jobs.length === 0 ? "No listings posted yet — check back soon." : "Nothing matches that search."}
            </div>
          ) : (
            <>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, color: tokens.muted, marginBottom: 14 }}>
                {filteredJobs.length} open role{filteredJobs.length === 1 ? "" : "s"}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {filteredJobs.map((j) => (
                  <JobCard
                    key={j.id}
                    job={j}
                    onOpen={() => {
                      setActiveJob(j);
                      setView("details");
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {view === "details" && activeJob && (
        <JobDetail job={activeJob} onBack={() => setView("browse")} onApply={() => setView("apply")} />
      )}

      {view === "apply" && activeJob && (
        <ApplyView job={activeJob} onBack={() => setView("details")} onSubmitted={() => setView("submitted")} />
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
