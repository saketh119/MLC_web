"use client";
import { useState } from "react";
import { 
  IconMapPin, 
  IconMail, 
  IconPhone, 
  IconSend, 
  IconBrandLinkedin, 
  IconWorld, 
  IconBrandGithub, 
  IconBrandTwitter, 
  IconBrandYoutube 
} from "@tabler/icons-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const payload = await res.json();
      if (!res.ok || !payload.success) {
        console.error('Contact error', payload);
        setStatus('error');
        return;
      }

      setStatus('sent');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const InfoCard = ({ icon: Icon, title, children }) => (
    <div className="group relative rounded-xl border border-white/6 bg-slate-900/70 p-8 shadow-md hover:shadow-lg hover:-translate-y-1 transform transition-all duration-200">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 text-cyan-300 shadow-sm">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-300 leading-relaxed">{children}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <section className="max-w-6xl mx-auto px-6 pt-16">
        <h2 className="text-center text-cyan-400 font-semibold tracking-wider text-sm mb-3 uppercase">Contact</h2>
        <h1 className="text-center text-4xl md:text-5xl font-extrabold mb-4 font-black-future">Get In Touch</h1>
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-14 text-sm md:text-base">
          Have a question, want to collaborate, or interested in hosting an event with us? Drop a message and the Machine Learning Club team will respond soon.
        </p>

        {/* Info cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <InfoCard icon={IconMapPin} title="Address">
            VIT-AP University, Inavolu, Amaravati, Andhra Pradesh 522241
          </InfoCard>
          <InfoCard icon={IconMail} title="Email">
            <a href="mailto:ML.club@vitap.ac.in" className="text-gray-300 hover:text-cyan-300 transition">ML.club@vitap.ac.in</a>
          </InfoCard>
          <InfoCard icon={IconPhone} title="Phone">
            <a href="tel:+919346889973" className="text-gray-300 hover:text-cyan-300 transition">+91 93468 89973</a>
          </InfoCard>
        </div>

        {/* Form + side panel */}
        <div className="grid md:grid-cols-3 gap-12 items-start">
          <form onSubmit={handleSubmit} className="md:col-span-2 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <input
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-md bg-slate-800/60 border border-white/8 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/30 placeholder:text-gray-400"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-md bg-slate-800/60 border border-white/8 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/30 placeholder:text-gray-400"
              />
            </div>
            <input
              name="phone"
              placeholder="Your Phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-md bg-slate-800/60 border border-white/8 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/30 placeholder:text-gray-400"
            />
            <textarea
              name="message"
              placeholder="Message..."
              rows={6}
              value={form.message}
              onChange={handleChange}
              required
              className="w-full rounded-md bg-slate-800/60 border border-white/8 px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400/30 placeholder:text-gray-400"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="group relative inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 transition disabled:opacity-60"
            >
              <IconSend size={16} className={status === "sending" ? "animate-pulse" : ""} />
              {status === "sending" ? "Sending..." : status === "sent" ? "Sent!" : "Submit"}
            </button>
            {status === "sent" && (
              <p className="text-xs text-emerald-400">Message sent successfully. We&apos;ll get back soon.</p>
            )}
            {status === "error" && (
              <p className="text-xs text-red-400">Something went wrong. Please try again later.</p>
            )}
          </form>

          <div className="space-y-8">
            <div className="rounded-xl border border-white/10 bg-gradient-to-br from-gray-900/70 to-gray-800/50 p-6 shadow-md">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><IconBrandLinkedin size={18}/> Connect</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li>
                  <a href="https://www.linkedin.com/company/mlc-vitap" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
                    <IconBrandLinkedin size={16}/> LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://github.com/mlc-vitap" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
                    <IconBrandGithub size={16}/> GitHub
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/mlc_vitap" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
                    <IconBrandTwitter size={16}/> Twitter
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/@mlcvitap" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
                    <IconBrandYoutube size={16}/> YouTube
                  </a>
                </li>
                <li></li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-gradient-to-br from-gray-900/70 to-gray-800/50 p-6 shadow-md">
              <h3 className="font-semibold text-white mb-4">Why Reach Out?</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Collaborations, event hosting, mentorship, project showcases, or speaking engagements&mdash;our team is open to impactful partnerships that empower student innovation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
