import { useState } from "react";
import { MENU, fmt } from "../data/menu.js";
import Reveal from "./Reveal.jsx";

// per-section flavor: accent color + the little banner up top.
// full class strings here on purpose so tailwind actually generates them.
const META = {
  starters: {
    label: "Starters", bg: "bg-saffron", border: "border-saffron",
    img: "https://loremflickr.com/600/400/samsa,uzbek?lock=21",
    title: "Starters & Salatlar",
    text: "Fresh salads, warm tandir bread, and shareable bites to begin.",
  },
  mains: {
    label: "Mains", bg: "bg-coral", border: "border-coral",
    img: "https://loremflickr.com/600/400/plov,pilaf?lock=22",
    title: "Mains & Osh",
    text: "The heart of the table: plov, lagman, kebabs, and slow cooked stews.",
  },
  desserts: {
    label: "Desserts", bg: "bg-teal", border: "border-teal",
    img: "https://loremflickr.com/600/400/baklava,sweets?lock=23",
    title: "Desserts & Choy",
    text: "Honeyed sweets and fragrant tea to linger over, choyxona style.",
  },
};

export default function Menu({ onAdd }) {
  const [tab, setTab] = useState("starters");
  const meta = META[tab];

  return (
    <section id="menu" className="py-22 bg-cream">
      <div className="container-x">
        <Reveal className="text-center mb-12">
          <span className="block font-body font-bold tracking-[0.22em] uppercase text-[0.78rem] text-coral mb-2">
            Crafted Daily
          </span>
          <h2 className="text-[clamp(2.4rem,5vw,3.7rem)]">Our Menu</h2>
        </Reveal>

        {/* tabs */}
        <div className="flex justify-center gap-3 flex-wrap mb-12">
          {Object.keys(META).map((key) => {
            const on = tab === key;
            return (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={
                  "font-body font-bold text-[0.98rem] px-7 py-2.5 rounded-full border-2 cursor-pointer transition-all " +
                  (on
                    ? `text-white border-transparent ${META[key].bg}`
                    : "text-green border-green/20 hover:border-saffron")
                }
              >
                {META[key].label}
              </button>
            );
          })}
        </div>

        {/* banner */}
        <Reveal className="flex items-center gap-5 mb-7 rounded-2xl overflow-hidden bg-white shadow-[0_4px_14px_rgba(13,31,24,0.12)]">
          <img src={meta.img} alt={meta.label} loading="lazy" className="w-[130px] h-[110px] object-cover" />
          <div className="pr-5">
            <h3 className="text-[1.4rem] text-green">{meta.title}</h3>
            <p className="text-[0.9rem] text-[#5a6b62]">{meta.text}</p>
          </div>
        </Reveal>

        {/* food cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MENU[tab].map((item) => (
            <div
              key={item.name}
              className={`flex flex-col bg-white rounded-2xl p-6 border-l-[6px] ${meta.border} shadow-[0_4px_14px_rgba(13,31,24,0.12)] hover:-translate-y-1.5 hover:shadow-[0_12px_34px_rgba(13,31,24,0.22)] transition-all`}
            >
              <div className="flex items-baseline justify-between gap-4 mb-1.5">
                <h3 className="text-[1.28rem] text-green">{item.name}</h3>
                <span className="font-body font-bold text-saffron text-[1.15rem] whitespace-nowrap">{fmt(item.price)}</span>
              </div>
              <p className="text-[0.93rem] text-[#5a6b62] mb-4">{item.desc}</p>
              <button
                onClick={() => onAdd(item.name, item.price)}
                className={`self-start font-body font-bold text-[0.85rem] text-white rounded-full px-[1.1rem] py-2 cursor-pointer hover:scale-105 hover:brightness-110 transition-all ${meta.bg}`}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
