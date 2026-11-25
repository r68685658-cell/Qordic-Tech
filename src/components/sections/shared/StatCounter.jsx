import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal.jsx";

export function StatCounter({ items, className = "" }) {
  const reduceMotion = useReducedMotion();

  return (
    <dl className={`grid grid-cols-2 gap-3 lg:grid-cols-4 ${className}`}>
      {items.map((item, index) => {
        const numeric = typeof item.value === "number" ? item.value : null;

        return (
          <Reveal key={item.label} delay={index * 0.04}>
            <div className="h-full rounded-card border border-white/20 bg-white/10 p-4 text-center backdrop-blur-md sm:p-6">
              <dt className="text-sm font-semibold text-white/85">{item.label}</dt>
              <dd className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {numeric === null ? (
                  item.value
                ) : (
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: reduceMotion ? 0 : 0.4 }}
                  >
                    {numeric}
                    {item.suffix ?? ""}
                  </motion.span>
                )}
              </dd>
              {item.note && <p className="mt-2 text-xs text-white/75">{item.note}</p>}
            </div>
          </Reveal>
        );
      })}
    </dl>
  );
}
