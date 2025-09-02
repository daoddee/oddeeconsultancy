// src/App.tsx
import React, { useEffect } from "react";

export default function App(): JSX.Element {
  const email = "info@oddeeconsultancy.co.uk";
  const phone = "+447365155414";
  const telHref = `tel:${phone.replace(/\s+/g, "")}`;
  const mailHref = `mailto:${email}`;
  const canonical = "https://oddeeconsultancy.co.uk/";

  // SEO: set meta on mount (Vite SPA)
  useEffect(() => {
    const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
      if (!content) return;
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    document.title = "Oddee Consulting | UK Engineering Consultancy for Energy Efficiency & Net-Zero";
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
    link.href = canonical;

    setMeta("description", "UK engineering consultancy focused on energy efficiency, emissions reduction, value engineering and cost reduction. We design, solve, and deliver net-zero outcomes.");
    setMeta("robots", "index,follow");
    setMeta("og:title", "Oddee Consulting — UK Energy & Net-Zero Engineering Consultancy", "property");
    setMeta("og:description", "Engineering design, problem solving, management consulting, material & cost reduction, and net-zero delivery across the UK.", "property");
    setMeta("og:type", "website", "property");
    setMeta("og:url", canonical, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "Oddee Consulting — Engineering for UK Energy & Net-Zero");
    setMeta("twitter:description", "UK engineering consultancy driving energy savings, emissions reduction and cost-out.");

    const addJson = (data: object) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.text = JSON.stringify(data);
      document.head.appendChild(s);
    };
    addJson({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Oddee Consulting",
      areaServed: "United Kingdom",
      url: canonical,
      telephone: phone,
      email,
      serviceType: [
        "Engineering Design","Engineering Problem Solving","Management Consulting",
        "Material Reduction","Cost Reduction","Net-Zero & Decarbonisation"
      ]
    });
  }, []);

  return (
    <div className="oddee">
      <style>{`
        :root { --green:#0F3A30; --sand:#E8D7B1; --ink:#0A0F0D; --txt:#0b1220; }
        .oddee { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color:var(--txt); background:#fff; }
        *{box-sizing:border-box} .wrap{max-width:1180px;margin:0 auto;padding:0 20px}
        header.nav{position:sticky;top:0;z-index:10;background:rgba(255,255,255,.96);backdrop-filter:saturate(160%) blur(8px);border-bottom:1px solid #eaeaea}
        .nav-inner{display:flex;align-items:center;justify-content:space-between;padding:14px 0}
        .brand{display:flex;align-items:center;gap:10px}
        .brand-title .t1{color:var(--green);font-weight:700;letter-spacing:.04em}
        .brand-title .t2{color:var(--green);font-size:12px;letter-spacing:.18em;text-transform:uppercase}
        nav[aria-label="primary"] a{margin:0 14px;text-decoration:none;color:#2a2f39}
        .cta{padding:10px 16px;border-radius:12px;border:1.5px solid var(--green);color:#fff;background:var(--green);text-decoration:none;display:inline-block}
        .hero{background:var(--green);color:var(--sand);padding:72px 0}
        .hero-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:28px;align-items:center}
        .eyebrow{letter-spacing:.28em;text-transform:uppercase;font-size:12px;opacity:.9}
        h1{font-size:44px;line-height:1.1;margin:10px 0 14px} .lead{opacity:.95;line-height:1.7}
        .hero-ctas{display:flex;gap:12px;margin-top:20px}
        .hero-kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:26px}
        .kpi{font-size:26px;font-weight:650} .kpi-sub{font-size:12px;opacity:.85}
        .panel{border-radius:22px;background:#fff;color:#1c1f24;box-shadow:0 10px 30px rgba(0,0,0,.12);padding:22px}
        main section{padding:70px 0} .dark{background:var(--ink);color:#fff} .muted{color:#5b667a}
        .cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:22px}
        .card{border:1px solid #e9ebf0;border-radius:18px;padding:18px}
        .chips{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:22px}
        .chip{border-radius:16px;border:1px solid rgba(255,255,255,.24);background:rgba(255,255,255,.06);padding:12px}
        .two{display:grid;grid-template-columns:1fr 1fr;gap:18px}
        .insights-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:22px}
        .insight{background:#fff;color:#222;border-radius:18px;padding:18px;border:1px solid #e9ebf0}
        .form{border:1px solid #e9ebf0;border-radius:18px;padding:18px}
        .input,.textarea{width:100%;padding:12px;border:1px solid #dfe3ea;border-radius:12px}
        .textarea{min-height:120px;resize:vertical} .stack{display:grid;gap:12px}
        footer.footer{background:var(--ink);color:var(--sand);padding:34px 0;margin-top:10px}
        .footer-inner{display:flex;justify-content:space-between;align-items:center}
        @media (max-width:980px){ .hero-grid{grid-template-columns:1fr} .cards{grid-template-columns:1fr} .chips{grid-template-columns:1fr 1fr} .two{grid-template-columns:1fr} .insights-cards{grid-template-columns:1fr} h1{font-size:34px} .hero{padding:56px 0} }
      `}</style>

      {/* HEADER / NAV */}
      <header className="nav">
        <div className="wrap nav-inner">
          <a href="#top" className="brand" aria-label="Oddee Consulting home">
            <div className="brand-title"><span className="t1">ODDEE</span><br/><span className="t2">Consulting</span></div>
          </a>
          <nav aria-label="primary">
            <a href="#services">Services</a>
            <a href="#sectors">Sectors</a>
            <a href="#approach">Approach</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
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
            <p className="lead">We design, solve, and deliver: engineering design, problem solving, management consulting, and value engineering for material & cost reduction. We run energy audits, decarbonisation roadmaps, and implementation with measurable ROI.</p>
            <div className="hero-ctas">
              <a className="cta" href="#contact" style={{background:"var(--sand)",color:"#0A0F0D",borderColor:"var(--sand)"}}>Contact Us</a>
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
                ["Audit & Baseline","Energy/asset audit, bill analysis, opportunity register (ESOS-ready)."],
                ["Design & Model","CAD/FEA as needed, options & business case, sequence of works."],
                ["Deliver & Integrate","Procurement support, installation oversight, automation/data hooks."],
                ["Verify & Optimise","M&V, dashboards, savings assurance, continuous improvement."],
              ].map(([t,d]) => (
                <li key={t}><span className="tick">✓</span><div><div style={{fontWeight:600}}>{t}</div><div className="muted">{d}</div></div></li>
              ))}
            </ul>
            <div style={{marginTop:16}}><a className="cta" href="#contact">Contact Us</a></div>
          </aside>
        </div>
      </section>

      <main>
        {/* SERVICES */}
        <section id="services" aria-label="Core services">
          <div className="wrap">
            <h2 style={{fontSize:36,margin:0}}>Core engineering services</h2>
            <p className="muted" style={{marginTop:8}}>Outcome-driven, standards-aligned delivery across the UK.</p>
            <div className="cards" style={{gridTemplateColumns:"repeat(4,1fr)"}}>
              {[
                ["Engineering Design","Concept → detail design, drawings, DFMA, compliance, verification."],
                ["Problem Solving","Root cause, reliability, test plans, remediation with evidence."],
                ["Management Consulting","Operating cadence, PMO, suppliers, governance, make/buy."],
                ["Material & Cost Reduction","Value engineering, process optimisation, alt materials."],
                ["Energy Audits & ESOS","Opportunity registers, ROI/CO2e modelling, evidence packs."],
                ["Net-Zero Roadmaps","SECR support, carbon baselining, abatement curve, sequencing."],
                ["Implementation & M&V","Installation oversight, commissioning, measurement & verification."],
                ["Digital Enablement (adjacent)","Lightweight automation and dashboards when useful."],
              ].map(([h,b]) => (
                <article className="card" key={h}>
                  <h3>{h}</h3><p className="muted">{b}</p>
                  <p style={{marginTop:10}}><a className="cta" href="#contact">Contact Us</a></p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTORS */}
        <section id="sectors" className="dark" aria-label="Sectors">
          <div className="wrap two">
            <div>
              <h2 style={{fontSize:36,margin:0}}>Where we operate</h2>
              <p className="muted" style={{color:"#cbd5e1"}}>Utilities, industrial sites, campuses & estates across the United Kingdom.</p>
            </div>
            <div style={{textAlign:"right"}}><a className="cta" href="#contact" style={{background:"transparent",color:"var(--sand)",borderColor:"var(--sand)"}}>Contact Us</a></div>
          </div>
          <div className="wrap chips">
            {["Energy & Utilities","Manufacturing & Industrial","Aerospace & Automotive","Healthcare & MedTech","Built Environment & PropTech","Logistics & Warehousing","Consumer Products","Public Sector & NGOs"].map(s => <div className="chip" key={s}>{s}</div>)}
          </div>
        </section>

        {/* APPROACH */}
        <section id="approach" aria-label="Our approach">
          <div className="wrap two">
            <div>
              <h2 style={{fontSize:36,margin:0}}>Approach that de-risks delivery</h2>
              <p className="muted">Pragmatic methodology that compresses time-to-value and locks in energy & cost savings.</p>
            </div>
            <div>
              <div className="cards" style={{gridTemplateColumns:"1fr 1fr"}}>
                {[
                  ["Discover","Baseline cost & CO2e, constraints, business case (ESOS/SECR-aware)."],
                  ["Design","Options, engineering design, procurement spec, safety & compliance."],
                  ["Deliver","Install, commission, operator training, documentation."],
                  ["Optimise","M&V, dashboards, continuous improvement, savings assurance."],
                ].map(([h,b],i) => (
                  <div className="card" key={h}>
                    <div className="muted" style={{textTransform:"uppercase",fontSize:12}}>Phase {i+1}</div>
                    <h3>{h}</h3>
                    <p className="muted">{b}</p>
                    <p style={{marginTop:10}}><a className="cta" href="#contact">Contact Us</a></p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" aria-label="Frequently asked questions">
          <div className="wrap">
            <h2 style={{fontSize:36,margin:0}}>FAQ</h2>
            <div className="cards">
              {[
                ["Do you cover ESOS/SECR?","Yes. We build evidence packs and roadmaps aligned to ESOS and SECR, focusing on projects with the best ROI/CO2e impact."],
                ["How fast can we see savings?","Priority fixes often land within 6–12 weeks depending on scope and procurement."],
                ["Do you work nationwide?","Yes, we operate across the UK and can support multi-site estates."],
              ].map(([q,a]) => (
                <article className="card" key={q}>
                  <h3>{q}</h3><p className="muted">{a}</p>
                </article>
              ))}
            </div>
            <p style={{marginTop:16}}><a className="cta" href="#contact">Contact Us</a></p>
          </div>
        </section>
      </main>

      {/* CONTACT */}
      <section id="contact" aria-label="Contact Oddee Consulting">
        <div className="wrap two">
          <div>
            <h2 style={{fontSize:36,margin:0}}>Speak to an engineer</h2>
            <p className="muted">Share your constraints and KPIs. We’ll map options and the fastest, lowest-risk route to value.</p>
            <address className="muted" style={{marginTop:16}}>
              📞 <a href={telHref} style={{color:"inherit",textDecoration:"none"}}>{phone}</a><br/>
              ✉️ <a href={mailHref} style={{color:"inherit",textDecoration:"none"}}>{email}</a><br/>
              📍 United Kingdom
            </address>
          </div>
          <form className="form stack" onSubmit={(e)=>{e.preventDefault(); window.location.href = mailHref;}}>
            <div className="stack">
              <input className="input" placeholder="Full name" required aria-label="Full name" />
              <input className="input" type="email" placeholder="Work email" required aria-label="Work email" />
              <input className="input" placeholder="Company" aria-label="Company" />
              <textarea className="textarea" placeholder="Describe your energy or engineering challenge" aria-label="Project description"></textarea>
              <button className="cta" type="submit">Contact Us</button>
              <small className="muted">By submitting, you agree to our privacy policy.</small>
            </div>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="wrap footer-inner">
          <p className="muted" style={{color:"var(--sand)"}}>
            © {new Date().getFullYear()} Oddee Consulting. UK Engineering Consultancy for Energy & Net-Zero.
          </p>
          <div style={{display:"flex",gap:18}}>
            <a href="#services" style={{color:"var(--sand)",textDecoration:"none"}}>Services</a>
            <a href="#approach" style={{color:"var(--sand)",textDecoration:"none"}}>Approach</a>
            <a href="#contact" style={{color:"var(--sand)",textDecoration:"none"}}>Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
