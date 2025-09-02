// src/App.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";

type SubmitState = "idle" | "sending" | "sent" | "error";

export default function App(): JSX.Element {
  const email = "info@oddeeconsultancy.co.uk";
  const phone = "+447365155414";
  const canonical = "https://oddeeconsultancy.co.uk/";

  // Normalise tel: keep leading +, strip all non-digits after it
  const telHref = useMemo(() => {
    const normalised = phone.replace(/(?!^\+)[^\d]/g, "");
    return `tel:${normalised}`;
  }, [phone]);

  const mailHref = useMemo(() => `mailto:${email}`, [email]);

  // Contact form UX state
  const [status, setStatus] = useState<SubmitState>("idle");
  const [errMsg, setErrMsg] = useState<string>("");
  const abortRef = useRef<AbortController | null>(null);

  function validate(payload: {
    name: string;
    email: string;
    company: string;
    message: string;
  }): string | null {
    if (!payload.name || payload.name.length < 2) return "Please enter your full name.";
    if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email))
      return "Please enter a valid work email.";
    if (!payload.message || payload.message.length < 10)
      return "Please provide a short description of your project.";
    return null;
  }

  // Progressive-enhancement submit with timeout + graceful mailto fallback
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrMsg("");
    setStatus("sending");

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      company: String(fd.get("company") || "").trim(),
      message: String(fd.get("message") || "").trim(),
    };

    const validationError = validate(payload);
    if (validationError) {
      setStatus("error");
      setErrMsg(validationError);
      return;
    }

    // Abort any in-flight request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    // 10s network timeout
    const timeout = setTimeout(() => controller.abort(), 10_000);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      let data: any = {};
      try {
        data = await res.json();
      } catch {
        // ok if backend returns empty body (e.g., 204)
      }

      if (!res.ok || (data && data.ok === false)) {
        throw new Error(data?.error || `Failed to send (HTTP ${res.status})`);
      }

      setStatus("sent");
      (e.target as HTMLFormElement).reset();
    } catch (err: unknown) {
      clearTimeout(timeout);
      setStatus("error");
      const message =
        err instanceof DOMException && err.name === "AbortError"
          ? "Request timed out."
          : (err as any)?.message || "Could not reach the server.";
      setErrMsg(message);

      // Fallback to mailto only in the browser
      if (typeof window !== "undefined") {
        const subject = encodeURIComponent(`Website enquiry — ${payload.name}`);
        const body = encodeURIComponent(
          `Name: ${payload.name}\nEmail: ${payload.email}\nCompany: ${payload.company}\n\nMessage:\n${payload.message}\n`
        );
        window.location.href = `${mailHref}?subject=${subject}&body=${body}`;
      }
    }
  }

  // SEO + defensive light theme + mobile polish (browser-only)
  useEffect(() => {
    if (typeof document === "undefined") return;

    const setMeta = (
      name: string,
      content: string,
      attr: "name" | "property" = "name"
    ) => {
      if (!content) return;
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    document.title =
      "Oddee Consulting | UK Engineering Consultancy for Energy Efficiency & Net-Zero";

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonical;

    setMeta(
      "description",
      "Oddee Consulting: UK engineering design, problem solving, management consulting, material & cost reduction, and net-zero delivery."
    );
    setMeta("robots", "index,follow");
    setMeta("og:title", "Oddee Consulting — UK Energy & Net-Zero Engineering Consultancy", "property");
    setMeta("og:description", "Engineering design, problem solving, value engineering & emissions reduction across the UK.", "property");
    setMeta("og:type", "website", "property");
    setMeta("og:url", canonical, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "Oddee Consulting — Engineering for UK Energy & Net-Zero");
    setMeta("twitter:description", "UK engineering consultancy driving energy savings, emissions reduction and cost-out.");

    // Force a light surface even if a global dark theme is present
    document.documentElement.classList.remove("dark");
    document.body.style.background = "#ffffff";

    const styleId = "oddee-home-override";
    if (!document.getElementById(styleId)) {
      const s = document.createElement("style");
      s.id = styleId;
      s.textContent = `
        html, body, #root { background:#ffffff !important; }
        :root { color-scheme: light; }
        .oddee, .oddee section, .oddee footer, .oddee .card { background:#ffffff; }
        .oddee .section-head h2, .oddee .card h3, .oddee h1 { color:#0A0F0D; }
        .oddee .hero { background:#0F3A30; color:#E8D7B1; }
        .oddee .hero h1 { color:#E8D7B1; }
        .oddee .contact-bar { background:#0A0F0D; color:#E8D7B1; }
        .oddee .contact-bar a { color:#E8D7B1; }
        @media (max-width: 980px) {
          .nav-inner { padding: 12px 0; }
          .nav-inner nav { display:flex; flex-wrap:wrap; gap:10px; }
          .hero { padding: 56px 0; }
          .hero-grid { grid-template-columns: 1fr !important; gap:18px; }
          .cards { grid-template-columns: 1fr !important; }
          .two { grid-template-columns: 1fr !important; }
          .cta { width: 100%; text-align:center; }
          h1 { font-size: 32px !important; }
          .wrap { padding: 0 16px; }
        }
      `;
      document.head.appendChild(s);
    }

    return () => {
      // Clean up any in-flight request if component unmounts
      abortRef.current?.abort();
    };
  }, [canonical]);

  return (
    <div className="oddee">
      <style>{`
        :root { --green:#0F3A30; --sand:#E8D7B1; --ink:#0A0F0D; --txt:#0b1220; }
        .oddee { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color:var(--txt); }
        *{box-sizing:border-box}
        .wrap{max-width:1180px;margin:0 auto;padding:0 20px}
        header.nav{position:sticky;top:0;z-index:10;background:rgba(255,255,255,.96);backdrop-filter:saturate(160%) blur(8px);border-bottom:1px solid #eaeaea}
        .nav-inner{display:flex;align-items:center;justify-content:space-between;padding:14px 0}
        .brand-title .t1{color:var(--green);font-weight:700;letter-spacing:.04em}
        .brand-title .t2{color:var(--green);font-size:12px;letter-spacing:.18em;text-transform:uppercase}
        nav[aria-label="primary"] a{margin:0 14px;text-decoration:none;color:#2a2f39}
        .cta{padding:12px 16px;border-radius:12px;border:1.5px solid var(--green);color:#fff;background:var(--green);text-decoration:none;display:inline-block}
        .hero{background:var(--green);color:var(--sand);padding:72px 0}
        .hero-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:28px;align-items:center}
        .eyebrow{letter-spacing:.28em;text-transform:uppercase;font-size:12px;opacity:.9}
        h1{font-size:44px;line-height:1.1;margin:10px 0 14px}
        .lead{opacity:.95;line-height:1.7}
        .hero-ctas{display:flex;gap:12px;margin-top:20px}
        .hero-kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:26px}
        .kpi{font-size:26px;font-weight:650}
        .kpi-sub{font-size:12px;opacity:.85}
        .panel{border-radius:22px;background:#fff;color:#1c1f24;box-shadow:0 10px 30px rgba(0,0,0,.12);padding:22px}
        main section{padding:70px 0}
        .muted{color:#5b667a}
        .cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:22px}
        .card{border:1px solid #e9ebf0;border-radius:18px;padding:18px}
        .two{display:grid;grid-template-columns:1fr 1fr;gap:18px}
        .form{border:1px solid #e9ebf0;border-radius:18px;padding:18px;background:#fff}
        .input,.textarea{width:100%;padding:12px;border:1px solid #dfe3ea;border-radius:12px}
        .textarea{min-height:120px;resize:vertical}
        .stack{display:grid;gap:12px}
        footer.footer{background:var(--ink);color:var(--sand);padding:34px 0;margin-top:10px}
        .footer-inner{display:flex;justify-content:space-between;align-items:center}
        @media (max-width:600px){
          nav[aria-label="primary"] a{margin:0 10px}
          .kpi{font-size:22px}
          .panel{padding:16px}
        }
      `}</style>

      {/* HEADER / NAV */}
      <header className="nav">
        <div className="wrap nav-inner">
          <a href="/" className="brand" aria-label="Oddee Consulting home">
            <span className="brand-title">
              <span className="t1">ODDEE</span><br />
              <span className="t2">Consulting</span>
            </span>
          </a>
          <nav aria-label="primary">
            <a href="#services">Services</a>
            <a href="#approach">Approach</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact Us</a>
          </nav>
          <a className="cta" href="#contact">Contact Us</a>
        </div>
      </header>

      {/* HERO */}
      <section className="hero" id="top" aria-label="UK energy efficiency and net-zero consulting">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">UK ENERGY • ENGINEERING • NET-ZERO</p>
            <h1>Engineering consultancy for UK energy efficiency and emissions reduction.</h1>
            <p className="lead">
              We specialise in engineering design, solving hard engineering problems,
              management consulting, and material/cost reduction—while helping organisations
              decarbonise toward net-zero. AI & web are adjacent accelerators, not the headline.
            </p>
            <div className="hero-ctas">
              <a className="cta" href="#contact" style={{ background: "var(--sand)", color: "#0A0F0D", borderColor: "var(--sand)" }}>
                Contact Us
              </a>
            </div>
            <div className="hero-kpis" aria-label="Key results">
              <div><div className="kpi">10–30%</div><div className="kpi-sub">Typical site energy reduction</div></div>
              <div><div className="kpi">5–20%</div><div className="kpi-sub">Cost-out via value engineering</div></div>
              <div><div className="kpi">&lt;12 weeks</div><div className="kpi-sub">Time-to-value for priority fixes</div></div>
            </div>
          </div>

          <aside className="panel" aria-label="Engagement roadmap">
            <strong>Delivery roadmap</strong>
            <ul>
              {[
                ["Audit & Baseline", "Energy/asset audit, bill analysis, opportunity register (ESOS-ready)."],
                ["Design & Model", "CAD/FEA as needed, options & business case, sequence of works."],
                ["Deliver & Integrate", "Procurement support, installation oversight, automation/data hooks."],
                ["Verify & Optimise", "M&V, dashboards, savings assurance, continuous improvement."],
              ].map(([t, d]) => (
                <li key={t}>
                  <span aria-hidden style={{ marginRight: 8 }}>✓</span>
                  <span style={{ fontWeight: 600 }}>{t}</span>
                  <div className="muted">{d}</div>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 16 }}><a className="cta" href="#contact">Contact Us</a></div>
          </aside>
        </div>
      </section>

      <main>
        {/* SERVICES SUMMARY */}
        <section id="services" aria-label="Core services">
          <div className="wrap">
            <h2 style={{ fontSize: 36, margin: 0 }}>Core engineering services</h2>
            <p className="muted" style={{ marginTop: 8 }}>
              Outcome-driven, standards-aligned delivery across the UK.
            </p>
            <div className="cards" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
              {[
                ["Engineering Design", "Concept → detail design, drawings, DFMA, compliance, verification."],
                ["Problem Solving", "Root cause, reliability, test plans, remediation with evidence."],
                ["Management Consulting", "Operating cadence, PMO, suppliers, governance, make/buy."],
                ["Material & Cost Reduction", "Value engineering, process optimisation, alt materials."],
                ["Energy Audits & ESOS", "Opportunity registers, ROI/CO2e modelling, evidence packs."],
                ["Net-Zero Roadmaps", "SECR support, carbon baselining, abatement curve, sequencing."],
                ["Implementation & M&V", "Installation oversight, commissioning, measurement & verification."],
                ["Digital Enablement (adjacent)", "Lightweight automation & dashboards when useful."],
              ].map(([h, b]) => (
                <article className="card" key={h}>
                  <h3>{h}</h3>
                  <p className="muted">{b}</p>
                  <p style={{ marginTop: 10 }}><a className="cta" href="#contact">Contact Us</a></p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* APPROACH */}
        <section id="approach" aria-label="Our approach">
          <div className="wrap">
            <h2 style={{ fontSize: 36, margin: 0 }}>Approach that de-risks delivery</h2>
            <p className="muted">Pragmatic methodology that compresses time-to-value and locks in energy & cost savings.</p>
            <div className="cards" style={{ gridTemplateColumns: "1fr 1fr" }}>
              {[
                ["Discover", "Baseline cost & CO2e, constraints, business case (ESOS/SECR-aware)."],
                ["Design", "Options, engineering design, procurement spec, safety & compliance."],
                ["Deliver", "Install, commission, operator training, documentation."],
                ["Optimise", "M&V, dashboards, continuous improvement, savings assurance."],
              ].map(([h, b], i) => (
                <div className="card" key={h}>
                  <div className="muted" style={{ textTransform: "uppercase", fontSize: 12 }}>Phase {i + 1}</div>
                  <h3>{h}</h3>
                  <p className="muted">{b}</p>
                  <p style={{ marginTop: 10 }}><a className="cta" href="#contact">Contact Us</a></p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" aria-label="Frequently asked questions">
          <div className="wrap">
            <h2 style={{ fontSize: 36, margin: 0 }}>FAQ</h2>
            <div className="cards">
              {[
                ["Do you cover ESOS/SECR?", "Yes. Evidence packs and roadmaps aligned to ESOS/SECR, prioritising projects by ROI & CO2e impact."],
                ["How fast can we see savings?", "Priority fixes often land within 6–12 weeks depending on scope and procurement."],
                ["Do you work nationwide?", "Yes, we operate across the UK and support multi-site estates."],
              ].map(([q, a]) => (
                <article className="card" key={q}>
                  <h3>{q}</h3>
                  <p className="muted">{a}</p>
                </article>
              ))}
            </div>
            <p style={{ marginTop: 16 }}>
              <a className="cta" href="#contact">Contact Us</a>
            </p>
          </div>
        </section>
      </main>

      {/* CONTACT */}
      <section id="contact" className="contact-bar" aria-label="Contact Oddee Consulting">
        <div className="wrap two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <div>
            <h2 style={{ fontSize: 32, margin: 0, color: "var(--sand)" }}>Speak to an engineer</h2>
            <p className="muted" style={{ color: "#f1e7cf" }}>
              Share your constraints and KPIs. We’ll map options and the fastest, lowest-risk route to value.
            </p>
            <address style={{ marginTop: 16 }}>
              📞 <a href={telHref} style={{ color: "inherit", textDecoration: "none" }}>{phone}</a><br />
              ✉️ <a href={mailHref} style={{ color: "inherit", textDecoration: "none" }}>{email}</a><br />
              📍 United Kingdom
            </address>
          </div>

          {/* Progressive-enhancement contact form */}
          <form className="form stack" onSubmit={onSubmit} autoComplete="off" noValidate>
            <input className="input" name="name" placeholder="Full name" required aria-label="Full name" />
            <input className="input" type="email" name="email" placeholder="Work email" required aria-label="Work email" />
            <input className="input" name="company" placeholder="Company" aria-label="Company" />
            <textarea className="textarea" name="message" placeholder="Describe your energy or engineering challenge" required aria-label="Project description"></textarea>
            <button className="cta" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Contact Us"}
            </button>
            {status === "sent" && (
              <small className="muted" style={{ color: "#d1fae5" }}>
                Thanks — we’ve recorded your enquiry. We’ll reply shortly.
              </small>
            )}
            {status === "error" && (
              <small className="muted" style={{ color: "#fde68a" }}>
                {errMsg || "Couldn’t reach the server; we opened your email client as a fallback."}
              </small>
            )}
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="wrap footer-inner">
          <p className="muted" style={{ color: "var(--sand)" }}>
            © {new Date().getFullYear()} Oddee Consulting. UK Engineering Consultancy for Energy & Net-Zero.
          </p>
          <div style={{ display: "flex", gap: 18 }}>
            <a href="#services" style={{ color: "var(--sand)", textDecoration: "none" }}>Services</a>
            <a href="#approach" style={{ color: "var(--sand)", textDecoration: "none" }}>Approach</a>
            <a href="#contact" style={{ color: "var(--sand)", textDecoration: "none" }}>Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
