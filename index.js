import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  Rocket,
  LineChart,
  Shield,
  Users2,
  ArrowRight,
  Building2,
  Phone,
  Mail,
  MapPin,
  Factory,
  Leaf,
  Wrench,
  Cpu
} from "lucide-react";

// Brand tokens
const brand = {
  green: "#0F3A30", // deep forest
  sand: "#E8D7B1", // beige from logo text
  sandDark: "#D9C69A",
  ink: "#0A0F0D",
};

const Nav = () => (
  <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/40 bg-white/70 border-b">
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Simple gear mark to echo logo */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ backgroundColor: brand.green }}
          aria-label="Oddee mark"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={brand.sand} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            <path d="M20.8 8a1 1 0 0 1 .2 1.1l-1 1.7a8 8 0 0 1 0 2.4l1 1.7a1 1 0 0 1-.2 1.1l-1.1 1.1a1 1 0 0 1-1.1.2l-1.7-1a8 8 0 0 1-2.4 0l-1.7 1a1 1 0 0 1-1.1-.2l-1.1-1.1a1 1 0 0 1-.2-1.1l1-1.7a8 8 0 0 1 0-2.4l-1-1.7a1 1 0 0 1 .2-1.1l1.1-1.1a1 1 0 0 1 1.1-.2l1.7 1a8 8 0 0 1 2.4 0l1.7-1a1 1 0 0 1 1.1.2z"/>
          </svg>
        </div>
        <div className="leading-tight">
          <div className="text-lg font-semibold tracking-wide" style={{ color: brand.green }}>ODDEE</div>
          <div className="text-xs uppercase tracking-[0.2em]" style={{ color: brand.green }}>Consulting</div>
        </div>
      </div>
      <nav className="hidden md:flex items-center gap-7 text-sm">
        <a href="#solutions" className="hover:opacity-80">Solutions</a>
        <a href="#sectors" className="hover:opacity-80">Sectors</a>
        <a href="#approach" className="hover:opacity-80">Approach</a>
        <a href="#insights" className="hover:opacity-80">Insights</a>
        <a href="#contact" className="hover:opacity-80">Contact</a>
      </nav>
      <div className="flex items-center gap-2">
        <Button className="hidden md:inline-flex" style={{ backgroundColor: brand.green, color: brand.sand }}>Book a Call</Button>
        <Button variant="outline" className="md:hidden">Menu</Button>
      </div>
    </div>
  </header>
);

