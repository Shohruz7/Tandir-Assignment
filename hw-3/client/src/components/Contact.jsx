import { useState } from "react";
import Reveal from "./Reveal.jsx";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  function submit(e) {
    e.preventDefault();
    alert("Thanks for reaching out. We'll be in touch shortly to confirm your table.");
    setForm({ name: "", email: "", msg: "" });
  }

  const field =
    "w-full font-body text-base bg-cream text-ink border-2 border-transparent rounded-[10px] px-4 py-3.5 outline-none focus:border-coral focus:shadow-[0_0_0_4px_rgba(232,93,58,0.25)] transition-all";
  const label = "font-bold text-[0.85rem] tracking-wide text-saffron -mb-2";

  return (
    <section id="contact" className="py-22 bg-green text-cream">
      <div className="container-x">
        <Reveal className="text-center mb-12">
          <span className="block font-body font-bold tracking-[0.22em] uppercase text-[0.78rem] text-coral mb-2">
            Come Say Hello
          </span>
          <h2 className="text-[clamp(2.4rem,5vw,3.7rem)] text-cream">Reserve &amp; Reach Us</h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-12 items-stretch">
          <Reveal>
            <form onSubmit={submit} className="flex flex-col gap-4">
              <label className={label} htmlFor="cName">Name</label>
              <input id="cName" className={field} type="text" placeholder="Your name" required
                value={form.name} onChange={set("name")} />

              <label className={label} htmlFor="cEmail">Email</label>
              <input id="cEmail" className={field} type="email" placeholder="you@example.com" required
                value={form.email} onChange={set("email")} />

              <label className={label} htmlFor="cMsg">Message</label>
              <textarea id="cMsg" className={`${field} resize-y min-h-[130px]`} placeholder="Tell us about your visit, party size, or special request…" required
                value={form.msg} onChange={set("msg")} />

              <button type="submit" className="btn self-start !bg-saffron !text-green mt-1">
                <i className="fa-solid fa-paper-plane"></i> Send Message
              </button>
            </form>
          </Reveal>

          <Reveal className="border-8 border-teal rounded-2xl overflow-hidden min-h-[380px] shadow-[0_12px_34px_rgba(13,31,24,0.22)]">
            <iframe
              title="Tandir location"
              src="https://www.google.com/maps?q=New+York,+NY&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[380px] border-0 block"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
