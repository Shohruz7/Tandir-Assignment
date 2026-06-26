import { useEffect } from "react";
import { fmt } from "../data/menu.js";

export default function CartDrawer({ open, cart, onClose, onQty, onRemove, onClear }) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  // close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function checkout() {
    if (cart.length === 0) return alert("Your cart is empty, add a dish or two first.");
    alert(`Rahmat! Your order totals ${fmt(subtotal)}.\nWe can't wait to cook for you at Tandir.`);
    onClear();
    onClose();
  }

  return (
    <>
      {/* dim overlay */}
      <div
        onClick={onClose}
        className={
          "fixed inset-0 bg-green-dark/55 z-[200] transition-opacity duration-300 " +
          (open ? "opacity-100 visible" : "opacity-0 invisible")
        }
      />

      <aside
        aria-label="Shopping cart"
        className={
          "fixed top-0 right-0 bottom-0 w-[min(420px,90vw)] z-[210] bg-green text-cream flex flex-col shadow-[-10px_0_40px_rgba(0,0,0,0.4)] transition-transform duration-300 " +
          (open ? "translate-x-0" : "translate-x-full")
        }
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10">
          <h3 className="text-[1.5rem] text-saffron">Your Cart</h3>
          <button onClick={onClose} aria-label="Close cart" className="text-cream text-2xl hover:text-coral hover:rotate-90 transition-all">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4">
          {cart.length === 0 ? (
            <div className="text-center text-[#a9bcb0] mt-12 italic">
              <i className="fa-solid fa-basket-shopping block text-[2.6rem] mb-4 text-saffron/40"></i>
              Your cart is empty.<br />Add something delicious!
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.name} className="flex gap-3.5 items-center bg-white/5 rounded-xl p-3.5">
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-[0.98rem]">{item.name}</div>
                  <div className="text-saffron text-[0.88rem]">{fmt(item.price)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => onQty(item.name, -1)} aria-label="Decrease"
                    className="w-7 h-7 rounded-full grid place-items-center bg-saffron/20 text-saffron font-bold hover:bg-saffron hover:text-green transition-colors">−</button>
                  <span className="min-w-[22px] text-center font-bold">{item.qty}</span>
                  <button onClick={() => onQty(item.name, 1)} aria-label="Increase"
                    className="w-7 h-7 rounded-full grid place-items-center bg-saffron/20 text-saffron font-bold hover:bg-saffron hover:text-green transition-colors">+</button>
                </div>
                <button onClick={() => onRemove(item.name)} aria-label="Remove" className="text-[#cc9988] hover:text-coral text-[1.1rem]">
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            ))
          )}
        </div>

        <div className="px-6 pt-5 pb-6 border-t border-white/10">
          <div className="flex justify-between items-baseline mb-4 text-[1.05rem]">
            <span>Subtotal</span>
            <strong className="text-saffron text-[1.5rem] font-head">{fmt(subtotal)}</strong>
          </div>
          <div className="flex gap-3">
            <button onClick={onClear} className="flex-1 rounded-full py-3 font-body font-bold bg-muted-red text-white hover:scale-[1.03] hover:brightness-110 transition-all">
              Clear Cart
            </button>
            <button onClick={checkout} className="flex-1 rounded-full py-3 font-body font-bold bg-coral text-white hover:scale-[1.03] hover:brightness-110 transition-all">
              Checkout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
