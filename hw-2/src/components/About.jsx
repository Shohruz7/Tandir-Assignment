import Reveal from "./Reveal.jsx";

export default function About() {
  return (
    <section
      id="about"
      className="py-22 text-green"
      style={{ background: "linear-gradient(135deg, var(--color-saffron), #f7b94d)" }}
    >
      <div className="container-x grid md:grid-cols-2 gap-14 items-center">
        <Reveal>
          <h2 className="text-[clamp(2rem,4.5vw,3rem)] text-green mb-6">Our Story</h2>
          <p className="text-[#43342a] mb-4 text-[1.02rem]">
            Tandir began with a clay tandir oven, a sack of golden rice, and recipes carried from
            Samarkand across generations. We opened our doors to share the food we grew up on. The
            kind of meals that fill a long table and keep everyone talking past midnight.
          </p>
          <p className="text-[#43342a] mb-4 text-[1.02rem]">
            To us, hospitality is sacred. A pot of plov is never cooked for one, and the choy is
            always pouring. We source spices from the bazaar, knead our non by hand, and welcome
            every guest the way our grandmothers welcomed theirs, as family.
          </p>
          <div className="flex items-center gap-3 mt-7">
            <span className="flex-1 h-[3px] bg-coral rounded max-w-[120px]"></span>
            <span className="font-head italic font-semibold text-coral text-[1.2rem]">Mehmon · our guest, our honor</span>
            <span className="flex-1 h-[3px] bg-coral rounded max-w-[120px]"></span>
          </div>
        </Reveal>

        <Reveal>
          <div className="border-[10px] border-cream rounded-xl overflow-hidden shadow-[0_18px_40px_rgba(13,31,24,0.3)] md:-rotate-1 hover:rotate-0 transition-transform duration-500">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800"
              alt="A signature plated dish"
              loading="lazy"
              className="w-full h-[460px] object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
