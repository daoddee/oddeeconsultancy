import React, { useState } from "react";

export default function ContactForm(): JSX.Element {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [err, setErr] = useState("");
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "", hp: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErr("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          company: form.company.trim(),
          message: form.message.trim(),
          hp: form.hp, // honeypot
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed to send");
      setStatus("success");
      setForm({ name: "", email: "", company: "", message: "", hp: "" });
    } catch (e: any) {
      setStatus("error");
      setErr(e.message || "Unknown error");
    }
  };

  return (
    <form className="form stack" onSubmit={onSubmit} autoComplete="off" noValidate>
      <input className="input" name="name" placeholder="Full name" required value={form.name} onChange={onChange} aria-label="Full name" />
      <input className="input" type="email" name="email" placeholder="Work email" required value={form.email} onChange={onChange} aria-label="Work email" />
      <input className="input" name="company" placeholder="Company" value={form.company} onChange={onChange} aria-label="Company" />
      {/* Honeypot (hidden) */}
      <input className="input" name="hp" value={form.hp} onChange={onChange} style={{ display: "none" }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <textarea className="textarea" name="message" placeholder="Describe your energy or engineering challenge" required value={form.message} onChange={onChange} aria-label="Project description" />
      <button className="cta" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Contact Us"}
      </button>
      {status === "success" && (
        <small className="muted">Thanks — we’ve received your enquiry and emailed <strong>info@oddeeconsultancy.co.uk</strong>.</small>
      )}
      {status === "error" && (
        <small className="muted" style={{ color: "#b91c1c" }}>
          Sorry, something went wrong: {err}. You can also email <a href="mailto:info@oddeeconsultancy.co.uk">info@oddeeconsultancy.co.uk</a>.
        </small>
      )}
    </form>
  );
}
