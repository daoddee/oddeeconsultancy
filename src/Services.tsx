import ContactForm from "./components/ContactForm";

// add these styles to Services <style> block if not present yet:
.form{border:1px solid #e9ebf0;border-radius:18px;padding:18px}
.input,.textarea{width:100%;padding:12px;border:1px solid #dfe3ea;border-radius:12px}
.textarea{min-height:120px;resize:vertical}
.stack{display:grid;gap:12px}

// then add the section near the bottom (after contact bar or replace it)
<section id="contact" aria-label="Contact form">
  <div className="wrap" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
    <div>
      <h2 style={{fontSize:28, margin:0}}>Speak to an engineer</h2>
      <p className="muted">Tell us about your site constraints and KPIs. We’ll map the fastest, lowest-risk route to value.</p>
      <p className="muted">Or email <a href="mailto:info@oddeeconsultancy.co.uk">info@oddeeconsultancy.co.uk</a> · call <a href="tel:+447365155414">+447365155414</a></p>
    </div>
    <ContactForm />
  </div>
</section>
