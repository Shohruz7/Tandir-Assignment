// big landing section. dark overlay on top of a food photo, centered text
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen grid place-items-center text-center text-cream px-0 pt-24 pb-16"
      style={{
        background:
          "linear-gradient(rgba(13,31,24,0.72), rgba(26,58,42,0.82)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600') center/cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container-x max-w-[820px]">
        <span className="inline-block tracking-[0.3em] uppercase font-bold text-[0.85rem] text-saffron mb-5">
          Uzbek Kitchen &amp; Choyxona · New York
        </span>

        <h1 className="font-head font-semibold mb-5 text-[clamp(3rem,8vw,6rem)] leading-[1.1]">
          From the Tandir, From <span className="text-saffron">Samarkand</span>
        </h1>

        <p className="italic font-light opacity-90 mb-9 text-[clamp(1.05rem,2.4vw,1.4rem)]">
          The flavors of Samarkand and the Silk Road: fragrant plov, hand pulled lagman,
          and smoky shashlik, served the way our grandmothers intended.
        </p>

        <a href="#menu" className="btn">
          <i className="fa-solid fa-utensils"></i> Explore Our Menu
        </a>
      </div>

      {/* little bouncing chevron at the bottom */}
      <a
        href="#menu"
        aria-label="Scroll down"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-cream text-2xl opacity-70"
        style={{ animation: "bob 1.8s ease-in-out infinite" }}
      >
        <i className="fa-solid fa-chevron-down"></i>
      </a>
    </section>
  );
}
