import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const updateVisibility = () => {
      const shouldShow = window.scrollY > 560;
      setVisible((current) => current === shouldShow ? current : shouldShow);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  if (!visible) return null;

  return (
    <button
      className="scroll-to-top"
      type="button"
      aria-label="Scroll to top"
      title="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })}
    >
      <ArrowUp aria-hidden="true" size={18} />
    </button>
  );
}
