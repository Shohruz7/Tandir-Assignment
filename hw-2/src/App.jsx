import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";

export default function App() {
  // cart lives up here since the navbar badge AND the menu buttons both need it.
  // wiring add/remove comes later when we build the Menu + cart drawer.
  const [cart, setCart] = useState([]);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div>
      <Navbar cartCount={cartCount} onCartClick={() => console.log("open cart (todo)")} />

      <main>
        <Hero />

        {/*  still need to build these out
            - Menu (tabs + food cards + add to cart)
            - Gallery (image slider)
            - About (story + framed photo)
            - Contact (form + map)
            - Footer
            - Cart drawer
        */}
      </main>
    </div>
  );
}
