import {
  ArrowRight,
  Boxes,
  Building2,
  CheckCircle2,
  Clock3,
  Forklift,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  PackageCheck,
  Phone,
  Route,
  ShieldCheck,
  Truck,
  Warehouse,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  ["About", "about"],
  ["Services", "services"],
  ["Facilities", "facilities"],
  ["Why Us", "why-us"],
  ["Contact", "contact"],
];

const trustBadges = [
  "Pan India Operations",
  "Industrial Warehousing",
  "40 Tonnage Transport",
];

const services = [
  {
    icon: Truck,
    title: "Industrial Transportation",
    text: "Road transport support for industrial materials, construction-related supplies, gypsum products, and dry material distribution up to 40 tonnage.",
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: Warehouse,
    title: "Warehousing Solutions",
    text: "Industrial warehousing and dry material storage support for supply operations that need dependable staging and dispatch readiness.",
    image:
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: Forklift,
    title: "Material Handling",
    text: "Organized loading, unloading, shifting, salvage, and repacking support for smooth industrial material movement.",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: PackageCheck,
    title: "Inventory & Dispatch Support",
    text: "Structured inventory handling and distribution coordination for construction material logistics and industrial supply movement.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
  },
];

const facilities = [
  {
    icon: Building2,
    title: "Jasai Facility",
    size: "22,000 sq ft",
    location: "Near JNPT Port",
    text: "Large-format warehousing for industrial supplies, gypsum-related products, dry materials, storage planning, and cargo movement.",
  },
  {
    icon: Warehouse,
    title: "Goa Road Facility",
    size: "5,000+ sq ft",
    location: "Near JNPT Port",
    text: "Accessible support facility for flexible dry storage, material staging, loading, and dispatch operations.",
  },
];

const reasons = [
  {
    icon: Clock3,
    title: "Timely Operations",
    text: "Structured movement planning and responsive coordination help ensure dependable day-to-day operations.",
  },
  {
    icon: Boxes,
    title: "Flexible Storage",
    text: "Warehouse flexibility for industrial materials, dry storage, and evolving client requirements.",
  },
  {
    icon: Forklift,
    title: "Organized Handling",
    text: "Careful loading, unloading, salvage, and repacking support for smooth material movement.",
  },
  {
    icon: Route,
    title: "Pan India Coordination",
    text: "Transportation coordination across major industrial and logistics routes in India.",
  },
  {
    icon: ShieldCheck,
    title: "Long-Term Reliability",
    text: "Built around consistent communication, operational discipline, and dependable execution.",
  },
  {
    icon: MessageCircle,
    title: "Responsive Communication",
    text: "Fast response and practical coordination support throughout logistics operations.",
  },
];

const contactDetails = [
  [Phone, "+91 7977179062"],
  [Mail, "allcarecargologistics@gmail.com"],
  [MessageCircle, "WhatsApp: +91 7977179062"],
];

const notificationEmail = "allcarecargologistics@gmail.com";
const googleSheetsEndpoint =
  "https://script.google.com/macros/s/AKfycbyCDtyQ6O-kk0vUYwkZhn-AgLBCrX2t0tCXwqC29XfW_KcNgSQTbRgE91TtvpWUKzQryw/exec";
const whatsappUrl =
  "https://wa.me/917977179062?text=Hello%20Allcare%20Cargo%20Logistics%2C%20I%20would%20like%20to%20enquire%20about%20your%20logistics%20and%20warehousing%20services.";