const Hero = () => (
  <section className="relative overflow-hidden" style={{ backgroundColor: brand.green, color: brand.sand }}>
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <p className="uppercase tracking-[0.3em] text-xs/relaxed mb-4 opacity-90">Engineering • Net Zero • Digital</p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          We turn complex engineering challenges into sustainable traction.
        </h1>
        <p className="mt-5 text-base/7 md:text-lg/8 opacity-95">
          Oddee Consulting solves real engineering problems, accelerates your path to net zero, and ships digital tools that stick.
          No theatre—just robust design, pragmatic management, and measurable outcomes.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button className="group" style={{ backgroundColor: brand.sand, color: brand.ink }}>
            Start a Project
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="outline" className="border-2" style={{ borderColor: brand.sand, color: brand.sand }}>
            View Case Studies
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-6 text-center md:text-left">
          {[
            { kpi: "30–50%", label: "efficiency gains from design optimisation" },
            { kpi: "<24w", label: "time-to-impact on net-zero roadmaps" },
            { kpi: "95%", label: "client satisfaction & repeat rate" },
          ].map((x) => (
            <div key={x.kpi}>
              <div className="text-2xl font-semibold">{x.kpi}</div>
              <div className="text-xs opacity-80">{x.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="rounded-3xl shadow-2xl p-1 bg-white/10 ring-1 ring-white/20">
          <div className="rounded-3xl bg-white text-slate-900 p-6 md:p-8 min-h-[320px]">
            <div className="flex items-center gap-3">
              <Rocket className="h-5 w-5" />
              <p className="text-sm font-medium">Engagement Blueprint</p>
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                { t: "Engineering Design Audit", d: "Failure modes, constraints, cost & safety criticals." },
                { t: "Sustainable Redesign", d: "Materials, energy load, circularity, compliance." },
                { t: "Operating Model & KPIs", d: "Rituals, dashboards, governance to embed change." },
                { t: "Digital Enablers", d: "Web/app tooling to automate workflows and reporting." },
              ].map((i) => (
                <li key={i.t} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5" />
                  <div>
                    <div className="font-medium">{i.t}</div>
                    <div className="text-slate-600">{i.d}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button style={{ backgroundColor: brand.green, color: brand.sand }} className="w-full">
                Download Sample Deliverable
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Solutions = () => (
  <section id="solutions" className="py-16 md:py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Solutions engineered for outcomes</h2>
        <p className="mt-3 text-slate-600">Hard problems, clear levers. We ship designs, operating systems, and digital tools that move the needle.</p>
      </div>

      <div className="mt-10 grid md:grid-cols-4 gap-6">
        {[
          { icon: Wrench, title: "Engineering Design", body: "Concept-to-detail design, DFM/DFA, optimisation, safety & compliance." },
          { icon: Leaf, title: "Net Zero & Sustainability", body: "Energy modelling, decarbonisation roadmaps, LCA, ESG reporting enablement." },
          { icon: Shield, title: "Management Consulting", body: "Operating models, OKRs, PMO, performance dashboards, change adoption." },
          { icon: Cpu, title: "Digital & Web", body: "Websites, internal tools, and lightweight apps to streamline operations." },
        ].map(({ icon: Icon, title, body }) => (
          <Card key={title} className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: brand.sand }}>
                <Icon className="h-5 w-5" />
              </div>
              <CardTitle className="mt-4 text-xl">{title}</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-600">{body}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const Sectors = () => (
  <section id="sectors" className="py-16 md:py-24" style={{ backgroundColor: brand.ink }}>
    <div className="max-w-7xl mx-auto px-4 md:px-6 text-white">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Where we operate</h2>
          <p className="mt-2 text-slate-300 max-w-xl">Execution-heavy environments with tight margins and safety-critical outcomes.</p>
        </div>
        <Button variant="outline" className="border-2" style={{ borderColor: brand.sand, color: brand.sand }}>See Use Cases</Button>
      </div>

      <div className="mt-10 grid md:grid-cols-4 gap-4">
        {[
          "Manufacturing & Industrial",
          "Energy & Utilities",
          "Built Environment",
          "Transport & Mobility",
          "MedTech & Devices",
          "Aerospace & Defence",
          "Food & FMCG",
          "Public Sector & NGOs",
        ].map((s) => (
          <div key={s} className="rounded-2xl p-5 border bg-white/5 backdrop-blur">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5" />
              <p>{s}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Approach = () => (
  <section id="approach" className="py-16 md:py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="grid md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Our delivery model</h2>
          <p className="mt-3 text-slate-600">A no-theatre methodology that compresses time-to-value and derisks execution.</p>
        </div>
        <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
          {[
            { h: "Diagnose", p: "Baseline performance, constraints, energy loads, and risk/regs." },
            { h: "Design", p: "Engineer solutions and operating models anchored to KPIs." },
            { h: "Deploy", p: "Pilot fast, iterate with operators, codify SOPs and guardrails." },
            { h: "Drive", p: "Embed governance, dashboards, and continuous improvement." },
          ].map((s, i) => (
            <Card key={s.h}>
              <CardHeader>
                <div className="text-sm uppercase tracking-wide text-slate-500">Phase {i + 1}</div>
                <CardTitle className="text-xl">{s.h}</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600">{s.p}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Insights = () => (
  <section id="insights" className="py-16 md:py-24" style={{ backgroundColor: brand.green, color: brand.sand }}>
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Insights & Signals</h2>
          <p className="mt-2 opacity-90">Operator-grade guidance—design, decarbonisation, and digital enablement.</p>
        </div>
        <Button style={{ backgroundColor: brand.sand, color: brand.ink }}>Browse All</Button>
      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {[
          { title: "Design for Net Zero: Where to Start", body: "Quick wins vs. capex-heavy moves across heat, process, and logistics." },
          { title: "From KPIs to Cadence", body: "Building a management rhythm that sustains engineering outcomes." },
          { title: "Web Tools that Stick", body: "Lightweight apps that remove admin drag and improve data quality." },
        ].map((card, i) => (
          <Card key={i} className="bg-white/95 text-slate-900">
            <CardHeader>
              <CardTitle className="text-xl">{card.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-700">{card.body}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-16 md:py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-10 items-start">
      <div>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Let’s scope your engineering objectives</h2>
        <p className="mt-3 text-slate-600">
          30 minutes. Clear diagnosis, options, and the fastest path to measurable lift—design, net zero, or digital.
        </p>
        <div className="mt-6 space-y-3 text-slate-700">
          <p className="flex items-center gap-3"><Phone className="h-5 w-5"/> +44 0000 000 000</p>
          <p className="flex items-center gap-3"><Mail className="h-5 w-5"/> hello@oddee.consulting</p>
          <p className="flex items-center gap-3"><MapPin className="h-5 w-5"/> London, UK</p>
        </div>
      </div>
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Book a discovery call</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
            <Input placeholder="Full name" />
            <Input placeholder="Work email" type="email" />
            <Input placeholder="Company" />
            <Textarea placeholder="What challenge are we solving? (design, net zero, digital…)" rows={5} />
            <Button style={{ backgroundColor: brand.green, color: brand.sand }}>Request Call</Button>
            <p className="text-xs text-slate-500">By submitting, you agree to our privacy policy.</p>
          </form>
        </CardContent>
      </Card>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-10" style={{ backgroundColor: brand.ink, color: brand.sand }}>
    <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-6 items-center">
      <p className="text-sm opacity-90">© {new Date().getFullYear()} Oddee Consulting. All rights reserved.</p>
      <div className="flex md:justify-end gap-6 text-sm">
        <a href="#" className="hover:opacity-80">Privacy</a>
        <a href="#" className="hover:opacity-80">Terms</a>
        <a href="#" className="hover:opacity-80">Careers</a>
      </div>
    </div>
  </footer>
);

export default function OddeeHome() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Nav />
      <Hero />
      <Solutions />
      <Sectors />
      <Approach />
      <Insights />
      <Contact />
      <Footer />
    </div>
  );
}
