import { Globe2 } from "lucide-react";
import { Reveal } from "../shared/Reveal.jsx";

export function GlobalCoverage({ coverage }) {
  return (
    <div className="grid items-stretch gap-5 lg:grid-cols-[1.4fr_0.8fr]">
      <Reveal>
        <div
          className="relative min-h-64 overflow-hidden rounded-panel border border-line bg-surface shadow-card sm:min-h-80"
          aria-label="Pulsing global map with delivery locations"
        >
          <div
            className="absolute inset-0 opacity-80"
            style={{
              backgroundImage:
                "radial-gradient(var(--color-line) 1.5px, transparent 1.5px)",
              backgroundSize: "22px 22px",
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-x-8 top-10 bottom-10 rounded-[48%_44%_49%_38%] border border-violet/15 bg-violet/5" aria-hidden="true" />
          <div className="absolute inset-x-20 top-16 bottom-16 rounded-[42%_55%_38%_53%] border border-coral/15 bg-coral/5" aria-hidden="true" />
          {coverage.locations.map((location, index) => (
            <span
              className="absolute z-10 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber shadow-[0_0_0_5px_rgb(255_184_77_/_15%)] before:absolute before:inset-0 before:animate-map-pulse before:rounded-full before:border-2 before:border-amber motion-reduce:before:animate-none"
              key={index}
              style={{
                top: `${location.top}%`,
                left: `${location.left}%`,
                animationDelay: `${location.delay}s`,
              }}
              aria-hidden="true"
            />
          ))}
          <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface/90 px-3 py-2 text-xs font-bold text-ink shadow-card backdrop-blur-md">
            <Globe2 className="text-violet-strong" aria-hidden="true" size={16} />
            Global coordination
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <div className="flex h-full flex-col justify-center rounded-panel bg-gradient-to-br from-violet to-[#1749b5] p-6 text-white shadow-lift sm:p-8">
          <span className="w-fit rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white">
            Delivery model
          </span>
          <p className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {coverage.value}
          </p>
          <p className="mt-3 leading-relaxed text-white/85">
            {coverage.description}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {coverage.tags.map((tag) => (
              <li
                className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white"
                key={tag}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}
