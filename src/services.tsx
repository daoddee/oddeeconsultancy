import React, { useEffect } from "react";

// CTA-only = "Contact Us"; UK energy + engineering forward
export default function Services({
  email = "info@oddeeconsultancy.co.uk",
  phone = "+447365155414",
  canonical = "https://oddeeconsultancy.co.uk/services",
}: {
  email?: string;
  phone?: string;
  canonical?: string;
}) {
  const telHref = `tel:${(phone || "").replace(/\s+/g, "")}`;
  const mailHref = `mailto:${email}`;

  useEffect(() => {
    const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
      if (!content) return;
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };

    document.title = "Services | Oddee Consulting — UK Engineering, Energy Audits & Net-Zero";
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
    link.href = canonical;

    setMeta("description","Engineering consultancy services across the UK: energy audits for manufacturing and businesses, net-zero planning, product optimisation, complex systems design, FEA, cost reduction, business growth, market research, data modelling, AI consulting, and website development.");
    setMeta("robots","index,follow");
    setMeta("og:title","Services — Oddee Consulting | UK Engineering & Net-Zero Consultancy","property");
    setMeta("og:description","Energy audits, net-zero plans, product optimisation, complex systems design, FEA, cost reduction, growth planning, market research, data & AI, websites.","property");
    setMeta("og:type","website","property");
    setMeta("og:url",canonical,"property");
    setMeta("twitter:card","summary_large_image");
    setMeta("twitter:title","Services — Oddee Consulting | UK Engineering & Net-Zero");
    setMeta("twitter:description","UK engineering services: energy audits, net-zero, optimisation, FEA, cost reduction, strategy, data & AI.");

    // 🔒 Force light theme & override dark styles
    document.documentElement.classList.remove("dark");
    document.body.style.background = "#ffffff";
    const styleId = "oddee-services-override";
    if (!document.getElementById(styleId)) {
      const s = document.createElement("style");
      s.id = styleId;
      s.textContent = `
        html, body, #root { background:#ffffff !important; }
        :root { color-scheme: light; }
        .services, .services section, .services footer, .services .card { background:#ffffff !important; }
        .services .section-head h2, .services .card h3 { color:#0A0F0D !important; }
        .services header.page-hero { background:#0F3A30 !important; color:#E8D7B1 !important; }
        .services header.page-hero h1 { color:#E8D7B1 !important; }
        .services .contact-bar { background:#0A0F0D !important; color:#E8D7B1 !important; }
        .services .contact-bar a { color:#E8D7B1 !important; }
        .services .muted { color:#5b667a !important; }
      `;
      document.head.appendChild(s);
    }

    // JSON-LD Service list
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Oddee Consulting Services",
      itemListElement: [
        "Energy Audit (Manufacturing & Business)",
        "Net-Zero Plan",
        "Product Optimisation (Material & Cost Reduction)",
        "Complex Systems Design",
        "FEA Analysis",
        "Business Development Plan",
        "Business Growth Plan",
        "Market Research (Sector Intelligence)",
        "Large Data Analysis & Modelling",
        "AI Models & App Consulting",
        "Website Development"
      ].map((name, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@type": "Service", name }
      }))
    };
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.text = JSON.stringify(jsonLd);
    document.head.appendChild(ld);
  }, [canonical]);

  return (
    <div className="services">
      <style>{`
        :root { --green:#0F3A30; --sand:#E8D7B1; --ink:#0A0F0D; --txt:#0b1220; }
        .services { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color:var(--txt); background:#fff; }
        *{box-sizing:border-box} .wrap{max-width:1180px;margin:0 auto;padding:0 20px}
        .cta{padding:10px 16px;border-radius:12px;border:1.5px solid var(--green);color:#fff;background:var(--green);text-decoration:none;display:inline-block}
        header.page-hero{background:var(--green);color:var(--sand);padding:64px 0}
        header.page-hero h1{font-size:42px;margin:8px 0;color:var(--sand)}
        nav.breadcrumb{font-size:13px;opacity:.85} nav.breadcrumb a{color:var(--sand)}
        section{padding:56px 0; background:#fff}
        .cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .card{border:1px solid #e9ebf0;border-radius:18px;padding:18px;background:#fff}
        .card h3{margin:0 0 6px;font-size:18px;color:var(--ink)}
        .muted{color:#5b667a}
        .pill{display:inline-block;padding:4px 10px;border-radius:999px;border:1px solid #d9dbe0;font-size:12px;margin-right:6px}
        .cluster{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}
        .section-head{display:flex;align-items:end;justify-content:space-between;gap:12px;flex-wrap:wrap}
        .section-head h2{font-size:28px;margin:0;color:var(--ink)}
        .contact-bar{background:var(--ink);color:var(--sand);padding:20px 0}
        .contact-bar a{color:var(--sand);text-decoration:none}
        footer{padding:32px 0;border-top:1px solid #eceff4;background:#fff}
        @media (max-width: 980px){ .cards{grid-template-columns:1fr} header.page-hero h1{font-size:32px} }
      `}</style>

      {/* HERO / INTRO */}
      <header className="page-hero">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a> · <span>Services</span>
          </nav>
          <h1>Services</h1>
          <p>
            UK engineering consultancy delivering energy audits, net-zero roadmaps,
            product optimisation, complex systems design, FEA, and cost reduction—
            backed by strategy, market research, data modelling, AI consulting, and
            pragmatic web delivery when useful.
          </p>
          <p style={{ marginTop: 14 }}>
            <a className="cta" href="#contact">Contact Us</a>
          </p>
        </div>
      </header>

      {/* ENERGY & NET-ZERO */}
      <section id="energy">
        <div className="wrap">
          <div className="section-head">
            <h2>Energy & Net-Zero</h2>
            <a className="cta" href="#contact">Contact Us</a>
          </div>
          <div className="cards" style={{ marginTop: 14 }}>
            <article className="card">
              <h3>Energy Audit (Manufacturing & Business)</h3>
              <p className="muted">On-site/remote audits to identify leaks, losses, and performance opportunities across utilities and processes.</p>
              <ul className="muted">
                <li>Leak detection (compressed air/steam), HVAC/process optimisation</li>
                <li>Load profiling, bill analysis, opportunity register (ESOS-ready)</li>
                <li>ROI & CO2e abatement for prioritised actions</li>
              </ul>
              <div className="cluster">
                <span className="pill">10–30% energy reduction</span>
                <span className="pill">Evidence pack</span>
                <span className="pill">M&V plan</span>
              </div>
              <p style={{ marginTop: 10 }}><a className="cta" href="#contact">Contact Us</a></p>
            </article>
            <article className="card">
              <h3>Net-Zero Plan</h3>
              <p className="muted">Carbon baselining, abatement curve, and sequenced roadmap to net-zero with governance.</p>
              <ul className="muted">
                <li>SECR/ESOS aligned baselines and targets</li>
                <li>Capex/opex modelling, funding & incentives review</li>
                <li>Delivery plan with risks, owners, and milestones</li>
              </ul>
              <div className="cluster">
                <span className="pill">SECR/ESOS aware</span>
                <span className="pill">Board-ready deck</span>
              </div>
              <p style={{ marginTop: 10 }}><a className="cta" href="#contact">Contact Us</a></p>
            </article>
          </div>
        </div>
      </section>

      {/* PRODUCT & ENGINEERING */}
      <section id="product">
        <div className="wrap">
          <div className="section-head">
            <h2>Product & Engineering</h2>
            <a className="cta" href="#contact">Contact Us</a>
          </div>
          <div className="cards" style={{ marginTop: 14 }}>
            <article className="card">
              <h3>Product Optimisation (Material & Cost Reduction)</h3>
              <p className="muted">Design-to-value and DFMA to minimise material waste and reduce unit cost without compromising quality.</p>
              <ul className="muted">
                <li>Value engineering, alternative materials, tolerance stacks</li>
                <li>Supplier/process change, make/buy, teardown benchmarking</li>
                <li>Cost-out wave plan with savings assurance</li>
              </ul>
              <div className="cluster">
                <span className="pill">5–20% cost-out</span>
                <span className="pill">DFMA</span>
              </div>
              <p style={{ marginTop: 10 }}><a className="cta" href="#contact">Contact Us</a></p>
            </article>
            <article className="card">
              <h3>Complex Systems Design</h3>
              <p className="muted">Architecture and integration for multi-disciplinary systems with clear interfaces and verification plans.</p>
              <ul className="muted">
                <li>Requirements, trade studies, safety & compliance</li>
                <li>Interface control, V&V plan, commissioning support</li>
                <li>Change and risk control with governance</li>
              </ul>
              <p style={{ marginTop: 10 }}><a className="cta" href="#contact">Contact Us</a></p>
            </article>
            <article className="card">
              <h3>FEA Analysis</h3>
              <p className="muted">Finite Element Analysis for structural, thermal, modal, and fatigue performance on critical components.</p>
              <ul className="muted">
                <li>Load cases, boundary conditions, meshing strategy</li>
                <li>Correlation with lab/field data where available</li>
                <li>Design recommendations and safety factors</li>
              </ul>
              <p style={{ marginTop: 10 }}><a className="cta" href="#contact">Contact Us</a></p>
            </article>
          </div>
        </div>
      </section>

      {/* STRATEGY & GROWTH */}
      <section id="strategy">
        <div className="wrap">
          <div className="section-head">
            <h2>Strategy & Growth</h2>
            <a className="cta" href="#contact">Contact Us</a>
          </div>
          <div className="cards" style={{ marginTop: 14 }}>
            <article className="card">
              <h3>Business Development Plan</h3>
              <p className="muted">Define ICP, value proposition, channel strategy, and pipeline model to open new revenue.</p>
              <ul className="muted">
                <li>Account plans, partner motions, funnel math</li>
                <li>Messaging, collateral, proposal playbook</li>
              </ul>
              <p style={{ marginTop: 10 }}><a className="cta" href="#contact">Contact Us</a></p>
            </article>
            <article className="card">
              <h3>Business Growth Plan</h3>
              <p className="muted">Operating cadence, OKRs, governance, and resourcing that scale delivery and margin.</p>
              <ul className="muted">
                <li>Org design, PMO, supplier optimisation</li>
                <li>Unit economics and scenario planning</li>
              </ul>
              <p style={{ marginTop: 10 }}><a className="cta" href="#contact">Contact Us</a></p>
            </article>
            <article className="card">
              <h3>Market Research (Sector Intelligence)</h3>
              <p className="muted">Decision-grade research to size markets, map competitors, and de-risk entry or expansion.</p>
              <ul className="muted">
                <li>TAM/SAM/SOM, win-loss, pricing scans</li>
                <li>Procurement and regulatory landscape</li>
              </ul>
              <p style={{ marginTop: 10 }}><a className="cta" href="#contact">Contact Us</a></p>
            </article>
          </div>
        </div>
      </section>

      {/* DATA, AI & WEB */}
      <section id="data-ai">
        <div className="wrap">
          <div className="section-head">
            <h2>Data, AI & Web (Enablement)</h2>
            <a className="cta" href="#contact">Contact Us</a>
          </div>
          <div className="cards" style={{ marginTop: 14 }}>
            <article className="card">
              <h3>Large Data Analysis & Modelling</h3>
              <p className="muted">Analytics, forecasting, and optimisation to support engineering and commercial decisions.</p>
              <ul className="muted">
                <li>ETL pipelines, dashboards, scenario models</li>
                <li>Measurement & verification frameworks</li>
              </ul>
              <p style={{ marginTop: 10 }}
