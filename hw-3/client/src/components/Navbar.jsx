import { useEffect, useState } from "react";

// the nav links, in order. ids match the section ids so the scrollspy works
const LINKS = [
  { id: "hero", label: "Home" },
  { id: "menu", label: "Menu" },
  { id: "gallery", label: "Gallery" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ cartCount = 0, onCartClick }) {
  const [solid, setSolid] = useState(false);     // background goes solid once you scroll a bit
  const [menuOpen, setMenuOpen] = useState(false); // mobile dropdown
  const [active, setActive] = useState("hero");    // which section we're looking at

  // scroll -> solid navbar
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scrollspy, basically the IntersectionObserver from hw1
  useEffect(() => {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) spy.observe(el);
    });
    return () => spy.disconnect();
  }, []);

  return (
    <header
      className={
        "fixed top-0 left-0 right-0 z-[100] backdrop-blur-md transition-all duration-300 " +
        (solid
          ? "bg-green shadow-[0_6px_22px_rgba(0,0,0,0.28)]"
          : "bg-green/55")
      }
    >
      <div className="container-x flex items-center justify-between py-4">
        {/* logo */}
        <a href="#hero" className="font-head font-semibold text-3xl tracking-wider text-cream">
          Tandir
        </a>

        {/* desktop links */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8 list-none">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={
                    "relative font-bold text-[0.96rem] py-1 transition-opacity " +
                    (active === l.id ? "text-saffron" : "text-cream/90 hover:opacity-100")
                  }
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* right side: cart + hamburger */}
        <div className="flex items-center gap-5">
          <button
            onClick={onCartClick}
            aria-label="Open cart"
            className="relative text-saffron text-2xl leading-none hover:scale-110 transition-transform"
          >
            <i className="fa-solid fa-cart-shopping"></i>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2.5 min-w-5 h-5 px-1 grid place-items-center rounded-full bg-coral text-white font-body text-[0.72rem] font-bold">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            className="md:hidden text-cream text-2xl"
          >
            <i className={menuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
          </button>
        </div>
      </div>

      {/* mobile dropdown menu */}
      <ul
        className={
          "md:hidden flex-col bg-green overflow-hidden transition-all duration-300 " +
          (menuOpen ? "flex max-h-[420px] shadow-[0_14px_30px_rgba(0,0,0,0.3)]" : "flex max-h-0")
        }
      >
        {LINKS.map((l) => (
          <li key={l.id} className="border-t border-white/10">
            <a
              href={`#${l.id}`}
              onClick={() => setMenuOpen(false)}
              className={
                "block py-4 px-[5%] font-bold " +
                (active === l.id ? "text-saffron" : "text-cream")
              }
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
}
