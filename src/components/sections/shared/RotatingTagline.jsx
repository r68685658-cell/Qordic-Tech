import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const ROTATION_INTERVAL_MS = 3000;

export function RotatingTagline({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (items.length < 2) return undefined;

    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % items.length);
    }, ROTATION_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [items.length]);

  if (!items.length) return null;

  const item = items[activeIndex % items.length];

  return (
    <div className="hero-rotating-tagline" aria-live="off">
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={item.text}
          className="hero-tagline-content"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
          transition={{ duration: reduceMotion ? 0 : 0.28, ease: "easeOut" }}
        >
          <span>{item.before} </span>
          <span className="hero-tagline-accent">{item.accent}</span>
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
