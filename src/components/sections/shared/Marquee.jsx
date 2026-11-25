import { motion, useReducedMotion } from "framer-motion";

export function Marquee({ items, label }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="overflow-hidden border-y border-line py-4" aria-label={label}>
      <motion.div
        className="flex w-max gap-8 whitespace-nowrap"
        animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        {[0, 1].map((copy) => (
          <div
            className="flex shrink-0 items-center gap-8"
            key={copy}
            aria-hidden={copy === 1}
          >
            {items.map((item, index) => (
              <span
                className="inline-flex items-center gap-3 text-sm font-bold text-muted"
                key={`${copy}-${item}-${index}`}
              >
                <span className="size-2 rounded-full bg-amber" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
