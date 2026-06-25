(function () {
  "use strict";

  // all the menu items
  const MENU = {
    starters: [
      { name: "Achichuk", desc: "Thin sliced tomato, sweet onion, basil & chili, the classic plov companion.", price: 8 },
      { name: "Tandir Non & Suzma", desc: "Hand stamped clay oven bread with cool strained yogurt dip.", price: 7 },
      { name: "Lamb Samsa", desc: "Flaky tandir baked pastry stuffed with juicy lamb & onion.", price: 9 },
      { name: "Badamjon Salad", desc: "Smoky roasted eggplant, garlic, cilantro & sweet pepper.", price: 9 },
      { name: "Chuchvara Shurva", desc: "Tiny beef dumplings in a fragrant herb broth.", price: 11 },
    ],
    mains: [
      { name: "Osh (Plov)", desc: "Our signature: golden rice, lamb, yellow carrot, chickpeas & garlic.", price: 22 },
      { name: "Hand Pulled Lagman", desc: "Stretched noodles, beef, peppers & tomato in spiced broth.", price: 19 },
      { name: "Shashlik Platter", desc: "Charcoal grilled lamb & beef skewers, onions, tandir bread.", price: 26 },
      { name: "Steamed Manti", desc: "Pleated dumplings of lamb & onion, melted butter, suzma.", price: 17 },
      { name: "Dimlama", desc: "Slow steamed layered stew of meat, potato, cabbage & herbs.", price: 20 },
    ],
    desserts: [
      { name: "Chak Chak", desc: "Crisp fried dough bound in warm honey, a festive favorite.", price: 8 },
      { name: "Pakhlava", desc: "Flaky layered pastry with walnuts, pistachio & honey syrup.", price: 9 },
      { name: "Halva", desc: "Silky sesame tahini halva studded with toasted nuts.", price: 7 },
      { name: "Navat & Choy", desc: "Crystal rock sugar served with a pot of fragrant green tea.", price: 6 },
      { name: "Parvarda", desc: "Pulled caramel candies dusted in flour, a bazaar classic.", price: 6 },
    ],
  };

  const fmt = (n) => "$" + n.toFixed(2);

  // build the menu cards
  document.querySelectorAll(".menu-panel").forEach((panel) => {
    const section = panel.dataset.section;
    const grid = panel.querySelector(".menu-grid");
    grid.innerHTML = MENU[section].map((item) => `
      <div class="food-card">
        <div class="fc-body">
          <div class="name-row">
            <h3>${item.name}</h3>
            <span class="price">${fmt(item.price)}</span>
          </div>
          <p>${item.desc}</p>
          <button class="add-btn"
            data-name="${item.name}" data-price="${item.price}">Add to Cart</button>
        </div>
      </div>`).join("");
  });

  const tabs = document.querySelectorAll(".tab");
  const panels = document.querySelectorAll(".menu-panel");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));
      tab.classList.add("active");
      document.querySelector(`.menu-panel[data-section="${tab.dataset.tab}"]`).classList.add("active");
    });
  });

  // cart stuff
  const cart = [];
  const badge = document.getElementById("cartBadge");
  const itemsEl = document.getElementById("cartItems");
  const subtotalEl = document.getElementById("cartSubtotal");
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("overlay");

  function renderCart() {
    const count = cart.reduce((s, i) => s + i.qty, 0);
    badge.textContent = count;
    badge.classList.toggle("show", count > 0);

    if (cart.length === 0) {
      itemsEl.innerHTML = `<div class="cart-empty"><i class="fa-solid fa-basket-shopping"></i>Your cart is empty.<br>Add something delicious!</div>`;
    } else {
      itemsEl.innerHTML = cart.map((item, i) => `
        <div class="cart-item">
          <div class="ci-info">
            <div class="ci-name">${item.name}</div>
            <div class="ci-price">${fmt(item.price)}</div>
          </div>
          <div class="qty">
            <button data-act="dec" data-i="${i}" aria-label="Decrease">−</button>
            <span>${item.qty}</span>
            <button data-act="inc" data-i="${i}" aria-label="Increase">+</button>
          </div>
          <button class="remove" data-act="remove" data-i="${i}" aria-label="Remove"><i class="fa-solid fa-xmark"></i></button>
        </div>`).join("");
    }
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    subtotalEl.textContent = fmt(subtotal);
  }

  function addToCart(name, price) {
    const existing = cart.find((i) => i.name === name);
    if (existing) existing.qty++;
    else cart.push({ name, price, qty: 1 });
    renderCart();
    badge.style.transform = "scale(1.4)";
    setTimeout(() => (badge.style.transform = ""), 180);
  }

  document.querySelectorAll(".add-btn").forEach((btn) => {
    btn.addEventListener("click", () => addToCart(btn.dataset.name, parseFloat(btn.dataset.price)));
  });

  itemsEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-act]");
    if (!btn) return;
    const i = parseInt(btn.dataset.i, 10);
    const act = btn.dataset.act;
    if (act === "inc") cart[i].qty++;
    else if (act === "dec") { cart[i].qty--; if (cart[i].qty <= 0) cart.splice(i, 1); }
    else if (act === "remove") cart.splice(i, 1);
    renderCart();
  });

  // open + close the drawer
  function openCart() { drawer.classList.add("open"); overlay.classList.add("open"); }
  function closeCart() { drawer.classList.remove("open"); overlay.classList.remove("open"); }

  document.getElementById("cartBtn").addEventListener("click", openCart);
  document.getElementById("cartClose").addEventListener("click", closeCart);
  overlay.addEventListener("click", closeCart);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeCart(); });

  document.getElementById("clearCart").addEventListener("click", () => { cart.length = 0; renderCart(); });
  document.getElementById("checkout").addEventListener("click", () => {
    if (cart.length === 0) { alert("Your cart is empty, add a dish or two first."); return; }
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    alert(`Rahmat! Your order totals ${fmt(total)}.\nWe can't wait to cook for you at Tandir.`);
    cart.length = 0; renderCart(); closeCart();
  });

  renderCart();

  // navbar - scroll + mobile menu + active link
  const nav = document.getElementById("nav");
  const navLinks = document.getElementById("navLinks");
  const hamburger = document.getElementById("hamburger");

  window.addEventListener("scroll", () => {
    nav.classList.toggle("solid", window.scrollY > 40);
  });

  hamburger.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => navLinks.classList.remove("open"))
  );

  const sections = ["hero", "menu", "gallery", "about", "contact"];
  const linkFor = (id) => navLinks.querySelector(`a[href="#${id}"]`);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.querySelectorAll("a").forEach((a) => a.classList.remove("active"));
        const link = linkFor(entry.target.id);
        if (link) link.classList.add("active");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((id) => { const el = document.getElementById(id); if (el) spy.observe(el); });

  // fade things in as you scroll
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); revealObs.unobserve(entry.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));

  // gallery slider
  const slides = Array.from(document.querySelectorAll(".slide"));
  const dotsWrap = document.getElementById("dots");
  let current = 0;
  let timer;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", "Go to slide " + (i + 1));
    dot.addEventListener("click", () => goTo(i, true));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function goTo(index, reset) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = (index + slides.length) % slides.length;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
    if (reset) restart();
  }
  const next = () => goTo(current + 1, true);
  const prev = () => goTo(current - 1, true);

  document.getElementById("slideNext").addEventListener("click", next);
  document.getElementById("slidePrev").addEventListener("click", prev);

  function start() { timer = setInterval(() => goTo(current + 1), 4000); }
  function restart() { clearInterval(timer); start(); }
  start();

  // swipe on mobile
  const slider = document.getElementById("slider");
  let startX = 0, dragging = false;
  slider.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; dragging = true; }, { passive: true });
  slider.addEventListener("touchend", (e) => {
    if (!dragging) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 45) { dx < 0 ? next() : prev(); }
    dragging = false;
  });

  document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    alert("Thanks for reaching out. We'll be in touch shortly to confirm your table.");
    form.reset();
  });
})();
