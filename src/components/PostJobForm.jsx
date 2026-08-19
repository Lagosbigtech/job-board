import React, { useState } from "react";
import { Eyebrow, Field, inputStyle, primaryBtn } from "./ui.jsx";
import { JOB_TYPES } from "../lib/helpers.js";
import { supabase } from "../lib/supabaseClient.js";

const EMPTY = { title: "", company: "", location: "", type: JOB_TYPES[0], salary: "", description: "" };

export default function PostJobForm({ onPosted }) {
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.company.trim() || !form.location.trim() || !form.description.trim()) {
      setErr("Title, company, location and description are required.");
      return;
    }
    setSaving(true);
    setErr("");
    const { error } = await supabase.from("jobs").insert(form);
    setSaving(false);
    if (error) {
      setErr("Couldn't save the listing — " + error.message);
      return;
    }
    setForm(EMPTY);
    onPosted();
  };

  return (
    <form
      onSubmit={submit}
      style={{ display: "flex", flexDirection: "column", gap: 14, background: "#FBF8F0", border: "1px solid #D8CDB0", borderRadius: 4, padding: 20 }}
    >
      <Eyebrow>Post a new listing</Eyebrow>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Field label="Job title *">
          <input style={inputStyle} value={form.title} onChange={set("title")} placeholder="Warehouse Associate" />
        </Field>
        <Field label="Company *">
          <input style={inputStyle} value={form.company} onChange={set("company")} placeholder="Rotime Media Hub" />
        </Field>
        <Field label="Location *">
          <input style={inputStyle} value={form.location} onChange={set("location")} placeholder="Atlanta, GA / Remote" />
        </Field>
        <Field label="Type">
          <select style={inputStyle} value={form.type} onChange={set("type")}>
            {JOB_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Salary (optional)">
          <input style={inputStyle} value={form.salary} onChange={set("salary")} placeholder="$18–22/hr" />
        </Field>
      </div>
      <Field label="Description *">
        <textarea
          style={{ ...inputStyle, minHeight: 100, resize: "vertical", fontFamily: "'Work Sans', sans-serif" }}
          value={form.description}
          onChange={set("description")}
          placeholder="What the role involves, requirements, schedule…"
        />
      </Field>
      {err && <div style={{ color: "#A33C2E", fontSize: 13.5, fontFamily: "'Work Sans', sans-serif" }}>{err}</div>}
      <button type="submit" disabled={saving} style={{ ...primaryBtn, alignSelf: "flex-start", opacity: saving ? 0.6 : 1 }}>
        {saving ? "Posting…" : "Post listing"}
      </button>
    </form>
  );
}
