// all the menu items, same data as hw1 just exported as a module now
export const MENU = {
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

// quick money formatter, used all over
export const fmt = (n) => "$" + n.toFixed(2);
