import React from "react";

// ✅ Zero-dependency React page (Oddee Consulting — Engineering-first)
// - Primary focus: engineering design, problem solving, management consulting,
//   material & cost reduction, and net-zero delivery. AI/web are adjacent.
// - Works in CRA, Vite, or Next.js. Primary CTA → #contact.

export default function OddeeHome({
  logoSrc = "",
  email = "info@oddeeconsultancy.co.uk",
  phone = "+447365155414",
}) {
  const safePhone = phone || "";
  const telHref = `tel:${safePhone.replace(/\s+/g, '')}`;
  const mailHref = `mailto:${email}`;

  return (
    <div className="oddee">
      {/* Minimal, scoped CSS */}
      <style>{`
        :root { --green:#0F3A30; --sand:#E8D7B1; --ink:#0A0F0D; --txt:#0b1220; }
        .oddee { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color:var(--txt); background:#fff; }
        *{box-sizing:border-box}
        .wrap{max-width:1120px;margin:0 auto;padding:0 20px}
        .nav{position:sticky;top:0;z-index:10;background:rgba(255,255,255,.92);backdrop-filter:saturate(160%) blur(8px);border-bottom:1px solid #eaeaea}
        .nav-inner{display:flex;align-items:center;justify-content:space-between;padding:14px 0}
        .brand{display:flex;align-items:center;gap:10px}
        .brand-title{line-height:1}
        .brand-title .t1{color:var(--green);font-weight:700;letter-spacing:.04em}
        .brand-title .t2{color:var(--green);font-size:12px;letter-spacing:.18em;text-transform:uppercase}
        .links a{margin:0 14px;text-decoration:none;color:#2a2f39}
        .links a:hover{opacity:.75}
        .cta{padding:9px 14px;border-radius:12px;border:1.5px solid var(--green);color:#fff;background:var(--green);cursor:pointer;text-decoration:none;display:inline-block}
        .cta.secondary{background:transparent;color:var(--green)}

        .hero{background:var(--green);color:var(--sand);padding:72px 0}
        .hero-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:28px;align-items:center}
        .eyebrow{letter-spacing:.3em;text-transform:uppercase;font-size:12px;opacity:.9}
        h1{font-size:44px;line-height:1.1;margin:10px 0 14px}
        .lead{opacity:.95;line-height:1.7}
        .hero-ctas{display:flex;gap:10px;margin-top:18px}
        .hero-kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:26px}
        .kpi{font-size:26px;font-weight:650}
        .kpi-sub{font-size:12px;opacity:.85}
        .panel{border-radius:22px;background:#fff;color:#1c1f24;box-shadow:0 10px 30px rgba(0,0,0,.12);padding:22px}
        .panel ul{padding-left:0;margin:14px 0 0}
        .panel li{display:flex;gap:10px;margin:10px 0}
        .tick{width:18px;height:18px;border-radius:50%;background:var(--green);display:inline-flex;align-items:center;justify-content:center;color:var(--sand);font-size:12px}

        .section{padding:70px 0}
        .section.dark{background:var(--ink);color:#fff}
        .muted{color:#5b667a}
        .cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:22px}
        .card{border:1px solid #e9ebf0;border-radius:18px;padding:18px}
        .card h3{margin:6px 0 8px;font-size:18px}

        .chips{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:22px}
        .chip{border-radius:16px;border:1px solid rgba(255,255,255,.24);background:rgba(255,255,255,.06);padding:12px}

        .two{display:grid;grid-template-columns:1fr 1fr;gap:18px}

        .insights-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:22px}
        .insight{background:#fff;color:#222;border-radius:18px;padding:18px;border:1px solid #e9ebf0}

        .form{border:1px solid #e9ebf0;border-radius:18px;padding:18px}
        .input,.textarea{width:100%;padding:12px 12px;border:1px solid #dfe3ea;border-radius:12px}
        .textarea{min-height:120px;resize:vertical}
        .stack{display:grid;gap:12px}

        .footer{background:var(--ink);color:var(--sand);padding:34px 0;margin-top:10px}
        .footer-inner{display:flex;justify-content:space-between;align-items:center}

        /* Responsive */
        @media (max-width: 980px){
          .hero-grid{grid-template-columns:1fr}
          .cards{grid-template-columns:1fr}
          .chips{grid-template-columns:1fr 1fr}
          .two{grid-template-columns:1fr}
          .insights-cards{grid-template-columns:1fr}
          .hero{padding:56px 0}
          h1{font-size:34px}
        }
      `}</style>

      {/* NAV */}
      <div className="nav">
        <div className="wrap nav-inner">
          <div className="brand">
            {logoSrc ? (
              <img src={logoSrc} alt="Oddee Consulting logo" width={40} height={40} style={{borderRadius:8}}/>
            ) : (
              // Fallback gear mark
              <div style={{width:40,height:40,borderRadius:10,background:"var(--green)",display:"grid",placeItems:"center"}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--sand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                  <path d="M20.8 8a1 1 0 0 1 .2 1.1l-1 1.7a8 8 0 0 1 0 2.4l1 1.7a1 1 0 0 1-.2 1.1l-1.1 1.1a1 1 0 0 1-1.1.2l-1.7-1a8 8 0 0 1-2.4 0l-1.7 1a1 1 0 0 1-1.1-.2l-1.1-1.1a1 1 0 0 1-.2-1.1l1-1.7a8 8 0 0 1 0-2.4l-1-1.7a1 1 0 0 1 .2-1.1l1.1-1.1a1 1 0 0 1 1.1-.2l1.7 1a8 8 0 0 1 2.4 0l1.7-1a1 1 0 0 1 1.1.2z"/>
                </svg>
              </div>
            )}
            <div className="brand-title">
              <div className="t1">ODDEE</div>
              <div className="t2">Consulting</div>
            </div>
          </div>
          <nav className="links" aria-label="primary">
            <a href="#solutions">Solutions</a>
            <a href="#sectors">Sectors</a>
            <a href="#approach">Approach</a>
            <a href="#insights">Insights</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="cta" href="#contact">Contact Us</a>
        </div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="eyebrow">Engineering Design • Cost Reduction • Net‑Zero</div>
            <h1>We engineer tangible outcomes.</h1>
            <p className="lead">We specialise in engineering design, solving hard engineering problems, management consulting, and material/cost reduction—while helping organisations decarbonise toward net‑zero. AI and website development are adjacent capabilities used to accelerate delivery, not distract from it.</p>
            <div className="hero-ctas">
              <a className="cta" href="#contact" style={{background:"var(--sand)",color:"#0A0F0D",borderColor:"var(--sand)"}}>Contact Us</a>
              <button className="cta secondary">View Case Studies</button>
            </div>
            <div className="hero-kpis">
              <div>
                <div className="kpi">10–30%</div>
                <div className="kpi-sub">Typical cost-out on value‑engineer engagements</div>
              </div>
              <div>
                <div className="kpi">&lt;12w</div>
                <div className="kpi-sub">Time-to-value on delivery sprints</div>
              </div>
              <div>
                <div className="kpi">95%</div>
                <div className="kpi-sub">Repeat client rate</div>
              </div>
            </div>
          </div>
          <div>
            <div className="panel">
              <strong>Engineering Delivery Roadmap</strong>
              <ul>
                {[
                  ["Discovery & Diagnostics","Feasibility, constraints, data readiness, business case."],
                  ["Design & Simulation","CAD/FEA/DFMA, prototyping, verification against requirements."],
                  ["Value Engineering","Material substitution, process optimisation, cost‑out without compromising quality."],
                  ["Net‑Zero & Delivery","Energy efficiency, lifecycle impact, and implementation with governance."],
                ].map(([t,d]) => (
                  <li key={t}>
                    <span className="tick">✓</span>
                    <div>
                      <div style={{fontWeight:600}}>{t}</div>
                      <div className="muted">{d}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <div style={{marginTop:16}}>
                <a className="cta" href="#contact">Discuss Your Project</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section id="solutions" className="section">
        <div className="wrap">
          <h2 style={{fontSize:36,margin:0}}>Core services that move the P&L</h2>
          <p className="muted" style={{marginTop:8}}>Outcome‑driven engagements with clear deliverables and acceptance criteria.</p>
          <div className="cards" style={{gridTemplateColumns:"repeat(4,1fr)"}}>
            {[
              ["Engineering Design","Concept to detail design, CAD, drawings, tolerance stacks, DFM/DFA."],
              ["Engineering Problem Solving","Root cause analysis, reliability, test plans, and remediation."],
              ["Management Consulting","Operating cadence, PMO, supplier optimisation, make/buy, governance."],
              ["Material & Cost Reduction","Value engineering, process change, alternative materials, redesign."],
              ["Net‑Zero & Sustainability","Energy audits, carbon baselining, decarbonisation roadmaps."],
            ].map(([h,b]) => (
              <div className="card" key={h}>
                <div style={{width:40,height:40,borderRadius:10,background:"var(--sand)",display:"grid",placeItems:"center"}}>★</div>
                <h3>{h}</h3>
                <p className="muted">{b}</p>
              </div>
            ))}
          </div>
          <p className="muted" style={{marginTop:14}}><strong>Adjacent capabilities:</strong> AI automation, data tooling, and website development—used tactically to accelerate the engineering workstream.</p>
        </div>
      </section>

      {/* SECTORS */}
      <section id="sectors" className="section dark">
        <div className="wrap">
          <div className="two">
            <div>
              <h2 style={{fontSize:36,margin:0}}>Where we play</h2>
              <p className="muted" style={{color:"#cbd5e1"}}>Manufacturing, industrial, and asset‑heavy environments where execution risk is the bottleneck.</p>
            </div>
            <div style={{textAlign:"right"}}>
              <a className="cta" href="#contact" style={{background:"transparent",color:"var(--sand)",borderColor:"var(--sand)"}}>See Use Cases</a>
            </div>
          </div>
          <div className="chips">
            {["Manufacturing & Industrial","Energy & Utilities","Aerospace & Automotive","Built Environment & PropTech","Healthcare & MedTech","Logistics & Supply Chain","Consumer Products","Public Sector & NGOs"].map((s) => (
              <div className="chip" key={s}>{s}</div>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section id="approach" className="section">
        <div className="wrap two">
          <div>
            <h2 style={{fontSize:36,margin:0}}>Our operating system</h2>
            <p className="muted">A pragmatic methodology that compresses time‑to‑value and locks in savings.</p>
          </div>
          <div>
            <div className="cards" style={{gridTemplateColumns:"1fr 1fr"}}>
              {[
                ["Discover","Feasibility, data audit, baseline costs and emissions."],
                ["Design","Architecture, options analysis, stakeholder alignment."],
                ["Deliver","Build, test, validate, and handover with training."],
                ["Optimise","Continuous improvement, cost‑out waves, decarbonisation."],
              ].map(([h,b],i) => (
                <div className="card" key={h}>
                  <div className="muted" style={{textTransform:"uppercase",fontSize:12}}>Phase {i+1}</div>
                  <h3>{h}</h3>
                  <p className="muted">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INSIGHTS */}
      <section id="insights" className="section" style={{background:"var(--green)",color:"var(--sand)"}}>
        <div className="wrap">
          <div className="two" style={{alignItems:"end"}}>
            <div>
              <h2 style={{fontSize:36,margin:0}}>Technical Insights</h2>
              <p className="muted" style={{color:"#f2ead6"}}>Playbooks on value engineering, decarbonisation, and execution at pace.</p>
            </div>
            <div style={{textAlign:"right"}}>
              <a className="cta" href="#contact" style={{background:"var(--sand)",color:"#0A0F0D",borderColor:"var(--sand)"}}>Ask a Question</a>
            </div>
          </div>
          <div className="insights-cards">
            {["Cost‑Out without Quality Loss","Building a Practical Net‑Zero Roadmap","When to Re‑engineer vs. Re‑source"].map((title,i)=> (
              <div className="insight" key={i}>
                <h3 style={{margin:"0 0 6px"}}>{title}</h3>
                <p className="muted" style={{color:"#475569"}}>Actionable guidance from field deployments.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section">
        <div className="wrap two">
          <div>
            <h2 style={{fontSize:36,margin:0}}>Let's scope the problem and the win</h2>
            <p className="muted">Share the constraints and the outcome you need. We'll propose the fastest, lowest‑risk route to value.</p>
            <div style={{marginTop:16}} className="muted">
              <p>📞 <a href={telHref} style={{color:"inherit",textDecoration:"none"}}>{phone}</a></p>
              <p>✉️ <a href={mailHref} style={{color:"inherit",textDecoration:"none"}}>{email}</a></p>
              <p>📍 London, UK</p>
            </div>
          </div>
          <form className="form stack" onSubmit={(e)=>{e.preventDefault(); window.location.href = mailHref;}}>
            <div className="stack">
              <input className="input" placeholder="Full name" required />
              <input className="input" type="email" placeholder="Work email" required />
              <input className="input" placeholder="Company" />
              <textarea className="textarea" placeholder="Describe your engineering or cost-reduction challenge"></textarea>
              <button className="cta" type="submit">Request Call</button>
              <small className="muted">By submitting, you agree to our privacy policy.</small>
            </div>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="wrap footer-inner">
          <p className="muted" style={{color:"var(--sand)"}}>© {new Date().getFullYear()} Oddee Consulting. All rights reserved.</p>
          <div style={{display:"flex",gap:18}}>
            <a href="#" style={{color:"var(--sand)",textDecoration:"none"}}>Privacy</a>
            <a href="#" style={{color:"var(--sand)",textDecoration:"none"}}>Terms</a>
            <a href="#" style={{color:"var(--sand)",textDecoration:"none"}}>Careers</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
