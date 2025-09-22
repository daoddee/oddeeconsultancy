// src/App.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";

type SubmitState = "idle" | "sending" | "sent" | "error";

export default function App(): JSX.Element {
  const email = "info@oddeeconsultancy.co.uk";
  const phone = "+447365155414";
  const canonical = "https://oddeeconsultancy.co.uk/";

  // Mobile menu state
  const [menuOpen, setMenuOpen] = useState(false);

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
      "Oddee Consulting | Stop Greenwashing. Win Trust. Fast, Accurate Scope 1–3.";

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonical;

    setMeta(
      "description",
      "Fast, accurate Scope 1, 2 & 3 emissions reporting that saves money, reduces risk, and protects your reputation. No greenwash. Real results."
    );
    setMeta("robots", "index,follow");
    setMeta("og:title", "Oddee Consulting — Fast, Accurate Emissions Reporting", "property");
    setMeta(
      "og:description",
      "Stop greenwashing. Start winning trust. Evidence-backed carbon baselining and roadmaps with a simple 3-step plan.",
      "property"
    );
    setMeta("og:type", "website", "property");
    setMeta("og:url", canonical, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "Oddee Consulting — Stop Greenwashing. Win Trust.");
    setMeta(
      "twitter:description",
      "Scope 1–3 done right: fast, accurate, audit-ready. Save money. Reduce risk. Future-proof your business."
    );

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

        /* Base */
        .oddee { background:#fff; color:#0b1220; }

        /* Header */
        header.nav{position:sticky;top:0;z-index:20;background:rgba(255,255,255,.96);
          backdrop-filter:saturate(160%) blur(8px);border-bottom:1px solid #eaeaea}
        .nav-inner{display:flex;align-items:center;justify-content:space-between;padding:14px 0}
        .brand{display:flex;align-items:center;gap:10px;text-decoration:none}
        .brand-title .t1{color:#0F3A30;font-weight:700;letter-spacing:.04em}
        .brand-title .t2{color:#0F3A30;font-size:12px;letter-spacing:.18em;text-transform:uppercase}
        nav[aria-label="primary"] a{margin:0 14px;text-decoration:none;color:#2a2f39}
        .cta{padding:12px 16px;border-radius:12px;border:1.5px solid #0F3A30;color:#fff;background:#0F3A30;text-decoration:none;display:inline-block}

        /* Only the first header-nav "Contact Us" text colour + hover */
       nav[aria-label="primary"] a.cta:first-of-type { color:#fff; }
        nav[aria-label="primary"] a.cta:first-of-type:hover {
          color:#fff;
          background:#0b1220;
          border-color:#0b1220;
        }

        /* Mobile nav */
        .menu-btn{display:none;border:1px solid #dfe3ea;border-radius:10px;padding:8px 10px;background:#fff}
        .menu-icon{width:22px;height:2px;background:#0A0F0D;position:relative;display:block}
        .menu-icon::before,.menu-icon::after{content:"";position:absolute;left:0;width:22px;height:2px;background:#0A0F0D}
        .menu-icon::before{top:-6px}.menu-icon::after{top:6px}
        .nav-links{display:flex;align-items:center;gap:8px}
        .nav-drawer{display:none}

        /* Hero */
        .hero{background:#0F3A30;color:#E8D7B1;padding:72px 0}
        .hero h1{color:#E8D7B1}
        .hero-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:28px;align-items:center}
        .eyebrow{letter-spacing:.28em;text-transform:uppercase;font-size:12px;opacity:.9}
        h1{font-size:44px;line-height:1.1;margin:10px 0 14px}
        .lead{opacity:.95;line-height:1.7}

        /* Cards / Sections */
        .wrap{max-width:1180px;margin:0 auto;padding:0 20px}
        .panel{border-radius:22px;background:#fff;color:#1c1f24;box-shadow:0 10px 30px rgba(0,0,0,.12);padding:22px}
        main section{padding:70px 0}
        .muted{color:#5b667a}
        .cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:22px}
        .card{border:1px solid #e9ebf0;border-radius:18px;padding:18px}
        .two{display:grid;grid-template-columns:1fr 1fr;gap:18px}

        /* Form */
        .form{border:1px solid #e9ebf0;border-radius:18px;padding:18px;background:#fff}
        .input,.textarea{width:100%;padding:12px;border:1px solid #dfe3ea;border-radius:12px}
        .textarea{min-height:120px;resize:vertical}
        .stack{display:grid;gap:12px}

        /* Footer */
        footer.footer{background:#0A0F0D;color:#E8D7B1;padding:34px 0;margin-top:10px}
        .footer-inner{display:flex;justify-content:space-between;align-items:center}

        /* Responsive */
        @media (max-width: 980px) {
          .nav-links{display:none}           /* hide desktop links */
          .menu-btn{display:inline-block}    /* show burger */
          .hero{padding:56px 0}
          .hero-grid{grid-template-columns:1fr !important;gap:18px}
          .cards{grid-template-columns:1fr !important}
          .two{grid-template-columns:1fr !important}
          .cta{width:100%;text-align:center}
          h1{font-size:32px !important}
          .wrap{padding:0 16px}
          .nav-drawer{display:block;position:absolute;left:0;right:0;top:60px;background:#fff;border-bottom:1px solid #eaeaea}
          .nav-drawer a{display:block;padding:14px 20px;border-top:1px solid #f1f3f6;text-decoration:none;color:#2a2f39}
        }

        @media (max-width:600px){
          .kpi{font-size:22px}
          .panel{padding:16px}
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
     {/* HEADER / NAV */}
<header className="nav">
  <div className="wrap nav-inner">
    {/* Brand with YOUR logo (place logo.png in /public) */}
    <a href="/" className="brand" aria-label="Oddee Consulting home">
      <img
        src="/logo.png"
        alt="Oddee Consulting Logo"
        width="40"
        height="40"
        style={{ display: "block" }}
      />
      <span className="brand-title">
        <span className="t1">ODDEE</span><br />
        <span className="t2">Consulting</span>
      </span>
    </a>

    {/* Desktop links */}
    <nav className="nav-links" aria-label="primary">
      <a href="#services">Services</a>
      <a href="#approach">Approach</a>
      <a href="#faq">FAQ</a>
      <a
        className="cta"
        href="#contact"
        style={{ background: "#ffffff", color: "#0F3A30", borderColor: "#0F3A30" }}
      >
        Get a Report
      </a>
    </nav>

    {/* Mobile hamburger */}
    <button
      className="menu-btn"
      aria-label="Toggle navigation"
      aria-expanded={menuOpen}
      onClick={() => setMenuOpen((v) => !v)}
    >
      <span className="menu-icon" />
    </button>
  </div> {/* ✅ closes .wrap.nav-inner */}

  {/* Mobile drawer (only visible under 980px) */}
  {menuOpen && (
    <nav className="nav-drawer wrap" aria-label="mobile">
      <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
      <a href="#approach" onClick={() => setMenuOpen(false)}>Approach</a>
      <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
      <a
        href="#contact"
        onClick={() => setMenuOpen(false)}
        className="cta"
        style={{ background: "#ffffff", color: "#0F3A30", borderColor: "#0F3A30" }}
      >
        Get a Report
      </a>
    </nav>
  )}
</header>
      {/* HERO */}
      <section className="hero" id="top" aria-label="UK energy efficiency and net-zero consulting">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">UK ENERGY • ENGINEERING • NET-ZERO</p>
            <h1>Stop greenwashing. Start winning trust.</h1>
            <p className="lead">
              Fast, accurate Scope 1, 2 &amp; 3 emissions reporting — so you save money,
              reduce risk, and future-proof your business. We guide you with a simple
              plan and evidence you can stand behind.
            </p>
            <div className="hero-ctas">
              <a className="cta" href="#contact" style={{ background: "#E8D7B1", color: "#0A0F0D", borderColor: "#E8D7B1" }}>
                Get Your Certified Report
              </a>
            </div>
            <div className="hero-kpis" aria-label="Key results" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, marginTop: 26 }}>
              <div><div className="kpi" style={{ fontSize: 26, fontWeight: 650 }}>10–30%</div><div className="kpi-sub" style={{ fontSize: 12, opacity: .85 }}>Typical energy cost reduction</div></div>
              <div><div className="kpi" style={{ fontSize: 26, fontWeight: 650 }}>Audit-ready</div><div className="kpi-sub" style={{ fontSize: 12, opacity: .85 }}>ESOS/SECR evidence packs</div></div>
              <div><div className="kpi" style={{ fontSize: 26, fontWeight: 650 }}>&lt;12 weeks</div><div className="kpi-sub" style={{ fontSize: 12, opacity: .85 }}>Time to verified savings</div></div>
            </div>
          </div>

          <aside className="panel" aria-label="Engagement roadmap">
            <strong>3-step plan to proof &amp; savings</strong>
            <ul>
              {[
                ["Audit & Baseline", "We establish a defensible baseline: bills, assets, Scope 1–3, and an opportunity register."],
                ["Design & Model", "We size the wins: options, ROI & CO2e impact, business case, sequence of works."],
                ["Deliver & Verify", "Procurement support, install oversight, M&V dashboards — no greenwash, just results."],
                ["Optimise", "Lock in savings with continuous improvement and assurance reporting."]
              ].map(([t, d]) => (
                <li key={t}>
                  <span aria-hidden style={{ marginRight: 8 }}>✓</span>
                  <span style={{ fontWeight: 600 }}>{t}</span>
                  <div className="muted">{d}</div>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 16 }}><a className="cta" href="#contact">Start the Plan</a></div>
          </aside>
        </div>
      </section>

      <main>
        {/* SERVICES SUMMARY */}
        <section id="services" aria-label="Core services">
          <div className="wrap">
            <h2 style={{ fontSize: 36, margin: 0 }}>Problems we solve — and what you get</h2>
            <p className="muted" style={{ marginTop: 8 }}>
              Make money, save money, reduce risk. Outcome-driven, standards-aligned delivery across the UK.
            </p>
            <div className="cards" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
              {[
                ["Engineering Design", "Concept → detail design, drawings, DFMA, compliance, verification — from idea to implemented."],
                ["Problem Solving", "Root cause, reliability, test plans, and fixes that stick — with evidence you can show stakeholders."],
                ["Management Consulting", "Operating cadence, PMO, suppliers, governance, make/buy — de-risk execution and speed decisions."],
                ["Material & Cost Reduction", "Value engineering, process optimisation, alternative materials — cut cost without cutting quality."],
                ["Energy Audits & ESOS", "Opportunity registers, ROI/CO2e modelling, audit-ready evidence packs — no surprises on review."],
                ["Net-Zero Roadmaps", "Carbon baselining, abatement curve, sequencing — credible paths to targets without fluff."],
                ["Implementation & M&V", "Install oversight, commissioning, measurement & verification — prove savings, not promises."],
                ["Digital Enablement (adjacent)", "Lightweight automation & dashboards where it saves time or reduces errors — no bloatware."]
              ].map(([h, b]) => (
                <article className="card" key={h}>
                  <h3>{h}</h3>
                  <p className="muted">{b}</p>
                  <p style={{ marginTop: 10 }}><a className="cta" href="#contact">Get a Report</a></p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* APPROACH */}
        <section id="approach" aria-label="Our approach">
          <div className="wrap">
            <h2 style={{ fontSize: 36, margin: 0 }}>A guide, not a hero — method that de-risks delivery</h2>
            <p className="muted">Clear plan, faster time-to-value, and audit-ready outputs that stakeholders trust.</p>
            <div className="cards" style={{ gridTemplateColumns: "1fr 1fr" }}>
              {[
                ["Discover", "Establish baseline cost & CO2e, map constraints, build the business case (ESOS/SECR-aware)."],
                ["Design", "Right-size the solutions: options, engineering design, procurement spec, safety & compliance."],
                ["Deliver", "Oversee install & commissioning, train operators, document everything for audit and handover."],
                ["Optimise", "Measurement & verification, dashboards, continuous improvement to lock in and grow savings."]
              ].map(([h, b], i) => (
                <div className="card" key={h}>
                  <div className="muted" style={{ textTransform: "uppercase", fontSize: 12 }}>Phase {i + 1}</div>
                  <h3>{h}</h3>
                  <p className="muted">{b}</p>
                  <p style={{ marginTop: 10 }}><a className="cta" href="#contact">Talk to the Team</a></p>
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
                ["Is this ESOS/SECR compliant?", "Yes. We deliver audit-ready evidence packs and roadmaps aligned to ESOS/SECR with projects prioritised by ROI and CO2e impact."],
                ["How quickly do we see results?", "Most clients see priority fixes land within 6–12 weeks depending on scope and procurement — with measurable savings."],
                ["Do you work nationwide?", "Yes. We support single sites and multi-site estates across the UK with consistent methodology and governance."],
              ].map(([q, a]) => (
                <article className="card" key={q}>
                  <h3>{q}</h3>
                  <p className="muted">{a}</p>
                </article>
              ))}
            </div>
            <p style={{ marginTop: 16 }}>
              <a className="cta" href="#contact">Book a Free Consultation</a>
            </p>
          </div>
        </section>
      </main>

      {/* CONTACT */}
      <section id="contact" className="contact-bar" aria-label="Contact Oddee Consulting">
        <div className="wrap two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <div>
            <h2 style={{ fontSize: 32, margin: 0, color: "#E8D7B1" }}>Speak to a specialist</h2>
            <p className="muted" style={{ color: "#f1e7cf" }}>
              Tell us your constraints and KPIs. We’ll give you a 3-step plan to achieve
              fast, verifiable savings and an audit-ready emissions report — without the stress.
            </p>
            <address style={{ marginTop: 16 }}>
              📞 <a href={telHref} style={{ color: "inherit", textDecoration: "none" }}>{phone}</a><br />
              ✉️ <a href={mailHref} style={{ color: "inherit", textDecoration: "none" }}>{email}</a><br />
              📍 82a High Street
              London
              NW10 4SJ
              United Kingdom
            </address>
          </div>

          {/* Progressive-enhancement contact form */}
          <form className="form stack" onSubmit={onSubmit} autoComplete="off" noValidate>
            <input className="input" name="name" placeholder="Full name" required aria-label="Full name" />
            <input className="input" type="email" name="email" placeholder="Work email" required aria-label="Work email" />
            <input className="input" name="company" placeholder="Company" aria-label="Company" />
            <textarea className="textarea" name="message" placeholder="What are you trying to solve? (Scope 1–3, ESOS/SECR, energy costs…)" required aria-label="Project description"></textarea>
            <button className="cta" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Get Your Certified Report"}
            </button>
            {status === "sent" && (
              <small className="muted" style={{ color: "#d1fae5" }}>
                Thanks — your enquiry is in. We’ll respond shortly with next steps.
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
          <p className="muted" style={{ color: "#E8D7B1" }}>
            © {new Date().getFullYear()} Oddee Consulting. Fast, accurate emissions reporting and engineering delivery — UK-wide.
          </p>
          <div style={{ display: "flex", gap: 18 }}>
            <a href="#services" style={{ color: "#E8D7B1", textDecoration: "none" }}>Services</a>
            <a href="#approach" style={{ color: "#E8D7B1", textDecoration: "none" }}>Approach</a>
            <a href="#contact" style={{ color: "#E8D7B1", textDecoration: "none" }}>Get a Report</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
