import { useEffect, useRef, useState } from "react";

// wraps children and fades them up once they scroll into view
export default function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${shown ? "is-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}