function SectionIntro({ eyebrow, title, text, light = false }) {
  return (
    <div className="max-w-3xl">
      <p
        className={`text-sm font-bold uppercase tracking-[0.24em] ${
          light ? "text-teal-200" : "text-teal-800"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-4 text-3xl font-semibold leading-tight tracking-normal sm:text-4xl lg:text-5xl ${
          light ? "text-white" : "text-[#102334]"
        }`}
      >
        {title}
      </h2>
      {text && (
        <p
          className={`mt-5 text-lg leading-8 ${
            light ? "text-slate-200" : "text-slate-700"
          }`}
        >
          {text}
        </p>
      )}
    </div>
  );
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const closeMenu = () => setMobileOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const enquiry = Object.fromEntries(formData.entries());
    const sheetsEndpoint =
      import.meta.env.VITE_GOOGLE_SCRIPT_URL || googleSheetsEndpoint;

    setFormStatus("Sending your enquiry...");

    if (sheetsEndpoint) {
      try {
        const payload = new URLSearchParams({
          ...enquiry,
          source: "Allcare Cargo Logistics Website",
          submittedAt: new Date().toISOString(),
        });

        await fetch(sheetsEndpoint, {
          method: "POST",
          mode: "no-cors",
          body: payload,
        });
        form.reset();
        setFormStatus("Thank you. Your enquiry has been recorded.");
        return;
      } catch {
        setFormStatus("Please email us directly if the form does not open.");
      }
    }

    const subject = encodeURIComponent("New website enquiry");
    const body = encodeURIComponent(
      `Name: ${enquiry.name || ""}\nCompany: ${
        enquiry.company || ""
      }\nPhone: ${enquiry.phone || ""}\nEmail: ${
        enquiry.email || ""
      }\nRequirement: ${
        enquiry.requirement || ""
      }\nMessage: ${enquiry.message || ""}`
    );
    window.location.href = `mailto:${notificationEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-[#f7fafb] font-sans text-slate-800 antialiased">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#102334]/95 shadow-[0_16px_45px_-35px_rgba(0,0,0,0.7)] backdrop-blur">
        <nav className="mx-auto flex h-24 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <a href="#home" onClick={closeMenu} className="flex items-center gap-4">
            <span className="flex h-[68px] w-[68px] items-center justify-center overflow-hidden rounded border border-teal-200/50 bg-white p-1.5 shadow-[0_12px_35px_-22px_rgba(45,212,191,0.7)]">
              <img
                src="/assets/allcare-logo.png"
                alt="Allcare Cargo Logistics logo"
                className="h-full w-full object-contain"
              />
            </span>
            <span>
              <span className="block text-xl font-semibold tracking-wide text-white">
                Allcare Cargo
              </span>
              <span className="block text-xs uppercase tracking-[0.28em] text-slate-300">
                Logistics
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className="text-sm font-medium text-slate-200 transition duration-300 hover:text-teal-200"
              >
                {label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden items-center gap-2 rounded border border-teal-300/50 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-teal-200 hover:bg-teal-300 hover:text-[#102334] lg:inline-flex"
          >
            Request Quote
            <ArrowRight size={16} />
          </a>

          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded border border-white/15 text-white transition hover:bg-white/10 lg:hidden"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {mobileOpen && (
          <div className="border-t border-white/10 bg-[#102334] px-5 py-5 lg:hidden">
            <div className="mx-auto grid max-w-7xl gap-3">
              {navItems.map(([label, id]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={closeMenu}
                  className="rounded border border-white/10 px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>
        <section
          id="home"
          className="relative isolate min-h-[760px] overflow-hidden bg-[#102334] pt-24 text-white"
        >
          <img
            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=2400&q=85"
            alt="Industrial warehouse logistics operation"
            className="absolute inset-0 -z-20 h-full w-full object-cover brightness-[0.72]"
          />
          <div className="absolute inset-0 -z-10 bg-[#102334]/70" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071521]/95 via-[#102334]/82 to-[#102334]/45" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-[#102334] to-transparent" />

          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:px-10 lg:py-28">
            <div className="max-w-3xl">
              <div className="mb-7 inline-flex items-center gap-3 border-l-2 border-teal-300 bg-white/10 px-4 py-2 text-sm font-semibold text-teal-100 shadow-[0_18px_55px_-35px_rgba(0,0,0,0.8)] backdrop-blur">
                <MapPin size={16} />
                Mumbai-based industrial logistics and warehousing
              </div>
              <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-normal text-white [text-shadow:0_3px_22px_rgba(0,0,0,0.55)] sm:text-5xl lg:text-6xl">
                Reliable Industrial Logistics & Warehousing Solutions
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-100 [text-shadow:0_2px_16px_rgba(0,0,0,0.55)]">
                Transportation, warehousing, and material handling support for
                industrial, construction, and supply chain operations across
                India.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200 [text-shadow:0_2px_14px_rgba(0,0,0,0.55)]">
                Serving Mumbai, Navi Mumbai, Thane, and Bhiwandi with organized
                cargo handling, warehousing, and freight transportation support.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded bg-teal-300 px-6 py-4 text-sm font-bold text-[#102334] shadow-premium transition duration-300 hover:-translate-y-0.5 hover:bg-teal-200 hover:shadow-[0_18px_50px_-24px_rgba(45,212,191,0.9)]"
                >
                  Contact Us
                  <Phone size={18} />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded border border-white/35 bg-white/5 px-6 py-4 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/12"
                >
                  Request Quote
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>

            <div className="grid content-end gap-4 lg:justify-end">
              <div className="grid w-full max-w-xl gap-4 sm:grid-cols-3 lg:w-[360px] lg:grid-cols-1">
                {trustBadges.map((badge) => (
                  <div
                    key={badge}
                    className="flex min-h-[82px] items-center gap-4 rounded border border-white/20 bg-white/12 p-5 shadow-[0_20px_55px_-34px_rgba(0,0,0,0.9)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-teal-200/60 hover:bg-white/18"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-teal-300/18 text-teal-100">
                      <CheckCircle2 size={21} />
                    </span>
                    <span className="text-sm font-semibold leading-5 text-white">
                      {badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="bg-[#fbfcfc] py-24 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
            <div className="overflow-hidden rounded border border-slate-200 shadow-premium">
              <img
                src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1500&q=85"
                alt="Cargo loading and warehouse operations"
                className="h-full min-h-[420px] w-full object-cover brightness-[0.92] transition duration-700 hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center">
              <SectionIntro
                eyebrow="About Allcare"
                title="Operational reliability for industrial and construction material movement."
                text="Allcare Cargo Logistics supports industrial, construction, dry powder material, gypsum, chemical logistics, and material supply businesses with dependable warehousing, road transport, handling, and distribution coordination from Mumbai, Navi Mumbai, Thane, and Bhiwandi to destinations across India."
              />
              <div className="mt-9 grid gap-4 sm:grid-cols-2">
                {[
                  "Operational precision",
                  "Timely material movement",
                  "Dependable warehousing",
                  "Long-term reliability",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="shrink-0 text-teal-800" size={20} />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="bg-slate-100/70 py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <SectionIntro
              eyebrow="Services"
              title="Industrial logistics services built for practical material operations."
              text="From heavy road transport and freight services to dry material storage, cargo handling, repacking, inventory support, chemical transport coordination, and supply chain dispatch, our work is organized around dependable execution."
            />
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {services.map(({ icon: Icon, title, text, image }) => (
                <article
                  key={title}
                  className="group overflow-hidden rounded border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-teal-700/35 hover:shadow-premium"
                >
                  <div className="h-44 overflow-hidden bg-slate-200">
                    <img
                      src={image}
                      alt={title}
                      className="h-full w-full object-cover brightness-[0.94] transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-8">
                    <div className="mb-7 flex h-14 w-14 items-center justify-center rounded bg-[#102334] text-teal-200 transition duration-300 group-hover:bg-teal-800 group-hover:text-white">
                      <Icon size={26} strokeWidth={1.8} />
                    </div>
                    <h3 className="text-xl font-semibold text-[#102334]">{title}</h3>
                    <p className="mt-4 leading-7 text-slate-700">{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="facilities" className="bg-[#fbfcfc] py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <SectionIntro
                eyebrow="Storage Facilities"
                title="Warehousing close to key port-side industrial movement."
                text="Our facilities near JNPT Port support warehousing Mumbai requirements, dry material storage, industrial supply operations, material staging, loading, unloading, and dispatch planning for industrial clients."
              />
              <img
                src="https://images.unsplash.com/photo-1601598851547-4302969d0614?auto=format&fit=crop&w=1500&q=85"
                alt="Warehouse storage racks and industrial materials"
                className="h-72 w-full rounded border border-slate-200 object-cover brightness-[0.92] shadow-premium transition duration-700 hover:scale-[1.015] lg:h-96"
              />
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {facilities.map(({ icon: Icon, title, size, location, text }) => (
                <article
                  key={title}
                  className="rounded border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-teal-700/35 hover:shadow-premium"
                >
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-800">
                        {size}
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold text-[#102334]">
                        {title}
                      </h3>
                      <p className="mt-2 font-medium text-slate-600">{location}</p>
                    </div>
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded bg-[#102334] text-teal-200">
                      <Icon size={26} strokeWidth={1.8} />
                    </span>
                  </div>
                  <p className="mt-6 leading-7 text-slate-700">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="why-us" className="bg-[#102334] py-24 text-white sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <SectionIntro
              eyebrow="Why Choose Us"
              title="Built for the reliability industrial clients expect."
              text="We focus on the operational habits that matter: planned movement, practical storage support, careful handling, and clear coordination."
              light
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reasons.map(({ icon: Icon, title, text }) => (
                <article
                  key={title}
                  className="rounded border border-white/12 bg-white/8 p-8 shadow-[0_24px_60px_-42px_rgba(0,0,0,0.9)] backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:border-teal-300/55 hover:bg-white/12"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded bg-teal-300/12 text-teal-200">
                    <Icon size={31} strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-7 text-xl font-semibold">{title}</h3>
                  <p className="mt-4 leading-7 text-slate-200">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[#fbfcfc] py-24 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-10">
            <div>
              <SectionIntro
                eyebrow="Contact"
                title="Get a reliable logistics plan for your materials."
                text="Send your transportation, industrial warehousing, loading, unloading, material handling, or dispatch requirement and the team will respond with practical next steps."
              />
              <div className="mt-9 grid gap-4">
                {contactDetails.map(([Icon, label]) => (
                  <div key={label} className="flex items-center gap-4 text-slate-700">
                    <span className="flex h-11 w-11 items-center justify-center rounded bg-slate-100 text-teal-800">
                      <Icon size={20} />
                    </span>
                    <span className="font-medium">{label}</span>
                  </div>
                ))}
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded bg-teal-800 px-6 py-4 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#102334]"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            </div>

            <div className="grid gap-5">
              <form
                onSubmit={handleSubmit}
                className="rounded border border-slate-200 bg-white p-6 shadow-premium transition duration-300 hover:border-teal-700/25 sm:p-8"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-semibold text-slate-700">
                    Name
                    <input
                      name="name"
                      required
                      className="rounded border border-slate-200 bg-[#fbfcfc] px-4 py-3 font-normal outline-none transition focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-slate-700">
                    Company
                    <input
                      name="company"
                      className="rounded border border-slate-200 bg-[#fbfcfc] px-4 py-3 font-normal outline-none transition focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10"
                      placeholder="Company name"
                    />
                  </label>
                </div>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-semibold text-slate-700">
                    Phone
                    <input
                      name="phone"
                      required
                      className="rounded border border-slate-200 bg-[#fbfcfc] px-4 py-3 font-normal outline-none transition focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10"
                      placeholder="+91"
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-slate-700">
                    Email
                    <input
                      name="email"
                      type="email"
                      className="rounded border border-slate-200 bg-[#fbfcfc] px-4 py-3 font-normal outline-none transition focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10"
                      placeholder="name@company.com"
                    />
                  </label>
                </div>
                <div className="mt-5 grid gap-5">
                  <label className="grid gap-2 text-sm font-semibold text-slate-700">
                    Requirement
                    <select
                      name="requirement"
                      className="rounded border border-slate-200 bg-[#fbfcfc] px-4 py-3 font-normal outline-none transition focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10"
                    >
                      <option>Industrial transportation</option>
                      <option>Warehousing</option>
                      <option>Material handling</option>
                      <option>Inventory and dispatch support</option>
                    </select>
                  </label>
                </div>
                <label className="mt-5 grid gap-2 text-sm font-semibold text-slate-700">
                  Message
                  <textarea
                    name="message"
                    required
                    rows="5"
                    className="resize-none rounded border border-slate-200 bg-[#fbfcfc] px-4 py-3 font-normal outline-none transition focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10"
                    placeholder="Tell us what needs to move, store, or dispatch."
                  />
                </label>
                <button
                  type="submit"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded bg-[#102334] px-6 py-4 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-teal-800 sm:w-auto"
                >
                  Send Inquiry
                  <ArrowRight size={18} />
                </button>
                {formStatus && (
                  <p className="mt-4 text-sm font-medium text-slate-600">{formStatus}</p>
                )}
              </form>

              <div className="rounded border border-slate-200 bg-[#102334] p-7 text-white shadow-premium">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-teal-200">
                  Direct coordination
                </p>
                <h3 className="mt-3 text-2xl font-semibold">
                  Call or WhatsApp for urgent movement and storage requirements.
                </h3>
                <p className="mt-4 leading-7 text-slate-300">
                  Business address and map can be added later when you are ready
                  to publish those details.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded border border-slate-200 bg-white p-1.5 shadow-sm sm:h-20 sm:w-20">
              <img
                src="/assets/allcare-logo.png"
                alt="Allcare Cargo Logistics logo"
                className="h-full w-full object-contain"
              />
            </span>
            <div>
              <p className="text-lg font-semibold text-[#102334]">
                Allcare Cargo Logistics
              </p>
              <p className="mt-1 max-w-xl text-sm leading-6 text-slate-600">
                Mumbai-based industrial logistics, warehousing, cargo handling,
                freight transportation, and supply chain support.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-600">
            {navItems.map(([label, id]) => (
              <a key={id} href={`#${id}`} className="transition hover:text-teal-700">
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
