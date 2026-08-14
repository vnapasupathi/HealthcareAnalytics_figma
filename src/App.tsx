import { useState, useEffect } from "react";

type Page = "home" | "about" | "it" | "kpo" | "management" | "contact";

const NAV_ITEMS: { label: string; page: Page; sub?: { label: string; page: Page }[] }[] = [
  { label: "About Us", page: "about" },
  {
    label: "Services",
    page: "it",
    sub: [
      { label: "IT Services", page: "it" },
      { label: "KPO Services", page: "kpo" },
    ],
  },
  { label: "Management Team", page: "management" },
  { label: "Contact Us", page: "contact" },
];

function Nav({ current, onNav }: { current: Page; onNav: (p: Page) => void }) {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0057a8]/95 backdrop-blur-md border-b border-blue-300/20">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <button onClick={() => onNav("home")} className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#009b77] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L2 7v6l8 5 8-5V7L10 2z" stroke="white" strokeWidth="1.5" fill="none"/>
              <path d="M10 7v6M7 8.5l3-1.5 3 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div className="text-white font-semibold text-sm tracking-wide leading-none">MAP Technologies</div>
            <div className="text-[#4dd8b0] text-[10px] font-mono tracking-widest uppercase mt-0.5">Healthcare Analytics</div>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.page}
              className="relative"
              onMouseEnter={() => item.sub && setOpen(item.page)}
              onMouseLeave={() => setOpen(null)}
            >
              <button
                onClick={() => !item.sub && onNav(item.page)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-1 ${
                  current === item.page || item.sub?.some((s) => s.page === current)
                    ? "text-[#4dd8b0]"
                    : "text-blue-100/90 hover:text-white"
                }`}
              >
                {item.label}
                {item.sub && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  </svg>
                )}
              </button>
              {item.sub && open === item.page && (
                <div className="absolute top-full left-0 mt-1 w-44 bg-[#0057a8] border border-blue-300/20 rounded-lg shadow-xl overflow-hidden">
                  {item.sub.map((s) => (
                    <button
                      key={s.page}
                      onClick={() => { onNav(s.page); setOpen(null); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        current === s.page ? "bg-[#4dd8b0]/20 text-white" : "text-blue-100/90 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button
            onClick={() => onNav("contact")}
            className="ml-3 px-4 py-2 bg-[#009b77] hover:bg-[#007a5e] text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Get in Touch
          </button>
        </nav>

        <button className="md:hidden text-white p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-white transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#0057a8] border-t border-blue-300/20 px-6 py-4 space-y-1">
          {NAV_ITEMS.flatMap((item) =>
            item.sub
              ? item.sub.map((s) => (
                  <button key={s.page} onClick={() => { onNav(s.page); setMobileOpen(false); }}
                    className="block w-full text-left px-3 py-2.5 text-blue-100/90 hover:text-white text-sm rounded-md">
                    {s.label}
                  </button>
                ))
              : [
                  <button key={item.page} onClick={() => { onNav(item.page); setMobileOpen(false); }}
                    className="block w-full text-left px-3 py-2.5 text-blue-100/90 hover:text-white text-sm rounded-md">
                    {item.label}
                  </button>,
                ]
          )}
        </div>
      )}
    </header>
  );
}

function Footer({ onNav }: { onNav: (p: Page) => void }) {
  return (
    <footer className="bg-[#002855] text-blue-100/70 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <button onClick={() => onNav("home")} className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md bg-[#009b77] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L2 7v6l8 5 8-5V7L10 2z" stroke="white" strokeWidth="1.5" fill="none"/>
                  <path d="M10 7v6M7 8.5l3-1.5 3 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-white font-semibold text-sm">MAP Technologies</span>
            </button>
            <p className="text-sm leading-relaxed mb-4 max-w-xs">
              Delivering HIPAA-compliant IT and KPO services with a focus on healthcare analytics and rural talent development.
            </p>
            <p className="font-mono text-xs text-[#4dd8b0]/70">Chennai, Tamil Nadu, India</p>
          </div>
          <div>
            <div className="font-mono text-xs text-[#4dd8b0]/80 tracking-widest uppercase mb-4">Services</div>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNav("it")} className="hover:text-white transition-colors">IT Services</button></li>
              <li><button onClick={() => onNav("kpo")} className="hover:text-white transition-colors">KPO Services</button></li>
              <li><button onClick={() => onNav("about")} className="hover:text-white transition-colors">About Us</button></li>
            </ul>
          </div>
          <div>
            <div className="font-mono text-xs text-[#4dd8b0]/80 tracking-widest uppercase mb-4">Company</div>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNav("management")} className="hover:text-white transition-colors">Management Team</button></li>
              <li><button onClick={() => onNav("contact")} className="hover:text-white transition-colors">Contact Us</button></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-300/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs font-mono">© {new Date().getFullYear()} MAP Technologies. All rights reserved.</p>
          <p className="text-xs font-mono text-[#4dd8b0]/60">HIPAA Compliant · Chennai, India</p>
        </div>
      </div>
    </footer>
  );
}

function HomePage({ onNav }: { onNav: (p: Page) => void }) {
  return (
    <div>
      <section className="relative bg-[#0057a8] min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#009b77]/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#005EB8]/10 rounded-full blur-3xl" />
          <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#4dd8b0]/15 border border-[#4dd8b0]/40 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#009b77] animate-pulse" />
              <span className="text-[#4dd8b0] text-xs font-mono tracking-widest uppercase">HIPAA Compliant</span>
            </div>
            <h1 className="font-serif text-5xl lg:text-6xl text-white leading-tight mb-6">
              Healthcare Analytics<br />
              <em className="not-italic text-[#4dd8b0]">That Delivers</em><br />
              Real Value
            </h1>
            <p className="text-blue-50/80 text-lg leading-relaxed mb-10 max-w-xl">
              MAP Technologies delivers end-to-end IT and KPO services with a focus on healthcare and retail analytics — combining technical precision with deep domain knowledge to drive measurable outcomes.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNav("it")}
                className="px-6 py-3 bg-[#009b77] hover:bg-[#007a5e] text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-[#0057a8]/25"
              >
                Explore Services
              </button>
              <button
                onClick={() => onNav("about")}
                className="px-6 py-3 border border-blue-300/30 hover:border-blue-300/50 text-white font-semibold rounded-lg transition-all hover:bg-white/10"
              >
                About Us
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/10 border border-blue-300/20 rounded-2xl p-8 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-[#009b77]" />
                <div className="ml-auto font-mono text-xs text-blue-200/50">analytics.dashboard</div>
              </div>
              <div className="space-y-3 mb-6">
                {[
                  { label: "Healthcare KPIs", w: "82%" },
                  { label: "IT Delivery Score", w: "94%" },
                  { label: "HIPAA Compliance", w: "100%" },
                  { label: "Client Retention", w: "91%" },
                ].map(({ label, w }) => (
                  <div key={label}>
                    <div className="flex justify-between mb-1">
                      <span className="text-blue-100/70 text-xs font-mono">{label}</span>
                      <span className="text-[#4dd8b0] text-xs font-mono font-medium">{w}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#0057a8] to-[#009b77] rounded-full" style={{ width: w }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {["Medical Transcription", "GAP Analysis", "Business Analytics"].map((t) => (
                  <div key={t} className="bg-white/10 border border-blue-300/20 rounded-lg p-3 text-center">
                    <div className="text-blue-50/80 text-xs leading-snug">{t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#003d7a] border-y border-blue-300/20 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "100%", label: "HIPAA Compliant" },
            { value: "2", label: "Service Verticals" },
            { value: "Chennai", label: "HQ, India" },
            { value: "Melur", label: "Delivery Center" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="font-serif text-4xl text-[#4dd8b0] mb-1">{value}</div>
              <div className="text-blue-50/80 text-sm font-mono uppercase tracking-widest">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <div className="font-mono text-xs text-[#0057a8] tracking-widest uppercase mb-3">What We Offer</div>
            <h2 className="font-serif text-4xl text-[#0d2a4a] mb-4">Two Powerful Service Lines</h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              From full-cycle software development to knowledge process outsourcing, we cover the entire spectrum of healthcare and enterprise technology needs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                tag: "IT Services",
                title: "Technology Solutions",
                body: "End-to-end software development, production support, business solutions for retail, insurance, banking, and financial sectors.",
                items: ["Full-cycle SDLC", "Development & Production Support", "Business Solutions", "Testing (Automated & Manual)", "HR Services (Mid–Senior)"],
                cta: "it" as Page,
              },
              {
                tag: "KPO Services",
                title: "Knowledge Process Outsourcing",
                body: "Deep analytics and transcription services tailored for healthcare and retail — including medical, legal, and document transcription.",
                items: ["Business Analytics (Healthcare & Retail)", "GAP Analysis", "Industry Best Practices Framework", "Medical & Legal Transcription", "Technical Writing"],
                cta: "kpo" as Page,
              },
            ].map(({ tag, title, body, items, cta }) => (
              <div key={tag} className="group border border-slate-200 hover:border-[#0057a8]/40 rounded-2xl p-8 bg-white hover:shadow-xl transition-all duration-300">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#009b77]" />
                  <span className="font-mono text-xs text-slate-500 tracking-widest uppercase">{tag}</span>
                </div>
                <h3 className="font-serif text-2xl text-[#0d2a4a] mb-3">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{body}</p>
                <ul className="space-y-2 mb-8">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#009b77] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button onClick={() => onNav(cta)} className="text-[#0057a8] hover:text-[#005290] font-semibold text-sm flex items-center gap-1.5 transition-all">
                  View {tag}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0057a8] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Rural Talent Development", body: "Our delivery center is in Melur, Madurai — tapping energetic talent from rural and suburban Tamil Nadu." },
              { title: "Social Impact", body: "We provide free computer education to underprivileged communities, bridging the digital divide one learner at a time." },
              { title: "HIPAA Compliant", body: "Patient data protection is foundational — every product and process we deliver meets HIPAA compliance standards." },
            ].map(({ title, body }) => (
              <div key={title} className="border-l-2 border-[#4dd8b0]/50 pl-6">
                <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
                <p className="text-blue-100/70 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer onNav={onNav} />
    </div>
  );
}

function AboutPage({ onNav }: { onNav: (p: Page) => void }) {
  return (
    <div className="pt-16">
      <section className="bg-[#0057a8] py-24 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#009b77]/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="font-mono text-xs text-[#4dd8b0] tracking-widest uppercase mb-4">About Us</div>
          <h1 className="font-serif text-5xl text-white mb-6 max-w-2xl">We Deliver Value, Not Just Software</h1>
          <p className="text-blue-50/80 text-lg max-w-xl leading-relaxed">
            MAP Technologies is a startup organization servicing in IT and KPO — built on the belief that meaningful technology must be accessible, impactful, and deeply human.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-serif text-3xl text-[#0d2a4a] mb-6">Our Story</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>Founded in Chennai, Tamil Nadu, MAP Technologies was built with a dual mission: deliver world-class IT and KPO services while creating economic opportunities in rural and suburban India.</p>
              <p>Our delivery centers are located in Melur, Madurai — strategically positioned to tap into the deep talent pool of tier-2 cities. We believe the next generation of great engineers comes from everywhere, not just metros.</p>
              <p>We are HIPAA compliant, ensuring that every client engagement — particularly in healthcare — meets the highest standards of data privacy and regulatory adherence.</p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { num: "01", title: "We Deliver Value", desc: "We deliver measurable business value, not just software and applications, through every engagement." },
              { num: "02", title: "Rural Talent Focus", desc: "One of our core objectives is to bring out energetic talents from rural and suburban areas of Tamil Nadu." },
              { num: "03", title: "HIPAA Compliant Products", desc: "Our solutions meet HIPAA compliance standards, making us a trusted partner for healthcare organizations." },
              { num: "04", title: "Free Digital Education", desc: "We provide free computer education to underprivileged communities, investing in the next generation." },
            ].map(({ num, title, desc }) => (
              <div key={num} className="flex gap-5 p-5 border border-slate-100 rounded-xl hover:border-[#0057a8]/30 transition-colors">
                <div className="font-mono text-2xl text-[#0057a8]/40 font-bold flex-shrink-0">{num}</div>
                <div>
                  <div className="font-semibold text-[#0d2a4a] mb-1">{title}</div>
                  <div className="text-slate-500 text-sm leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="font-mono text-xs text-[#0057a8] tracking-widest uppercase mb-6">Locations</div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-white border border-slate-200 rounded-xl">
              <div className="font-mono text-xs text-slate-400 uppercase tracking-widest mb-3">Corporate Office</div>
              <p className="text-[#0d2a4a] font-semibold mb-1">AG3, Fortune Gardens</p>
              <p className="text-slate-600">Chennai – 600054, Tamil Nadu, India</p>
            </div>
            <div className="p-6 bg-white border border-slate-200 rounded-xl">
              <div className="font-mono text-xs text-slate-400 uppercase tracking-widest mb-3">Delivery Center</div>
              <p className="text-[#0d2a4a] font-semibold mb-1">Melur, Madurai</p>
              <p className="text-slate-600">Tamil Nadu, India</p>
            </div>
          </div>
        </div>
      </section>

      <Footer onNav={onNav} />
    </div>
  );
}

function ServicePage({
  tag, title, subtitle, items, onNav,
}: {
  tag: string;
  title: string;
  subtitle: string;
  items: { heading: string; desc: string }[];
  onNav: (p: Page) => void;
}) {
  return (
    <div className="pt-16">
      <section className="bg-[#0057a8] py-24 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-[#009b77]/8 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="font-mono text-xs text-[#4dd8b0] tracking-widest uppercase mb-4">Services / {tag}</div>
          <h1 className="font-serif text-5xl text-white mb-6 max-w-2xl">{title}</h1>
          <p className="text-blue-50/80 text-lg max-w-xl leading-relaxed">{subtitle}</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(({ heading, desc }, i) => (
              <div key={heading} className="relative border border-slate-200 hover:border-[#0057a8]/40 rounded-xl p-6 bg-white hover:shadow-lg transition-all group">
                <div className="absolute top-4 right-4 font-mono text-xs text-slate-200 group-hover:text-[#0057a8]/30 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="w-8 h-8 rounded-lg bg-[#009b77]/10 flex items-center justify-center mb-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#009b77]" />
                </div>
                <h3 className="font-semibold text-[#0d2a4a] mb-2">{heading}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#0057a8]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl text-white mb-1">Ready to get started?</h3>
            <p className="text-blue-100/70 text-sm">Let us discuss how we can help your organization.</p>
          </div>
          <button
            onClick={() => onNav("contact")}
            className="px-6 py-3 bg-[#009b77] hover:bg-[#007a5e] text-white font-semibold rounded-lg transition-colors whitespace-nowrap"
          >
            Contact Us
          </button>
        </div>
      </section>

      <Footer onNav={onNav} />
    </div>
  );
}

function ManagementPage({ onNav }: { onNav: (p: Page) => void }) {
  const team = [
    {
      role: "Founder & CEO",
      focus: "Corporate Strategy & Vision",
      desc: "Leading MAP Technologies with a focus on rural talent development and HIPAA-compliant healthcare analytics delivery.",
      location: "Chennai, Tamil Nadu",
    },
    {
      role: "Head of IT Services",
      focus: "Technology & Delivery",
      desc: "Overseeing full-cycle SDLC delivery, production support, and quality assurance across all technology engagements.",
      location: "Chennai, Tamil Nadu",
    },
    {
      role: "Head of KPO",
      focus: "Knowledge Process Operations",
      desc: "Driving business analytics, medical transcription, and technical writing services with industry-best frameworks.",
      location: "Melur, Madurai",
    },
  ];

  return (
    <div className="pt-16">
      <section className="bg-[#0057a8] py-24 relative overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[300px] bg-[#009b77]/6 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 relative text-center">
          <div className="font-mono text-xs text-[#4dd8b0] tracking-widest uppercase mb-4">Leadership</div>
          <h1 className="font-serif text-5xl text-white mb-6">Management Team</h1>
          <p className="text-blue-50/80 text-lg max-w-xl mx-auto leading-relaxed">
            Our leadership brings combined experience in healthcare technology, KPO operations, and enterprise software delivery.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {team.map(({ role, focus, desc, location }) => (
              <div key={role} className="border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all">
                <div className="h-48 bg-gradient-to-br from-[#003d7a] to-[#003d7a] relative flex items-end p-6">
                  <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#4dd8b0]/20 border border-[#4dd8b0]/40 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <circle cx="9" cy="6" r="3" stroke="#4dd8b0" strokeWidth="1.5"/>
                      <path d="M3 16c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#4dd8b0" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-mono text-xs text-[#4dd8b0] mb-1">{focus}</div>
                    <div className="text-white font-semibold text-lg">{role}</div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{desc}</p>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1C4.067 1 2.5 2.567 2.5 4.5c0 2.625 3.5 6.5 3.5 6.5s3.5-3.875 3.5-6.5C9.5 2.567 7.933 1 6 1z" stroke="currentColor" strokeWidth="1"/>
                    </svg>
                    {location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer onNav={onNav} />
    </div>
  );
}

function ContactPage({ onNav }: { onNav: (p: Page) => void }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="pt-16">
      <section className="bg-[#0057a8] py-24 relative overflow-hidden">
        <div className="absolute left-0 bottom-0 w-80 h-80 bg-[#009b77]/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="font-mono text-xs text-[#4dd8b0] tracking-widest uppercase mb-4">Contact</div>
          <h1 className="font-serif text-5xl text-white mb-6 max-w-xl">Let's Start a Conversation</h1>
          <p className="text-blue-50/80 text-lg max-w-md leading-relaxed">
            Reach out to discuss how MAP Technologies can support your healthcare analytics and IT needs.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-serif text-3xl text-[#0d2a4a] mb-8">Get in Touch</h2>
            <div className="space-y-6 mb-10">
              {[
                {
                  label: "Email",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <rect x="2" y="4" width="14" height="10" rx="1.5" stroke="#0057a8" strokeWidth="1.5"/>
                      <path d="M2 5l7 5.5L16 5" stroke="#0057a8" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  ),
                  content: "info@maptechnologies.co.in",
                },
                {
                  label: "Corporate Office",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M9 2C6.791 2 5 3.791 5 6c0 3.25 4 9 4 9s4-5.75 4-9c0-2.209-1.791-4-4-4z" stroke="#0057a8" strokeWidth="1.5"/>
                      <circle cx="9" cy="6" r="1.5" stroke="#0057a8" strokeWidth="1.5"/>
                    </svg>
                  ),
                  content: "AG3, Fortune Gardens\nChennai – 600054, Tamil Nadu, India",
                },
                {
                  label: "Delivery Center",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M9 2C6.791 2 5 3.791 5 6c0 3.25 4 9 4 9s4-5.75 4-9c0-2.209-1.791-4-4-4z" stroke="#0057a8" strokeWidth="1.5"/>
                      <circle cx="9" cy="6" r="1.5" stroke="#0057a8" strokeWidth="1.5"/>
                    </svg>
                  ),
                  content: "Melur, Madurai\nTamil Nadu, India",
                },
              ].map(({ label, icon, content }) => (
                <div key={label} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#009b77]/10 flex items-center justify-center flex-shrink-0">
                    {icon}
                  </div>
                  <div>
                    <div className="font-semibold text-[#0d2a4a] text-sm mb-0.5">{label}</div>
                    <div className="text-slate-500 text-sm whitespace-pre-line">{content}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
              <div className="font-mono text-xs text-[#0057a8] tracking-widest uppercase mb-3">Follow Us</div>
              <div className="flex gap-3 flex-wrap">
                {["LinkedIn", "Twitter", "Facebook", "YouTube"].map((s) => (
                  <button key={s} className="px-3 py-1.5 text-xs font-mono text-slate-500 border border-slate-200 hover:border-[#0057a8]/40 hover:text-[#0057a8] rounded-md transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            {sent ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-[#009b77]/10 flex items-center justify-center mx-auto mb-4">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <path d="M5 14l7 7L23 7" stroke="#009b77" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl text-[#0d2a4a] mb-2">Message Received</h3>
                  <p className="text-slate-500 text-sm">Thank you for reaching out. We will get back to you shortly.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-mono text-xs text-slate-400 tracking-widest uppercase mb-1.5">Name</label>
                    <input type="text" required placeholder="Your full name"
                      className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-[#0d2a4a] placeholder-slate-300 focus:outline-none focus:border-[#0057a8] focus:ring-2 focus:ring-[#0057a8]/10 transition-all" />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-slate-400 tracking-widest uppercase mb-1.5">Email</label>
                    <input type="email" required placeholder="you@company.com"
                      className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-[#0d2a4a] placeholder-slate-300 focus:outline-none focus:border-[#0057a8] focus:ring-2 focus:ring-[#0057a8]/10 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block font-mono text-xs text-slate-400 tracking-widest uppercase mb-1.5">Company</label>
                  <input type="text" placeholder="Your organization"
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-[#0d2a4a] placeholder-slate-300 focus:outline-none focus:border-[#0057a8] focus:ring-2 focus:ring-[#0057a8]/10 transition-all" />
                </div>
                <div>
                  <label className="block font-mono text-xs text-slate-400 tracking-widest uppercase mb-1.5">Service Interest</label>
                  <select className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-[#0d2a4a] focus:outline-none focus:border-[#0057a8] focus:ring-2 focus:ring-[#0057a8]/10 transition-all bg-white">
                    <option>Select a service</option>
                    <option>IT Services</option>
                    <option>KPO Services</option>
                    <option>Healthcare Analytics</option>
                    <option>Medical Transcription</option>
                    <option>General Enquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-xs text-slate-400 tracking-widest uppercase mb-1.5">Message</label>
                  <textarea required rows={4} placeholder="Tell us about your project..."
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-[#0d2a4a] placeholder-slate-300 focus:outline-none focus:border-[#0057a8] focus:ring-2 focus:ring-[#0057a8]/10 transition-all resize-none" />
                </div>
                <button type="submit"
                  className="w-full py-3 bg-[#009b77] hover:bg-[#007a5e] text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-[#0057a8]/25">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer onNav={onNav} />
    </div>
  );
}

const IT_ITEMS = [
  { heading: "Full-cycle SDLC", desc: "End-to-end software development lifecycle management — from requirements gathering through deployment and maintenance." },
  { heading: "Development & Production Support", desc: "Robust development practices paired with 24/7 production support to keep your systems running at peak performance." },
  { heading: "Business Solutions", desc: "Tailored solutions for retail, insurance, banking, and financial sectors — built to fit your domain and scale with your business." },
  { heading: "Web Designing", desc: "Clean, responsive, and user-centered web design that communicates your brand and converts visitors into clients." },
  { heading: "Testing Shared Services", desc: "Comprehensive automated and manual testing delivered as a shared service to reduce cost and improve coverage." },
  { heading: "Human Resource Services", desc: "Mid-to-senior level HR services to help you find, evaluate, and onboard the right technology talent." },
];

const KPO_ITEMS = [
  { heading: "Business Analytics", desc: "Healthcare and retail analytics that surface actionable insights — from patient outcomes to inventory optimization." },
  { heading: "GAP Analysis", desc: "Systematic identification of gaps between current state and target operating models, with a structured remediation roadmap." },
  { heading: "Best Practices Framework", desc: "Implementation of industry-standard frameworks aligned with regulatory and operational best practices." },
  { heading: "Medical Transcription", desc: "Accurate, HIPAA-compliant medical transcription for clinical notes, operative reports, and discharge summaries." },
  { heading: "Legal & Document Transcription", desc: "Reliable transcription of legal proceedings, depositions, contracts, and general business documentation." },
  { heading: "Technical Writing", desc: "Clear, precise technical documentation — user manuals, SOPs, and process guides that your teams will actually use." },
];

export default function App() {
  const [page, setPage] = useState<Page>("home");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="min-h-screen bg-[#f0f6fb]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Nav current={page} onNav={setPage} />
      {page === "home" && <HomePage onNav={setPage} />}
      {page === "about" && <AboutPage onNav={setPage} />}
      {page === "it" && (
        <ServicePage
          tag="IT" title="IT Services"
          subtitle="From full-cycle software development to staffing and testing — our IT services cover every stage of the technology lifecycle."
          items={IT_ITEMS} onNav={setPage}
        />
      )}
      {page === "kpo" && (
        <ServicePage
          tag="KPO" title="KPO Services"
          subtitle="Knowledge process outsourcing built for healthcare and retail — analytics, transcription, and technical writing you can depend on."
          items={KPO_ITEMS} onNav={setPage}
        />
      )}
      {page === "management" && <ManagementPage onNav={setPage} />}
      {page === "contact" && <ContactPage onNav={setPage} />}
    </div>
  );
}
