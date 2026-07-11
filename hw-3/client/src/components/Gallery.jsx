import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal.jsx";

const SLIDES = [
  { src: "https://loremflickr.com/1200/675/plov,pilaf?lock=11", alt: "Uzbek plov" },
  { src: "https://loremflickr.com/1200/675/lagman,noodles?lock=12", alt: "Lagman noodles" },
  { src: "https://loremflickr.com/1200/675/shashlik,kebab?lock=13", alt: "Shashlik skewers" },
  { src: "https://loremflickr.com/1200/675/samsa,pastry?lock=14", alt: "Samsa pastry" },
  { src: "https://loremflickr.com/1200/675/manti,dumplings?lock=15", alt: "Manti dumplings" },
  { src: "https://loremflickr.com/1200/675/uzbek,bread,tandir?lock=16", alt: "Tandir bread" },
];

export default function Gallery() {
  const [current, setCurrent] = useState(0);
  const touchX = useRef(0);

  const go = (i) => setCurrent((i + SLIDES.length) % SLIDES.length);
  const next = () => go(current + 1);
  const prev = () => go(current - 1);

  // auto advance every 4s, resets whenever current changes
  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 4000);
    return () => clearInterval(t);
  }, [current]);

  return (
    <section id="gallery" className="py-22 bg-green text-cream">
      <div className="container-x">
        <Reveal className="text-center mb-12">
          <span className="block font-body font-bold tracking-[0.22em] uppercase text-[0.78rem] text-teal mb-2">
            A Taste of the Room
          </span>
          <h2 className="text-[clamp(2.4rem,5vw,3.7rem)] text-saffron">Gallery</h2>
        </Reveal>

        <Reveal
          className="relative max-w-[980px] mx-auto rounded-[18px] overflow-hidden shadow-[0_12px_34px_rgba(13,31,24,0.22)]"
        >
          <div
            className="relative aspect-video"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 45) (dx < 0 ? next() : prev());
            }}
          >
            {SLIDES.map((s, i) => (
              <div
                key={s.src}
                className={"absolute inset-0 transition-opacity duration-700 " + (i === current ? "opacity-100" : "opacity-0")}
              >
                <img src={s.src} alt={s.alt} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          <button onClick={prev} aria-label="Previous"
            className="absolute top-1/2 -translate-y-1/2 left-4 w-12 h-12 grid place-items-center rounded-full bg-coral text-white hover:brightness-110 hover:scale-110 transition-all z-[3]">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button onClick={next} aria-label="Next"
            className="absolute top-1/2 -translate-y-1/2 right-4 w-12 h-12 grid place-items-center rounded-full bg-coral text-white hover:brightness-110 hover:scale-110 transition-all z-[3]">
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </Reveal>

        {/* dots */}
        <div className="flex justify-center gap-2.5 mt-6">
          {SLIDES.map((s, i) => (
            <button
              key={s.src}
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={"w-3 h-3 rounded-full transition-all " + (i === current ? "bg-saffron scale-125" : "bg-cream/35")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
