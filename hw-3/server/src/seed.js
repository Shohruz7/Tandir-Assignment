import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "./db.js";
import MenuItem from "./models/MenuItem.js";

// same dishes the hw-2 frontend used to hardcode, now flattened with a category
const items = [
  // starters
  { category: "starters", name: "Achichuk", price: 8, desc: "Thin sliced tomato, sweet onion, basil & chili, the classic plov companion." },
  { category: "starters", name: "Tandir Non & Suzma", price: 7, desc: "Hand stamped clay oven bread with cool strained yogurt dip." },
  { category: "starters", name: "Lamb Samsa", price: 9, desc: "Flaky tandir baked pastry stuffed with juicy lamb & onion." },
  { category: "starters", name: "Badamjon Salad", price: 9, desc: "Smoky roasted eggplant, garlic, cilantro & sweet pepper." },
  { category: "starters", name: "Chuchvara Shurva", price: 11, desc: "Tiny beef dumplings in a fragrant herb broth." },
  // mains
  { category: "mains", name: "Osh (Plov)", price: 22, desc: "Our signature: golden rice, lamb, yellow carrot, chickpeas & garlic." },
  { category: "mains", name: "Hand Pulled Lagman", price: 19, desc: "Stretched noodles, beef, peppers & tomato in spiced broth." },
  { category: "mains", name: "Shashlik Platter", price: 26, desc: "Charcoal grilled lamb & beef skewers, onions, tandir bread." },
  { category: "mains", name: "Steamed Manti", price: 17, desc: "Pleated dumplings of lamb & onion, melted butter, suzma." },
  { category: "mains", name: "Dimlama", price: 20, desc: "Slow steamed layered stew of meat, potato, cabbage & herbs." },
  // desserts
  { category: "desserts", name: "Chak Chak", price: 8, desc: "Crisp fried dough bound in warm honey, a festive favorite." },
  { category: "desserts", name: "Pakhlava", price: 9, desc: "Flaky layered pastry with walnuts, pistachio & honey syrup." },
  { category: "desserts", name: "Halva", price: 7, desc: "Silky sesame tahini halva studded with toasted nuts." },
  { category: "desserts", name: "Navat & Choy", price: 6, desc: "Crystal rock sugar served with a pot of fragrant green tea." },
  { category: "desserts", name: "Parvarda", price: 6, desc: "Pulled caramel candies dusted in flour, a bazaar classic." },
];

async function seed() {
  try {
    await connectDB(process.env.MONGODB_URI);
    await MenuItem.deleteMany({});
    const created = await MenuItem.insertMany(items);
    console.log(`Seeded ${created.length} menu items.`);
  } catch (err) {
    console.error("Seed failed:", err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
