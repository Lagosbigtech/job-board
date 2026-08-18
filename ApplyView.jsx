import React, { useRef, useState } from "react";
import { Eyebrow, Field, backLinkStyle, inputStyle, primaryBtn } from "./ui.jsx";
import { refCode } from "../lib/helpers.js";
import { supabase, RESUME_BUCKET } from "../lib/supabaseClient.js";

const OK_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export default function ApplyView({ job, onBack, onSubmitted }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    setError("");
    if (!f) return;
    if (!OK_TYPES.includes(f.type) && !/\.(pdf|doc|docx)$/i.test(f.name)) {
      setError("Please upload a PDF or Word document.");
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      setError("File is larger than 5MB — please upload a smaller version of your CV.");
      return;
    }
    setFile(f);
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim() || !file) {
      setError("Name, email, and a CV file are required.");
      return;
    }
    setSubmitting(true);
    try {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `${job.id}/${Date.now()}-${safeName}`;

      const { error: uploadError } = await supabase.storage.from(RESUME_BUCKET).upload(path, file, {
        contentType: file.type,
        upsert: false,
      });
      if (uploadError) throw uploadError;

      const { error: insertError } = await supabase.from("applications").insert({
        job_id: job.id,
        job_title: job.title,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        note: note.trim(),
        resume_path: path,
        resume_filename: file.name,
      });
      if (insertError) throw insertError;

      onSubmitted();
    } catch (err) {
      console.error(err);
      setError("Something went wrong submitting your application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "36px 20px 80px" }}>
      <button onClick={onBack} style={backLinkStyle}>
        ← All listings
      </button>

      <Eyebrow>#{refCode(job.id)} · APPLYING FOR</Eyebrow>
      <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 30, color: "#1B2430", margin: "6px 0 2px" }}>
        {job.title}
      </h2>
      <div style={{ fontFamily: "'Work Sans', sans-serif", color: "#7A7259", marginBottom: 28 }}>
        {job.company} · {job.location}
      </div>

      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Field label="Full name *">
          <input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
        </Field>
        <Field label="Email *">
          <input style={inputStyle} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@email.com" />
        </Field>
        <Field label="Phone">
          <input style={inputStyle} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 555-5555" />
        </Field>
        <Field label="Note to hiring team">
          <textarea
            style={{ ...inputStyle, minHeight: 90, resize: "vertical", fontFamily: "'Work Sans', sans-serif" }}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Anything you'd like to add (optional)"
          />
        </Field>
        <Field label="CV / résumé * (PDF or Word, under 5MB)">
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: "1.5px dashed #C9971F",
              borderRadius: 4,
              padding: "18px 16px",
              textAlign: "center",
              cursor: "pointer",
              fontFamily: "'Work Sans', sans-serif",
              fontSize: 14,
              color: file ? "#1B2430" : "#A69B7C",
              background: "#FBF8F0",
            }}
          >
            {file ? `Selected: ${file.name}` : "Click to choose a file"}
          </div>
          <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFile} style={{ display: "none" }} />
        </Field>

        {error && <div style={{ color: "#A33C2E", fontFamily: "'Work Sans', sans-serif", fontSize: 13.5 }}>{error}</div>}

        <button type="submit" disabled={submitting} style={{ ...primaryBtn, marginTop: 8, opacity: submitting ? 0.6 : 1 }}>
          {submitting ? "Submitting…" : "Submit application"}
        </button>
      </form>
    </div>
  );
}
