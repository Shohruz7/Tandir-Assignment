export default function Footer() {
  const social = "w-[42px] h-[42px] rounded-full grid place-items-center bg-saffron/10 text-saffron text-[1.1rem] hover:bg-coral hover:text-white hover:-translate-y-1 transition-all";

  return (
    <footer className="bg-green-dark text-[#cdd9d1] pt-16 pb-8">
      <div className="container-x grid md:grid-cols-[1.4fr_1fr_1fr] gap-10 mb-10 text-center md:text-left">
        <div>
          <div className="font-head font-extrabold text-[1.6rem] text-cream mb-2.5">Tandir</div>
          <p className="text-[0.95rem] leading-[1.8]">
            An Uzbek kitchen &amp; choyxona. The flavors of the Silk Road, served with warmth and a generous table.
          </p>
        </div>

        <div>
          <h4 className="text-saffron text-[1.2rem] mb-4">Hours</h4>
          <p className="text-[0.95rem] leading-[1.8]">
            Mon to Thu · 10am to 10pm<br />
            Fri · Closed<br />
            Sat to Sun · 11pm to 3am
          </p>
        </div>

        <div>
          <h4 className="text-saffron text-[1.2rem] mb-4">Follow Us</h4>
          <p className="text-[0.95rem] leading-[1.8]">78 Silk Road Avenue<br />New York, NY 10001</p>
          <div className="flex gap-4 mt-1.5 justify-center md:justify-start">
            <a href="#" aria-label="Facebook" className={social}><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" aria-label="Instagram" className={social}><i className="fa-brands fa-instagram"></i></a>
            <a href="#" aria-label="X" className={social}><i className="fa-brands fa-x-twitter"></i></a>
          </div>
        </div>
      </div>

      <div className="container-x text-center pt-7 border-t border-white/8 text-[0.85rem] text-[#8ba093]">
        © 2026 Tandir. Pishirildi mehr bilan, cooked with love.
      </div>
    </footer>
  );
}
