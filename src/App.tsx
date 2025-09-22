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

        /* 🔹 Make only the first nav "Contact Us" gold */
        nav[aria-label="primary"] a.cta:first-of-type {
          color:#FFD700;
        }
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
          .nav-links{display:none}
          .menu-btn{display:inline-block}
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
      abortRef.current?.abort();
    };
  }, [canonical]);

  return (
    <div className="oddee">
      {/* HEADER / NAV */}
      <header className="nav">
        <div className="wrap nav-inner">
          {/* Brand */}
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
            <a className="cta" href="#contact">Contact Us</a>
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
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <nav className="nav-drawer wrap" aria-label="mobile">
            <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
            <a href="#approach" onClick={() => setMenuOpen(false)}>Approach</a>
            <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact Us</a>
          </nav>
        )}
      </header>

      {/* HERO */}
      {/* (rest of your code unchanged) */}
    </div>
  );
}
