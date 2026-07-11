import { useState } from "react";
import { createOrder } from "./api.js";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Menu from "./components/Menu.jsx";
import Gallery from "./components/Gallery.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import CartDrawer from "./components/CartDrawer.jsx";

export default function App() {
  // cart lives up here since the navbar badge, menu buttons and drawer all touch it
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  function addToCart(name, price) {
    setCart((prev) => {
      const found = prev.find((i) => i.name === name);
      if (found) return prev.map((i) => (i.name === name ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { name, price, qty: 1 }];
    });
    setCartOpen(true);
  }

  // delta is +1 / -1, drop the item if it hits zero
  const changeQty = (name, delta) =>
    setCart((prev) =>
      prev.map((i) => (i.name === name ? { ...i, qty: i.qty + delta } : i)).filter((i) => i.qty > 0)
    );
  const removeItem = (name) => setCart((prev) => prev.filter((i) => i.name !== name));
  const clearCart = () => setCart([]);

  // send the cart to the backend as an order; the server saves it to MongoDB.
  // returns the created order so the drawer can show a confirmation.
  async function placeOrder() {
    const items = cart.map(({ name, price, qty }) => ({ name, price, qty }));
    const order = await createOrder({ items });
    clearCart();
    return order;
  }

  return (
    <div>
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />

      <main>
        <Hero />
        <Menu onAdd={addToCart} />
        <Gallery />
        <About />
        <Contact />
      </main>

      <Footer />

      <CartDrawer
        open={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        onQty={changeQty}
        onRemove={removeItem}
        onClear={clearCart}
        onCheckout={placeOrder}
      />
    </div>
  );
}
