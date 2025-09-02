import React, { useEffect } from "react";
</div>
</section>


{/* APPROACH */}
<section id="approach" aria-label="Our approach">
<div className="wrap two">
<div>
<h2 style={{fontSize:36,margin:0}}>Approach that de‑risks delivery</h2>
<p className="muted">Pragmatic methodology that compresses time‑to‑value and locks in energy & cost savings.</p>
</div>
<div>
<div className="cards" style={{gridTemplateColumns:"1fr 1fr"}}>
{[
["Discover","Baseline cost & CO2e, constraints, business case (ESOS/SECR‑aware)."],
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


{/* FAQ (SEO) */}
<section id="faq" aria-label="Frequently asked questions">
<div className="wrap">
<h2 style={{fontSize:36,margin:0}}>FAQ</h2>
<div className="cards">
{[
["Do you cover ESOS/SECR?","Yes. We build evidence packs and roadmaps aligned to ESOS and SECR, focusing on projects with the best ROI/CO2e impact."],
["How fast can we see savings?","Priority fixes often land within 6–12 weeks depending on scope and procurement."],
["Do you work nationwide?","Yes, we operate across the UK and can support multi‑site estates."],
].map(([q,a]) => (
<article className="card" key={q}>
<h3>{q}</h3>
<p className="muted">{a}</p>
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
<p className="muted">Share your constraints and KPIs. We’ll map options and the fastest, lowest‑risk route to value.</p>
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
<p className="muted" style={{color:"var(--sand)"}}>© {new Date().getFullYear()} Oddee Consulting. UK Engineering Consultancy for Energy & Net‑Zero.</p>
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
